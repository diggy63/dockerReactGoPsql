package main

import (
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Project struct {
	ID          int    `json:"id" db:"id"`
	Title       string `json:"title" db:"title"`
	Description string `json:"description" db:"description"`
	Link        string `json:"link" db:"link"`
}

type Contact struct {
	Name    string `json:"name" db:"name"`
	Email   string `json:"email" db:"email"`
	Message string `json:"message" db:"message"`
}

func main() {
	// Connect to PostgreSQL
	db, err := sqlx.Connect("postgres", "host=db port=5432 user=postgres password=postgres dbname=portfolio sslmode=disable")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Initialize Gin router
	r := gin.Default()

	// Enable CORS for React frontend
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	})

	// API Endpoints
	r.GET("/api/projects", func(c *gin.Context) {
		var projects []Project
		err := db.Select(&projects, "SELECT id, title, description, link FROM projects")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, projects)
	})

	r.POST("/api/contact", func(c *gin.Context) {
		var contact Contact
		if err := c.ShouldBindJSON(&contact); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		_, err := db.Exec("INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
			contact.Name, contact.Email, contact.Message)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"message": "Contact saved"})
	})

	// Start server
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}