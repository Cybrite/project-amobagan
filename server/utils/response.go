package utils

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// Response represents the standard API response structure
type Response struct {
	Success   bool        `json:"success"`
	Message   string      `json:"message"`
	Data      interface{} `json:"data,omitempty"`
	Error     *ErrorInfo  `json:"error,omitempty"`
	Timestamp time.Time   `json:"timestamp"`
}

// ErrorInfo represents detailed error information
type ErrorInfo struct {
	Code    string      `json:"code"`
	Message string      `json:"message"`
	Details interface{} `json:"details,omitempty"`
}

// SuccessResponse sends a successful response
func SuccessResponse(c *gin.Context, statusCode int, message string, data interface{}) {
	response := Response{
		Success:   true,
		Message:   message,
		Data:      data,
		Timestamp: time.Now().UTC(),
	}
	c.JSON(statusCode, response)
}

// ErrorResponse sends an error response
func ErrorResponse(c *gin.Context, statusCode int, code string, message string, details interface{}) {
	response := Response{
		Success: false,
		Message: "Request failed",
		Error: &ErrorInfo{
			Code:    code,
			Message: message,
			Details: details,
		},
		Timestamp: time.Now().UTC(),
	}
	c.JSON(statusCode, response)
}

// Common success response helpers
func OK(c *gin.Context, message string, data interface{}) {
	SuccessResponse(c, http.StatusOK, message, data)
}

func Created(c *gin.Context, message string, data interface{}) {
	SuccessResponse(c, http.StatusCreated, message, data)
}

func NoContent(c *gin.Context, message string) {
	SuccessResponse(c, http.StatusNoContent, message, nil)
}

// Common error response helpers
func BadRequest(c *gin.Context, message string, details interface{}) {
	ErrorResponse(c, http.StatusBadRequest, "BAD_REQUEST", message, details)
}

func Unauthorized(c *gin.Context, message string) {
	ErrorResponse(c, http.StatusUnauthorized, "UNAUTHORIZED", message, nil)
}

func Forbidden(c *gin.Context, message string) {
	ErrorResponse(c, http.StatusForbidden, "FORBIDDEN", message, nil)
}

func NotFound(c *gin.Context, message string) {
	ErrorResponse(c, http.StatusNotFound, "NOT_FOUND", message, nil)
}

func ValidationError(c *gin.Context, message string, details interface{}) {
	ErrorResponse(c, http.StatusUnprocessableEntity, "VALIDATION_ERROR", message, details)
}

func InternalServerError(c *gin.Context, message string, details interface{}) {
	ErrorResponse(c, http.StatusInternalServerError, "INTERNAL_SERVER_ERROR", message, details)
}

func ConflictError(c *gin.Context, message string, details interface{}) {
	ErrorResponse(c, http.StatusConflict, "CONFLICT", message, details)
} 