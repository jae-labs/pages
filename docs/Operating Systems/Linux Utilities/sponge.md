# sponge

## Introduction

This cheat sheet provides a quick reference for some common `sponge` commands and concepts. `sponge` is a utility provided by the `moreutils` package on Unix-like operating systems. It is used to soak up standard input and write it to a file, making it useful for editing files in-place without intermediate files.

## `sponge` Concepts

### Basic `sponge` Usage

`Sponge` reads from standard input and writes to a file, allowing you to edit files in-place without using temporary files.

- Edit a file in-place using `sponge`:
  ```shell
  command_that_generates_output | sponge filename
  ```

- Append to a file using `sponge`:
  ```shell
  command_that_generates_output | sponge -a filename
  ```

### Common Use Cases

`Sponge` is often used in combination with other text-processing utilities.

- Edit a text file in-place using `sponge`:
  ```shell
  sed 's/old-text/new-text/' filename | sponge filename
  ```

- Remove lines containing a specific pattern from a file using `sponge`:
  ```shell
  grep -v 'pattern' filename | sponge filename
  ```

- Sort a file in-place using `sponge`:
  ```shell
  sort filename | sponge filename
  ```

### Backup Files

To create a backup of the original file before using `sponge`, you can use the `-b` option.

- Edit a file in-place and create a backup:
  ```shell
  command_that_generates_output | sponge -b filename
  ```

### Multiple Input Files

You can use `sponge` to merge the output of multiple commands into one file.

- Merge the output of two commands into a single file:
  ```shell
  command1 | command2 | sponge outputfile
  ```

## `sponge` Command-Line

- Edit a file in-place using `sponge`:
  ```shell
  command_that_generates_output | sponge filename
  ```

- Append to a file using `sponge`:
  ```shell
  command_that_generates_output | sponge -a filename
  ```

- Edit a text file in-place using `sponge`:
  ```shell
  sed 's/old-text/new-text/' filename | sponge filename
  ```

- Remove lines containing a specific pattern from a file using `sponge`:
  ```shell
  grep -v 'pattern' filename | sponge filename
  ```

- Sort a file in-place using `sponge`:
  ```shell
  sort filename | sponge filename
  ```

- Edit a file in-place and create a backup:
  ```shell
  command_that_generates_output | sponge -b filename
  ```

- Merge the output of two commands into a single file:
  ```shell
  command1 | command2 | sponge outputfile
  ```

## Conclusion

This cheat sheet covers some common `sponge` commands and concepts. `sponge` is a valuable tool for editing files in-place and for merging the output of multiple commands into a single file, making it useful for various text-processing tasks; refer to the [`sponge` manual](https://manpages.debian.org/buster/moreutils/sponge.1.en.html) for more in-depth information and advanced usage.
