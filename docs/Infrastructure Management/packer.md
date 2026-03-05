# Packer

## Introduction

This cheat sheet provides a quick reference for some common Packer commands and concepts. Packer is an open-source tool for automating the creation of machine images (e.g., Amazon Machine Images, VirtualBox images, Docker containers) for multiple platforms from a single configuration.

## Installation

To use Packer, you need to install it on your system. Installation methods vary depending on your operating system. Refer to the [official Packer documentation](https://www.packer.io/docs/install) for installation instructions.

## Packer Concepts

### Builders

Builders are responsible for creating machine images. Packer supports a variety of builders for different platforms, including AWS, Azure, VirtualBox, and more.

- Create a machine image with a builder:
  ```shell
  packer build template.json
  ```

### Templates

Packer configuration files, called templates, define what builders to use and how to create machine images.

- Create a basic Packer template:
  ```json
  {
    "builders": [
      {
        "type": "builder_name",
        "...": "..."
      }
    ]
  }
  ```

- Use variables and provisioners in templates for more advanced image creation.

### Variables

Variables in Packer templates allow you to parameterize your configuration.

- Declare and use variables in a template:
  ```json
  {
    "variables": {
      "variable_name": "default_value"
    },
    "builders": [
      {
        "type": "builder_name",
        "variable_name": "{{user `variable_name`}}"
      }
    ]
  }
  ```

- Define variable values at runtime using `-var` command-line flags.

### Provisioners

Provisioners in Packer templates enable you to install and configure software on the machine image.

- Use built-in provisioners like Shell, Ansible, or Chef to customize the image.

### Post-Processors

Post-processors allow you to transform the created machine image after the build process.

- Examples include compressing images, copying them to a different location, or pushing them to a cloud provider.

## Packer Command-Line

- Validate a Packer template:
  ```shell
  packer validate template.json
  ```

- Build a machine image using a Packer template:
  ```shell
  packer build template.json
  ```

- Inspect a machine image without building it:
  ```shell
  packer inspect template.json
  ```

- Create a custom variable file and pass it during the build process:
  ```shell
  packer build -var-file=my-vars.json template.json
  ```

## Conclusion

This cheat sheet covers some common Packer commands and concepts. Packer simplifies the process of creating machine images for different platforms; refer to the [official Packer documentation](https://www.packer.io/docs) for more in-depth information and advanced usage.
