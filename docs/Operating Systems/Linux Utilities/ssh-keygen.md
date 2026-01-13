# ssh-keygen

## Introduction

This cheat sheet provides a quick reference for some common `ssh-keygen` commands and concepts. `ssh-keygen` is a command-line tool used to generate and manage SSH keys for secure authentication.

## `ssh-keygen` Concepts

### Basic `ssh-keygen` Usage

`ssh-keygen` is used for creating and managing SSH key pairs.

- Generate a new SSH key pair (RSA):
  ```shell
  ssh-keygen -t rsa
  ```

- Generate an SSH key with a specific length:
  ```shell
  ssh-keygen -t rsa -b 4096
  ```

- Generate an SSH key pair with a custom file name:
  ```shell
  ssh-keygen -t rsa -f my-key
  ```

### Passphrases

Adding a passphrase to an SSH key provides an additional layer of security.

- Generate an SSH key with a passphrase:
  ```shell
  ssh-keygen -t rsa -b 4096 -f my-key -C "Key for secure access" -N "my-passphrase"
  ```

### Viewing and Managing Keys

`ssh-keygen` also allows you to view and manage existing keys.

- View the public key from a private key file:
  ```shell
  ssh-keygen -y -f private-key-file
  ```

- Add an SSH key to the SSH agent:
  ```shell
  ssh-add /path/to/ssh-key
  ```

- List keys stored in the SSH agent:
  ```shell
  ssh-add -l
  ```

- Remove a key from the SSH agent:
  ```shell
  ssh-add -d /path/to/ssh-key
  ```

### SSH Key Fingerprints

SSH key fingerprints are used to verify key authenticity.

- Display the fingerprint of an SSH public key:
  ```shell
  ssh-keygen -lf /path/to/public-key
  ```

### Converting Key Formats

`ssh-keygen` can convert keys between different formats.

- Convert an OpenSSH key to a different format (e.g., PKCS#8):
  ```shell
  ssh-keygen -p -m PKCS8 -f /path/to/openssh-key
  ```

## `ssh-keygen` Command-Line

- Generate a new SSH key pair (RSA):
  ```shell
  ssh-keygen -t rsa
  ```

- Generate an SSH key with a specific length:
  ```shell
  ssh-keygen -t rsa -b 4096
  ```

- Generate an SSH key pair with a custom file name:
  ```shell
  ssh-keygen -t rsa -f my-key
  ```

- Generate an SSH key with a passphrase:
  ```shell
  ssh-keygen -t rsa -b 4096 -f my-key -C "Key for secure access" -N "my-passphrase"
  ```

- View the public key from a private key file:
  ```shell
  ssh-keygen -y -f private-key-file
  ```

- Add an SSH key to the SSH agent:
  ```shell
  ssh-add /path/to/ssh-key
  ```

- List keys stored in the SSH agent:
  ```shell
  ssh-add -l
  ```

- Remove a key from the SSH agent:
  ```shell
  ssh-add -d /path/to/ssh-key
  ```

- Display the fingerprint of an SSH public key:
  ```shell
  ssh-keygen -lf /path/to/public-key
  ```

- Convert an OpenSSH key to a different format (e.g., PKCS#8):
  ```shell
  ssh-keygen -p -m PKCS8 -f /path/to/openssh-key
  ```

## Conclusion

This cheat sheet covers some common `ssh-keygen` commands and concepts. `ssh-keygen` is a valuable tool for generating and managing SSH keys, providing secure authentication for remote access; refer to the [OpenSSH documentation](https://www.openssh.com/manual.html) for more in-depth information and advanced usage.
