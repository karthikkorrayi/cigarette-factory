output "vpc_id" {
  value = aws_vpc.demo.id
}

output "subnet_id" {
  value = aws_subnet.demo.id
}

output "security_group_id" {
  value = aws_security_group.demo.id
}
