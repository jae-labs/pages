# sed

## Introduction

This cheat sheet provides a quick reference for some common `sed` (stream editor) commands and concepts. `sed` is a powerful text manipulation tool in Unix-like operating systems.

## `sed` Concepts

### Basic `sed` Usage

`sed` is used to perform text transformations on input text (a file or input stream) using a set of commands.

- Replace text in a file and print the result:
  ```shell
  sed 's/old-text/new-text/' file.txt
  ```

- Replace text in a file and save the changes in-place:
  ```shell
  sed -i 's/old-text/new-text/' file.txt
  ```

- Replace text globally (all occurrences):
  ```shell
  sed 's/old-text/new-text/g' file.txt
  ```

### Regular Expressions

`sed` uses regular expressions for pattern matching and manipulation.

- Use a regular expression as a pattern:
  ```shell
  sed '/pattern/s/old-text/new-text/' file.txt
  ```

- Match lines that start with a pattern:
  ```shell
  sed '/^start/s/old-text/new-text/' file.txt
  ```

- Match lines that end with a pattern:
  ```shell
  sed '/end$/s/old-text/new-text/' file.txt
  ```

### Addressing Lines

You can specify line addresses to target specific lines in a file.

- Apply the `s` command to lines 1 to 5:
  ```shell
  sed '1,5 s/old-text/new-text/' file.txt
  ```

- Apply the `s` command to lines matching a pattern:
  ```shell
  sed '/pattern/ s/old-text/new-text/' file.txt
  ```

### Reading from Files

`sed` can read commands from a file.

- Read `sed` commands from a file and apply them:
  ```shell
  sed -f script.sed input.txt
  ```

### Deleting Lines

`sed` can delete lines from a file.

- Delete lines matching a pattern:
  ```shell
  sed '/pattern/d' file.txt
  ```

- Delete lines between two patterns (inclusive):
  ```shell
  sed '/start/,/end/d' file.txt
  ```

## `sed` Command-Line

- Replace text in a file and print the result:
  ```shell
  sed 's/old-text/new-text/' file.txt
  ```

- Replace text in a file and save the changes in-place:
  ```shell
  sed -i 's/old-text/new-text/' file.txt
  ```

- Replace text globally (all occurrences):
  ```shell
  sed 's/old-text/new-text/g' file.txt
  ```

- Use a regular expression as a pattern:
  ```shell
  sed '/pattern/s/old-text/new-text/' file.txt
  ```

- Match lines that start with a pattern:
  ```shell
  sed '/^start/s/old-text/new-text/' file.txt
  ```

- Apply the `s` command to lines 1 to 5:
  ```shell
  sed '1,5 s/old-text/new-text/' file.txt
  ```

- Read `sed` commands from a file and apply them:
  ```shell
  sed -f script.sed input.txt
  ```

- Delete lines matching a pattern:
  ```shell
  sed '/pattern/d' file.txt
  ```

- Delete lines between two patterns (inclusive):
  ```shell
  sed '/start/,/end/d' file.txt
  ```

## Conclusion

This cheat sheet covers some common `sed` (stream editor) commands and concepts. `sed` is a versatile text manipulation tool, making it essential for text processing and editing tasks; refer to the [GNU `sed` documentation](https://www.gnu.org/software/sed/manual/sed.html) for more in-depth information and advanced usage.
