# variable "aws_access_key" {}

# variable "aws_secret_key" {}

variable "region" {
    default = "ap-south-1"
  
}

variable "vpc_cidr" {
    default = "10.0.0.0/16"
  
}

variable "subnet_cidr" {
    default = "10.0.1.0/24"
  
}

variable "vpc_name" {
    default = "main-vpc"
}

variable "subnet_name" {
    default = "main-subnet"
}

variable "security_group_name" {
    default = "allow_ssh_sg"
}

variable "Environment" {
    default = "development"
}
variable "CreatedBy" {
    default = "terraform"
}
variable "Department" {
    default = "ADM"
}