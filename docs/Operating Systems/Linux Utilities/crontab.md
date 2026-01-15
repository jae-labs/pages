# crontab

## Introduction

This cheat sheet provides a quick reference for some common `cron` and `crontab` commands and concepts. `cron` is a job scheduler that allows you to automate tasks on Unix-like operating systems.

## Cron Concepts

### Cron Syntax

Cron jobs are defined using a syntax that specifies when and how often a job should run:

```
* * * * * command_to_run
| | | | |
| | | | +--- Day of the week (0 - 7) (Sunday is both 0 and 7)
| | | +----- Month (1 - 12)
| | +------- Day of the month (1 - 31)
| +--------- Hour (0 - 23)
+----------- Minute (0 - 59)
```

### Special Characters

Cron syntax allows for special characters:

- `*`: Wildcard, matches all possible values for a field.
- `,`: Specifies a list of values.
- `-`: Specifies a range of values.
- `/`: Specifies a step value.

### Cron Environment

Cron jobs run in a minimal environment. You may need to specify the full path to commands and set environment variables.

## Crontab Command-Line

- Edit the current user's crontab:
  ```shell
  crontab -e
  ```

- List the current user's crontab entries:
  ```shell
  crontab -l
  ```

- Remove the current user's crontab:
  ```shell
  crontab -r
  ```

## Crontab Examples

### Schedule a Daily Backup

```shell
0 2 * * * /path/to/backup-script.sh
```

This example schedules a backup script to run daily at 2:00 AM.

### Run a Script Every Hour

```shell
0 * * * * /path/to/script.sh
```

This example runs a script every hour at the beginning of the hour.

### Schedule Weekly Maintenance

```shell
0 3 * * 6 /path/to/maintenance-script.sh
```

This example schedules a maintenance script to run every Saturday at 3:00 AM.

### Schedule a Monthly Report

```shell
0 0 1 * * /path/to/report-script.sh
```

This example schedules a monthly report script to run on the first day of each month at midnight.

## Conclusion

This cheat sheet covers some common `cron` and `crontab` commands and concepts for scheduling and automating tasks in Unix-like operating systems. `cron` is a versatile tool for automating recurring tasks; refer to the [official cron documentation](https://man7.org/linux/man-pages/man5/crontab.5.html) for more in-depth information and advanced usage.
