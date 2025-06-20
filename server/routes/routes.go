package routes

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {	
	setupRootRoutes(router)
	setupApiRoutes(router)
}

func setupRootRoutes(router *gin.Engine) {
	setupHealthRoutes(router)
}


func setupApiRoutes(router *gin.Engine) {
	api := router.Group("/api")
	setupUserRoutes(api)
}
