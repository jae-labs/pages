# sysctl

## Introduction

This cheat sheet provides a quick reference for common concepts and commands related to `sysctl` in Linux. `sysctl` is a command-line utility that allows you to view and modify kernel parameters at runtime.

## `sysctl` Concepts

### Kernel Parameters

Kernel parameters, also known as sysctl variables, control various aspects of the Linux kernel's behavior.

### Viewing Kernel Parameters

Use `sysctl` to view the current values of kernel parameters.

- Display the value of a specific kernel parameter:
  ```shell
  sysctl kernel.parameter_name
  ```

- List all kernel parameters and their values:
  ```shell
  sysctl -a
  ```

- Show only parameters in a specific namespace (e.g., `net`):
  ```shell
  sysctl -a --pattern ^net\.
  ```

### Modifying Kernel Parameters

You can modify kernel parameters using `sysctl`, but be cautious as incorrect changes can affect system stability.

- Set a kernel parameter to a specific value (temporary):
  ```shell
  sysctl -w kernel.parameter_name=new_value
  ```

- To make a change permanent, edit the `/etc/sysctl.conf` file and add or update parameter values.

### Reload Configuration

After editing `/etc/sysctl.conf`, you can apply the changes without rebooting.

- Reload the sysctl settings from `/etc/sysctl.conf`:
  ```shell
  sysctl -p
  ```

### Security Considerations

Be cautious when modifying kernel parameters, as incorrect changes can impact system stability and security.

- Avoid setting kernel parameters without understanding their implications.

## `sysctl` Command-Line

- Display the value of a specific kernel parameter:
  ```shell
  sysctl kernel.parameter_name
  ```

- List all kernel parameters and their values:
  ```shell
  sysctl -a
  ```

- Show only parameters in a specific namespace (e.g., `net`):
  ```shell
  sysctl -a --pattern ^net\.
  ```

- Set a kernel parameter to a specific value (temporary):
  ```shell
  sysctl -w kernel.parameter_name=new_value
  ```

- Reload the sysctl settings from `/etc/sysctl.conf`:
  ```shell
  sysctl -p
  ```

## Conclusion

This cheat sheet covers common concepts and commands for working with `sysctl` in Linux. `sysctl` is a powerful tool for configuring kernel parameters at runtime, but it should be used with caution to avoid unintended consequences; refer to the [`sysctl` manual](https://man7.org/linux/man-pages/man8/sysctl.8.html) for more in-depth information and advanced usage.
