# vim

## Introduction

This cheat sheet provides a quick reference for common concepts and commands related to the `vim` text editor in Linux. `vim` is known for its extensive functionality and powerful text editing capabilities.

## `vim` Concepts

### Modes

`vim` operates in different modes for various tasks.

- **Normal Mode**: The default mode for navigating and manipulating text.
- **Insert Mode**: Used for inserting or editing text.
- **Visual Mode**: Used for selecting and manipulating text selections.

### Basic Navigation

- **Move Cursor Left/Right**: `h` / `l`
- **Move Cursor Up/Down**: `k` / `j`
- **Go to Start/End of Line**: `0` / `$`
- **Go to Start/End of File**: `gg` / `G`

### Basic Editing

- **Enter Insert Mode**: `i` (before cursor), `a` (after cursor)
- **Delete Character**: `x`
- **Undo**: `u`
- **Redo**: `Ctrl + r`

### Saving and Quitting

- **Save**: `:w`
- **Save and Quit**: `:wq`
- **Quit without Saving**: `:q!`

### Searching

- **Search Forward**: `/search_term`
- **Search Backward**: `?search_term`
- **Next Match**: `n`
- **Previous Match**: `N`

### Copy, Cut, and Paste

- **Copy (Yank)**: `y`
- **Cut (Delete)**: `d`
- **Paste (Put)**: `p`

### Visual Mode

- **Enter Visual Mode**: `v`
- **Select Text**: Move cursor to select text
- **Copy/Cut Selected Text**: `y` (copy), `d` (cut)

### Advanced Editing

- **Replace Character**: `r`
- **Replace Mode**: `R`
- **Indent Right/Left**: `>` / `<`

### Exiting `vim`

- **Quit without Saving Changes**: `:q!`
- **Save and Quit**: `:wq`
- **Save Changes and Quit (if modified)**: `:x` or `ZZ`

### Configuration

You can customize `vim` by editing its configuration file `~/.vimrc`.

- **Edit `vim` Configuration File**:
  ```shell
  vim ~/.vimrc
  ```

## `vim` Command-Line

- **Enter Insert Mode**: `i`
- **Delete Character**: `x`
- **Undo**: `u`
- **Redo**: `Ctrl + r`
- **Save**: `:w`
- **Save and Quit**: `:wq`
- **Quit without Saving**: `:q!`
- **Search Forward**: `/search_term`
- **Search Backward**: `?search_term`
- **Next Match**: `n`
- **Previous Match**: `N`
- **Copy (Yank)**: `y`
- **Cut (Delete)**: `d`
- **Paste (Put)**: `p`
- **Enter Visual Mode**: `v`
- **Replace Character**: `r`
- **Replace Mode**: `R`
- **Indent Right/Left**: `>` / `<`
- **Edit `vim` Configuration File**: `vim ~/.vimrc`

## Conclusion

This cheat sheet covers common concepts and commands for using the `vim` text editor in Linux. `vim` is a highly configurable and powerful text editor, making it a popular choice for both beginners and advanced users; refer to the [`vim` documentation](http://vimdoc.sourceforge.net/) for more in-depth information and advanced usage.
