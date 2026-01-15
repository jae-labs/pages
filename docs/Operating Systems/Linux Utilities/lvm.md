# lvm

## Introduction

This cheat sheet provides a quick reference for some common `LVM` (Logical Volume Manager) commands and concepts. `LVM` is a command-line utility used for managing logical volumes and volume groups on Linux systems.

## `LVM` Concepts

### Physical Volumes (PV)

Physical volumes are physical storage devices (e.g., hard drives or partitions) used to create logical volumes.

- Display a list of physical volumes:
  ```shell
  pvdisplay
  ```

- Create a physical volume:
  ```shell
  pvcreate /dev/sdX
  ```

### Volume Groups (VG)

Volume groups are logical containers that can consist of one or more physical volumes.

- Display a list of volume groups:
  ```shell
  vgdisplay
  ```

- Create a volume group:
  ```shell
  vgcreate myvg /dev/sdX
  ```

### Logical Volumes (LV)

Logical volumes are partitions created within volume groups.

- Display a list of logical volumes:
  ```shell
  lvdisplay
  ```

- Create a logical volume:
  ```shell
  lvcreate -L 10G -n mylv myvg
  ```

### Resize Operations

You can resize physical volumes, volume groups, and logical volumes.

- Resize a physical volume:
  ```shell
  pvresize /dev/sdX
  ```

- Resize a volume group:
  ```shell
  vgextend myvg /dev/sdY
  ```

- Resize a logical volume:
  ```shell
  lvresize -L +2G /dev/myvg/mylv
  ```

### Mounting and Filesystems

After creating a logical volume, you can format it with a filesystem and mount it.

- Format a logical volume with ext4:
  ```shell
  mkfs.ext4 /dev/myvg/mylv
  ```

- Mount a logical volume:
  ```shell
  mount /dev/myvg/mylv /mnt/mylv
  ```

## `LVM` Command-Line

- Display a list of physical volumes:
  ```shell
  pvdisplay
  ```

- Create a physical volume:
  ```shell
  pvcreate /dev/sdX
  ```

- Display a list of volume groups:
  ```shell
  vgdisplay
  ```

- Create a volume group:
  ```shell
  vgcreate myvg /dev/sdX
  ```

- Display a list of logical volumes:
  ```shell
  lvdisplay
  ```

- Create a logical volume:
  ```shell
  lvcreate -L 10G -n mylv myvg
  ```

- Resize a physical volume:
  ```shell
  pvresize /dev/sdX
  ```

- Resize a volume group:
  ```shell
  vgextend myvg /dev/sdY
  ```

- Resize a logical volume:
  ```shell
  lvresize -L +2G /dev/myvg/mylv
  ```

- Format a logical volume with ext4:
  ```shell
  mkfs.ext4 /dev/myvg/mylv
  ```

- Mount a logical volume:
  ```shell
  mount /dev/myvg/mylv /mnt/mylv
  ```

## Conclusion

This cheat sheet covers some common `LVM` (Logical Volume Manager) commands and concepts. `LVM` is a powerful tool for managing logical volumes and volume groups on Linux systems, making it useful for storage management and partitioning tasks; refer to the [official `LVM` documentation](https://tldp.org/HOWTO/LVM-HOWTO/) for more in-depth information and advanced usage.
