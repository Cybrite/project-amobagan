FROM golang:1.24-alpine

RUN go install github.com/air-verse/air@latest

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

RUN mkdir -p tmp

EXPOSE 8080

CMD ["air"] 