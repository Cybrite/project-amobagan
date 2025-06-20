package main

import (
	"log"

	"amobagan/config"
	"amobagan/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.LoadConfig()

	config.ConnectDB(cfg)

	gin.SetMode(cfg.GinMode) // for detailed logging

	router := gin.Default()
	routes.SetupRoutes(router)

	log.Printf("🚀 Server is running on port %s", cfg.Port)

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}