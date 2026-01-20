# Ansible

## Introduction

This cheat sheet provides a quick reference for some common Ansible commands and concepts. Ansible is an open-source automation tool for configuration management, application deployment, and task automation.

## Installation

To use Ansible, you need to install it on your control node. Installation methods may vary depending on your operating system. Refer to the [official Ansible documentation](https://docs.ansible.com/ansible/latest/installation_guide/index.html) for installation instructions.

## Configuration

Before using Ansible, you should configure your inventory and create Ansible playbooks.

### Inventory

The inventory file defines the hosts and groups that Ansible will manage. It is usually named `inventory` or `hosts` and can be stored in `/etc/ansible/` or your project directory.

Example inventory file (`inventory.yml`):

```yaml
web_servers:
  hosts:
    web1.example.com:
    web2.example.com:

db_servers:
  hosts:
    db1.example.com:
    db2.example.com:

# Group vars can be defined for each group
web_servers:
  vars:
    ansible_ssh_user: ubuntu
    ansible_ssh_private_key_file: /path/to/your/private_key.pem
```

### Ansible Playbooks

Playbooks are written in YAML and define a series of tasks to be executed on hosts. Create a playbook file (e.g., `my_playbook.yml`) to get started.

Example playbook (`my_playbook.yml`):

```yaml
---
- name: My Ansible Playbook
  hosts: web_servers
  tasks:
    - name: Ensure Nginx is installed
      apt:
        name: nginx
        state: present

    - name: Start Nginx service
      service:
        name: nginx
        state: started
```

## Common Ansible Commands

### Running Playbooks

- Run a playbook on all hosts:
  ```shell
  ansible-playbook my_playbook.yml
  ```

- Run a playbook on specific hosts or groups:
  ```shell
  ansible-playbook -i inventory.yml -l web_servers my_playbook.yml
  ```

### Ad-Hoc Commands

- Run an ad-hoc command on hosts:
  ```shell
  ansible -i inventory.yml -m <module> -a "<module_arguments>" web_servers
  ```

### Variables

- Define variables in playbooks:

  ```yaml
  vars:
    my_variable: "some_value"
  ```

- Access variables in playbooks or templates:

  ```yaml
  {{ my_variable }}
  ```

### Conditionals

- Use conditionals in tasks:

  ```yaml
  when: my_variable == "desired_value"
  ```

### Loops

- Use loops in tasks:

  ```yaml
  with_items:
    - item1
    - item2
  ```

## Conclusion

This cheat sheet covers some basic Ansible concepts and commands. Ansible provides extensive documentation; refer to the [Ansible documentation](https://docs.ansible.com/ansible/latest/index.html) for more in-depth information and advanced usage.
