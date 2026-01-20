# nfs

## Introduction

This cheat sheet provides a quick reference for some common `NFS` (Network File System) commands and concepts. `NFS` is a distributed file system protocol that allows a user on a client computer to access files over a network as if they were on the local disk.

## `NFS` Concepts

### Exporting Directories

To share directories from the server to NFS clients, you need to export them.

- Edit the NFS exports configuration file:
  ```shell
  sudo nano /etc/exports
  ```

- Export a directory to a specific client:
  ```shell
  /path/to/shared/dir client_ip(options)
  ```

### NFS Server Commands

Managing the NFS server on the server-side involves starting, stopping, and checking its status.

- Start the NFS server:
  ```shell
  sudo service nfs-kernel-server start
  ```

- Stop the NFS server:
  ```shell
  sudo service nfs-kernel-server stop
  ```

- Check the status of the NFS server:
  ```shell
  sudo service nfs-kernel-server status
  ```

### NFS Client Commands

On the client-side, you can mount and unmount NFS shares.

- Mount an NFS share:
  ```shell
  sudo mount server_ip:/shared_dir /mnt/local_mount_point
  ```

- Unmount an NFS share:
  ```shell
  sudo umount /mnt/local_mount_point
  ```

### Viewing NFS Mounts

You can view mounted NFS shares on a client.

- List mounted NFS shares on the client:
  ```shell
  mount | grep nfs
  ```

### NFS Security

`NFS` allows you to control access to shared directories using export options.

- Export a directory with read-only access:
  ```shell
  /path/to/shared/dir client_ip(ro)
  ```

- Export a directory with read-write access:
  ```shell
  /path/to/shared/dir client_ip(rw)
  ```

## `NFS` Command-Line

- Edit the NFS exports configuration file:
  ```shell
  sudo nano /etc/exports
  ```

- Start the NFS server:
  ```shell
  sudo service nfs-kernel-server start
  ```

- Stop the NFS server:
  ```shell
  sudo service nfs-kernel-server stop
  ```

- Check the status of the NFS server:
  ```shell
  sudo service nfs-kernel-server status
  ```

- Mount an NFS share:
  ```shell
  sudo mount server_ip:/shared_dir /mnt/local_mount_point
  ```

- Unmount an NFS share:
  ```shell
  sudo umount /mnt/local_mount_point
  ```

- List mounted NFS shares on the client:
  ```shell
  mount | grep nfs
  ```

## Conclusion

This cheat sheet covers some common `NFS` (Network File System) commands and concepts. `NFS` is a powerful protocol for sharing files and directories across a network, making it valuable for network file sharing and storage solutions; refer to the [official `NFS` documentation](https://manpages.ubuntu.com/manpages/hirsute/man5/exports.5.html) for more in-depth information and advanced usage.
