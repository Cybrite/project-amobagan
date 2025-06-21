package services

import (
	"amobagan/lib"
	"amobagan/models"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetUserByID(userID string) (*models.User, error) {
	collection := lib.DB.Database("amobagan").Collection("users")
	
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return nil, err
	}
	
	filter := bson.M{"_id": objectID}
	
	var user models.User
	err = collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		return nil, err
	}

	userData := models.User{
		HealthGoals: user.HealthGoals,
		DietaryPreferences: user.DietaryPreferences,
		NutritionPriorities: user.NutritionPriorities,
		FullName: user.FullName,
		PhoneNo: user.PhoneNo,
		HealthStatus: user.HealthStatus,
		WorkOutsPerWeek: user.WorkOutsPerWeek,
		Age: user.Age,
		Height: user.Height,
		Weight: user.Weight,
	}

	log.Println("User Data:", userData)

	return &userData, nil
}