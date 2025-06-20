package controllers

import (
	"amobagan/lib"
	"amobagan/utils"

	"github.com/gin-gonic/gin"
)


type ProductController struct {
}



func NewProductController() *ProductController {
	return &ProductController{}
}


func (h *ProductController) GetProductDetailsByBarcode(c *gin.Context) {
	barcode := c.Param("barcode")
	if barcode == "" {
		utils.BadRequest(c, "Barcode is required", nil)
		return
	}
	product, err := lib.RetrieveProductDetailsByBarcode(barcode)
	
	if err != nil {
		utils.NotFound(c, "Product not found")
		return
	}
	
	utils.OK(c, "Product details retrieved successfully", product)
}



