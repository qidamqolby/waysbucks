package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	AddOrder(order models.Order) (models.Order, error)
	GetOrder(ID int) (models.Order, error)
	FindOrders() ([]models.Order, error)
	DeleteOrder(order models.Order) (models.Order, error)
	UpdateOrder(order models.Order) (models.Order, error)
	GetTransactionID(ID int) (models.Transaction, error)
	GetProductOrder(ID int) (models.Product, error)
	GetToppingOrder(ID []int) ([]models.Topping, error)
	GetOrdersByID(TransactionID int) ([]models.Order, error)
	GetUserID(ID int) (models.User, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) AddOrder(order models.Order) (models.Order, error) {
	err := r.db.Create(&order).Error
	return order, err
}

func (r *repository) GetOrder(ID int) (models.Order, error) {
	var order models.Order
	err := r.db.Preload("Product").Preload("Topping").First(&order, ID).Error
	return order, err
}

func (r *repository) FindOrders() ([]models.Order, error) {
	var orders []models.Order
	err := r.db.Preload("Product").Preload("Topping").Find(&orders).Error
	return orders, err
}

func (r *repository) DeleteOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Product").Preload("Topping").Delete(&order).Error
	return order, err
}

func (r *repository) UpdateOrder(order models.Order) (models.Order, error) {
	err := r.db.Preload("Product").Preload("Topping").Save(&order).Error
	return order, err
}

func (r *repository) GetTransactionID(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Find(&transaction, "status = ? AND user_id = ?", "waiting", ID).Error
	return transaction, err
}

func (r *repository) GetProductOrder(ID int) (models.Product, error) {
	var product models.Product
	err := r.db.First(&product, ID).Error
	return product, err
}

func (r *repository) GetToppingOrder(ID []int) ([]models.Topping, error) {
	var topping []models.Topping
	err := r.db.Find(&topping, ID).Error
	return topping, err
}

func (r *repository) GetOrdersByID(TransactionID int) ([]models.Order, error) {
	var order []models.Order
	err := r.db.Preload("Product").Preload("Topping").Find(&order, "transaction_id = ?", TransactionID).Error
	return order, err
}

func (r *repository) GetUserID(ID int) (models.User, error) {
	var user models.User
	err := r.db.First(&user, ID).Error

	return user, err
}
