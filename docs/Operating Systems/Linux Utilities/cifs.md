# cifs

## Introduction

This cheat sheet provides a quick reference for some common CIFS (Common Internet File System) commands and concepts. CIFS is a network file-sharing protocol that allows the sharing of files and resources between computers over a network, often used in Windows-based environments.

## CIFS Concepts

### Shares

A CIFS share is a network resource (folder or directory) that is shared with other computers.

- Create a CIFS share in the `smb.conf` configuration file:
  ```shell
  [share_name]
    path = /path/to/shared_folder
    read only = no
    guest ok = yes
  ```

### Authentication

CIFS supports authentication for accessing shared resources.

- Access a CIFS share with a username and password:
  ```shell
  smbclient //server/share -U username
  ```

### Mounting CIFS Shares

You can mount CIFS shares on your local system.

- Mount a CIFS share using `mount`:
  ```shell
  sudo mount -t cifs //server/share /mnt/mount_point -o username=user,password=pass
  ```

### Permissions

CIFS shares can have access permissions similar to file system permissions.

- Set CIFS share permissions in the `smb.conf` file:
  ```shell
  [share_name]
    path = /path/to/shared_folder
    valid users = user1, user2
    read only = no
  ```

### Configuration File

The main configuration file for CIFS is typically `/etc/samba/smb.conf`.

### Status and Debugging

You can check the status of CIFS and debug issues using logs.

- Check the status of the `smbd` service:
  ```shell
  systemctl status smbd
  ```

- View CIFS logs (e.g., `smbd` logs):
  ```shell
  tail -f /var/log/samba/log.smbd
  ```

## CIFS Command-Line

- Start the CIFS service (SMB server):
  ```shell
  sudo systemctl start smbd
  ```

- Stop the CIFS service:
  ```shell
  sudo systemctl stop smbd
  ```

- Restart the CIFS service:
  ```shell
  sudo systemctl restart smbd
  ```

- Reload CIFS configuration:
  ```shell
  sudo systemctl reload smbd
  ```

## Conclusion

This cheat sheet covers some common CIFS (Common Internet File System) commands and concepts. CIFS is a network file-sharing protocol used for sharing files and resources between computers; refer to the [official Samba documentation](https://www.samba.org/samba/docs/) for more in-depth information and advanced usage.
