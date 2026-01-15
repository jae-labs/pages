# srvadmin

## Introduction

This cheat sheet provides a quick reference for some common `srvadmin` commands and concepts. `srvadmin` is a command-line utility used for managing Dell servers and hardware components.

## `srvadmin` Concepts

### Basic `srvadmin` Usage

`srvadmin` provides various commands for monitoring and managing Dell server hardware.

- Display the overall hardware status:
  ```shell
  srvadmin-all srvinfo
  ```

- View information about a specific hardware component (e.g., RAID controller):
  ```shell
  srvadmin-all smbios
  ```

### System Health

Check the health status of the server and its components.

- Check overall system health:
  ```shell
  srvadmin-all omreport chassis info
  ```

- Check RAID controller status:
  ```shell
  srvadmin-all storage controller
  ```

- Check hardware sensor information:
  ```shell
  srvadmin-all omreport chassis temps
  ```

### Hardware Inventory

Retrieve information about hardware components and their status.

- View hardware inventory:
  ```shell
  srvadmin-all omreport system summary
  ```

- List all installed hardware components:
  ```shell
  srvadmin-all omreport chassis components
  ```

### Remote Management

`srvadmin` supports remote management of Dell servers.

- Connect to a remote server:
  ```shell
  srvadmin-all racadm -r hostname -u username -p password
  ```

- Get the power status of a remote server:
  ```shell
  srvadmin-all racadm -r hostname -u username -p password serveraction powerstatus
  ```

- Power on a remote server:
  ```shell
  srvadmin-all racadm -r hostname -u username -p password serveraction powerup
  ```

### Hardware Alerts

Monitor hardware alerts and events.

- View hardware alerts:
  ```shell
  srvadmin-all omreport eventlog list
  ```

- Clear hardware alerts:
  ```shell
  srvadmin-all omconfig eventlog action=clear
  ```

## `srvadmin` Command-Line

- Display the overall hardware status:
  ```shell
  srvadmin-all srvinfo
  ```

- View information about a specific hardware component (e.g., RAID controller):
  ```shell
  srvadmin-all smbios
  ```

- Check overall system health:
  ```shell
  srvadmin-all omreport chassis info
  ```

- Check RAID controller status:
  ```shell
  srvadmin-all storage controller
  ```

- Check hardware sensor information:
  ```shell
  srvadmin-all omreport chassis temps
  ```

- View hardware inventory:
  ```shell
  srvadmin-all omreport system summary
  ```

- List all installed hardware components:
  ```shell
  srvadmin-all omreport chassis components
  ```

- Connect to a remote server:
  ```shell
  srvadmin-all racadm -r hostname -u username -p password
  ```

- Get the power status of a remote server:
  ```shell
  srvadmin-all racadm -r hostname -u username -p password serveraction powerstatus
  ```

- Power on a remote server:
  ```shell
  srvadmin-all racadm -r hostname -u username -p password serveraction powerup
  ```

- View hardware alerts:
  ```shell
  srvadmin-all omreport eventlog list
  ```

- Clear hardware alerts:
  ```shell
  srvadmin-all omconfig eventlog action=clear
  ```

## Conclusion

This cheat sheet covers some common `srvadmin` commands and concepts. `srvadmin` is a valuable tool for managing Dell servers and monitoring hardware components, making it essential for system administrators and server maintenance tasks; refer to the [Dell OpenManage Server Administrator documentation](https://www.dell.com/support/manuals/en-us/openmanage-server-administrator/latest/om_sa_8.4_cli/om_sa_cli.pdf) for more in-depth information and advanced usage.
