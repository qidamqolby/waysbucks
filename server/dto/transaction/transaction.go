package transactiondto

type TransactionRequest struct {
	ID        int    `json:"id"`
	UserID    int    `json:"user_id"`
	ProductID int    `json:"product_id"`
	ToppingID []int  `json:"topping_id"`
	QTY       int    `json:"qty"`
	SubTotal  int    `json:"subtotal"`
	Status    string `jsom:"status"`
}

type TransactionResponse struct {
	ID      int      `json:"id"`
	Name    string   `json:"name" form:"name"`
	Email   string   `json:"email" form:"email"`
	Phone   string   `json:"phone" form:"phone"`
	Address string   `json:"address" form:"address"`
	UserID  int      `json:"user_id"`
	Order   []string `json:"order"`
	Status  string   `jsom:"status"`
	Total   int      `json:"total"`
}
