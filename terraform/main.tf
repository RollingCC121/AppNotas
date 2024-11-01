provider "aws" {
  region = "us-east-1"
}

resource "aws_ecs_cluster" "fastapi_cluster" {
  name = "fastapi-cluster"
}

resource "aws_ecs_task_definition" "fastapi_task" {
  family                   = "fastapi-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "api"
      image     = "your_dockerhub_user/fastapi:latest"
      essential = true
      portMappings = [
        {
          containerPort = 8001
          hostPort      = 8001
        }
      ]
      environment = [
        {
          name  = "DATABASE_URL"
          value = "postgresql://postgres:password@db:5432/postgres"
        }
      ]
    },
    {
      name      = "db"
      image     = "postgres:13"
      essential = true
      portMappings = [
        {
          containerPort = 5432
          hostPort      = 5432
        }
      ]
      environment = [
        {
          name  = "POSTGRES_USER"
          value = "postgres"
        },
        {
          name  = "POSTGRES_PASSWORD"
          value = "password"
        }
      ]
    }
  ])
}
