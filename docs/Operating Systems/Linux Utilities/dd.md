# dd

## Introduction

This cheat sheet provides a quick reference for some common `dd` (data duplication) commands and concepts. `dd` is a versatile command-line utility used for copying and converting files, as well as for creating disk images on Unix-like operating systems.

## `dd` Concepts

### Input and Output

`dd` uses input and output options to specify the source and destination of data.

- Input file (source):
  ```shell
  if=input_file
  ```

- Output file (destination):
  ```shell
  of=output_file
  ```

### Block Size and Count

You can specify the block size and count to control how data is read and written.

- Block size (bytes):
  ```shell
  bs=block_size
  ```

- Block count (number of blocks):
  ```shell
  count=block_count
  ```

### Skip and Seek

`dd` allows you to skip input data or seek to a specific position in the input data.

- Skip N blocks from the input:
  ```shell
  skip=N
  ```

- Seek N blocks from the beginning of the output:
  ```shell
  seek=N
  ```

### Status

`dd` can display progress information, including the number of records in and out.

- Show progress (send a signal to `dd` process):
  ```shell
  status=progress
  ```

### Conversions

You can use `conv` to perform conversions on the data during copying.

- Convert ASCII to EBCDIC:
  ```shell
  conv=ebcdic
  ```

- Convert EBCDIC to ASCII:
  ```shell
  conv=ascii
  ```

### Disk Images

`dd` is commonly used to create disk images.

- Create a disk image of a device:
  ```shell
  dd if=/dev/source_device of=disk_image.img bs=4M
  ```

## `dd` Command-Line

- Copy data from one file to another:
  ```shell
  dd if=input_file of=output_file bs=block_size count=block_count
  ```

- Create a disk image from a device:
  ```shell
  dd if=/dev/source_device of=disk_image.img bs=block_size
  ```

- Show progress while copying:
  ```shell
  dd if=input_file of=output_file bs=block_size count=block_count status=progress
  ```

- Convert file format from ASCII to EBCDIC:
  ```shell
  dd if=input_file of=output_file conv=ebcdic
  ```

- Securely erase a disk with random data:
  ```shell
  dd if=/dev/urandom of=/dev/target_device bs=4M status=progress
  ```

## Conclusion

This cheat sheet covers some common `dd` (Data Duplication) commands and concepts. `dd` is a powerful command-line utility for copying, converting, and creating disk images; refer to the [official `dd` documentation](https://man7.org/linux/man-pages/man1/dd.1.html) for more in-depth information and advanced usage.
