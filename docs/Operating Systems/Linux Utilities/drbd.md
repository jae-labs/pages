# drdb

## Introduction

This cheat sheet provides a quick reference for some common `drbd` (Distributed Replicated Block Device) commands and concepts. `drbd` is a Linux kernel module and userspace utility used for replicating and mirroring block devices between multiple nodes in a cluster.

## `drbd` Concepts

### Resources

`drbd` manages data replication through resources, which represent block devices to be replicated.

- Define a new `drbd` resource:
  ```shell
  resource r0 {
    device minor;
    disk disk;
    meta-disk disk;
    on node;
    address IP:port;
  }
  ```

### Connection States

`drbd` uses connection states to represent the status of replication between nodes.

- `WFConnection`: Waiting for connection.
- `WFReportParams`: Waiting for report parameters.
- `WFBitMapS`: Waiting for bitmap synchronization.
- `Established`: Replication established.

### Resource States

Resources have various states indicating their status.

- `Unconfigured`: Resource is not configured.
- `UpToDate`: Data is up-to-date.
- `Outdated`: Data is outdated and needs synchronization.
- `Diskless`: Resource has no local storage.

### Synchronization

Synchronization is the process of ensuring data consistency between nodes.

- Start initial synchronization:
  ```shell
  drbdadm -- --overwrite-data-of-peer primary <resource>
  ```

- View synchronization progress:
  ```shell
  cat /proc/drbd
  ```

### Failover

Failover is the process of switching from one node to another in case of a failure.

- Promote a resource to primary on a node:
  ```shell
  drbdadm primary <resource>
  ```

- Promote a resource to primary and disconnect it from another node:
  ```shell
  drbdadm disconnect <resource>
  ```

## `drbd` Command-Line

- Start the `drbd` service on a node:
  ```shell
  systemctl start drbd
  ```

- Stop the `drbd` service on a node:
  ```shell
  systemctl stop drbd
  ```

- View the status of `drbd` resources:
  ```shell
  drbdadm status
  ```

- Show detailed information about a `drbd` resource:
  ```shell
  drbdadm dstate <resource>
  ```

## Conclusion

This cheat sheet covers some common `drbd` (Distributed Replicated Block Device) commands and concepts. `drbd` is a powerful tool for replicating and mirroring block devices in a cluster, ensuring high availability and data redundancy; refer to the [official `drbd` documentation](https://docs.linbit.com/drbd/latest/) for more in-depth information and advanced usage.
