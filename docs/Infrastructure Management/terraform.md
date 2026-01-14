# Terraform

## Introduction

This cheat sheet provides a quick reference for some common Terraform commands and concepts. Terraform is an open-source infrastructure as code (IAC) tool used to define, provision, and manage infrastructure resources.

## Installation

To use Terraform, you need to install it on your system. Installation methods vary depending on your operating system. Refer to the [official Terraform documentation](https://www.terraform.io/docs/cli/install/index.html) for installation instructions.

## Terraform Concepts

### Configuration Files

Terraform uses configuration files written in HashiCorp Configuration Language (HCL) to define and manage infrastructure.

- Create a basic Terraform configuration file (e.g., `main.tf`):
  ```hcl
  provider "aws" {
    region = "us-east-1"
  }

  resource "aws_instance" "example" {
    ami           = "ami-0c55b159cbfafe1f0"
    instance_type = "t2.micro"
  }
  ```

- Use variables, outputs, and modules in configuration files for more advanced infrastructure definitions.

### Providers

Providers define the target cloud or infrastructure platform where resources will be created. Terraform supports providers for various cloud providers, including AWS, Azure, and Google Cloud.

- Declare a provider block in the configuration file:
  ```hcl
  provider "aws" {
    region = "us-west-2"
  }
  ```

### Resources

Resources represent the infrastructure components you want to create, such as virtual machines, databases, and networks.

- Define a resource block in the configuration file:
  ```hcl
  resource "aws_instance" "example" {
    ami           = "ami-0c55b159cbfafe1f0"
    instance_type = "t2.micro"
  }
  ```

### Variables

Variables allow you to parameterize your Terraform configuration, making it reusable and easier to manage.

- Declare a variable block in the configuration file:
  ```hcl
  variable "instance_count" {
    type    = number
    default = 1
  }
  ```

### Outputs

Outputs allow you to define values that should be displayed after Terraform applies the configuration.

- Declare an output block in the configuration file:
  ```hcl
  output "instance_ip" {
    value = aws_instance.example[*].public_ip
  }
  ```

### State

Terraform maintains a state file (by default, `terraform.tfstate`) that tracks the actual infrastructure state. It's essential for Terraform to understand the current state and make necessary changes.

### Terraform Command-Line

- Initialize a Terraform configuration:
  ```shell
  terraform init
  ```

- Validate the Terraform configuration:
  ```shell
  terraform validate
  ```

- Create or update infrastructure resources:
  ```shell
  terraform apply
  ```

- Plan and preview changes:
  ```shell
  terraform plan
  ```

- Destroy resources:
  ```shell
  terraform destroy
  ```

- Show Terraform state:
  ```shell
  terraform show
  ```

## Conclusion

This cheat sheet covers some common Terraform commands and concepts. Terraform simplifies the management of infrastructure as code, enabling you to provision and manage resources efficiently; refer to the [official Terraform documentation](https://www.terraform.io/docs/index.html) for more in-depth information and advanced usage.
