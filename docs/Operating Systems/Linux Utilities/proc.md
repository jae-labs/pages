# proc

## Introduction

This cheat sheet provides a quick reference for some common `proc` filesystem commands and concepts. The `proc` filesystem is a special filesystem in Unix-like operating systems that provides information about processes and system information.

## `proc` Concepts

### Viewing Process Information

You can use the `proc` filesystem to view detailed information about running processes.

- View process information for a specific process (replace `PID` with the process ID):
  ```shell
  cat /proc/PID/status
  ```

- View the command-line arguments of a process (replace `PID` with the process ID):
  ```shell
  cat /proc/PID/cmdline
  ```

- List all running processes:
  ```shell
  ps aux
  ```

### System Information

The `proc` filesystem also provides system-related information.

- View CPU information:
  ```shell
  cat /proc/cpuinfo
  ```

- View memory information:
  ```shell
  cat /proc/meminfo
  ```

### Filesystem Structure

The `proc` filesystem has a structured directory hierarchy.

- Process information directory for a specific process (replace `PID` with the process ID):
  ```shell
  /proc/PID/
  ```

- View the process ID of the current shell:
  ```shell
  echo $$
  ```

- View the PID of the last background command:
  ```shell
  echo $!
  ```

### Kernel Parameters

You can modify kernel parameters through the `proc` filesystem.

- View kernel parameters:
  ```shell
  cat /proc/sys/kernel/parameter_name
  ```

- Modify a kernel parameter temporarily (requires root privileges):
  ```shell
  echo new_value > /proc/sys/kernel/parameter_name
  ```

## `proc` Command-Line

- View process information for a specific process (replace `PID` with the process ID):
  ```shell
  cat /proc/PID/status
  ```

- View the command-line arguments of a process (replace `PID` with the process ID):
  ```shell
  cat /proc/PID/cmdline
  ```

- List all running processes:
  ```shell
  ps aux
  ```

- View CPU information:
  ```shell
  cat /proc/cpuinfo
  ```

- View memory information:
  ```shell
  cat /proc/meminfo
  ```

- View kernel parameters:
  ```shell
  cat /proc/sys/kernel/parameter_name
  ```

- Modify a kernel parameter temporarily (requires root privileges):
  ```shell
  echo new_value > /proc/sys/kernel/parameter_name
  ```

## Conclusion

This cheat sheet covers some common `proc` filesystem commands and concepts. The `proc` filesystem is a valuable resource for gathering information about running processes and system parameters, making it essential for system administrators and troubleshooting tasks; refer to the [Linux `proc` documentation](https://www.kernel.org/doc/Documentation/filesystems/proc.txt) for more in-depth information and advanced usage.
