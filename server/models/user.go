package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID                 primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	FullName           string             `json:"fullName" bson:"fullName" binding:"required"`
	PhoneNo            string             `json:"phoneNo" bson:"phoneNo" binding:"required,min=10,max=10"`
	Password           string             `json:"password" bson:"password" binding:"required,min=6"`
	PetraWalletAddress string             `json:"petraWalletAddress" bson:"petraWalletAddress"`
	PetraPublicKey     string             `json:"petraPublicKey" bson:"petraPublicKey"`
	HealthStatus       string             `json:"healthStatus" bson:"healthStatus"`
	Role               string             `json:"role" bson:"role" binding:"required,oneof=admin vendor user"`
	HealthGoals        []string  `json:"healthGoals" bson:"healthGoals"`
	DietaryPreferences []string  `json:"dietaryPreferences" bson:"dietaryPreferences"`
	NutritionPriorities []string  `json:"nutritionPriorities" bson:"nutritionPriorities"`
}