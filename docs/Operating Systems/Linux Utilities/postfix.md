# postfix

## Introduction

This cheat sheet provides a quick reference for some common `Postfix` commands and concepts. `Postfix` is a popular open-source mail transfer agent (MTA) used for routing and delivering email on Unix-like operating systems.

## `Postfix` Concepts

### Postfix Configuration Files

`Postfix` configuration is defined in various configuration files located in `/etc/postfix/`.

- Edit the main configuration file:
  ```shell
  sudo nano /etc/postfix/main.cf
  ```

- View the content of the main configuration file:
  ```shell
  cat /etc/postfix/main.cf
  ```

### Basic `Postfix` Commands

- Start `Postfix` service:
  ```shell
  sudo service postfix start
  ```

- Stop `Postfix` service:
  ```shell
  sudo service postfix stop
  ```

- Reload `Postfix` configuration:
  ```shell
  sudo service postfix reload
  ```

### Virtual Domains

`Postfix` can handle virtual domains and multiple email domains.

- Configure virtual domains in `main.cf`:
  ```shell
  virtual_alias_domains = example.com
  ```

- Define virtual alias mappings in `main.cf`:
  ```shell
  virtual_alias_maps = hash:/etc/postfix/virtual
  ```

### Email Forwarding

`Postfix` can forward emails to other addresses.

- Add email forwarding rules in `/etc/postfix/virtual`:
  ```shell
  user@example.com    newemail@example.net
  ```

- Update the virtual alias database:
  ```shell
  sudo postmap /etc/postfix/virtual
  ```

### Relaying and SMTP Authentication

To allow relaying and SMTP authentication for external
