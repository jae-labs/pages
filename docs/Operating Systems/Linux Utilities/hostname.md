# hostname

## Introduction

This cheat sheet provides a quick reference for some common `hostname` commands and concepts. `hostname` is a command-line utility used to view or set the hostname of a system in Unix-like operating systems.

## `hostname` Concepts

### Hostname

The hostname is a label assigned to a device on a network, used to identify it uniquely. It often consists of a name followed by a domain name (FQDN).

- Display the current hostname:
  ```shell
  hostname
  ```

### Setting the Hostname

You can change the system's hostname.

- Set the hostname temporarily (until the next reboot):
  ```shell
  hostname new-hostname
  ```

- Set the hostname persistently (across reboots) in various Linux distributions:
  ```shell
  # On Debian/Ubuntu
  echo "new-hostname" > /etc/hostname
  hostname -F /etc/hostname
  
  # On Red Hat/CentOS
  nmcli general hostname new-hostname
  ```

### Displaying the FQDN

The Fully Qualified Domain Name (FQDN) includes both the hostname and the domain name.

- Display the FQDN of the system:
  ```shell
  hostname -f
  ```

### Domain Name

The domain name is the part of the FQDN that follows the hostname.

- Display the domain name of the system:
  ```shell
  dnsdomainname
  ```

## `hostname` Command-Line

- Display the current hostname:
  ```shell
  hostname
  ```

- Set the hostname temporarily (until the next reboot):
  ```shell
  hostname new-hostname
  ```

- Set the hostname persistently (across reboots) on Debian/Ubuntu:
  ```shell
  echo "new-hostname" > /etc/hostname
  hostname -F /etc/hostname
  ```

- Display the FQDN of the system:
  ```shell
  hostname -f
  ```

- Display the domain name of the system:
  ```shell
  dnsdomainname
  ```

## Conclusion

This cheat sheet covers some common `hostname` commands and concepts. `hostname` is a fundamental tool for managing the hostname and FQDN of a system in Unix-like operating systems, helping identify and locate devices on a network; refer to the [official `hostname` documentation](https://man7.org/linux/man-pages/man1/hostname.1.html) for more in-depth information and advanced usage.
