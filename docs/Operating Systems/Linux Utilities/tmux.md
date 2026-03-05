# tmux

## Introduction

This cheat sheet provides a quick reference for common concepts and commands related to `tmux`, a terminal multiplexer in Linux. `tmux` allows you to create and manage multiple terminal sessions within a single terminal window.

## `tmux` Concepts

### Key Bindings

`tmux` uses key bindings to perform various actions.

- **Prefix Key**: By default, the prefix key is `Ctrl-b`. You press it before other command keys.

### Sessions

Sessions are the top-level container for `tmux` and can contain multiple windows.

- **Create a New Session**:
  ```shell
  tmux new-session -s session_name
  ```

- **Attach to a Session**:
  ```shell
  tmux attach-session -t session_name
  ```

- **List Sessions**:
  ```shell
  tmux list-sessions
  ```

- **Switch Between Sessions** (prefix key + s).

### Windows

Windows are created within sessions and represent individual terminal screens.

- **Create a New Window** (prefix key + c).

- **Navigate Between Windows** (prefix key + n or prefix key + p).

- **Rename a Window** (prefix key + ,).

- **Close a Window** (prefix key + &).

### Panes

Panes allow you to split a window into multiple terminal panes.

- **Split Vertically** (prefix key + %).

- **Split Horizontally** (prefix key + ").

- **Navigate Between Panes** (prefix key + arrow keys).

- **Resize Panes** (prefix key + Ctrl + arrow keys).

- **Close a Pane** (prefix key + x).

### Detach and Attach

You can detach from a `tmux` session and reattach later.

- **Detach from a Session** (prefix key + d).

- **Reattach to the Last Session**:
  ```shell
  tmux attach
  ```

## `tmux` Command-Line

- **Create a New Session**:
  ```shell
  tmux new-session -s session_name
  ```

- **Attach to a Session**:
  ```shell
  tmux attach-session -t session_name
  ```

- **List Sessions**:
  ```shell
  tmux list-sessions
  ```

- **Create a New Window** (prefix key + c).

- **Navigate Between Windows** (prefix key + n or prefix key + p).

- **Rename a Window** (prefix key + ,).

- **Close a Window** (prefix key + &).

- **Split Vertically** (prefix key + %).

- **Split Horizontally** (prefix key + ").

- **Navigate Between Panes** (prefix key + arrow keys).

- **Resize Panes** (prefix key + Ctrl + arrow keys).

- **Close a Pane** (prefix key + x).

- **Detach from a Session** (prefix key + d).

- **Reattach to the Last Session**:
  ```shell
  tmux attach
  ```

## Conclusion

This cheat sheet covers common concepts and commands for using `tmux` in Linux. `tmux` is a powerful tool for managing multiple terminal sessions within a single window, making it a valuable tool for multitasking and remote work; refer to the [`tmux` man page](https://man7.org/linux/man-pages/man1/tmux.1.html) for more in-depth information and advanced usage.
