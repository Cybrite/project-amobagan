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
	
	log.Printf("Looking for user with ID: %s", userID)
	
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		log.Printf("Error converting userID to ObjectID: %v", err)
		return nil, err
	}
	
	filter := bson.M{"_id": objectID}
	log.Printf("Database filter: %+v", filter)
	
	var user models.User
	err = collection.FindOne(context.Background(), filter).Decode(&user)
	if err != nil {
		log.Printf("Error finding user in database: %v", err)
		
		// If user doesn't exist, create a basic user profile
		if err.Error() == "mongo: no documents in result" {
			log.Printf("User not found, creating basic user profile")
			return createBasicUserProfile(userID, objectID)
		}
		
		return nil, err
	}

	log.Printf("Found user: %+v", user)

	userData := models.User{
		ID: user.ID,
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

	log.Println("Returning user data:", userData)

	return &userData, nil
}

// createBasicUserProfile creates a basic user profile with default values
func createBasicUserProfile(userID string, objectID primitive.ObjectID) (*models.User, error) {
	log.Printf("Creating basic user profile for ID: %s", userID)
	
	basicUser := models.User{
		ID: objectID,
		FullName: "User",
		PhoneNo: "",
		HealthStatus: "general_wellness",
		HealthGoals: []string{"general_wellness"},
		DietaryPreferences: []string{"no_restrictions"},
		NutritionPriorities: []string{"balanced"},
		WorkOutsPerWeek: "3-5",
		Age: "25",
		Height: "170",
		Weight: "70",
	}
	
	log.Printf("Created basic user profile: %+v", basicUser)
	
	return &basicUser, nil
}