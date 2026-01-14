# Consul

## Introduction

This cheat sheet provides a quick reference for some common HashiCorp Consul commands and concepts. HashiCorp Consul is an open-source service mesh and service discovery tool for orchestrating and managing microservices.

## Installation

To use HashiCorp Consul, you need to install and configure it on your system or use the cloud-managed version offered by HashiCorp. Refer to the [official Consul documentation](https://learn.hashicorp.com/tutorials/consul/get-started-install) for installation instructions.

## Consul Concepts

### Service Discovery

Consul provides service discovery capabilities, allowing services to find and communicate with each other dynamically.

- Register a service with Consul:
  ```shell
  consul agent -dev -node=server-1 -bind=127.0.0.1 -service=web -address=192.168.1.100 -port=80
  ```

- Discover services using DNS or HTTP API.

### Key-Value Store

Consul includes a distributed key-value store for storing configuration data and other key-value pairs.

- Store a key-value pair in Consul:
  ```shell
  consul kv put path/to/key value
  ```

- Retrieve a value from the key-value store:
  ```shell
  consul kv get path/to/key
  ```

### Health Checks

Consul performs health checks on registered services to ensure they are running correctly.

- Register a health check for a service:
  ```shell
  consul agent -dev -service=web -check=HTTP://localhost:80/health
  ```

- Configure various types of health checks.

### Consul CLI

Consul provides a command-line interface (CLI) for interacting with the Consul cluster.

- Join a Consul agent to a cluster:
  ```shell
  consul agent -dev -join=consul-server
  ```

- List registered services:
  ```shell
  consul catalog services
  ```

### Service Mesh

Consul can be used as a service mesh to handle service-to-service communication, traffic management, and security features.

- Set up service mesh intentions and routing configurations.

### Consul UI

Consul includes a web-based user interface (UI) for monitoring and managing the Consul cluster.

- Access the Consul UI at `http://localhost:8500` (default port).

### ACLs (Access Control Lists)

Consul supports ACLs to control access to Consul's features and resources.

- Configure ACLs to restrict access to specific operations.

## Consul Command-Line

- Start a Consul agent in development mode:
  ```shell
  consul agent -dev
  ```

- Start a Consul server in production mode:
  ```shell
  consul agent -server -bootstrap-expect=1 -data-dir=/tmp/consul
  ```

- Join an existing Consul cluster:
  ```shell
  consul join <address>
  ```

- View the status of the Consul agent:
  ```shell
  consul members
  ```

- Register a service with health checks:
  ```shell
  consul services register service.json
  ```

## Conclusion

This cheat sheet covers some common HashiCorp Consul commands and concepts. Consul is a versatile tool for service discovery, key-value storage, and service mesh functionality; refer to the [official Consul documentation](https://learn.hashicorp.com/collections/consul) for more in-depth information and advanced usage.
