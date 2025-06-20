package main

import (
    "log"

    "amobagan/config"
    "amobagan/lib"
    "amobagan/routes"

    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
)

func main() {
    cfg := config.LoadConfig()

    lib.ConnectDB(cfg)

    gin.SetMode(cfg.GinMode) // for detailed logging

    router := gin.Default()
    
    // Configure CORS middleware
    router.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * 60 * 60, // 12 hours
    }))
    
    routes.SetupRoutes(router)

    log.Printf("🚀 Server is running on port %s", cfg.Port)

    if err := router.Run(":" + cfg.Port); err != nil {
        log.Fatal("Failed to start server:", err)
    }
}