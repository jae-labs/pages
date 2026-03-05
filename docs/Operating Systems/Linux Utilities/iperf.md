# iperf

## Introduction

This cheat sheet provides a quick reference for some common `iperf` commands and concepts. `iperf` is a command-line utility used to measure network bandwidth and performance by generating and analyzing network traffic.

## `iperf` Concepts

### Server and Client

`iperf` operates in two modes: server and client.

- **Server Mode**: Start `iperf` in server mode to listen for incoming connections.
  ```shell
  iperf -s
  ```

- **Client Mode**: Start `iperf` in client mode to connect to a remote server for testing.
  ```shell
  iperf -c server_ip
  ```

### TCP and UDP Tests

`iperf` can perform tests using TCP or UDP protocols.

- **TCP Test (Default)**: Measure TCP bandwidth.
  ```shell
  iperf -s        # Server
  iperf -c server_ip    # Client
  ```

- **UDP Test**: Measure UDP bandwidth.
  ```shell
  iperf -u -s        # Server
  iperf -u -c server_ip    # Client
  ```

### Test Duration

Specify the test duration using the `-t` option (in seconds).

- Run a test for 10 seconds:
  ```shell
  iperf -t 10 -c server_ip
  ```

### Bandwidth Units

You can control the display units for bandwidth results.

- Display results in Kbps (Kilobits per second):
  ```shell
  iperf -u -b 1M -c server_ip
  ```

### Parallel Streams

`iperf` can use multiple parallel streams for testing.

- Use 4 parallel streams:
  ```shell
  iperf -P 4 -c server_ip
  ```

### Reverse Test

Perform a reverse test (server sends data to client).

- Reverse test with TCP:
  ```shell
  iperf -c server_ip -R
  ```

### Interval Display

Display intermediate results at specified intervals.

- Display results every 5 seconds:
  ```shell
  iperf -i 5 -c server_ip
  ```

## `iperf` Command-Line

- Start `iperf` in server mode:
  ```shell
  iperf -s
  ```

- Start a TCP bandwidth test (client mode):
  ```shell
  iperf -c server_ip
  ```

- Start a UDP bandwidth test (client mode):
  ```shell
  iperf -u -c server_ip
  ```

- Set the test duration to 30 seconds (client mode):
  ```shell
  iperf -t 30 -c server_ip
  ```

- Use 4 parallel streams (client mode):
  ```shell
  iperf -P 4 -c server_ip
  ```

- Display results every 10 seconds (client mode):
  ```shell
  iperf -i 10 -c server_ip
  ```

## Conclusion

This cheat sheet covers some common `iperf` commands and concepts. `iperf` is a powerful tool for measuring network bandwidth and performance, making it useful for network diagnostics, tuning, and testing; refer to the [official `iperf` documentation](https://iperf.fr/) for more in-depth information and advanced usage.
