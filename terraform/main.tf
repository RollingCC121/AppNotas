provider "aws" {
  region = "us-west-2"  # Cambia a tu región preferida
}

# Definir VPC y Subredes
resource "aws_vpc" "app_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "app_subnet" {
  vpc_id            = aws_vpc.app_vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-west-2a"
}

# Crear un Security Group para PostgreSQL
resource "aws_security_group" "postgres_sg" {
  vpc_id = aws_vpc.app_vpc.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Crear un Security Group para FastAPI
resource "aws_security_group" "fastapi_sg" {
  vpc_id = aws_vpc.app_vpc.id

  ingress {
    from_port   = 8001
    to_port     = 8001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Crear un Security Group para React Frontend
resource "aws_security_group" "frontend_sg" {
  vpc_id = aws_vpc.app_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Instancia de PostgreSQL
resource "aws_instance" "postgres_db" {
  ami           = "ami-830c94e3"  # ID de AMI proporcionado para Ubuntu Server
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.app_subnet.id
  vpc_security_group_ids = [aws_security_group.postgres_sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "postgres-db"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y git docker.io
              systemctl start docker
              systemctl enable docker
              # Clonar el repositorio
              git clone https://github.com/tu-usuario/appnotas.git /home/ubuntu/appnotas
              cd /home/ubuntu/appnotas/bd
              # Construir y ejecutar el contenedor Docker
              docker build -t postgres-db .
              docker run -d -p 5432:5432 postgres-db
              EOF
}

# API (FastAPI)
resource "aws_instance" "fastapi_api" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.app_subnet.id
  vpc_security_group_ids = [aws_security_group.fastapi_sg.id]
   associate_public_ip_address = true

  tags = {
    Name = "fastapi-api"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y git docker.io
              systemctl start docker
              systemctl enable docker
              # Clonar el repositorio
              git clone https://github.com/tu-usuario/appnotas.git /home/ubuntu/appnotas
              cd /home/ubuntu/appnotas/api
              # Construir y ejecutar el contenedor Docker
              docker build -t api-app .
              docker run -d -p 8000:8000 api-app
              EOF
}

# Frontend (React)
resource "aws_instance" "react_frontend" {
  ami           = "ami-830c94e3"  # Actualiza este ID de AMI con uno válido para Ubuntu Server
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.app_subnet.id
  vpc_security_group_ids = [aws_security_group.frontend_sg.id]
  associate_public_ip_address = true

  tags = {
    Name = "Frontend-React"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y git docker.io
              systemctl start docker
              systemctl enable docker
              # Clonar el repositorio
              git clone https://github.com/tu-usuario/appnotas.git /home/ubuntu/appnotas
              cd /home/ubuntu/appnotas/frontend
              # Construir y ejecutar el contenedor Docker
              docker build -t frontend-app .
              docker run -d -p 80:80 frontend-app
              EOF
}

output "postgres_db_ip" {
  value = aws_instance.postgres_db.public_ip
}

output "fastapi_api_ip" {
  value = aws_instance.fastapi_api.public_ip
}

output "frontend_instance_ip" {
  value = aws_instance.react_frontend.public_ip
}
