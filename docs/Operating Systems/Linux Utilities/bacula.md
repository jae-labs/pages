# bacula

## Introduction

This cheat sheet provides a quick reference for some common Bacula commands and concepts. Bacula is an open-source network backup solution that enables you to back up and recover data across a network of computers.

## Installation

To use Bacula, you need to install it on a server. Installation methods vary depending on your operating system. Refer to the [official Bacula documentation](https://www.bacula.org/rel-manual/Bacula_Main_Site.html) for installation instructions.

## Bacula Concepts

### Components

Bacula consists of several components:
- **Director**: Manages and schedules backup jobs.
- **Storage Daemon**: Stores backup data on storage devices.
- **File Daemon**: Runs on client machines and backs up data.
- **Catalog**: Stores metadata about backup jobs.

### Configuration Files

Bacula's configuration is defined in various configuration files:
- `bacula-dir.conf`: Director configuration.
- `bacula-sd.conf`: Storage Daemon configuration.
- `bacula-fd.conf`: File Daemon (client) configuration.

### Job Definitions

Jobs in Bacula define what to back up, when, and where to store the data.

- Define a new backup job in `bacula-dir.conf`:
  ```shell
  JobDefs {
    Name = "DefaultJob"
    Type = Restore
    FileSet="Full Set"
    Schedule = "WeeklyCycle"
    Storage = File
    Messages = Standard
    Pool = Default
    Priority = 10
  }
  ```

### FileSets

A FileSet is a collection of files and directories to back up.

- Define a FileSet in `bacula-dir.conf`:
  ```shell
  FileSet {
    Name = "Full Set"
    Include {
      Options {
        signature = MD5
      }
      File = /path/to/data
    }
  }
  ```

### Schedule

Schedules define when backup jobs should run.

- Define a schedule in `bacula-dir.conf`:
  ```shell
  Schedule {
    Name = "WeeklyCycle"
    Run = Full 1st sat at 23:05
  }
  ```

### Storage

Storage defines where backup data should be stored and how to access it.

- Define a storage device in `bacula-sd.conf`:
  ```shell
  Storage {
    Name = File
    Address = localhost
    SDPort = 9103
    Password = "password"
    Device = FileStorage
    Media Type = File
  }
  ```

## Bacula Command-Line

- Start the Bacula Director service:
  ```shell
  sudo systemctl start bacula-dir
  ```

- Start the Bacula Storage Daemon service:
  ```shell
  sudo systemctl start bacula-sd
  ```

- Start the Bacula File Daemon service on a client:
  ```shell
  sudo systemctl start bacula-fd
  ```

- Run a backup job:
  ```shell
  bconsole
  * run
  ```

- Restore files from a backup:
  ```shell
  bconsole
  * restore
  ```

- Check the status of Bacula components:
  ```shell
  bconsole
  * status
  ```

## Conclusion

This cheat sheet covers some common Bacula commands and concepts. Bacula is a powerful network backup solution for data protection and recovery; refer to the [official Bacula documentation](https://www.bacula.org/rel-manual/Bacula_Main_Site.html) for more in-depth information and advanced usage.
