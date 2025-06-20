package routes

import (
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {	
	setupRootRoutes(router)
}

func setupRootRoutes(router *gin.Engine) {
	setupHealthRoutes(router)
	
}

