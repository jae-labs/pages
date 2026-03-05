# jq

## Introduction

This cheat sheet provides a quick reference for some common `jq` commands and concepts. `jq` is a command-line utility used for processing and manipulating JSON data.

## `jq` Concepts

### Selecting Data

`jq` allows you to select specific data from JSON.

- Select a specific field:
  ```shell
  jq '.field_name' input.json
  ```

- Select nested fields:
  ```shell
  jq '.parent_field.child_field' input.json
  ```

### Filtering Data

You can filter JSON data based on conditions.

- Filter data by a specific condition:
  ```shell
  jq '.[] | select(.field_name == "value")' input.json
  ```

- Filter data by array elements:
  ```shell
  jq '.array_field[] | select(.field_name == "value")' input.json
  ```

### Modifying Data

`jq` allows you to modify JSON data.

- Update a field:
  ```shell
  jq '.field_name = "new_value"' input.json
  ```

- Add a new field:
  ```shell
  jq '.new_field = "value"' input.json
  ```

### Arrays

You can work with arrays in JSON.

- Get the length of an array:
  ```shell
  jq 'length' input.json
  ```

- Iterate over array elements:
  ```shell
  jq '.[]' input.json
  ```

### Pipes

You can pipe multiple `jq` operations together.

- Chain multiple operations:
  ```shell
  jq '.field | .[] | select(.value > 10)' input.json
  ```

## `jq` Command-Line

- Select a specific field from JSON:
  ```shell
  jq '.field_name' input.json
  ```

- Filter data by a condition:
  ```shell
  jq '.[] | select(.field_name == "value")' input.json
  ```

- Update a field in JSON:
  ```shell
  jq '.field_name = "new_value"' input.json
  ```

- Get the length of an array in JSON:
  ```shell
  jq 'length' input.json
  ```

- Pipe multiple `jq` operations together:
  ```shell
  jq '.field | .[] | select(.value > 10)' input.json
  ```

## Conclusion

This cheat sheet covers some common `jq` commands and concepts. `jq` is a versatile tool for processing and manipulating JSON data, making it useful for tasks like data extraction, filtering, and transformation; refer to the [official `jq` documentation](https://stedolan.github.io/jq/manual/) for more in-depth information and advanced usage.
