package productdto

type CreateProduct struct {
	Title string `json:"title" form:"title" validate:"required"`
	Price int    `json:"price" form:"price" validate:"required"`
	Image string `json:"image" form:"image"`
	Qty   int    `json:"qty" form:"qty"`
}

type UpdateProduct struct {
	Title string `json:"title" form:"title"`
	Price int    `json:"price" form:"price"`
	Image string `json:"image" form:"image"`
	Qty   int    `json:"qty" form:"qty"`
}
