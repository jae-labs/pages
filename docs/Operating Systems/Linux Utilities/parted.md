# parted

## Introduction

This cheat sheet provides a quick reference for some common `parted` commands and concepts. `parted` is a command-line utility for partitioning and managing disk partitions on Unix-like operating systems.

## `parted` Concepts

### Displaying Disk Information

You can use `parted` to display information about your disks and partitions.

- List available disks:
  ```shell
  parted --list
  ```

- Select a specific disk for further operations:
  ```shell
  parted /dev/sdX
  ```

### Partitioning Disks

`parted` allows you to create and manage partitions on disks.

- Create a new partition:
  ```shell
  mkpart [filesystem-type] [start] [end]
  ```

- Delete a partition:
  ```shell
  rm [partition-number]
  ```

- Resize a partition:
  ```shell
  resize [partition-number] [end]
  ```

- Set partition type (e.g., for EFI):
  ```shell
  set [partition-number] [type]
  ```

### Working with File Systems

After creating partitions, you can create and manage file systems on them.

- Create an ext4 file system:
  ```shell
  mkfs.ext4 /dev/sdX1
  ```

- Mount a partition:
  ```shell
  mount /dev/sdX1 /mnt/mount-point
  ```

- Unmount a partition:
  ```shell
  umount /mnt/mount-point
  ```

### Labeling and Naming Partitions

You can assign labels and names to partitions for easier identification.

- Set a label for an ext4 file system:
  ```shell
  e2label /dev/sdX1 mylabel
  ```

- Set a name for a partition (GPT only):
  ```shell
  parted /dev/sdX name [partition-number] myname
  ```

## `parted` Command-Line

- List available disks:
  ```shell
  parted --list
  ```

- Select a specific disk for further operations:
  ```shell
  parted /dev/sdX
  ```

- Create a new partition:
  ```shell
  mkpart [filesystem-type] [start] [end]
  ```

- Delete a partition:
  ```shell
  rm [partition-number]
  ```

- Resize a partition:
  ```shell
  resize [partition-number] [end]
  ```

- Set partition type (e.g., for EFI):
  ```shell
  set [partition-number] [type]
  ```

- Create an ext4 file system:
  ```shell
  mkfs.ext4 /dev/sdX1
  ```

- Mount a partition:
  ```shell
  mount /dev/sdX1 /mnt/mount-point
  ```

- Unmount a partition:
  ```shell
  umount /mnt/mount-point
  ```

- Set a label for an ext4 file system:
  ```shell
  e2label /dev/sdX1 mylabel
  ```

- Set a name for a partition (GPT only):
  ```shell
  parted /dev/sdX name [partition-number] myname
  ```

## Conclusion

This cheat sheet covers some common `parted` commands and concepts. `parted` is a useful tool for partitioning and managing disk partitions on Unix-like operating systems, making it essential for system administrators and storage management tasks; refer to the [official `parted` documentation](https://www.gnu.org/software/parted/manual/parted.html) for more in-depth information and advanced usage.
