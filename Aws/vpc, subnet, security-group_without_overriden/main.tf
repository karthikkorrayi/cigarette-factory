resource "aws_vpc" "demo" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "demo-vpc-${var.unique_suffix}"
  }
}

resource "aws_subnet" "demo" {
  vpc_id     = aws_vpc.demo.id
  cidr_block = "10.0.1.0/24"
  tags = {
    Name = "demo-subnet-${var.unique_suffix}"
  }
}

resource "aws_security_group" "demo" {
  vpc_id = aws_vpc.demo.id
  name   = "demo-sg-${var.unique_suffix}"
  tags = {
    Name = "demo-sg-${var.unique_suffix}"
  }
}
