# rsync

## Introduction

This cheat sheet provides a quick reference for some common `rsync` commands and concepts. `rsync` is a versatile command-line utility used for file synchronization and transfer on Unix-like operating systems.

## `rsync` Concepts

### Basic `rsync` Usage

`rsync` can be used for local and remote file synchronization.

- Copy files from source to destination:
  ```shell
  rsync -av source/ destination/
  ```

- Synchronize two directories (delete extraneous files at the destination):
  ```shell
  rsync -av --delete source/ destination/
  ```

- Transfer files to a remote server (SSH):
  ```shell
  rsync -av -e ssh source/ user@remote:/path/to/destination/
  ```

### Exclude Files and Directories

You can exclude specific files or directories during synchronization.

- Exclude a single file or directory:
  ```shell
  rsync -av --exclude 'file.txt' source/ destination/
  ```

- Exclude multiple files/directories using a file:
  ```shell
  rsync -av --exclude-from 'exclude.txt' source/ destination/
  ```

### Progress and Verbosity

`rsync` provides options to display progress and increase verbosity.

- Display transfer progress:
  ```shell
  rsync -av --progress source/ destination/
  ```

- Increase verbosity for debugging:
  ```shell
  rsync -avv source/ destination/
  ```

### Remote `rsync` Daemon

`rsync` can use the `rsync` daemon for faster transfers.

- Start the `rsync` daemon on the server:
  ```shell
  rsync --daemon
  ```

- Use the `rsync` daemon for transfers:
  ```shell
  rsync -av source/ rsync://server/module/
  ```

## `rsync` Command-Line

- Copy files from source to destination:
  ```shell
  rsync -av source/ destination/
  ```

- Synchronize two directories (delete extraneous files at the destination):
  ```shell
  rsync -av --delete source/ destination/
  ```

- Transfer files to a remote server (SSH):
  ```shell
  rsync -av -e ssh source/ user@remote:/path/to/destination/
  ```

- Exclude a single file or directory:
  ```shell
  rsync -av --exclude 'file.txt' source/ destination/
  ```

- Display transfer progress:
  ```shell
  rsync -av --progress source/ destination/
  ```

- Start the `rsync` daemon on the server:
  ```shell
  rsync --daemon
  ```

- Use the `rsync` daemon for transfers:
  ```shell
  rsync -av source/ rsync://server/module/
  ```

## Conclusion

This cheat sheet covers some common `rsync` commands and concepts. `rsync` is a powerful tool for file synchronization and transfer, making it essential for system administrators and data backup tasks; refer to the [official `rsync` documentation](https://rsync.samba.org/documentation.html) for more in-depth information and advanced usage.
