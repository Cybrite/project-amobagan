package utils

import (
	"amobagan/config"
	"amobagan/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var cfg = config.LoadConfig()
func GenerateJWT(user models.User) (string, error) {
	claims := jwt.MapClaims{
		"userId": user.ID.Hex(),
		"fullName": user.FullName,
		"phoneNo": user.PhoneNo,
		"petraWalletAddress": user.PetraWalletAddress,
		"petraPublicKey": user.PetraPublicKey,
		"role": user.Role,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(cfg.JWT_SECRET))
}

func VerifyJWT(token string) (jwt.MapClaims, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(cfg.JWT_SECRET), nil
	})
	if err != nil {
		return nil, err
	}
	return claims, nil
}

func GetUserIDFromToken(token string) (string, error) {
	claims, err := VerifyJWT(token)
	if err != nil {
		return "", err
	}
	
	userID, ok := claims["userId"].(string)
	if !ok {
		return "", jwt.ErrSignatureInvalid
	}
	
	return userID, nil
}
