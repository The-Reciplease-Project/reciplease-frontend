# ECS-Optimized Amazon Linux 2023 AMI (x86_64)
data "aws_ssm_parameter" "ecs_al2023_amd64" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2023/recommended/image_id"
}

# IAM instance profile for ECS instances
data "aws_iam_instance_profile" "ecs" {
  name = var.instance_profile_name # usually "ecsInstanceRole"
}
