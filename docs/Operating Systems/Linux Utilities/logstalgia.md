# logstalgia

## Introduction

This cheat sheet provides a quick reference for some common `logstalgia` commands and concepts. `logstalgia` is a command-line utility used to visualize web server logs in real-time as an interactive, retro-style log and traffic viewer.

## `logstalgia` Concepts

### Real-Time Visualization

`logstalgia` provides real-time visualization of web server logs, allowing you to see traffic patterns and log data in an interactive format.

- Start `logstalgia` with a log file:
  ```shell
  logstalgia -f access.log
  ```

### Log File Format

`logstalgia` supports various log file formats, including Common Log Format (CLF) and Combined Log Format.

- Specify the log file format:
  ```shell
  logstalgia -f access.log --log-format clf
  ```

### Playback Speed

You can control the playback speed of log data.

- Adjust the playback speed (default is 1x):
  ```shell
  logstalgia -f access.log --speed 2
  ```

### Filters

`logstalgia` allows you to filter log data based on various criteria.

- Filter by HTTP status code (e.g., 200, 404):
  ```shell
  logstalgia -f access.log --filter-status 200
  ```

- Filter by request URI (e.g., /page):
  ```shell
  logstalgia -f access.log --filter-uri /page
  ```

### Export to GIF

You can export the `logstalgia` visualization as a GIF image.

- Export the visualization to a GIF file:
  ```shell
  logstalgia -f access.log --output my_logstalgia.gif
  ```

## `logstalgia` Command-Line

- Start `logstalgia` with a log file:
  ```shell
  logstalgia -f access.log
  ```

- Specify the log file format:
  ```shell
  logstalgia -f access.log --log-format clf
  ```

- Adjust the playback speed (default is 1x):
  ```shell
  logstalgia -f access.log --speed 2
  ```

- Filter by HTTP status code (e.g., 200, 404):
  ```shell
  logstalgia -f access.log --filter-status 200
  ```

- Filter by request URI (e.g., /page):
  ```shell
  logstalgia -f access.log --filter-uri /page
  ```

- Export the visualization to a GIF file:
  ```shell
  logstalgia -f access.log --output my_logstalgia.gif
  ```

## Conclusion

This cheat sheet covers some common `logstalgia` commands and concepts. `logstalgia` is a fun and informative tool for visualizing web server logs in real-time, allowing you to gain insights into your web traffic and server activity; refer to the [official `logstalgia` documentation](https://logstalgia.io/) for more in-depth information and advanced usage.
