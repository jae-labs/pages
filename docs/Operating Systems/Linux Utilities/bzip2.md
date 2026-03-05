# bzip2

## Introduction

This cheat sheet provides a quick reference for some common Bzip2 commands and concepts. Bzip2 is a compression utility used to compress and decompress files. It's known for its high compression ratio and efficiency.

## Installation

Bzip2 is usually pre-installed on most Unix-like systems. To check if it's installed, you can run:

```shell
bzip2 --version
```

If it's not installed, you can install it using your system's package manager (e.g., `apt`, `yum`, or `brew`).

## Bzip2 Concepts

### Compression

Bzip2 is primarily used for compressing files and reducing their size.

- Compress a file:
  ```shell
  bzip2 file.txt
  ```

- Compress a file and specify the compression level (1-9):
  ```shell
  bzip2 -9 file.txt
  ```

### Decompression

To decompress Bzip2-compressed files:

- Decompress a file:
  ```shell
  bzip2 -d compressed_file.bz2
  ```

- Decompress a file and keep the original compressed file:
  ```shell
  bzip2 -dk compressed_file.bz2
  ```

### Compression with Tar

Bzip2 is often used in combination with `tar` to create compressed archive files.

- Create a Bzip2-compressed Tar archive:
  ```shell
  tar cvjf archive.tar.bz2 directory/
  ```

### Viewing Compression Information

To view information about a Bzip2-compressed file:

- View compression details:
  ```shell
  bzcat compressed_file.bz2 | file -
  ```

### Compression Ratio

You can calculate the compression ratio of a Bzip2-compressed file.

- Determine the compression ratio of a file:
  ```shell
  original_size=$(wc -c < original_file)
  compressed_size=$(wc -c < compressed_file.bz2)
  compression_ratio=$(bc -l <<< "scale=2; ($original_size - $compressed_size) / $original_size * 100")
  echo "Compression ratio: $compression_ratio%"
  ```

## Conclusion

This cheat sheet covers some common Bzip2 commands and concepts. Bzip2 is a powerful compression utility used to reduce file sizes efficiently; refer to the [official Bzip2 documentation](http://www.bzip.org/) for more in-depth information and advanced usage.
