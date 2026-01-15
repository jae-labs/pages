# Docker

## Introduction

This cheat sheet provides a quick reference for some common Docker commands and concepts. Docker is a platform for developing, shipping, and running applications in containers.

## Installation

To use Docker, you need to install it on your system. Installation methods may vary depending on your operating system. Refer to the [official Docker documentation](https://docs.docker.com/get-docker/) for installation instructions.

## Docker Concepts

### Images

- Pull an image from Docker Hub:
  ```shell
  docker pull image_name:tag
  ```

- List all locally available images:
  ```shell
  docker images
  ```

- Remove an image:
  ```shell
  docker rmi image_name:tag
  ```

### Containers

- Create and start a container from an image:
  ```shell
  docker run -d --name my_container image_name:tag
  ```

- List all running containers:
  ```shell
  docker ps
  ```

- List all containers (including stopped ones):
  ```shell
  docker ps -a
  ```

- Stop a running container:
  ```shell
  docker stop container_id
  ```

- Remove a container (must be stopped):
  ```shell
  docker rm container_id
  ```

### Volumes

- Create a Docker volume:
  ```shell
  docker volume create my_volume
  ```

- List Docker volumes:
  ```shell
  docker volume ls
  ```

- Remove a Docker volume:
  ```shell
  docker volume rm my_volume
  ```

### Networking

- List Docker networks:
  ```shell
  docker network ls
  ```

- Create a custom Docker network:
  ```shell
  docker network create my_network
  ```

## Docker Compose

[Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running multi-container Docker applications. It uses a YAML file to configure application services and environments.

### Docker Compose Commands

- Start containers defined in a Compose file:
  ```shell
  docker-compose up -d
  ```

- Stop containers defined in a Compose file:
  ```shell
  docker-compose down
  ```

- List running Compose services:
  ```shell
  docker-compose ps
  ```

- View logs for services:
  ```shell
  docker-compose logs
  ```

## Dockerfile

[Dockerfile](https://docs.docker.com/engine/reference/builder/) is a script that contains instructions for building a Docker image.

### Building Images with Dockerfile

- Build an image from a Dockerfile in the current directory:
  ```shell
  docker build -t my_image:tag .
  ```

- Build an image from a Dockerfile in a specific directory:
  ```shell
  docker build -t my_image:tag /path/to/dockerfile/dir
  ```

## Conclusion

This cheat sheet covers some basic Docker commands and concepts. Docker offers a wide range of features and functionality; refer to the [Docker documentation](https://docs.docker.com/) for more in-depth information and advanced usage.
