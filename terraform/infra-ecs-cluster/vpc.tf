# Step 1: Define our VPC
resource "aws_vpc" "main" {
    cidr_block  = var.vpc_cidr
    enable_dns_hostnames = true
    tags = {
        name = "main"
    }
}

# Step 2: Define our Subnets
resource "aws_subnet" "subnet1" {
    vpc_id = var.vpc_id
    cidr_block = cidrsubnet(var.vpc_cidr,8,1)
    map_public_ip_on_launch = true
    availability_zone = "us-east-1a"
}

resource "aws_subnet" "subnet2" {
    vpc_id = var.vpc_id
    cidr_block = cidrsubnet(var.vpc_cidr,8,2)
    map_public_ip_on_launch = true
    availability_zone = "us-east-1b"
}

# Step 3: Create an Internet Gateway (IGW)
resource "aws_internet_gateway" "internet_gateway" {
 vpc_id = aws_vpc.main.id
 tags = {
   Name = "internet_gateway"
 }
}

# Step 4: Define Route Tables
# Note: Route tables don't define ingress and engress rules (that is security groups)
# Note: Route tables say where packets go

