package routes

import (
	"amobagan/controllers"

	"github.com/gin-gonic/gin"
)

func setupUserRoutes(api *gin.RouterGroup) {
	userController := controllers.NewUserController()

	api.POST("/user/create", userController.CreateUser)
	api.POST("/user/login", userController.LoginUser)
}