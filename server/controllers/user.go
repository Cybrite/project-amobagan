package controllers

import (
	"amobagan/lib"
	"amobagan/models"
	"amobagan/utils"
	"context"
	"errors"
	"log"
	"unicode"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserController struct{}

type LoginRequest struct {
	PhoneNo  string `json:"phoneNo" binding:"required,min=10,max=10"`
	Password string `json:"password" binding:"required"`
}

func NewUserController() *UserController {
	return &UserController{}
}

func validateUser(user models.User) error {
	if user.FullName == "" {
		return errors.New("full name is required")
	}
	if user.PhoneNo == "" {
		return errors.New("phone number is required")
	}

	// Check if phone number contains only digits
	for _, char := range user.PhoneNo {
		if !unicode.IsDigit(char) {
			return errors.New("phone number must contain only digits")
		}
	}

	if user.Password == "" {
		return errors.New("password is required")
	}
	if user.Role == "" {
		return errors.New("role is required")
	}
	if user.Role != "admin" && user.Role != "vendor" && user.Role != "user" {
		return errors.New("invalid role")
	}
	return nil
}

func (u *UserController) CreateUser(c *gin.Context) {
	var user models.User
	
	if err := c.ShouldBindJSON(&user); err != nil {
		utils.BadRequest(c, err.Error(), nil)
		return
	}

	if err := validateUser(user); err != nil {
		utils.BadRequest(c, err.Error(), nil)
		return
	}
	collection := lib.DB.Database("amobagan").Collection("users")
	filter := bson.M{"phoneNo": user.PhoneNo}

	
	existingUser := collection.FindOne(context.Background(), filter)
	log.Println(existingUser)
	
	if existingUser.Err() == nil {
		utils.BadRequest(c, "User already exists", nil)
		return
	}
	
	if existingUser.Err() != mongo.ErrNoDocuments {
		utils.InternalServerError(c, existingUser.Err().Error(), nil)
		return
	}
	

	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		utils.InternalServerError(c, err.Error(), nil)
		return
	}

	user.Password = hashedPassword


	result, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		utils.InternalServerError(c, err.Error(), nil)
		return
	}

	// Set the user ID from the database insertion result
	user.ID = result.InsertedID.(primitive.ObjectID)

	token, err := utils.GenerateJWT(user)
	if err != nil {
		utils.InternalServerError(c, err.Error(), nil)
		return
	}

	userData := map[string]interface{}{
		"_id": result.InsertedID.(primitive.ObjectID).Hex(),
		"token": token,
		"fullName": user.FullName,
		"phoneNo": user.PhoneNo,
		"petraWalletAddress": user.PetraWalletAddress,
		"petraPublicKey": user.PetraPublicKey,
		"healthStatus": user.HealthStatus,
		"role": user.Role,
	}

	utils.OK(c, "User created successfully", userData)
}

func (u *UserController) LoginUser(c *gin.Context) {
	var loginReq LoginRequest
	if err := c.ShouldBindJSON(&loginReq); err != nil {
		utils.BadRequest(c, err.Error(), nil)
		return
	}

	collection := lib.DB.Database("amobagan").Collection("users")
	filter := bson.M{"phoneNo": loginReq.PhoneNo}
	existingUser := collection.FindOne(context.Background(), filter)
	if existingUser.Err() != nil {
		if existingUser.Err() == mongo.ErrNoDocuments {
			utils.BadRequest(c, "User not found", nil)
			return
		}
		utils.InternalServerError(c, existingUser.Err().Error(), nil)
		return
	}

	var user models.User
	if err := existingUser.Decode(&user); err != nil {
		utils.InternalServerError(c, err.Error(), nil)
		return
	}

	valid := utils.CheckPasswordHash(loginReq.Password, user.Password)
	if !valid {
		utils.BadRequest(c, "Invalid password", nil)
		return
	}

	log.Println(user)

	token, err := utils.GenerateJWT(user)
	if err != nil {
		utils.InternalServerError(c, err.Error(), nil)
		return
	}

	userData := map[string]interface{}{
		"_id": user.ID,
		"token": token,
		"fullName": user.FullName,
		"phoneNo": user.PhoneNo,
		"petraWalletAddress": user.PetraWalletAddress,
		"petraPublicKey": user.PetraPublicKey,
		"healthStatus": user.HealthStatus,
		"role": user.Role,
	}

	utils.OK(c, "User logged in successfully", userData)
}