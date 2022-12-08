package models

import "time"

type User struct {
	ID       int       `json:"id"`
	Fullname string    `json:"fullname" gorm:"type: varchar(50)"`
	Password string    `json:"-" gorm:"type: varchar(100)"`
	Email    string    `json:"email" gorm:"type: varchar(50)"`
	Image    string    `json:"image" gorm:"type: varchar(100)"`
	Role     string    `json:"role" gorm:"type: varchar(50)"`
	Address  string    `json:"address" gorm:"type: varchar(255)"`
	Phone    string    `json:"phone" gorm:"type: varchar(50)"`
	CreateAt time.Time `json:"-"`
	UpdateAt time.Time `json:"-"`
}

type UserResponse struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
}

func (UserResponse) TableName() string {
	return "users"
}
