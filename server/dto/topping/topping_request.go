package toppingdto

type CreateTopping struct {
	ID    int    `json:"id"`
	Title string `json:"title" validate:"required"`
	Price int    `json:"price" validate:"required"`
	Image string `json:"image"`
	Qty   int    `json:"qty" validate:"required"`
}

type UpdateTopping struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Price int    `json:"price"`
	Image string `json:"image"`
	Qty   int    `json:"qty"`
}
