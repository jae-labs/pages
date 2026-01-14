# lsb_release

## Introduction

This cheat sheet provides a quick reference for some common `lsb_release` commands and concepts. `lsb_release` is a command-line utility used to obtain information about the Linux distribution and release on a Linux system.

## `lsb_release` Concepts

### Display Distribution Information

`lsb_release` allows you to display various distribution-related information.

- Display the distribution name:
  ```shell
  lsb_release -i
  ```

- Display the release number:
  ```shell
  lsb_release -r
  ```

- Display the codename of the release:
  ```shell
  lsb_release -c
  ```

- Display a human-readable description of the distribution:
  ```shell
  lsb_release -d
  ```

- Display all available information:
  ```shell
  lsb_release -a
  ```

### Output Format

You can control the output format of `lsb_release` results.

- Display the information in short (one-line) format:
  ```shell
  lsb_release -si
  ```

- Display only the release number:
  ```shell
  lsb_release -sr
  ```

- Display the information in JSON format:
  ```shell
  lsb_release -j
  ```

### Check Distribution Version

You can use `lsb_release` in scripts to check the distribution version.

- Check if the distribution is Ubuntu:
  ```shell
  lsb_release -i | grep -qi "ubuntu" && echo "This is Ubuntu."
  ```

- Check the specific distribution version:
  ```shell
  if [ $(lsb_release -rs | awk -F. '{print $1}') -ge 20 ]; then
      echo "Running a version equal to or greater than Ubuntu 20.04."
  fi
  ```

## `lsb_release` Command-Line

- Display the distribution name:
  ```shell
  lsb_release -i
  ```

- Display the release number:
  ```shell
  lsb_release -r
  ```

- Display the codename of the release:
  ```shell
  lsb_release -c
  ```

- Display a human-readable description of the distribution:
  ```shell
  lsb_release -d
  ```

- Display all available information:
  ```shell
  lsb_release -a
  ```

- Display the information in short (one-line) format:
  ```shell
  lsb_release -si
  ```

- Display only the release number:
  ```shell
  lsb_release -sr
  ```

- Display the information in JSON format:
  ```shell
  lsb_release -j
  ```

## Conclusion

This cheat sheet covers some common `lsb_release` commands and concepts. `lsb_release` is a useful tool for obtaining information about the Linux distribution and release on a Linux system, making it valuable for system administration and scripting tasks; refer to the [official `lsb_release` documentation](https://manpages.ubuntu.com/manpages/hirsute/man1/lsb_release.1.html) for more in-depth information and advanced usage.
