# strace

## Introduction

This cheat sheet provides a quick reference for some common `strace` commands and concepts. `strace` is a command-line tool used for tracing system calls and signals in Linux and Unix-like operating systems.

## `strace` Concepts

### Basic `strace` Usage

`strace` is used for monitoring system calls made by a program.

- Trace a program's system calls:
  ```shell
  strace command [arguments]
  ```

- Trace a running process by its PID:
  ```shell
  strace -p PID
  ```

### Output Control

Control the output format and verbosity of `strace` traces.

- Write trace output to a file:
  ```shell
  strace -o output.txt command
  ```

- Increase or decrease the level of detail:
  ```shell
  strace -v command
  strace -vv command
  ```

### Filtering

Filter the output to focus on specific system calls.

- Trace only a specific system call (e.g., `open`):
  ```shell
  strace -e trace=open command
  ```

- Exclude specific system calls from the trace:
  ```shell
  strace -e trace=!open command
  ```

- Trace calls only for a specific process (by name or PID):
  ```shell
  strace -e trace=open -p PID
  ```

### Timing Information

Gather timing information for system calls.

- Display timestamps for each call:
  ```shell
  strace -t command
  ```

- Display relative timestamps:
  ```shell
  strace -r command
  ```

### Signal Tracing

Trace signals sent to a process.

- Trace signals sent to a process:
  ```shell
  strace -e trace=signal command
  ```

### Network Tracing

Trace network-related system calls.

- Trace network-related calls (e.g., `socket`, `connect`):
  ```shell
  strace -e trace=network command
  ```

## `strace` Command-Line

- Trace a program's system calls:
  ```shell
  strace command [arguments]
  ```

- Trace a running process by its PID:
  ```shell
  strace -p PID
  ```

- Write trace output to a file:
  ```shell
  strace -o output.txt command
  ```

- Increase or decrease the level of detail:
  ```shell
  strace -v command
  strace -vv command
  ```

- Trace only a specific system call (e.g., `open`):
  ```shell
  strace -e trace=open command
  ```

- Exclude specific system calls from the trace:
  ```shell
  strace -e trace=!open command
  ```

- Trace calls only for a specific process (by name or PID):
  ```shell
  strace -e trace=open -p PID
  ```

- Display timestamps for each call:
  ```shell
  strace -t command
  ```

- Display relative timestamps:
  ```shell
  strace -r command
  ```

- Trace signals sent to a process:
  ```shell
  strace -e trace=signal command
  ```

- Trace network-related calls (e.g., `socket`, `connect`):
  ```shell
  strace -e trace=network command
  ```

## Conclusion

This cheat sheet covers some common `strace` commands and concepts. `strace` is a valuable tool for tracing system calls and signals in Linux and Unix-like operating systems, aiding in debugging and performance analysis; refer to the [`strace` manual](https://man7.org/linux/man-pages/man1/strace.1.html) for more in-depth information and advanced usage.
