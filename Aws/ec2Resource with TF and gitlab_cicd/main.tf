resource "aws_vpc" "main" {
    cidr_block = var.vpc_cidr

    tags = {
    Name        = var.vpc_name
    Environment = var.Environment
    Department  = var.Department
    CreatedBy   = var.CreatedBy
  }
  
}

resource "aws_subnet" "main" {
    vpc_id = aws_vpc.main.id
    cidr_block = var.subnet_cidr
    availability_zone = "ap-south-1a"
    tags = {
    Name        = var.subnet_name
    Environment = var.Environment
    Department  = var.Department
    CreatedBy   = var.CreatedBy
  }
}

resource "aws_security_group" "allow_ssh" {
    vpc_id = aws_vpc.main.id

    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]

    }

    tags = {
    Name        = var.security_group_name
    Environment = var.Environment
    Department  = var.Department
    CreatedBy   = var.CreatedBy
  }
  

}
