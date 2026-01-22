# bind

## Introduction

This cheat sheet provides a quick reference for some common BIND (Berkeley Internet Name Domain) DNS server commands and concepts. BIND is an open-source DNS server software used to manage and resolve domain names on the Internet.

## Installation

To use BIND, you need to install it on a server. Installation methods vary depending on your operating system. Refer to the [official BIND documentation](https://www.isc.org/bind/) for installation instructions.

## BIND Concepts

### Zone Files

Zone files contain DNS records for a specific domain or zone.

- Create a forward zone file for a domain:
  ```shell
  $TTL 1D
  @       IN      SOA     ns1.example.com. admin.example.com. (
                  2022010101 ; Serial
                  1H ; Refresh
                  15M ; Retry
                  1W ; Expire
                  1D ; Minimum TTL
                  )
  @       IN      NS      ns1.example.com.
  @       IN      NS      ns2.example.com.
  @       IN      A       192.168.1.10
  www     IN      A       192.168.1.20
  ```

### Zone Types

BIND supports various zone types, including forward and reverse zones.

- Define a forward zone in `named.conf`:
  ```shell
  zone "example.com" {
    type master;
    file "/etc/bind/zones/example.com.zone";
  };
  ```

### Configuration Files

BIND's configuration is defined in various configuration files:
- `named.conf`: Main configuration file.
- `named.conf.options`: DNS server options.
- `named.conf.local`: Local zones.
- `named.conf.default-zones`: Default zones.

### DNS Records

BIND supports various DNS record types, including A, AAAA, CNAME, MX, and PTR records.

- Create an MX record in a zone file:
  ```shell
  @       IN      MX      10      mail.example.com.
  ```

### Views

Views allow you to serve different DNS data based on client IP addresses or ACLs.

- Define a view in `named.conf`:
  ```shell
  view "external" {
    match-clients { any; };
    recursion no;
    zone "example.com" {
      type master;
      file "/etc/bind/zones/example.com.external.zone";
    };
  };
  ```

## BIND Command-Line

- Check BIND configuration for errors:
  ```shell
  named-checkconf /etc/bind/named.conf
  ```

- Start BIND:
  ```shell
  sudo systemctl start bind9
  ```

- Stop BIND:
  ```shell
  sudo systemctl stop bind9
  ```

- Restart BIND:
  ```shell
  sudo systemctl restart bind9
  ```

- Reload BIND configuration:
  ```shell
  sudo systemctl reload bind9
  ```

- Query DNS records using `dig`:
  ```shell
  dig example.com A
  ```

## Conclusion

This cheat sheet covers some common BIND DNS server commands and concepts. BIND is a versatile DNS server software for managing domain name resolution; refer to the [official BIND documentation](https://www.isc.org/bind/) for more in-depth information and advanced usage.
