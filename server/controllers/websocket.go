package controllers

import (
	"amobagan/lib"
	"amobagan/models"
	"amobagan/services"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type WebSocketController struct {
	nutritionService *services.NutritionAnalysisService
	upgrader         websocket.Upgrader
}

func NewWebSocketController() *WebSocketController {
	nutritionService, err := services.NewNutritionAnalysisService()
	if err != nil {
		nutritionService = nil
	}

	return &WebSocketController{
		nutritionService: nutritionService,
		upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true // Allow all origins for development
			},
		},
	}
}

type StreamNutritionRequest struct {
	Barcode        string                `json:"barcode"`
	UserPreferences models.UserPreferences `json:"user_preferences"`
}

type StreamMessage struct {
	Type    string      `json:"type"`
	Content string      `json:"content"`
	Data    interface{} `json:"data,omitempty"`
}

func (w *WebSocketController) StreamNutritionAnalysis(c *gin.Context) {
	// Upgrade HTTP connection to WebSocket
	conn, err := w.upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("Failed to upgrade connection to WebSocket: %v", err)
		return
	}
	defer conn.Close()

	// Send initial connection message
	initialMsg := StreamMessage{
		Type:    "connection",
		Content: "Connected to nutrition analysis stream",
	}
	if err := conn.WriteJSON(initialMsg); err != nil {
		log.Printf("Failed to send initial message: %v", err)
		return
	}

	// Listen for messages from client
	for {
		// Read message from client
		_, message, err := conn.ReadMessage()
		if err != nil {
			log.Printf("Failed to read message: %v", err)
			break
		}

		// Parse the request
		var request StreamNutritionRequest
		if err := json.Unmarshal(message, &request); err != nil {
			errorMsg := StreamMessage{
				Type:    "error",
				Content: "Invalid request format",
			}
			conn.WriteJSON(errorMsg)
			continue
		}

		// Validate request
		if request.Barcode == "" {
			errorMsg := StreamMessage{
				Type:    "error",
				Content: "Barcode is required",
			}
			conn.WriteJSON(errorMsg)
			continue
		}

		// Check if nutrition service is available
		if w.nutritionService == nil {
			errorMsg := StreamMessage{
				Type:    "error",
				Content: "Nutrition analysis service not available",
			}
			conn.WriteJSON(errorMsg)
			continue
		}

		// Start streaming analysis
		w.streamNutritionAnalysis(conn, request.Barcode, &request.UserPreferences)
	}
}

func (w *WebSocketController) streamNutritionAnalysis(
	conn *websocket.Conn,
	barcode string,
	userPrefs *models.UserPreferences,
) {
	// Send start message
	startMsg := StreamMessage{
		Type:    "analysis_start",
		Content: "Starting nutrition analysis...",
	}
	if err := conn.WriteJSON(startMsg); err != nil {
		log.Printf("Failed to send start message: %v", err)
		return
	}

	// Get product data
	product, err := lib.RetrieveProductDetailsByBarcode(barcode)
	if err != nil {
		errorMsg := StreamMessage{
			Type:    "error",
			Content: "Product not found",
		}
		conn.WriteJSON(errorMsg)
		return
	}

	// Send product found message
	productMsg := StreamMessage{
		Type:    "product_found",
		Content: fmt.Sprintf("Found product: %s", product.ProductIdentification.ProductName),
		Data:    product,
	}
	if err := conn.WriteJSON(productMsg); err != nil {
		log.Printf("Failed to send product message: %v", err)
		return
	}

	// Start streaming nutrition analysis
	err = w.nutritionService.StreamNutritionAnalysisWithPreferences(
		conn,
		product,
		userPrefs,
	)
	if err != nil {
		errorMsg := StreamMessage{
			Type:    "error",
			Content: fmt.Sprintf("Analysis failed: %v", err),
		}
		conn.WriteJSON(errorMsg)
		return
	}

	// Send completion message
	completeMsg := StreamMessage{
		Type:    "analysis_complete",
		Content: "Nutrition analysis completed successfully",
	}
	conn.WriteJSON(completeMsg)
} 