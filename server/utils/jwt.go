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
		"userId": user.ID,
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

func VerifyJWT(token string) (string, error) {
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(cfg.JWT_SECRET), nil
	})
	if err != nil {
		return "", err
	}
	return claims["sub"].(string), nil
}
