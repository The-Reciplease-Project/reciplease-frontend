variable "vpc_id" {
  type    = string
  default = "vpc-011275c7c59c803cb"
}

variable "public_subnet_ids" {
  type    = list(string)
  default = ["subnet-07a5bcc42d1d86e02", "subnet-0a4da49fee5e14c0a"]
}

variable "security_group_id" {
  type    = string
  default = "sg-0cfb7584afb11650b"
}

variable "key_name" {
  type    = string
  default = "blazor-demo-key"
}

variable "instance_type" {
  type    = string
  default = "t2.small"
}

variable "asg_desired" {
  type    = number
  default = 1
}

variable "asg_min" {
  type    = number
  default = 1
}

variable "asg_max" {
  type    = number
  default = 1
}

variable "instance_profile_name" {
  type    = string
  default = "ecsInstanceRole"
}

variable "cp_name" {
  type    = string
  default = "reciplease-cp-ec2"
}

variable "ecs_cluster_name" {
  type    = string
  default = "reciplease-cluster"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}
