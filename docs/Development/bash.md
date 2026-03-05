# Bash

## Introduction

This cheat sheet provides a quick reference for some common Bash scripting commands and concepts. Bash is a popular Unix shell used for writing and executing shell scripts.

## Basic Script Structure

A typical Bash script has the following structure:

```bash
#!/bin/bash
# Comments and explanations
# ...

# Variables
variable_name="value"

# Command execution
command1
command2

# Conditional statements
if [ condition ]; then
  # Commands to execute if condition is true
fi

# Loops
for item in list; do
  # Commands to execute for each item
done

# Functions
function_name() {
  # Commands inside the function
}
```

## Variables

- Declare and assign a value to a variable:
  ```bash
  variable_name="value"
  ```

- Access the value of a variable:
  ```bash
  echo $variable_name
  ```

- Use double quotes for variables containing spaces:
  ```bash
  greeting="Hello, world!"
  echo "$greeting"
  ```

## Command Execution

- Run a command:
  ```bash
  command_name
  ```

- Capture the output of a command:
  ```bash
  result=$(command_name)
  ```

- Redirect output to a file:
  ```bash
  command_name > output.txt
  ```

## Conditional Statements

- Use `if` statements for conditional execution:
  ```bash
  if [ condition ]; then
    # Commands to execute if condition is true
  fi
  ```

- Example: Check if a file exists:
  ```bash
  if [ -e file.txt ]; then
    echo "File exists."
  fi
  ```

## Loops

- Use `for` loops to iterate over a list:
  ```bash
  for item in item1 item2 item3; do
    # Commands to execute for each item
  done
  ```

- Example: Iterate through files in a directory:
  ```bash
  for file in *; do
    echo "Processing $file"
  done
  ```

## Functions

- Define a function:
  ```bash
  function_name() {
    # Commands inside the function
  }
  ```

- Call a function:
  ```bash
  function_name
  ```

- Pass arguments to a function:
  ```bash
  function_with_args() {
    arg1=$1
    arg2=$2
    echo "Arg1: $arg1, Arg2: $arg2"
  }
  function_with_args value1 value2
  ```

## Comments

- Add comments to your script using `#`:
  ```bash
  # This is a comment
  ```

## Special Variables

- `$0`: The name of the script.
- `$1`, `$2`, ...: Command-line arguments passed to the script.
- `$#`: The number of command-line arguments.
- `$?`: The exit status of the last command.
- `$$`: The process ID of the script.

## Conclusion

This cheat sheet covers some common Bash scripting commands and concepts. Bash scripting provides extensive capabilities; refer to the [Bash documentation](https://www.gnu.org/software/bash/manual/bash.html) for more in-depth information and advanced usage.
