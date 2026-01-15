# usermod

## Introduction

This cheat sheet provides a quick reference for common concepts and commands related to the `usermod` command in Linux. `usermod` is used for modifying user account properties, such as the user's home directory, login shell, and group memberships.

## `usermod` Concepts

### User Modification

`usermod` is primarily used for modifying existing user accounts.

- **Change User's Login Shell**:
  ```shell
  sudo usermod -s /path/to/newshell username
  ```

- **Change User's Home Directory**:
  ```shell
  sudo usermod -d /path/to/newhome username
  ```

- **Add User to Additional Groups**:
  ```shell
  sudo usermod -aG groupname username
  ```

- **Remove User from a Group**:
  ```shell
  sudo deluser username groupname
  ```

- **Change User's Login Name** (caution: use with care):
  ```shell
  sudo usermod -l new_username old_username
  ```

- **Lock or Unlock a User Account**:
  ```shell
  sudo usermod -L username   # Lock
  sudo usermod -U username   # Unlock
  ```

### Password Management

You can use `passwd` to manage user account passwords.

- **Change User's Password**:
  ```shell
  sudo passwd username
  ```

- **Force User to Change Password on Next Login**:
  ```shell
  sudo passwd -e username
  ```

### User Information

`usermod` also allows you to modify user information.

- **Modify User's Comment (GECOS) Field**:
  ```shell
  sudo usermod -c "New comment" username
  ```

## `usermod` Command-Line

- **Change User's Login Shell**:
  ```shell
  sudo usermod -s /path/to/newshell username
  ```

- **Change User's Home Directory**:
  ```shell
  sudo usermod -d /path/to/newhome username
  ```

- **Add User to Additional Groups**:
  ```shell
  sudo usermod -aG groupname username
  ```

- **Remove User from a Group**:
  ```shell
  sudo deluser username groupname
  ```

- **Change User's Login Name**:
  ```shell
  sudo usermod -l new_username old_username
  ```

- **Lock or Unlock a User Account**:
  ```shell
  sudo usermod -L username   # Lock
  sudo usermod -U username   # Unlock
  ```

- **Modify User's Comment (GECOS) Field**:
  ```shell
  sudo usermod -c "New comment" username
  ```

## Conclusion

This cheat sheet covers common concepts and commands for using the `usermod` command in Linux. `usermod` is a valuable tool for modifying user account properties, making it useful for user management and access control; refer to the [`usermod` manual](https://man7.org/linux/man-pages/man8/usermod.8.html) for more in-depth information and advanced usage.
