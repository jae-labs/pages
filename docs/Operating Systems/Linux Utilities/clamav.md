# clamav

## Introduction

This cheat sheet provides a quick reference for some common ClamAV commands and concepts. ClamAV is an open-source antivirus engine used to detect and remove viruses, malware, and other threats on Linux systems.

## Installation

To use ClamAV, you need to install it on your Linux system. Installation methods vary depending on your distribution. Refer to your distribution's package manager for installation instructions.

## ClamAV Concepts

### Virus Definitions

ClamAV relies on virus definitions (signatures) to detect malware. Regularly updating virus definitions is crucial for effective malware detection.

- Update virus definitions:
  ```shell
  freshclam
  ```

### Scanning Files and Directories

You can scan files and directories for malware using ClamAV.

- Scan a specific file or directory:
  ```shell
  clamscan file_or_directory
  ```

- Scan a specific file or directory and display only infected files:
  ```shell
  clamscan --infected file_or_directory
  ```

### On-Access Scanning

ClamAV can be configured for on-access scanning, which scans files in real-time as they are accessed.

- Enable on-access scanning (example for systemd):
  ```shell
  sudo systemctl enable clamav-daemon
  sudo systemctl start clamav-daemon
  ```

### Quarantine

Quarantine is a secure area where infected files can be moved for further analysis or removal.

- Configure quarantine in the ClamAV configuration file (typically `/etc/clamav/clamd.conf`).

### Log Files

ClamAV logs information about scans and other activities.

- View the ClamAV log:
  ```shell
  tail -f /var/log/clamav/clamav.log
  ```

## ClamAV Command-Line

- Start the ClamAV daemon:
  ```shell
  sudo systemctl start clamav-daemon
  ```

- Stop the ClamAV daemon:
  ```shell
  sudo systemctl stop clamav-daemon
  ```

- Restart the ClamAV daemon:
  ```shell
  sudo systemctl restart clamav-daemon
  ```

- Check the status of the ClamAV daemon:
  ```shell
  sudo systemctl status clamav-daemon
  ```

## Conclusion

This cheat sheet covers some common ClamAV commands and concepts. ClamAV is a powerful antivirus engine for detecting and removing malware on Linux systems; refer to the [official ClamAV documentation](https://www.clamav.net/documents) for more in-depth information and advanced usage.
