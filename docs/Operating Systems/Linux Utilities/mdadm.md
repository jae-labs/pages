# mdadm

## Introduction

This cheat sheet provides a quick reference for some common `mdadm` (Multiple Device Administrator) commands and concepts. `mdadm` is a command-line utility used to manage software RAID (Redundant Array of Independent Disks) on Linux systems.

## `mdadm` Concepts

### Creating RAID Arrays

You can use `mdadm` to create RAID arrays.

- Create a RAID 1 (mirrored) array:
  ```shell
  mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdX1 /dev/sdX2
  ```

- Create a RAID 5 (striped with parity) array:
  ```shell
  mdadm --create /dev/md1 --level=5 --raid-devices=3 /dev/sdX1 /dev/sdX2 /dev/sdX3
  ```

### Managing RAID Arrays

`mdadm` allows you to manage RAID arrays, including starting, stopping, and monitoring them.

- Start a RAID array:
  ```shell
  mdadm --assemble /dev/md0
  ```

- Stop a RAID array:
  ```shell
  mdadm --stop /dev/md0
  ```

- Monitor RAID array status:
  ```shell
  mdadm --detail /dev/md0
  ```

### Adding and Removing Drives

You can add or remove drives from a RAID array.

- Add a drive to a RAID array:
  ```shell
  mdadm --add /dev/md0 /dev/sdX3
  ```

- Remove a drive from a RAID array:
  ```shell
  mdadm --remove /dev/md0 /dev/sdX3
  ```

### Managing Failures

`mdadm` can handle drive failures and rebuild RAID arrays.

- Mark a drive as failed:
  ```shell
  mdadm --fail /dev/md0 /dev/sdX2
  ```

- Remove a failed drive from the array:
  ```shell
  mdadm --remove /dev/md0 /dev/sdX2
  ```

- Replace a failed drive with a new one:
  ```shell
  mdadm --replace /dev/md0 /dev/sdX2 /dev/sdX4
  ```

## `mdadm` Command-Line

- Create a RAID 1 (mirrored) array:
  ```shell
  mdadm --create /dev/md0 --level=1 --raid-devices=2 /dev/sdX1 /dev/sdX2
  ```

- Start a RAID array:
  ```shell
  mdadm --assemble /dev/md0
  ```

- Stop a RAID array:
  ```shell
  mdadm --stop /dev/md0
  ```

- Monitor RAID array status:
  ```shell
  mdadm --detail /dev/md0
  ```

- Add a drive to a RAID array:
  ```shell
  mdadm --add /dev/md0 /dev/sdX3
  ```

- Remove a drive from a RAID array:
  ```shell
  mdadm --remove /dev/md0 /dev/sdX3
  ```

- Mark a drive as failed:
  ```shell
  mdadm --fail /dev/md0 /dev/sdX2
  ```

- Remove a failed drive from the array:
  ```shell
  mdadm --remove /dev/md0 /dev/sdX2
  ```

- Replace a failed drive with a new one:
  ```shell
  mdadm --replace /dev/md0 /dev/sdX2 /dev/sdX4
  ```

## Conclusion

This cheat sheet covers some common `mdadm` (Multiple Device Administrator) commands and concepts. `mdadm` is a powerful tool for managing software RAID arrays on Linux systems, providing redundancy and fault tolerance for data storage; refer to the [official `mdadm` documentation](https://linux.die.net/man/8/mdadm) for more in-depth information and advanced usage.
