package productdto

type ProductRespone struct {
	ID    int    `json:"id"`
	Title string `json:"title" form:"title"`
	Price int    `json:"price" form:"price" gorm:"type: int"`
	Image string `json:"image" form:"image"`
}

type DeleteResponse struct {
	ID int `json:"id"`
}
