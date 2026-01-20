# tcpdump

## Introduction

This cheat sheet provides a quick reference for common concepts and commands related to the `tcpdump` command in Linux. `tcpdump` is a powerful tool for capturing and analyzing network packets on a Linux system.

## `tcpdump` Concepts

### Basic Usage

`tcpdump` is used for capturing network packets.

- Capture packets on a specific network interface:
  ```shell
  sudo tcpdump -i interface
  ```

- Capture packets on a specific port (e.g., port 80 for HTTP):
  ```shell
  sudo tcpdump -i interface port 80
  ```

### Saving Captured Packets

You can save captured packets to a file for later analysis.

- Capture packets and save them to a file:
  ```shell
  sudo tcpdump -i interface -w output.pcap
  ```

- Read a saved packet capture file:
  ```shell
  tcpdump -r input.pcap
  ```

### Displaying Packet Details

View detailed information about captured packets.

- Display packet details in a human-readable format:
  ```shell
  sudo tcpdump -i interface -A
  ```

- Display packet details in hexadecimal and ASCII:
  ```shell
  sudo tcpdump -i interface -X
  ```

### Filtering Packets

Filter packets based on various criteria.

- Capture only packets from a specific IP address:
  ```shell
  sudo tcpdump -i interface src host 192.168.1.100
  ```

- Capture only TCP packets:
  ```shell
  sudo tcpdump -i interface tcp
  ```

- Capture only ICMP packets:
  ```shell
  sudo tcpdump -i interface icmp
  ```

- Capture packets with a specific port number:
  ```shell
  sudo tcpdump -i interface port 22
  ```

### DNS Packet Capture

Capture and analyze DNS traffic.

- Capture DNS packets (port 53):
  ```shell
  sudo tcpdump -i interface port 53
  ```

### Advanced Options

`tcpdump` offers many advanced options for capturing specific types of traffic.

- Capture only IPv6 packets:
  ```shell
  sudo tcpdump -i interface ip6
  ```

- Capture traffic on a specific network (e.g., 192.168.1.0/24):
  ```shell
  sudo tcpdump -i interface net 192.168.1.0/24
  ```

- Capture packets with a specific MAC address:
  ```shell
  sudo tcpdump -i interface ether host 00:11:22:33:44:55
  ```

## `tcpdump` Command-Line

- Capture packets on a specific network interface:
  ```shell
  sudo tcpdump -i interface
  ```

- Capture packets on a specific port (e.g., port 80 for HTTP):
  ```shell
  sudo tcpdump -i interface port 80
  ```

- Capture packets and save them to a file:
  ```shell
  sudo tcpdump -i interface -w output.pcap
  ```

- Read a saved packet capture file:
  ```shell
  tcpdump -r input.pcap
  ```

- Display packet details in a human-readable format:
  ```shell
  sudo tcpdump -i interface -A
  ```

- Display packet details in hexadecimal and ASCII:
  ```shell
  sudo tcpdump -i interface -X
  ```

- Capture only packets from a specific IP address:
  ```shell
  sudo tcpdump -i interface src host 192.168.1.100
  ```

- Capture only TCP packets:
  ```shell
  sudo tcpdump -i interface tcp
  ```

- Capture only ICMP packets:
  ```shell
  sudo tcpdump -i interface icmp
  ```

- Capture only DNS packets (port 53):
  ```shell
  sudo tcpdump -i interface port 53
  ```

- Capture only IPv6 packets:
  ```shell
  sudo tcpdump -i interface ip6
  ```

- Capture traffic on a specific network (e.g., 192.168.1.0/24):
  ```shell
  sudo tcpdump -i interface net 192.168.1.0/24
  ```

- Capture packets with a specific MAC address:
  ```shell
  sudo tcpdump -i interface ether host 00:11:22:33:44:55
  ```

## Conclusion

This cheat sheet covers common concepts and commands for using the `tcpdump` command in Linux. `tcpdump` is an essential tool for capturing and analyzing network packets, making it valuable for network troubleshooting and security analysis; refer to the [`tcpdump` manual](https://www.tcpdump.org/manpages/tcpdump.1.html) for more in-depth information and advanced usage.
