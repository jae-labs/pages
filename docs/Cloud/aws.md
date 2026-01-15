# AWS

## Introduction

This cheat sheet provides a quick reference for some common AWS CLI commands. AWS CLI is a powerful tool for interacting with various AWS services from the command line.

## Installation

To use AWS CLI, you need to install it first. You can install AWS CLI on various platforms, including Windows, macOS, and Linux. Visit the [official AWS CLI documentation](https://aws.amazon.com/cli/) for installation instructions.

## Configuration

Before using AWS CLI, you should configure it with your AWS credentials using the `aws configure` command. Make sure you have your AWS Access Key ID and Secret Access Key ready.

```shell
aws configure
```

## Common AWS CLI Commands

### General Commands

- Display AWS CLI version:
  ```shell
  aws --version
  ```

- Get help for a specific AWS CLI command:
  ```shell
  aws help
  ```

### EC2 (Elastic Compute Cloud)

- List EC2 instances:
  ```shell
  aws ec2 describe-instances
  ```

- Create a new EC2 instance:
  ```shell
  aws ec2 run-instances --image-id <ami-id> --instance-type <instance-type>
  ```

- Stop an EC2 instance:
  ```shell
  aws ec2 stop-instances --instance-ids <instance-id>
  ```

### S3 (Simple Storage Service)

- List S3 buckets:
  ```shell
  aws s3 ls
  ```

- Copy a file to an S3 bucket:
  ```shell
  aws s3 cp <local-file> s3://<bucket-name>/
  ```

- Sync a local directory to an S3 bucket:
  ```shell
  aws s3 sync <local-dir> s3://<bucket-name>/
  ```

### Lambda

- List Lambda functions:
  ```shell
  aws lambda list-functions
  ```

- Invoke a Lambda function:
  ```shell
  aws lambda invoke --function-name <function-name> --payload '<payload>' output.txt
  ```

### IAM (Identity and Access Management)

- List IAM users:
  ```shell
  aws iam list-users
  ```

- Create a new IAM user:
  ```shell
  aws iam create-user --user-name <user-name>
  ```

- Attach a policy to an IAM user:
  ```shell
  aws iam attach-user-policy --user-name <user-name> --policy-arn <policy-arn>
  ```

## Conclusion

This cheat sheet covers some basic AWS CLI commands for common AWS services. Refer to the [AWS CLI documentation](https://awscli.amazonaws.com/v2/documentation/api/latest/index.html) for more detailed information and advanced commands.
