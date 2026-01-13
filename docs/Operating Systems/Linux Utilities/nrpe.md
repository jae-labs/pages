# nrpe

## Introduction

This cheat sheet provides a quick reference for some common `NRPE` (Nagios Remote Plugin Executor) commands and concepts. `NRPE` is a Nagios plugin that allows you to remotely execute Nagios plugins on other Linux/Unix machines to monitor their local resources.

## `NRPE` Concepts

### Installing and Configuring `NRPE`

To use `NRPE`, you need to install and configure it on the target host.

- Install `NRPE` on the target host (example for Debian/Ubuntu):
  ```shell
  sudo apt-get install nagios-nrpe-server
  ```

- Configure `NRPE` to allow specific Nagios server(s) by editing the configuration file:
  ```shell
  sudo nano /etc/nagios/nrpe.cfg
  ```

### Command Definitions

`NRPE` configuration includes defining the commands to be executed remotely.

- Define a new command in the `nrpe.cfg` file (example):
  ```shell
  command[check_disk]=/usr/lib/nagios/plugins/check_disk -w 20% -c 10%
  ```

### Restarting `NRPE`

After making changes to the `NRPE` configuration, you'll need to restart the `NRPE` service.

- Restart the `NRPE` service (example for systemd-based systems):
  ```shell
  sudo systemctl restart nagios-nrpe-server
  ```

### Monitoring from Nagios Server

From the Nagios server, you can run checks on the remote host using `check_nrpe`.

- Run an `NRPE` check (example):
  ```shell
  /usr/lib/nagios/plugins/check_nrpe -H target_host -c check_disk
  ```

## `NRPE` Command-Line

- Install `NRPE` on the target host (example for Debian/Ubuntu):
  ```shell
  sudo apt-get install nagios-nrpe-server
  ```

- Configure `NRPE` to allow specific Nagios server(s) by editing the configuration file:
  ```shell
  sudo nano /etc/nagios/nrpe.cfg
  ```

- Define a new command in the `nrpe.cfg` file (example):
  ```shell
  command[check_disk]=/usr/lib/nagios/plugins/check_disk -w 20% -c 10%
  ```

- Restart the `NRPE` service (example for systemd-based systems):
  ```shell
  sudo systemctl restart nagios-nrpe-server
  ```

- Run an `NRPE` check (example):
  ```shell
  /usr/lib/nagios/plugins/check_nrpe -H target_host -c check_disk
  ```

## Conclusion

This cheat sheet covers some common `NRPE` (Nagios Remote Plugin Executor) commands and concepts. `NRPE` is a valuable tool for monitoring remote Linux/Unix hosts and their resources using Nagios, making it essential for system administrators and network administrators; refer to the [official `NRPE` documentation](https://assets.nagios.com/downloads/nagioscore/docs/nrpe/NRPE.pdf) for more in-depth information and advanced usage.
