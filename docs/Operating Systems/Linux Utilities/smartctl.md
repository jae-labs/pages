# smartctl

## Introduction

This cheat sheet provides a quick reference for some common `smartctl` commands and concepts. `smartctl` is a command-line tool used to monitor and manage SMART (Self-Monitoring, Analysis, and Reporting Technology) data on storage devices such as hard drives and SSDs.

## `smartctl` Concepts

### Basic `smartctl` Usage

`smartctl` is used to query and manage SMART data on storage devices.

- View SMART attributes and overall health status:
  ```shell
  smartctl -a /dev/sdX
  ```

- Short self-test (non-destructive):
  ```shell
  smartctl -t short /dev/sdX
  ```

- Long self-test (may take several hours):
  ```shell
  smartctl -t long /dev/sdX
  ```

- Run a self-test and show progress:
  ```shell
  smartctl -t select,10-100 -c /dev/sdX
  ```

### Self-Tests

SMART self-tests help identify potential issues with storage devices.

- View self-test logs:
  ```shell
  smartctl -l selftest /dev/sdX
  ```

- Run an offline self-test:
  ```shell
  smartctl -t offline /dev/sdX
  ```

- Abort a running self-test:
  ```shell
  smartctl -X /dev/sdX
  ```

### SMART Attributes

SMART attributes provide information about a drive's health.

- Show a specific attribute's value:
  ```shell
  smartctl -A -v 9,raw48 /dev/sdX
  ```

### Device Information

`smartctl` provides details about the storage device.

- View device information:
  ```shell
  smartctl -i /dev/sdX
  ```

- Perform a device self-test:
  ```shell
  smartctl -t device,1 /dev/sdX
  ```

### Temperature Monitoring

Check the temperature of the storage device.

- View temperature information:
  ```shell
  smartctl -A -v 194,raw48 /dev/sdX
  ```

## `smartctl` Command-Line

- View SMART attributes and overall health status:
  ```shell
  smartctl -a /dev/sdX
  ```

- Short self-test (non-destructive):
  ```shell
  smartctl -t short /dev/sdX
  ```

- Long self-test (may take several hours):
  ```shell
  smartctl -t long /dev/sdX
  ```

- View self-test logs:
  ```shell
  smartctl -l selftest /dev/sdX
  ```

- Run an offline self-test:
  ```shell
  smartctl -t offline /dev/sdX
  ```

- Abort a running self-test:
  ```shell
  smartctl -X /dev/sdX
  ```

- Show a specific attribute's value:
  ```shell
  smartctl -A -v 9,raw48 /dev/sdX
  ```

- View device information:
  ```shell
  smartctl -i /dev/sdX
  ```

- Perform a device self-test:
  ```shell
  smartctl -t device,1 /dev/sdX
  ```

- View temperature information:
  ```shell
  smartctl -A -v 194,raw48 /dev/sdX
  ```

## Conclusion

This cheat sheet covers some common `smartctl` commands and concepts. `smartctl` is a valuable tool for monitoring and managing the health of storage devices, making it essential for system administrators and storage maintenance tasks; refer to the [smartmontools documentation](https://www.smartmontools.org/browser/trunk/smartmontools/smartctl.8.in) for more in-depth information and advanced usage.
