package models

import "time"

type Transaction struct {
	ID       int          `json:"id"`
	Name     string       `json:"name" form:"name" gorm:"type: varchar(50)"`
	Phone    string       `json:"phone" form:"phone" gorm:"type: varchar(50)"`
	Address  string       `json:"address" form:"address" gorm:"type : text"`
	Total    int          `json:"total" form:"total" gorm:"type : int"`
	Status   string       `json:"status" gorm:"type: varchar(50)"`
	Order    []Order      `json:"order"`
	UserID   int          `json:"user_id" gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	User     UserResponse `json:"user"`
	CreateAt time.Time    `json:"-"`
	UpdateAt time.Time    `json:"-"`
}
