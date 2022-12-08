package usersdto

type UpdateUser struct {
	Fullname string `json:"fullname" form:"fullname"`
	Email    string `json:"email" form:"email"`
	Password string `json:"password" form:"password"`
	Image    string `json:"image" form:"image"`
}
