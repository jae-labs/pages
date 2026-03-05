# apache2

## Introduction

This cheat sheet provides a quick reference for some common Apache HTTP Server (Apache2) commands and concepts. Apache is a popular open-source web server used to serve websites and web applications.

## Installation

To use Apache2, you need to install it on your server. Installation methods vary depending on your operating system. Refer to your distribution's documentation for installation instructions.

## Apache2 Concepts

### Virtual Hosts

Virtual Hosts allow you to host multiple websites on a single server.

- Create a new virtual host configuration file:
  ```shell
  sudo nano /etc/apache2/sites-available/my-site.conf
  ```

- Enable a virtual host:
  ```shell
  sudo a2ensite my-site
  ```

- Disable a virtual host:
  ```shell
  sudo a2dissite my-site
  ```

### Modules

Apache2 uses modules to extend its functionality. Common modules include `mod_ssl` for SSL/TLS support and `mod_rewrite` for URL rewriting.

- Enable a module:
  ```shell
  sudo a2enmod module_name
  ```

- Disable a module:
  ```shell
  sudo a2dismod module_name
  ```

### Configuration Files

Apache2 configuration files are typically located in the `/etc/apache2` directory.

- Edit the main configuration file:
  ```shell
  sudo nano /etc/apache2/apache2.conf
  ```

- Edit the global configuration file:
  ```shell
  sudo nano /etc/apache2/conf-available/my-config.conf
  ```

### Logs

Apache2 logs important information about server activity.

- Access log location:
  ```shell
  /var/log/apache2/access.log
  ```

- Error log location:
  ```shell
  /var/log/apache2/error.log
  ```

### Restart and Reload

After making configuration changes, you can restart or reload Apache2 to apply the changes.

- Restart Apache2:
  ```shell
  sudo systemctl restart apache2
  ```

- Reload Apache2 (gracefully):
  ```shell
  sudo systemctl reload apache2
  ```

## Apache2 Command-Line

- Check the Apache2 version:
  ```shell
  apache2 -v
  ```

- Test the Apache2 configuration:
  ```shell
  sudo apache2ctl configtest
  ```

- Start Apache2:
  ```shell
  sudo systemctl start apache2
  ```

- Stop Apache2:
  ```shell
  sudo systemctl stop apache2
  ```

- Check the status of Apache2:
  ```shell
  sudo systemctl status apache2
  ```

- Open a port in the firewall (e.g., port 80 for HTTP):
  ```shell
  sudo ufw allow 80/tcp
  ```

## Conclusion

This cheat sheet covers some common Apache HTTP Server (Apache2) commands and concepts. Apache2 is a versatile web server used for hosting websites and applications; refer to the [official Apache documentation](https://httpd.apache.org/docs/) for more in-depth information and advanced usage.
