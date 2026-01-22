# logrotate

## Introduction

This cheat sheet provides a quick reference for some common `logrotate` commands and concepts. `logrotate` is a command-line utility used for managing log files on Unix-like operating systems.

## `logrotate` Concepts

### Log Rotation

`logrotate` helps manage log files by rotating, compressing, and optionally purging old log entries.

- Rotate logs for a specific configuration:
  ```shell
  logrotate /etc/logrotate.conf
  ```

### Configuration Files

`logrotate` uses configuration files to specify log file locations, rotation settings, and more.

- Edit a logrotate configuration file:
  ```shell
  nano /etc/logrotate.conf
  ```

### Log Files

Log files managed by `logrotate` are typically specified in configuration files.

- Add a log file to a configuration file:
  ```shell
  /var/log/myapp.log {
    ...
  }
  ```

### Log Rotation Rules

Configuration files include rules for log rotation, including frequency and retention.

- Rotate logs daily:
  ```shell
  daily
  ```

- Keep 7 rotated log files:
  ```shell
  rotate 7
  ```

- Compress rotated logs:
  ```shell
  compress
  ```

### Post-Rotation Scripts

You can specify scripts to execute after log rotation.

- Execute a script after log rotation:
  ```shell
  postrotate
    /usr/bin/my_script.sh
  endscript
  ```

## `logrotate` Command-Line

- Rotate logs for a specific configuration file:
  ```shell
  logrotate /etc/logrotate.conf
  ```

- Edit the logrotate configuration file:
  ```shell
  nano /etc/logrotate.conf
  ```

## Conclusion

This cheat sheet covers some common `logrotate` commands and concepts. `logrotate` is a valuable tool for managing log files, ensuring that logs are rotated, compressed, and retained according to defined rules; refer to the [official `logrotate` documentation](https://linux.die.net/man/8/logrotate) for more in-depth information and advanced usage.
