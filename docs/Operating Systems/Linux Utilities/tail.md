# tail

## Introduction

This cheat sheet provides a quick reference for common concepts and commands related to the `tail` command in Linux. `tail` is used to display the last few lines of a text file, making it particularly useful for log files and real-time monitoring.

## `tail` Concepts

### Basic Usage

`tail` is primarily used for displaying the last few lines of a file.

- Display the last 10 lines of a file (default):
  ```shell
  tail filename
  ```

- Display a specific number of lines from the end of a file (e.g., 20 lines):
  ```shell
  tail -n 20 filename
  ```

- Continuously display new lines as they are added to a file (real-time monitoring):
  ```shell
  tail -f filename
  ```

### Displaying Lines in Reverse

You can use `tac` and `tail` together to display lines in reverse order.

- Display the last 10 lines of a file in reverse order:
  ```shell
  tac filename | tail -n 10
  ```

### Following Multiple Files

`tail` can follow multiple files simultaneously.

- Monitor multiple files simultaneously:
  ```shell
  tail -f file1 file2
  ```

### Using `grep` with `tail`

You can combine `tail` with `grep` to filter specific lines from the output.

- Display lines containing a specific keyword from a file (e.g., "error"):
  ```shell
  tail -f filename | grep "error"
  ```

## `tail` Command-Line

- Display the last 10 lines of a file (default):
  ```shell
  tail filename
  ```

- Display a specific number of lines from the end of a file (e.g., 20 lines):
  ```shell
  tail -n 20 filename
  ```

- Continuously display new lines as they are added to a file (real-time monitoring):
  ```shell
  tail -f filename
  ```

- Display the last 10 lines of a file in reverse order:
  ```shell
  tac filename | tail -n 10
  ```

- Monitor multiple files simultaneously:
  ```shell
  tail -f file1 file2
  ```

- Display lines containing a specific keyword from a file (e.g., "error"):
  ```shell
  tail -f filename | grep "error"
  ```

## Conclusion

This cheat sheet covers common concepts and commands for using the `tail` command in Linux. `tail` is a valuable tool for viewing the last few lines of files, making it useful for log analysis and real-time monitoring; refer to the [`tail` manual](https://man7.org/linux/man-pages/man1/tail.1.html) for more in-depth information and advanced usage.
