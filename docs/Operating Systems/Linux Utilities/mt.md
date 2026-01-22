# mt

## Introduction

This cheat sheet provides a quick reference for some common `mt` (Magnetic Tape Control) commands and concepts. `mt` is a command-line utility used to control and manipulate magnetic tape drives on Unix-like operating systems.

## `mt` Concepts

### Device Identification

`mt` requires specifying the tape drive device as an argument.

- Identify the tape drive device:
  ```shell
  mt -f /dev/st0 status
  ```

### Tape Movement

You can use `mt` to move the tape forward, backward, rewind, and more.

- Rewind the tape:
  ```shell
  mt -f /dev/st0 rewind
  ```

- Move the tape forward by a specified number of files:
  ```shell
  mt -f /dev/st0 fsf 3
  ```

- Move the tape backward by a specified number of files:
  ```shell
  mt -f /dev/st0 bsf 2
  ```

### Tape Status

`mt` provides information about the tape drive and current tape status.

- Display the status of the tape drive:
  ```shell
  mt -f /dev/st0 status
  ```

### Tape Marks

You can write and skip tape marks.

- Write a file tape mark:
  ```shell
  mt -f /dev/st0 weof
  ```

- Skip a file tape mark:
  ```shell
  mt -f /dev/st0 eof
  ```

### Tape Density

`mt` allows you to set tape density.

- Set the tape density to 6250 BPI:
  ```shell
  mt -f /dev/st0 density 6250
  ```

## `mt` Command-Line

- Identify the tape drive device:
  ```shell
  mt -f /dev/st0 status
  ```

- Rewind the tape:
  ```shell
  mt -f /dev/st0 rewind
  ```

- Move the tape forward by a specified number of files:
  ```shell
  mt -f /dev/st0 fsf 3
  ```

- Move the tape backward by a specified number of files:
  ```shell
  mt -f /dev/st0 bsf 2
  ```

- Display the status of the tape drive:
  ```shell
  mt -f /dev/st0 status
  ```

- Write a file tape mark:
  ```shell
  mt -f /dev/st0 weof
  ```

- Skip a file tape mark:
  ```shell
  mt -f /dev/st0 eof
  ```

- Set the tape density to 6250 BPI:
  ```shell
  mt -f /dev/st0 density 6250
  ```

## Conclusion

This cheat sheet covers some common `mt` (Magnetic Tape Control) commands and concepts. `mt` is a useful tool for controlling and managing magnetic tape drives on Unix-like operating systems, making it valuable for backup and archival tasks; refer to the [official `mt` documentation](https://manpages.ubuntu.com/manpages/hirsute/man1/mt-st.1.html) for more in-depth information and advanced usage.
