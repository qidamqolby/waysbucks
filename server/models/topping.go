package models

import "time"

type Topping struct {
	ID       int       `json:"id"`
	Title    string    `json:"title" form:"title" gorm:"type: varchar(50)"`
	Price    int       `json:"price" form:"price" gorm:"type: varchar(100)"`
	Image    string    `json:"image" form:"image" gorm:"type: varchar(100)"`
	Qty      int       `json:"qty" form:"qty"`
	CreateAt time.Time `json:"-"`
	UpdateAt time.Time `json:"-"`
}

type ToppingResponse struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Price int    `json:"price"`
	Image string `json:"image"`
	Qty   int    `json:"qty"`
}

type ToppingOrder struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

func (ToppingResponse) TableName() string {
	return "topping"
}
