# grep

## Introduction

This cheat sheet provides a quick reference for some common `grep` (Global Regular Expression Print) commands and concepts. `grep` is a command-line utility used for searching and matching text patterns within files on Unix-like operating systems.

## `grep` Concepts

### Basic Usage

`grep` searches for a specified pattern in text files.

- Search for a pattern in a file:
  ```shell
  grep pattern file
  ```

- Search for a pattern in multiple files:
  ```shell
  grep pattern file1 file2
  ```

### Regular Expressions

`grep` supports regular expressions for advanced pattern matching.

- Search using a basic regular expression:
  ```shell
  grep -G pattern file
  ```

- Search using an extended regular expression:
  ```shell
  grep -E pattern file
  ```

### Case Insensitive Search

`grep` can perform case-insensitive searches.

- Perform a case-insensitive search:
  ```shell
  grep -i pattern file
  ```

### Invert Match

`grep` can invert the match, displaying lines that do not contain the pattern.

- Display lines that do not contain the pattern:
  ```shell
  grep -v pattern file
  ```

### Line Numbers

`grep` can display line numbers for matched lines.

- Display line numbers for matched lines:
  ```shell
  grep -n pattern file
  ```

### Recursive Search

`grep` can perform recursive searches in directories.

- Recursively search for a pattern in directories:
  ```shell
  grep -r pattern directory
  ```

### Count Matches

`grep` can count the number of matches.

- Count the number of matches:
  ```shell
  grep -c pattern file
  ```

## `grep` Command-Line

- Search for a pattern in a file:
  ```shell
  grep pattern file
  ```

- Search for a pattern case-insensitively:
  ```shell
  grep -i pattern file
  ```

- Display line numbers for matched lines:
  ```shell
  grep -n pattern file
  ```

- Recursively search for a pattern in directories:
  ```shell
  grep -r pattern directory
  ```

- Count the number of matches:
  ```shell
  grep -c pattern file
  ```

## Conclusion

This cheat sheet covers some common `grep` (Global Regular Expression Print) commands and concepts. `grep` is a powerful tool for searching and matching text patterns within files, making it useful for tasks like log analysis and text processing; refer to the [official `grep` documentation](https://man7.org/linux/man-pages/man1/grep.1.html) for more in-depth information and advanced usage.
