# nmap

## Introduction

This cheat sheet provides a quick reference for some common `nmap` (Network Mapper) commands and concepts. `nmap` is a powerful open-source network scanning and host discovery tool used for network mapping and security auditing.

## `nmap` Concepts

### Basic Host Discovery

You can use `nmap` for basic host discovery on a network.

- Discover hosts on a specific subnet:
  ```shell
  nmap -sn 192.168.1.0/24
  ```

### Port Scanning

`nmap` can perform various types of port scans to identify open ports and services on a host.

- Perform a basic TCP SYN scan:
  ```shell
  nmap -sS target_host
  ```

- Perform a UDP scan:
  ```shell
  nmap -sU target_host
  ```

- Scan specific ports:
  ```shell
  nmap -p 80,443 target_host
  ```

- Scan a range of ports:
  ```shell
  nmap -p 1-100 target_host
  ```

### Service Version Detection

`nmap` can detect the version of services running on open ports.

- Detect service versions:
  ```shell
  nmap -sV target_host
  ```

### OS Fingerprinting

You can use `nmap` to attempt to identify the operating system of a target host.

- Perform OS detection:
  ```shell
  nmap -O target_host
  ```

### Output Formats

`nmap` can generate output in various formats for analysis and reporting.

- Save scan results to a file (XML format):
  ```shell
  nmap -oX output.xml target_host
  ```

- Save scan results to a file (text format):
  ```shell
  nmap -oN output.txt target_host
  ```

### Script Scanning

`nmap` supports scripting with NSE (Nmap Scripting Engine) for advanced scanning and customization.

- Run a specific NSE script:
  ```shell
  nmap --script script_name.nse target_host
  ```

## `nmap` Command-Line

- Discover hosts on a specific subnet:
  ```shell
  nmap -sn 192.168.1.0/24
  ```

- Perform a basic TCP SYN scan:
  ```shell
  nmap -sS target_host
  ```

- Perform a UDP scan:
  ```shell
  nmap -sU target_host
  ```

- Scan specific ports:
  ```shell
  nmap -p 80,443 target_host
  ```

- Scan a range of ports:
  ```shell
  nmap -p 1-100 target_host
  ```

- Detect service versions:
  ```shell
  nmap -sV target_host
  ```

- Perform OS detection:
  ```shell
  nmap -O target_host
  ```

- Save scan results to a file (XML format):
  ```shell
  nmap -oX output.xml target_host
  ```

- Save scan results to a file (text format):
  ```shell
  nmap -oN output.txt target_host
  ```

- Run a specific NSE script:
  ```shell
  nmap --script script_name.nse target_host
  ```

## Conclusion

This cheat sheet covers some common `nmap` (Network Mapper) commands and concepts. `nmap` is an essential tool for network scanning, security auditing, and host discovery, making it invaluable for network administrators and security professionals; refer to the [official `nmap` documentation](https://nmap.org/book/man.html) for more in-depth information and advanced usage.
