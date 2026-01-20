# ssh

## Introduction

This cheat sheet provides a quick reference for some common `ssh` (Secure Shell) commands and concepts. `ssh` is a secure protocol used for remote login and secure file transfer.

## `ssh` Concepts

### Basic `ssh` Usage

`ssh` is used for secure remote access to servers and network devices.

- Connect to a remote server:
  ```shell
  ssh username@remote-host
  ```

- Connect to a remote server on a specific port:
  ```shell
  ssh -p port username@remote-host
  ```

- Securely copy files to a remote server:
  ```shell
  scp local-file username@remote-host:/path/to/remote-directory
  ```

- Securely copy files from a remote server to the local machine:
  ```shell
  scp username@remote-host:/path/to/remote-file local-directory
  ```

### SSH Keys

SSH keys provide passwordless authentication.

- Generate an SSH key pair:
  ```shell
  ssh-keygen -t rsa -b 4096
  ```

- Copy your SSH public key to a remote server:
  ```shell
  ssh-copy-id username@remote-host
  ```

### Port Forwarding

SSH can be used for port forwarding, allowing secure access to services on a remote server.

- Local port forwarding (forward local port to a remote server):
  ```shell
  ssh -L local-port:remote-host:remote-port username@remote-host
  ```

- Remote port forwarding (forward remote port to a local machine):
  ```shell
  ssh -R remote-port:local-host:local-port username@remote-host
  ```

### SSH Config

Use SSH config files for custom settings.

- Edit or create SSH config file:
  ```shell
  nano ~/.ssh/config
  ```

- Use SSH config file for connections:
  ```shell
  ssh custom-alias
  ```

## `ssh` Command-Line

- Connect to a remote server:
  ```shell
  ssh username@remote-host
  ```

- Connect to a remote server on a specific port:
  ```shell
  ssh -p port username@remote-host
  ```

- Securely copy files to a remote server:
  ```shell
  scp local-file username@remote-host:/path/to/remote-directory
  ```

- Securely copy files from a remote server to the local machine:
  ```shell
  scp username@remote-host:/path/to/remote-file local-directory
  ```

- Generate an SSH key pair:
  ```shell
  ssh-keygen -t rsa -b 4096
  ```

- Copy your SSH public key to a remote server:
  ```shell
  ssh-copy-id username@remote-host
  ```

- Local port forwarding (forward local port to a remote server):
  ```shell
  ssh -L local-port:remote-host:remote-port username@remote-host
  ```

- Remote port forwarding (forward remote port to a local machine):
  ```shell
  ssh -R remote-port:local-host:local-port username@remote-host
  ```

- Edit or create SSH config file:
  ```shell
  nano ~/.ssh/config
  ```

- Use SSH config file for connections:
  ```shell
  ssh custom-alias
  ```

## Conclusion

This cheat sheet covers some common `ssh` (Secure Shell) commands and concepts. `ssh` is a versatile tool for secure remote access and file transfer, making it essential for system administrators and network operations; refer to the [OpenSSH documentation](https://www.openssh.com/manual.html) for more in-depth information and advanced usage.
