package controllers

import (
	"amobagan/models"
	"amobagan/services"
	"amobagan/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type WeeklyTodoController struct {
	weeklyTodoService *services.WeeklyTodoService
}

func NewWeeklyTodoController() (*WeeklyTodoController, error) {
	weeklyTodoService, err := services.NewWeeklyTodoService()
	if err != nil {
		return nil, err
	}
	return &WeeklyTodoController{
		weeklyTodoService: weeklyTodoService,
	}, nil
}

// GenerateWeeklyTodo handles the request to generate a new weekly todo list
func (c *WeeklyTodoController) GenerateWeeklyTodo(ctx *gin.Context) {
	// Get user ID from context (set by auth middleware)
	userID := ctx.GetString("userID")
	if userID == "" {
		utils.SendErrorResponse(ctx, http.StatusUnauthorized, "User not authenticated", "")
		return
	}

	// Parse request body
	var request models.WeeklyTodoRequest
	if err := ctx.ShouldBindJSON(&request); err != nil {
		utils.SendErrorResponse(ctx, http.StatusBadRequest, "Invalid request body", err.Error())
		return
	}

	// Generate the weekly todo using user data from database
	weeklyTodo, err := c.weeklyTodoService.GenerateWeeklyTodo(userID, request.GenerateNewWeek)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusInternalServerError, "Failed to generate weekly todo", err.Error())
		return
	}

	// Save the weekly todo to database
	err = c.weeklyTodoService.SaveWeeklyTodo(weeklyTodo)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusInternalServerError, "Failed to save weekly todo", err.Error())
		return
	}

	// Create response
	response := models.WeeklyTodoResponse{
		Success: true,
		Message: "Weekly todo list generated and saved successfully",
		Data:    weeklyTodo,
	}

	ctx.JSON(http.StatusOK, response)
}

// GetWeeklyTodo retrieves a specific weekly todo
func (c *WeeklyTodoController) GetWeeklyTodo(ctx *gin.Context) {
	userID := ctx.GetString("userID")
	if userID == "" {
		utils.SendErrorResponse(ctx, http.StatusUnauthorized, "User not authenticated", "")
		return
	}

	todoID := ctx.Param("todoId")
	if todoID == "" {
		utils.SendErrorResponse(ctx, http.StatusBadRequest, "Todo ID is required", "")
		return
	}

	weeklyTodo, err := c.weeklyTodoService.GetWeeklyTodo(todoID)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusNotFound, "Weekly todo not found", err.Error())
		return
	}

	// Verify the weekly todo belongs to the authenticated user
	if weeklyTodo.UserID.Hex() != userID {
		utils.SendErrorResponse(ctx, http.StatusForbidden, "Access denied", "This weekly todo does not belong to you")
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Weekly todo retrieved successfully",
		"data":    weeklyTodo,
	})
}

// GetUserWeeklyTodos retrieves all weekly todos for the authenticated user
func (c *WeeklyTodoController) GetUserWeeklyTodos(ctx *gin.Context) {
	userID := ctx.GetString("userID")
	if userID == "" {
		utils.SendErrorResponse(ctx, http.StatusUnauthorized, "User not authenticated", "")
		return
	}

	weeklyTodos, err := c.weeklyTodoService.GetUserWeeklyTodos(userID)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusInternalServerError, "Failed to retrieve weekly todos", err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Weekly todos retrieved successfully",
		"data":    weeklyTodos,
	})
}

// GetCurrentWeekTodo retrieves the current active week todo for the user
func (c *WeeklyTodoController) GetCurrentWeekTodo(ctx *gin.Context) {
	userID := ctx.GetString("userID")
	if userID == "" {
		utils.SendErrorResponse(ctx, http.StatusUnauthorized, "User not authenticated", "")
		return
	}

	weeklyTodo, err := c.weeklyTodoService.GetCurrentWeekTodo(userID)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusNotFound, "No active weekly todo found", err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Current week todo retrieved successfully",
		"data":    weeklyTodo,
	})
}

