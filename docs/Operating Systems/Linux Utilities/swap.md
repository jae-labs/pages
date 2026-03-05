# swap

## Introduction

This cheat sheet provides a quick reference for common concepts and commands related to swap space management in Linux.

## Swap Space Concepts

### What Is Swap Space?

Swap space, also known as a swap file or swap partition, is a part of the storage that is used as virtual memory when the physical RAM (Random Access Memory) is fully utilized. It allows the system to move inactive data and programs out of RAM to free up space for currently running processes.

### Checking Swap Space

Verify the amount of swap space in use and available.

- Display swap space information:
  ```shell
  swapon --show
  ```

- Check system-wide swap usage:
  ```shell
  free -h
  ```

### Creating Swap Space

You can create a new swap file or a swap partition if needed.

- Create a swap file (e.g., 2GB):
  ```shell
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  ```

- Create a swap partition using `fdisk` or `gparted` and activate it:
  ```shell
  sudo mkswap /dev/sdXN
  sudo swapon /dev/sdXN
  ```

### Disabling Swap

If necessary, you can disable swap space.

- Disable swap space:
  ```shell
  sudo swapoff -v /swapfile   # For swap file
  sudo swapoff -v /dev/sdXN    # For swap partition
  ```

### Enabling Swap at Boot

Ensure that swap space is activated at boot.

- Add the swap file or partition entry to `/etc/fstab`:
  ```
  /swapfile none swap sw 0 0    # For swap file
  /dev/sdXN none swap sw 0 0    # For swap partition
  ```

### Swappiness

Swappiness determines how aggressively the system uses swap space.

- Check swappiness value:
  ```shell
  cat /proc/sys/vm/swappiness
  ```

- Change swappiness value (e.g., set it to 10):
  ```shell
  sudo sysctl vm.swappiness=10
  ```

### Swapiness Values

- 0: Only use swap space when the RAM is fully utilized.
- 100: Use swap space as much as possible.

## Swap Space Command-Line

- Display swap space information:
  ```shell
  swapon --show
  ```

- Check system-wide swap usage:
  ```shell
  free -h
  ```

- Create a swap file (e.g., 2GB):
  ```shell
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  ```

- Create a swap partition and activate it:
  ```shell
  sudo mkswap /dev/sdXN
  sudo swapon /dev/sdXN
  ```

- Disable swap space:
  ```shell
  sudo swapoff -v /swapfile   # For swap file
  sudo swapoff -v /dev/sdXN    # For swap partition
  ```

- Add swap space to `/etc/fstab` for boot-time activation.

- Check swappiness value:
  ```shell
  cat /proc/sys/vm/swappiness
  ```

- Change swappiness value (e.g., set it to 10):
  ```shell
  sudo sysctl vm.swappiness=10
  ```

## Conclusion

This cheat sheet covers common concepts and commands for managing swap space in Linux. Swap space is crucial for ensuring system stability and performance when RAM is limited; refer to the Linux documentation or man pages for more in-depth information and advanced usage.
