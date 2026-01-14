# netcat

## Introduction

This cheat sheet provides a quick reference for some common `netcat` (nc) commands and concepts. `netcat` is a versatile networking utility for reading from and writing to network connections using TCP or UDP protocols.

## `netcat` Concepts

### Basic Usage

`netcat` can be used to establish network connections, listen on ports, and transfer data.

- Connect to a remote host and port:
  ```shell
  nc hostname port
  ```

- Listen on a specific port for incoming connections:
  ```shell
  nc -l -p port
  ```

### Data Transfer

You can use `netcat` to send and receive data over network connections.

- Send a file to a remote host:
  ```shell
  nc -q 1 hostname port < file.txt
  ```

- Receive data from a remote host and save it to a file:
  ```shell
  nc -l -p port > received_data.txt
  ```

### Port Scanning

`netcat` can be used for port scanning to check if specific ports are open on a remote host.

- Perform a basic port scan on a range of ports:
  ```shell
  nc -zv hostname 1-100
  ```

### Remote Shell

You can use `netcat` to create a simple remote shell.

- On the listening host, start a shell on a specific port:
  ```shell
  nc -l -p port -e /bin/bash
  ```

- On the remote host, connect to the shell:
  ```shell
  nc hostname port
  ```

### Chat Mode

`netcat` can be used for simple chat or communication between two hosts.

- Host A listens on a specific port:
  ```shell
  nc -l -p port
  ```

- Host B connects to Host A for chat:
  ```shell
  nc HostA_IP port
  ```

## `netcat` Command-Line

- Connect to a remote host and port:
  ```shell
  nc hostname port
  ```

- Listen on a specific port for incoming connections:
  ```shell
  nc -l -p port
  ```

- Send a file to a remote host:
  ```shell
  nc -q 1 hostname port < file.txt
  ```

- Receive data from a remote host and save it to a file:
  ```shell
  nc -l -p port > received_data.txt
  ```

- Perform a basic port scan on a range of ports:
  ```shell
  nc -zv hostname 1-100
  ```

- Start a shell on a specific port for remote access:
  ```shell
  nc -l -p port -e /bin/bash
  ```

- Connect to a remote shell:
  ```shell
  nc hostname port
  ```

- Start a chat session:
  ```shell
  nc -l -p port
  ```

- Join a chat session:
  ```shell
  nc HostA_IP port
  ```

## Conclusion

This cheat sheet covers some common `netcat` (nc) commands and concepts. `netcat` is a powerful networking utility that can be used for various tasks such as data transfer, port scanning, remote shells, and more, making it a valuable tool for network administrators and security professionals; refer to the [official `netcat` documentation](https://manpages.ubuntu.com/manpages/hirsute/man1/nc.1.html) for more in-depth information and advanced usage.
