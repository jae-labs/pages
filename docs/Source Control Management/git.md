# Git

## Introduction

This cheat sheet provides a quick reference for some common Git commands and concepts. Git is a distributed version control system used for tracking changes in code repositories.

## Git Concepts

### Repository

A Git repository (repo) is a directory that contains all the files, history, and metadata for a project.

- Create a new Git repository:
  ```shell
  git init
  ```

- Clone an existing repository:
  ```shell
  git clone repository_url
  ```

### Commit

A commit represents a snapshot of your project at a specific point in time.

- Create a new commit:
  ```shell
  git commit -m "Commit message"
  ```

### Branch

A branch is a parallel line of development in a Git repository.

- Create a new branch:
  ```shell
  git branch branch_name
  ```

- Switch to a branch:
  ```shell
  git checkout branch_name
  ```

- Create and switch to a new branch:
  ```shell
  git checkout -b new_branch_name
  ```

### Remote

A remote is a reference to a repository hosted on a remote server (e.g., GitHub, GitLab).

- Add a remote repository:
  ```shell
  git remote add remote_name repository_url
  ```

- List remote repositories:
  ```shell
  git remote -v
  ```

### Pull

Pulling fetches changes from a remote repository and integrates them into the current branch.

- Pull changes from a remote repository:
  ```shell
  git pull remote_name branch_name
  ```

### Push

Pushing sends your committed changes to a remote repository.

- Push changes to a remote repository:
  ```shell
  git push remote_name branch_name
  ```

### Merge

Merging combines changes from one branch into another.

- Merge a branch into the current branch:
  ```shell
  git merge branch_name
  ```

### Conflict

A conflict occurs when Git can't automatically merge changes.

- Resolve conflicts by editing the conflicting files and then committing the changes.

## Git Command-Line

- Check the status of your working directory and staged changes:
  ```shell
  git status
  ```

- View the commit history:
  ```shell
  git log
  ```

- Add changes to the staging area:
  ```shell
  git add file_name
  ```

- Unstage changes from the staging area:
  ```shell
  git reset file_name
  ```

- Discard changes in your working directory:
  ```shell
  git checkout -- file_name
  ```

- Rename a file:
  ```shell
  git mv old_file_name new_file_name
  ```

- Delete a file from the repository and working directory:
  ```shell
  git rm file_name
  ```

- Show the differences between commits or branches:
  ```shell
  git diff
  ```

## Conclusion

This cheat sheet covers some common Git commands and concepts. Git is a powerful version control system for managing code repositories; refer to the [official Git documentation](https://git-scm.com/docs) for more in-depth information and advanced usage.
