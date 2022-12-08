package repositories

import (
	"server/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	FindTransaction() ([]models.Transaction, error)
	DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	GetOrderByID(userID int) (models.Transaction, error)
	FindTransactionID() (models.Transaction, error)
	GetTransID(ID int) (models.Transaction, error)
	GetTransactionByUser(ID int) ([]models.Transaction, error)
	UpdateAdmin(transaction models.Transaction) (models.Transaction, error)
	GetTransactionAdmin(ID int) (models.Transaction, error)
	GetTransAdmin(ID string) (models.Transaction, error)
	UpdateTrans(status string, ID int) error
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Preload("User").Create(&transaction).Error
	return transaction, err
}

func (r *repository) GetTransaction(userID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Order").Preload("User").Where("user_id = ?", userID).First(&transaction).Error
	return transaction, err
}

func (r *repository) FindTransaction() ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Not("status = ?", "waiting").Find(&transaction).Error
	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error
	return transaction, err
}

func (r *repository) GetOrderByID(userID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Where("user_id = ?", userID).Find(&transaction).Error
	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error
	return transaction, err
}

func (r *repository) FindTransactionID() (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Find(&transaction, "status = ?", "waiting").Error

	return transaction, err
}

func (r *repository) GetTransID(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Find(&transaction, "status = ? AND user_id = ?", "waiting", ID).Error
	return transaction, err
}

func (r *repository) GetTransactionByUser(ID int) ([]models.Transaction, error) {
	var transaction []models.Transaction
	err := r.db.Preload("User").Preload("Order").Preload("Order.Product").Preload("Order.Topping").Not("status=?", "waiting").Where("user_id =?", ID).Find(&transaction).Error
	return transaction, err
}

func (r *repository) UpdateAdmin(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error
	return transaction, err
}

func (r *repository) GetTransactionAdmin(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.First(&transaction, ID).Error
	return transaction, err
}

func (r *repository) UpdateTrans(status string, ID int) error {
	var transaction models.Transaction
	r.db.Preload("Order.Product").First(&transaction, ID)
	transaction.Status = status
	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) GetTransAdmin(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.First(&transaction, ID).Error
	return transaction, err
}
