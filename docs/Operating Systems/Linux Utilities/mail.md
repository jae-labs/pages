# mail

## Introduction

This cheat sheet provides a quick reference for some common `mail` command and concepts. The `mail` command is used to send and read email messages from the command line in Unix-like operating systems.

## `mail` Concepts

### Sending Email

You can send email messages using the `mail` command.

- Send an email from the command line:
  ```shell
  echo "Message Body" | mail -s "Subject" recipient@example.com
  ```

- Send an email with a file as the message body:
  ```shell
  mail -s "Subject" recipient@example.com < message.txt
  ```

### Reading Email

You can read email messages using the `mail` command.

- Start the mail client to read email messages:
  ```shell
  mail
  ```

- Read a specific email by message number:
  ```shell
  mail -e message_number
  ```

### Command-Line Options

`mail` supports various options to control email sending and reading.

- Specify the sender's name:
  ```shell
  mail -r "Sender Name" -s "Subject" recipient@example.com
  ```

- Attach a file to the email:
  ```shell
  mail -s "Subject" -a attachment.txt recipient@example.com < message.txt
  ```

- List all email messages:
  ```shell
  mail -H
  ```

- Delete a specific email by message number:
  ```shell
  mail -d message_number
  ```

- Exit the mail client:
  ```shell
  mail -q
  ```

## `mail` Command-Line

- Send an email from the command line:
  ```shell
  echo "Message Body" | mail -s "Subject" recipient@example.com
  ```

- Send an email with a file as the message body:
  ```shell
  mail -s "Subject" recipient@example.com < message.txt
  ```

- Start the mail client to read email messages:
  ```shell
  mail
  ```

- Read a specific email by message number:
  ```shell
  mail -e message_number
  ```

- Specify the sender's name:
  ```shell
  mail -r "Sender Name" -s "Subject" recipient@example.com
  ```

- Attach a file to the email:
  ```shell
  mail -s "Subject" -a attachment.txt recipient@example.com < message.txt
  ```

- List all email messages:
  ```shell
  mail -H
  ```

- Delete a specific email by message number:
  ```shell
  mail -d message_number
  ```

- Exit the mail client:
  ```shell
  mail -q
  ```

## Conclusion

This cheat sheet covers some common `mail` command and concepts. The `mail` command is a handy tool for sending and reading email messages from the command line, making it useful for automation and scripting tasks; refer to the [official `mail` documentation](https://manpages.ubuntu.com/manpages/hirsute/man1/mail.1.html) for more in-depth information and advanced usage.
