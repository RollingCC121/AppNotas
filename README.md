# Proyecto de API y Frontend

Este proyecto incluye una API construida con FastAPI y un frontend construido con React. A continuación se explica cómo correr ambos servicios sin Docker y cómo desplegar el proyecto utilizando Docker.

# Guía para Ejecutar el proyecto con terraform

Este repositorio contiene la configuración de Terraform para crear tres máquinas virtuales en AWS: una para una base de datos PostgreSQL, otra para una API FastAPI y otra para un frontend React.

## Requisitos Previos

1. **AWS Account**: Necesitas tener una cuenta de AWS y permisos para crear recursos.
2. **Terraform**: Instala Terraform en tu máquina local. Puedes descargarlo desde [aquí](https://www.terraform.io/downloads.html).
3. **AWS CLI**: Instala la AWS Command Line Interface (CLI) y configura tus credenciales de acceso. Puedes seguir la guía de instalación de AWS CLI [aquí](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## inicio y final

1. **CONFIGURAMOS LAS CREDENCIALES**

```shell
aws configure
```

2. **EJECUTAMOS EL TERRAFORM**

```shell
terraform init
terraform plan
terraform apply
```
