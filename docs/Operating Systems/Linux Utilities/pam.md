# pam

## Introduction

This cheat sheet provides a quick reference for some common PAM (Pluggable Authentication Module) commands and concepts. PAM is a framework used on Unix-like operating systems to manage authentication and access control for various applications and services.

## PAM Concepts

### PAM Configuration Files

PAM configuration is defined in configuration files located in `/etc/pam.d/` or `/etc/security/`.

- View PAM configuration for a specific service (e.g., SSH):
  ```shell
  cat /etc/pam.d/sshd
  ```

### PAM Modules

PAM modules define the authentication, authorization, and session management for services.

- List installed PAM modules:
  ```shell
  ls /lib/security/
  ```

### Common PAM Module Types

- **auth**: Used for user authentication.
- **account**: Manages account access (e.g., account expiration).
- **password**: Handles password management (e.g., changing passwords).
- **session**: Defines session-related actions (e.g., session setup).

### PAM Configuration Syntax

PAM configuration files follow a common syntax for module definitions.

- Syntax: `type control module-path arguments`

### PAM Control Flags

PAM control flags determine the module's success or failure behavior.

- **required**: Success is required for authentication to proceed.
- **requisite**: Success is required, and if it fails, authentication fails immediately.
- **sufficient**: If it succeeds, authentication succeeds immediately, but it's not required.
- **optional**: The module's success or failure does not impact the authentication process.

### Examples

- Allow root to log in using SSH with password authentication:
  ```shell
  auth required pam_permit.so
  ```

- Deny root login using SSH:
  ```shell
  auth required pam_deny.so
  ```

- Enforce password complexity requirements:
  ```shell
  password requisite pam_pwquality.so retry=3
  ```

## PAM Command-Line

- View PAM configuration for a specific service (e.g., SSH):
  ```shell
  cat /etc/pam.d/sshd
  ```

- List installed PAM modules:
  ```shell
  ls /lib/security/
  ```

## Conclusion

This cheat sheet covers some common PAM (Pluggable Authentication Module) commands and concepts. PAM is a powerful framework for managing authentication and access control in Unix-like operating systems, making it essential for system administrators and security professionals; refer to your system's documentation and the official [Linux-PAM documentation](https://linux-pam.org/documentation.html) for more in-depth information and advanced usage.
