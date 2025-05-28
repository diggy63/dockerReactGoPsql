Portfolio Application

A portfolio app with a React frontend, Go backend, PostgreSQL database, and Dockerized for easy deployment.

Prerequisites





Docker and Docker Compose installed.



A home server with ports 3000 (frontend) and 8080 (backend) open.

Setup





Clone the Project:

git clone <your-repo-url>
cd portfolio



Directory Structure:

portfolio/
├── frontend/
│   ├── index.html
│   └── Dockerfile
├── backend/
│   ├── main.go
│   └── Dockerfile
├── docker-compose.yml
└── README.md



Initialize Go Modules (in backend/):

cd backend
go mod init portfolio
go get github.com/gin-gonic/gin github.com/jmoiron/sqlx github.com/lib/pq
cd ..



Set Up PostgreSQL:





Update docker-compose.yml with a secure POSTGRES_PASSWORD.



Run the SQL commands to create the database and tables:

CREATE DATABASE portfolio;
\c portfolio
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255)
);
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL
);
INSERT INTO projects (title, description, link) VALUES
('Project 1', 'A cool project', 'https://example.com'),
('Project 2', 'Another cool project', 'https://example.com');



Run the Application:

docker-compose up --build



Access the App:





Frontend: http://localhost:3000



Backend API: http://localhost:8080/api/projects

Notes





The frontend uses Tailwind CSS via CDN for simplicity.



The backend includes CORS to allow requests from http://localhost:3000.



Replace yourpassword in docker-compose.yml with a secure password.



To work on different machines, clone the repo and run docker-compose up.

Stopping the App

docker-compose down