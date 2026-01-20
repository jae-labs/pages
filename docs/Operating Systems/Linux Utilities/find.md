# find

## Introduction

This cheat sheet provides a quick reference for some common `find` commands and concepts. `find` is a versatile command-line utility used to search for files and directories based on various criteria on Unix-like operating systems.

## `find` Concepts

### Search Directory

`find` starts searching from a specified directory.

- Search the current directory:
  ```shell
  find . ...
  ```

- Search a specific directory:
  ```shell
  find /path/to/directory ...
  ```

### Criteria

`find` searches based on various criteria, including file names, types, modification times, and more.

- Find files by name (exact match):
  ```shell
  find . -name "filename"
  ```

- Find files by name (case insensitive):
  ```shell
  find . -iname "filename"
  ```

- Find files by type (e.g., directories):
  ```shell
  find . -type d
  ```

### Time Criteria

`find` can search based on file modification times.

- Find files modified in the last N days:
  ```shell
  find . -mtime -N
  ```

- Find files modified more than N days ago:
  ```shell
  find . -mtime +N
  ```

### Actions

`find` can perform actions on the found files, such as printing or deleting them.

- Print matching files:
  ```shell
  find . -name "filename" -print
  ```

- Delete matching files (use with caution):
  ```shell
  find . -name "filename" -delete
  ```

### Combining Criteria

You can combine multiple criteria using logical operators.

- Find files with a specific name and extension:
  ```shell
  find . -name "*.txt"
  ```

- Find files modified in the last N days with a specific name:
  ```shell
  find . -name "filename" -mtime -N
  ```

## `find` Command-Line

- Search for files by name in the current directory:
  ```shell
  find . -name "filename"
  ```

- Search for directories modified in the last 7 days:
  ```shell
  find . -type d -mtime -7
  ```

- Delete all files with a specific extension:
  ```shell
  find . -name "*.tmp" -delete
  ```

## Conclusion

This cheat sheet covers some common `find` commands and concepts. `find` is a powerful tool for searching for files and directories based on various criteria; refer to the [official `find` documentation](https://man7.org/linux/man-pages/man1/find.1.html) for more in-depth information and advanced usage.
