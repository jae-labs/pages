# Vault

## Introduction

This cheat sheet provides a quick reference for some common HashiCorp Vault commands and concepts. HashiCorp Vault is a popular open-source tool for managing secrets and protecting sensitive data.

## Installation

To use HashiCorp Vault, you need to install and configure it on your system or use the cloud-managed version offered by HashiCorp. Refer to the [official Vault documentation](https://learn.hashicorp.com/tutorials/vault/getting-started-install) for installation instructions.

## Vault Concepts

### Secrets

Secrets are sensitive pieces of information, such as API keys, passwords, and certificates, stored and managed by Vault.

- Store a secret in Vault:
  ```shell
  vault kv put secret/myapp/apikey=secret-value
  ```

- Retrieve a secret from Vault:
  ```shell
  vault kv get secret/myapp/apikey
  ```

### Authentication Methods

Vault supports various authentication methods for authenticating users or applications, such as tokens, username/password, and LDAP.

- Enable an authentication method:
  ```shell
  vault auth enable method_name
  ```

### Policies

Policies define the permissions and access controls for different paths and operations within Vault.

- Create a policy:
  ```shell
  vault policy write my-policy policy.hcl
  ```

### Token Management

Tokens are used for authentication and access control in Vault.

- Create a token with a policy attached:
  ```shell
  vault token create -policy=my-policy
  ```

- Authenticate with a token:
  ```shell
  vault login token_value
  ```

### Dynamic Secrets

Vault can generate dynamic secrets for databases, cloud providers, and more.

- Enable a dynamic secrets engine:
  ```shell
  vault secrets enable -path=dynamic-secret-path database
  ```

- Configure and generate dynamic secrets as needed.

### Key-Value (KV) Secrets Engine

The KV secrets engine allows you to store and manage arbitrary secrets as key-value pairs.

- Enable the KV secrets engine:
  ```shell
  vault secrets enable -path=secret kv
  ```

- Store and retrieve secrets under the specified path.

### Transit Secrets Engine

The Transit secrets engine provides data encryption and decryption capabilities.

- Enable the Transit secrets engine:
  ```shell
  vault secrets enable -path=transit transit
  ```

- Configure and use the Transit secrets engine to encrypt and decrypt data.

### High Availability (HA)

Vault can be configured for high availability to ensure availability and reliability.

- Set up a Vault HA cluster with a highly available storage backend.

## Vault Command-Line

- Initialize a new Vault server (in development mode):
  ```shell
  vault server -dev
  ```

- Unseal a sealed Vault server (in production mode):
  ```shell
  vault operator unseal
  ```

- Seal a Vault server to prevent access:
  ```shell
  vault operator seal
  ```

- List enabled secrets engines and authentication methods:
  ```shell
  vault secrets list
  vault auth list
  ```

- Display the status and health of the Vault server:
  ```shell
  vault status
  ```

## Conclusion

This cheat sheet covers some common HashiCorp Vault commands and concepts. Vault is a powerful tool for securing and managing secrets and sensitive data; refer to the [official Vault documentation](https://learn.hashicorp.com/collections/vault) for more in-depth information and advanced usage.
