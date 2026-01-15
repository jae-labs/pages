# dmidecode

## Introduction

This cheat sheet provides a quick reference for some common `dmidecode` commands and concepts. `dmidecode` is a command-line utility used to retrieve hardware information from the BIOS of a computer.

## `dmidecode` Concepts

### DMI (Desktop Management Interface)

`dmidecode` extracts information from the Desktop Management Interface, which is a standard framework for managing and tracking hardware and software components in a system.

### Information Categories

`dmidecode` provides information about various hardware components and their attributes, including:

- System
- BIOS
- Processor
- Memory (RAM)
- Cache
- System Slots
- Onboard Devices
- System Configuration Options
- OEM-specific Information
- And more...

### Output Format

`dmidecode` can produce output in various formats, including plain text and structured formats like JSON.

- Display information in plain text:
  ```shell
  dmidecode
  ```

- Display information in JSON format:
  ```shell
  dmidecode --json
  ```

### Specifying the Type

You can specify the type of information you want to retrieve from `dmidecode`.

- Display information about the BIOS:
  ```shell
  dmidecode -t bios
  ```

- Display information about the processor:
  ```shell
  dmidecode -t processor
  ```

## `dmidecode` Command-Line

- Display system hardware information:
  ```shell
  dmidecode
  ```

- Display information about a specific hardware category (e.g., BIOS):
  ```shell
  dmidecode -t bios
  ```

- Display information in JSON format:
  ```shell
  dmidecode --json
  ```

- Save the output to a file:
  ```shell
  dmidecode > hardware_info.txt
  ```

## Conclusion

This cheat sheet covers some common `dmidecode` commands and concepts. `dmidecode` is a valuable tool for retrieving detailed hardware information from the BIOS of a computer, which can be useful for system administration, troubleshooting, and hardware inventory; refer to the [official `dmidecode` documentation](https://linux.die.net/man/8/dmidecode) for more in-depth information and advanced usage.
