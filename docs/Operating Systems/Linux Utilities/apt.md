# apt

## Introduction

This cheat sheet provides a quick reference for some common `apt` commands and concepts. `apt` (Advanced Package Tool) is a package management tool used on Debian-based Linux distributions to install, update, and manage software packages.

## Package Management

### Update Package Lists

To update the local package lists to ensure they are current:

```shell
sudo apt update
```

### Upgrade Packages

To upgrade all installed packages to their latest versions:

```shell
sudo apt upgrade
```

### Upgrade Distribution

To upgrade the entire distribution to a new release (use with caution):

```shell
sudo apt dist-upgrade
```

### Install Packages

To install a package or packages:

```shell
sudo apt install package_name
```

### Remove Packages

To remove a package but keep its configuration files:

```shell
sudo apt remove package_name
```

To remove a package along with its configuration files:

```shell
sudo apt purge package_name
```

### Search Packages

To search for packages containing a specific keyword in their name or description:

```shell
apt search keyword
```

### List Installed Packages

To list all installed packages:

```shell
dpkg --list
```

## Package Information

### Show Package Information

To display detailed information about a package, including its description and dependencies:

```shell
apt show package_name
```

### List Installed Files

To list all files installed by a package:

```shell
dpkg -L package_name
```

## Repository Management

### Add Repository

To add a new repository to the list of sources:

```shell
sudo add-apt-repository repository_url
```

### Remove Repository

To remove a repository from the list of sources:

```shell
sudo add-apt-repository --remove repository_url
```

### Update Repository Lists

After adding or removing repositories, update the package lists:

```shell
sudo apt update
```

## Miscellaneous

### Clean Package Cache

To remove all cached package files from the system:

```shell
sudo apt clean
```

### Autoremove

To remove packages that were installed as dependencies but are no longer needed:

```shell
sudo apt autoremove
```

### Check Dependencies

To check for broken dependencies:

```shell
sudo apt --fix-broken install
```

## Conclusion

This cheat sheet covers some common `apt` commands and concepts for package management on Debian-based Linux distributions. `apt` is a powerful tool for installing, updating, and managing software packages; refer to the [official `apt` documentation](https://manpages.debian.org/jessie/apt/apt.8.en.html) for more in-depth information and advanced usage.
