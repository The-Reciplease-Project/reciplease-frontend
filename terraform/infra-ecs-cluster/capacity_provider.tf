######################
# Capacity Provider  #
######################
# Wrap the ASG in a Capacity Provider (managed scaling OFF for now)
resource "aws_ecs_capacity_provider" "ec2_cp" {
  name = var.cp_name

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs_asg.arn
    managed_termination_protection = "DISABLED"

    managed_scaling {
      status = "DISABLED"
    }
  }
}

# Attach the Capacity Provider to the ECS cluster
resource "aws_ecs_cluster_capacity_providers" "attach" {
  cluster_name       = aws_ecs_cluster.reciplease_cluster.name
  capacity_providers = [aws_ecs_capacity_provider.ec2_cp.name]

  default_capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.ec2_cp.name
    base              = 0
    weight            = 1
  }

  depends_on = [aws_ecs_capacity_provider.ec2_cp]
}
