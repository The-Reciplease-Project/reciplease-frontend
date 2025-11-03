resource "aws_launch_template" "ecs_lt" {
  name_prefix            = "reciplease-ecs-"
  image_id               = data.aws_ssm_parameter.ecs_al2023_amd64.value
  instance_type          = var.instance_type
  key_name               = var.key_name
  update_default_version = true

  iam_instance_profile {
    name = data.aws_iam_instance_profile.ecs.name
  }

  network_interfaces {
    device_index                = 0
    security_groups             = [var.security_group_id]
    associate_public_ip_address = true
  }

  metadata_options {
    http_endpoint = "enabled"
    http_tokens   = "required"
  }

  user_data = base64encode(<<-EOT
    #!/bin/bash
    cat > /etc/ecs/ecs.config <<'CFG'
ECS_CLUSTER=${var.ecs_cluster_name}
ECS_LOGLEVEL=info
CFG
  EOT
  )
}
