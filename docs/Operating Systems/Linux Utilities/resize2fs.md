# resize2fs

## Introduction

This cheat sheet provides a quick reference for some common `resize2fs` commands and concepts. `resize2fs` is a command-line tool used to resize ext2, ext3, and ext4 file systems on Linux.

## `resize2fs` Concepts

### Resizing File Systems

`resize2fs` allows you to resize ext2, ext3, and ext4 file systems.

- Resize a file system to a specific size:
  ```shell
  resize2fs /dev/sdX1 [new_size]
  ```

- Resize a file system to fill the entire partition:
  ```shell
  resize2fs /dev/sdX1
  ```

- Check the file system for errors:
  ```shell
  e2fsck -f /dev/sdX1
  ```

- Resize a mounted file system (requires the file system to be mounted read-only or remounted read-only after `e2fsck`):
  ```shell
  resize2fs -M /dev/sdX1
  ```

### Expanding LVM Logical Volumes

`resize2fs` is often used in conjunction with LVM (Logical Volume Management) to expand logical volumes and their associated file systems.

- Expand an LVM logical volume (LV):
  ```shell
  lvextend -l +100%FREE /dev/myvg/mylv
  ```

- Resize the file system on an LVM LV:
  ```shell
  resize2fs /dev/myvg/mylv
  ```

### Shrinking File Systems

You can also shrink ext2, ext3, and ext4 file systems with `resize2fs`, but this is a more complex operation and requires careful planning.

- Shrink a file system to a specific size:
  ```shell
  resize2fs /dev/sdX1 [new_size]
  ```

- Shrink an LVM logical volume (LV) and file system:
  ```shell
  resize2fs /dev/myvg/mylv [new_size]
  lvreduce -L [new_size] /dev/myvg/mylv
  ```

## `resize2fs` Command-Line

- Resize a file system to a specific size:
  ```shell
  resize2fs /dev/sdX1 [new_size]
  ```

- Resize a file system to fill the entire partition:
  ```shell
  resize2fs /dev/sdX1
  ```

- Check the file system for errors:
  ```shell
  e2fsck -f /dev/sdX1
  ```

- Resize a mounted file system (requires the file system to be mounted read-only or remounted read-only after `e2fsck`):
  ```shell
  resize2fs -M /dev/sdX1
  ```

## Conclusion

This cheat sheet covers some common `resize2fs` commands and concepts. `resize2fs` is a valuable tool for resizing ext2, ext3, and ext4 file systems on Linux, making it essential for system administrators and storage management tasks; refer to the [official `resize2fs` manual](https://linux.die.net/man/8/resize2fs) for more in-depth information and advanced usage.
