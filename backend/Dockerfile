FROM golang:1.21

WORKDIR /app
COPY . .
RUN go mod init portfolio
RUN go get github.com/gin-gonic/gin github.com/jmoiron/sqlx github.com/lib/pq
RUN go build -o main .
CMD ["./main"]