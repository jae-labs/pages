# iptables

## Introduction

This cheat sheet provides a quick reference for some common `iptables` commands and concepts. `iptables` is a command-line utility used to configure and manage firewall rules on Linux-based systems.

## `iptables` Concepts

### Firewall Rules

`iptables` uses rules to control incoming and outgoing network traffic.

- List all firewall rules:
  ```shell
  iptables -L
  ```

### Rule Chains

`iptables` has predefined rule chains for different purposes, such as INPUT, OUTPUT, and FORWARD.

- List rules in the INPUT chain:
  ```shell
  iptables -L INPUT
  ```

- List rules in the OUTPUT chain:
  ```shell
  iptables -L OUTPUT
  ```

- List rules in the FORWARD chain:
  ```shell
  iptables -L FORWARD
  ```

### Rule Actions

Rules can have actions like ACCEPT, DROP, and REJECT.

- Allow incoming traffic (ACCEPT):
  ```shell
  iptables -A INPUT -j ACCEPT
  ```

- Drop incoming traffic (DROP):
  ```shell
  iptables -A INPUT -j DROP
  ```

- Reject incoming traffic (REJECT):
  ```shell
  iptables -A INPUT -j REJECT
  ```

### Source and Destination

You can specify source and destination IP addresses.

- Allow traffic from a specific IP address:
  ```shell
  iptables -A INPUT -s source_ip -j ACCEPT
  ```

- Allow traffic to a specific IP address and port:
  ```shell
  iptables -A INPUT -d destination_ip -p tcp --dport port_number -j ACCEPT
  ```

### Stateful Filtering

`iptables` can perform stateful packet inspection.

- Allow established connections:
  ```shell
  iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
  ```

### Port Forwarding

`iptables` can forward traffic from one port to another.

- Port forward from port 80 to 8080:
  ```shell
  iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
  ```

## `iptables` Command-Line

- List all firewall rules:
  ```shell
  iptables -L
  ```

- Add a rule to allow incoming SSH traffic:
  ```shell
  iptables -A INPUT -p tcp --dport 22 -j ACCEPT
  ```

- Delete a rule by rule number:
  ```shell
  iptables -D INPUT 3
  ```

- Save rules to a file:
  ```shell
  iptables-save > /etc/iptables/rules.v4
  ```

## Conclusion

This cheat sheet covers some common `iptables` commands and concepts. `iptables` is a powerful tool for configuring and managing firewall rules on Linux-based systems, helping secure and control network traffic; refer to the [official `iptables` documentation](https://netfilter.org/documentation/index.html) for more in-depth information and advanced usage.
