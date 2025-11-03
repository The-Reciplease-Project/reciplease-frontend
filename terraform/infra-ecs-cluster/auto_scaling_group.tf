############################
# Auto Scaling Group (ASG) #
############################
resource "aws_autoscaling_group" "ecs_asg" {
  name                = "${var.ecs_cluster_name}-asg"
  min_size            = var.asg_min
  max_size            = var.asg_max
  desired_capacity    = var.asg_desired
  health_check_type   = "EC2"
  vpc_zone_identifier = var.public_subnet_ids
  capacity_rebalance  = false

  # Use your Launch Template
  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  # Give instances a friendly name
  tag {
    key                 = "Name"
    value               = "${var.ecs_cluster_name}-ec2"
    propagate_at_launch = true
  }

  lifecycle {
    create_before_destroy = true
  }

  # Ensure the cluster exists before instances boot (ecs.config refers to it)
  depends_on = [aws_ecs_cluster.reciplease_cluster]
}
