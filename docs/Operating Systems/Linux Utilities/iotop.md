# iotop

## Introduction

This cheat sheet provides a quick reference for some common `iotop` commands and concepts. `iotop` is a command-line utility used to monitor and display I/O (Input/Output) usage by processes on Unix-like operating systems.

## `iotop` Concepts

### I/O Monitoring

`iotop` displays real-time I/O usage by processes, including read and write operations, as well as the amount of data transferred.

- Start `iotop`:
  ```shell
  iotop
  ```

### Process Details

`iotop` provides details about processes, such as their process ID (PID), user, and I/O usage.

- Display process details:
  ```shell
  iotop -o
  ```

### Sorting

`iotop` allows you to sort processes by various criteria, including I/O rate and accumulated I/O.

- Sort by I/O rate (default):
  ```shell
  iotop
  ```

- Sort by accumulated I/O:
  ```shell
  iotop -a
  ```

### Batch Mode

`iotop` can operate in batch mode, useful for saving data to a file.

- Run `iotop` in batch mode and save the output to a file:
  ```shell
  iotop -b -o -n 5 > iotop_output.txt
  ```

## `iotop` Command-Line

- Start `iotop`:
  ```shell
  iotop
  ```

- Display process details:
  ```shell
  iotop -o
  ```

- Sort processes by accumulated I/O:
  ```shell
  iotop -a
  ```

- Run `iotop` in batch mode and save the output to a file:
  ```shell
  iotop -b -o -n 5 > iotop_output.txt
  ```

## Conclusion

This cheat sheet covers some common `iotop` commands and concepts. `iotop` is a valuable tool for monitoring I/O usage by processes in real-time, helping identify disk-intensive processes and potential performance bottlenecks; refer to the [official `iotop` documentation](https://manpages.ubuntu.com/manpages/bionic/man1/iotop.1.html) for more in-depth information and advanced usage.
