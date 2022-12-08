package usersdto

type UserResponse struct {
	ID       int    `json:"id"`
	Fullname string `json:"fullname" form:"fullname"`
	Email    string `json:"email" form:"email"`
	Image    string `json:"image" form:"image"`
}

type DeleteResponse struct {
	ID int `json:"id"`
}