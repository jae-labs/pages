# Consul-Template

## Introduction

This cheat sheet provides a quick reference for some common HashiCorp Consul Template commands and concepts. Consul Template is a tool that dynamically generates configuration files based on data from HashiCorp Consul and other data sources.

## Installation

To use HashiCorp Consul Template, you need to install it on your system. Installation methods vary depending on your operating system. Refer to the [official Consul Template documentation](https://learn.hashicorp.com/tutorials/consul/configure-consul-template) for installation instructions.

## Consul Template Concepts

### Templates

Consul Template uses templates written in a format like Go's `text/template` to define how configuration files should be generated.

- Create a Consul Template:
  ```text
  # Example: Generate an Nginx configuration file
  {{ range service "web" }}
  server {{ .Address }}:{{ .Port }};
  {{ end }}
  ```

### Data Sources

Consul Template fetches data from data sources such as HashiCorp Consul and Vault.

- Define data sources in the configuration file:
  ```text
  datacenter = "dc1"
  source "consul" {
    address = "localhost:8500"
  }
  ```

### Reload Commands

Consul Template can execute commands or scripts when templates are updated.

- Define a command to execute when the template changes:
  ```text
  template {
    source      = "/path/to/template.tpl"
    destination = "/etc/nginx/nginx.conf"
    command     = "service nginx reload"
  }
  ```

### Watch Blocks

Watch blocks define the data to watch and the template to apply when data changes.

- Create a watch block to generate configuration:
  ```text
  {{ range service "web" }}
  server {{ .Address }}:{{ .Port }};
  {{ end }}
  ```

### Variables

Consul Template allows you to define and use variables in templates.

- Declare and use variables:
  ```text
  {{ $myVar := "Hello, World!" }}
  {{ .Address }}:{{ .Port }} {{ $myVar }}
  ```

## Consul Template Command-Line

- Generate configuration files based on templates:
  ```shell
  consul-template -config=config.hcl
  ```

- Run Consul Template as a daemonized service:
  ```shell
  consul-template -config=config.hcl -daemon
  ```

- Check the Consul Template version:
  ```shell
  consul-template -version
  ```

## Conclusion

This cheat sheet covers some common HashiCorp Consul Template commands and concepts. Consul Template is a versatile tool for generating dynamic configuration files based on data from Consul and other sources; refer to the [official Consul Template documentation](https://learn.hashicorp.com/tutorials/consul-template) for more in-depth information and advanced usage.
