# openssl

## Introduction

This cheat sheet provides a quick reference for some common `openssl` commands and concepts. `openssl` is a versatile open-source tool for working with SSL/TLS certificates, cryptography, and secure communication.

## `openssl` Concepts

### Generating RSA Key Pairs

You can use `openssl` to generate RSA key pairs for various cryptographic operations.

- Generate an RSA private key:
  ```shell
  openssl genpkey -algorithm RSA -out private-key.pem
  ```

- Extract the public key from the private key:
  ```shell
  openssl rsa -pubout -in private-key.pem -out public-key.pem
  ```

### Creating Self-Signed Certificates

`openssl` can create self-signed SSL/TLS certificates for testing and development.

- Generate a self-signed certificate:
  ```shell
  openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
  ```

### Certificate Signing Requests (CSR)

You can create certificate signing requests for obtaining certificates from certificate authorities.

- Generate a CSR and private key:
  ```shell
  openssl req -newkey rsa:2048 -nodes -keyout myserver.key -out myserver.csr
  ```

### Certificate Verification

`openssl` can be used to verify certificates.

- Verify a certificate against a CA certificate:
  ```shell
  openssl verify -CAfile ca-cert.pem server-cert.pem
  ```

### Encrypting and Decrypting

`openssl` can encrypt and decrypt files and data.

- Encrypt a file using AES:
  ```shell
  openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.txt
  ```

- Decrypt an AES-encrypted file:
  ```shell
  openssl enc -d -aes-256-cbc -in encrypted.txt -out decrypted.txt
  ```

## `openssl` Command-Line

- Generate an RSA private key:
  ```shell
  openssl genpkey -algorithm RSA -out private-key.pem
  ```

- Extract the public key from the private key:
  ```shell
  openssl rsa -pubout -in private-key.pem -out public-key.pem
  ```

- Generate a self-signed certificate:
  ```shell
  openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
  ```

- Generate a CSR and private key:
  ```shell
  openssl req -newkey rsa:2048 -nodes -keyout myserver.key -out myserver.csr
  ```

- Verify a certificate against a CA certificate:
  ```shell
  openssl verify -CAfile ca-cert.pem server-cert.pem
  ```

- Encrypt a file using AES:
  ```shell
  openssl enc -aes-256-cbc -salt -in plaintext.txt -out encrypted.txt
  ```

- Decrypt an AES-encrypted file:
  ```shell
  openssl enc -d -aes-256-cbc -in encrypted.txt -out decrypted.txt
  ```

## Conclusion

This cheat sheet covers some common `openssl` commands and concepts. `openssl` is a powerful tool for working with SSL/TLS certificates, cryptography, and secure communication, making it essential for system administrators, developers, and security professionals; refer to the [official `openssl` documentation](https://www.openssl.org/docs/) for more in-depth information and advanced usage.
