terraform {
  backend "s3" {
    bucket = "ishani-karthik-bucket"
    key = "karthik/vpc.tfstate"
    region = "ap-south-1"
    
  }
}