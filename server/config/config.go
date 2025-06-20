package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port         string
	GinMode      string
	MongoURI     string
	JWT_SECRET   string
	GeminiAPIKey string
}

func LoadConfig() *Config {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables or defaults")
	}

	config := &Config{
		Port:         getEnv("PORT", "8080"),
		GinMode:      getEnv("GIN_MODE", "debug"),
		MongoURI:     getEnv("MONGO_URI", ""),
		JWT_SECRET:   getEnv("JWT_SECRET", ""),
		GeminiAPIKey: getEnv("GEMINI_API_KEY", ""),
		
	}

	return config
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
} 
