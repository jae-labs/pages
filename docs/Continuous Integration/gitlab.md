# GitLab

## Introduction

This cheat sheet provides a quick reference for using common GitLab CI/CD pipeline YAML templates and concepts. GitLab CI/CD allows you to define your pipelines using `.gitlab-ci.yml` files with predefined templates and configurations.

## Basic `.gitlab-ci.yml` Structure

A typical `.gitlab-ci.yml` file consists of stages, jobs, and predefined templates:

```yaml
stages:
  - build
  - test
  - deploy

job_name:
  stage: build
  script:
    - # Define your build commands here

test_job:
  stage: test
  script:
    - # Define your test commands here

deploy_job:
  stage: deploy
  script:
    - # Define your deployment commands here
```

## Predefined Templates and Keywords

### `image`

Specify the Docker image to use for a job:

```yaml
image: ubuntu:latest
```

### `before_script` and `after_script`

Define commands to run before and after all jobs:

```yaml
before_script:
  - # Commands to run before each job

after_script:
  - # Commands to run after each job
```

### `variables`

Set environment variables for a job:

```yaml
variables:
  VAR_NAME: "value"
```

### `script`

Define the commands to run in a job:

```yaml
script:
  - # Define your commands here
```

### `artifacts` and `cache`

Define job artifacts and caching for improved performance:

```yaml
artifacts:
  paths:
    - build/
  expire_in: 1 week

cache:
  paths:
    - node_modules/
```

### `only` and `except`

Specify when a job should run based on branches or tags:

```yaml
only:
  - master

except:
  - tags
```

### `rules`

Define custom rules for job execution based on conditions:

```yaml
rules:
  - if: '$CI_COMMIT_MESSAGE =~ /skip-ci/'
    when: never
```

### `allow_failure`

Allow a job to fail without impacting the pipeline status:

```yaml
job_name:
  script:
    - # Define your commands here
  allow_failure: true
```

### `when`

Specify when a job should run (manual or on_success):

```yaml
job_name:
  script:
    - # Define your commands here
  when: manual
```

### `dependencies`

Define job dependencies to control the execution order:

```yaml
job_name:
  script:
    - # Define your commands here
  dependencies:
    - previous_job
```

## Predefined CI/CD Variables

GitLab provides several predefined CI/CD variables that you can use in your pipeline:

- `CI_COMMIT_SHA`: The SHA1 commit hash of the current commit.
- `CI_COMMIT_REF_NAME`: The branch or tag name.
- `CI_JOB_NAME`: The name of the current job.
- `CI_PROJECT_NAME`: The name of the GitLab project.
- `CI_PIPELINE_ID`: The ID of the current pipeline.

## Conclusion

This cheat sheet covers some common GitLab CI/CD pipeline YAML templates and concepts. GitLab provides extensive documentation; refer to the [GitLab CI/CD documentation](https://docs.gitlab.com/ee/ci/) for more in-depth information and advanced usage.