// UpdateTodoItem updates a specific todo item
func (c *WeeklyTodoController) UpdateTodoItem(ctx *gin.Context) {
	userID := ctx.GetString("userID")
	if userID == "" {
		utils.SendErrorResponse(ctx, http.StatusUnauthorized, "User not authenticated", "")
		return
	}

	todoID := ctx.Param("todoId")
	if todoID == "" {
		utils.SendErrorResponse(ctx, http.StatusBadRequest, "Todo ID is required", "")
		return
	}

	itemID := ctx.Param("itemId")
	if itemID == "" {
		utils.SendErrorResponse(ctx, http.StatusBadRequest, "Item ID is required", "")
		return
	}

	var updateRequest models.TodoUpdateRequest
	if err := ctx.ShouldBindJSON(&updateRequest); err != nil {
		utils.SendErrorResponse(ctx, http.StatusBadRequest, "Invalid request body", err.Error())
		return
	}

	// Verify the weekly todo belongs to the authenticated user
	weeklyTodo, err := c.weeklyTodoService.GetWeeklyTodo(todoID)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusNotFound, "Weekly todo not found", err.Error())
		return
	}

	if weeklyTodo.UserID.Hex() != userID {
		utils.SendErrorResponse(ctx, http.StatusForbidden, "Access denied", "This weekly todo does not belong to you")
		return
	}

	// Update the todo item
	err = c.weeklyTodoService.UpdateTodoItem(todoID, itemID, updateRequest)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusInternalServerError, "Failed to update todo item", err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Todo item updated successfully",
	})
}

// GenerateWeeklyAnalysis generates analysis for a completed week
func (c *WeeklyTodoController) GenerateWeeklyAnalysis(ctx *gin.Context) {
	userID := ctx.GetString("userID")
	if userID == "" {
		utils.SendErrorResponse(ctx, http.StatusUnauthorized, "User not authenticated", "")
		return
	}

	todoID := ctx.Param("todoId")
	if todoID == "" {
		utils.SendErrorResponse(ctx, http.StatusBadRequest, "Todo ID is required", "")
		return
	}

	// Verify the weekly todo belongs to the authenticated user
	weeklyTodo, err := c.weeklyTodoService.GetWeeklyTodo(todoID)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusNotFound, "Weekly todo not found", err.Error())
		return
	}

	if weeklyTodo.UserID.Hex() != userID {
		utils.SendErrorResponse(ctx, http.StatusForbidden, "Access denied", "This weekly todo does not belong to you")
		return
	}

	// Generate the analysis
	analysis, err := c.weeklyTodoService.GenerateWeeklyAnalysis(todoID)
	if err != nil {
		utils.SendErrorResponse(ctx, http.StatusInternalServerError, "Failed to generate weekly analysis", err.Error())
		return
	}

	// Create response
	response := models.WeeklyAnalysisResponse{
		Success: true,
		Message: "Weekly analysis generated successfully",
		Data:    analysis,
	}

	ctx.JSON(http.StatusOK, response)
}

// TestUserExists is a temporary endpoint to debug user authentication
func (c *WeeklyTodoController) TestUserExists(ctx *gin.Context) {
	userID := ctx.GetString("userID")
	if userID == "" {
		utils.SendErrorResponse(ctx, http.StatusUnauthorized, "User not authenticated", "")
		return
	}

	// Try to get user data
	user, err := services.GetUserByID(userID)
	if err != nil {
		ctx.JSON(http.StatusOK, gin.H{
			"success": false,
			"message": "User not found in database",
			"userID": userID,
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User found in database",
		"user": gin.H{
			"id": user.ID.Hex(),
			"fullName": user.FullName,
			"phoneNo": user.PhoneNo,
			"healthStatus": user.HealthStatus,
			"healthGoals": user.HealthGoals,
			"dietaryPreferences": user.DietaryPreferences,
			"nutritionPriorities": user.NutritionPriorities,
			"workOutsPerWeek": user.WorkOutsPerWeek,
			"age": user.Age,
			"height": user.Height,
			"weight": user.Weight,
		},
	})
} 