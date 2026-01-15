# nagios3

## Introduction

This cheat sheet provides a quick reference for some common `Nagios 3` commands and concepts. `Nagios` is a popular open-source monitoring system used to monitor the health and status of network services and hosts.

## `Nagios 3` Concepts

### Monitoring Configuration

`Nagios` uses configuration files to define what services and hosts to monitor.

- Edit the main configuration file:
  ```shell
  sudo nano /etc/nagios3/nagios.cfg
  ```

- Define host and service configurations in the appropriate configuration files:
  ```shell
  sudo nano /etc/nagios3/conf.d/hosts.cfg
  sudo nano /etc/nagios3/conf.d/services.cfg
  ```

### Configuration Validation

You can check the validity of your `Nagios` configuration before restarting the service.

- Validate the configuration files:
  ```shell
  sudo nagios3 -v /etc/nagios3/nagios.cfg
  ```

### Starting and Stopping `Nagios`

You can start and stop the `Nagios` service as needed.

- Start the `Nagios` service:
  ```shell
  sudo service nagios3 start
  ```

- Stop the `Nagios` service:
  ```shell
  sudo service nagios3 stop
  ```

### Web Interface

Access the `Nagios` web interface to view monitoring status and alerts.

- Open the web interface in a browser:
  ```
  http://your_server_ip/nagios3
  ```

### Monitoring Commands

`Nagios` provides various commands to control monitoring checks.

- Force a host check:
  ```shell
  sudo /usr/sbin/nagios3 -v /etc/nagios3/nagios.cfg
  ```

- Schedule a host or service check:
  ```shell
  sudo /usr/sbin/nagios3 -s /etc/nagios3/nagios.cfg
  ```

## `Nagios 3` Command-Line

- Edit the main configuration file:
  ```shell
  sudo nano /etc/nagios3/nagios.cfg
  ```

- Define host and service configurations in the appropriate configuration files:
  ```shell
  sudo nano /etc/nagios3/conf.d/hosts.cfg
  sudo nano /etc/nagios3/conf.d/services.cfg
  ```

- Validate the configuration files:
  ```shell
  sudo nagios3 -v /etc/nagios3/nagios.cfg
  ```

- Start the `Nagios` service:
  ```shell
  sudo service nagios3 start
  ```

- Stop the `Nagios` service:
  ```shell
  sudo service nagios3 stop
  ```

- Open the web interface in a browser:
  ```
  http://your_server_ip/nagios3
  ```

- Force a host check:
  ```shell
  sudo /usr/sbin/nagios3 -v /etc/nagios3/nagios.cfg
  ```

- Schedule a host or service check:
  ```shell
  sudo /usr/sbin/nagios3 -s /etc/nagios3/nagios.cfg
  ```

## Conclusion

This cheat sheet covers some common `Nagios 3` commands and concepts. `Nagios` is a powerful monitoring system that helps you keep track of the health and status of your network services and hosts, making it invaluable for system administrators; refer to the [official Nagios documentation](https://www.nagios.org/documentation/) for more in-depth information and advanced usage.
