# awk

## Introduction

This cheat sheet provides a quick reference for some common `awk` commands and concepts. `awk` is a powerful text-processing tool used in Unix-like operating systems for data extraction and manipulation.

## AWK Concepts

### Basic Structure

An AWK script consists of patterns and actions. When a pattern matches a line of input, the associated action is executed.

```shell
pattern { action }
```

### Fields

AWK divides input lines into fields, which are separated by whitespace (by default). You can access fields using `$1`, `$2`, and so on.

- Print the first field of each line:
  ```shell
  awk '{ print $1 }' file.txt
  ```

### Built-in Variables

AWK provides several built-in variables, such as `NF` (number of fields) and `NR` (record number).

- Print the number of fields in each line:
  ```shell
  awk '{ print NF }' file.txt
  ```

### Regular Expressions

AWK supports regular expressions for pattern matching.

- Print lines containing the word "pattern":
  ```shell
  awk '/pattern/ { print }' file.txt
  ```

### BEGIN and END Blocks

The `BEGIN` block is executed before processing any input, and the `END` block is executed after processing all input.

- Calculate the sum of values in a column:
  ```shell
  awk 'BEGIN { sum = 0 } { sum += $1 } END { print sum }' file.txt
  ```

### Conditional Statements

AWK supports conditional statements like `if` and `else`.

- Print lines with values greater than a threshold:
  ```shell
  awk '{ if ($1 > threshold) print }' file.txt
  ```

### Functions

AWK provides built-in functions for string and numeric operations.

- Convert all text to uppercase:
  ```shell
  awk '{ print toupper($0) }' file.txt
  ```

### User-Defined Variables

You can define and use user-defined variables in AWK scripts.

- Print the sum of values and a custom message:
  ```shell
  awk '{ sum += $1 } END { print "Sum:", sum }' file.txt
  ```

## AWK Command-Line

- Execute an AWK script from a file:
  ```shell
  awk -f script.awk file.txt
  ```

- Print specific fields from a file (space-separated):
  ```shell
  awk '{ print $1, $3 }' file.txt
  ```

- Process multiple input files:
  ```shell
  awk '{ print FILENAME, $0 }' file1.txt file2.txt
  ```

## Conclusion

This cheat sheet covers some common `awk` commands and concepts. `awk` is a versatile text-processing tool for data extraction and manipulation in Unix-like environments; refer to the [official AWK documentation](https://www.gnu.org/software/gawk/manual/gawk.html) for more in-depth information and advanced usage.
