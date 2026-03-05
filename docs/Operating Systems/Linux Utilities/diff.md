# diff

## Introduction

This cheat sheet provides a quick reference for some common `diff` (file comparison) commands and concepts. `diff` is a command-line utility used to compare files and highlight the differences between them, typically line by line.

## `diff` Concepts

### Comparison Modes

`diff` can be used in various modes, including unified and context modes.

- Unified format (default):
  ```shell
  diff file1 file2
  ```

- Context format:
  ```shell
  diff -c file1 file2
  ```

### Output Format

`diff` can generate output in various formats, including side-by-side and unified formats.

- Side-by-side format:
  ```shell
  diff -y file1 file2
  ```

- Unified format:
  ```shell
  diff -u file1 file2
  ```

### Ignore Whitespace

You can instruct `diff` to ignore whitespace differences.

- Ignore all whitespace changes:
  ```shell
  diff -w file1 file2
  ```

### Recursive Comparison

`diff` can be used to compare directories recursively.

- Compare two directories:
  ```shell
  diff -r directory1 directory2
  ```

### Patching

`diff` can generate patch files that represent the differences between two files.

- Create a patch file from differences:
  ```shell
  diff -u original_file modified_file > patch_file.patch
  ```

- Apply a patch file to a file:
  ```shell
  patch -p1 < patch_file.patch
  ```

### Ignore Case

You can make `diff` ignore case when comparing files.

- Ignore case when comparing:
  ```shell
  diff -i file1 file2
  ```

## `diff` Command-Line

- Compare two files and display the differences:
  ```shell
  diff file1 file2
  ```

- Compare two directories and display the differences:
  ```shell
  diff -r directory1 directory2
  ```

- Generate a patch file from differences:
  ```shell
  diff -u original_file modified_file > patch_file.patch
  ```

- Apply a patch file to a file:
  ```shell
  patch -p1 < patch_file.patch
  ```

- Compare files while ignoring whitespace differences:
  ```shell
  diff -w file1 file2
  ```

- Compare files while ignoring case differences:
  ```shell
  diff -i file1 file2
  ```

## Conclusion

This cheat sheet covers some common `diff` (File Comparison) commands and concepts. `diff` is a versatile command-line utility for comparing and highlighting differences between files and directories; refer to the [official `diff` documentation](https://man7.org/linux/man-pages/man1/diff.1.html) for more in-depth information and advanced usage.
