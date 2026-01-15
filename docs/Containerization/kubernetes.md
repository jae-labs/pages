# Kubernetes

## Introduction

This cheat sheet provides a quick reference for some common Kubernetes commands and concepts. Kubernetes is an open-source container orchestration platform for automating the deployment, scaling, and management of containerized applications.

## Installation

To use Kubernetes, you need to set up a Kubernetes cluster. Installation methods vary depending on your environment. Refer to the [official Kubernetes documentation](https://kubernetes.io/docs/setup/) for installation instructions.

## Kubernetes Concepts

### Pods

- Create a Pod from a YAML file:
  ```shell
  kubectl create -f pod.yaml
  ```

- List all Pods in a namespace:
  ```shell
  kubectl get pods
  ```

- Describe a Pod:
  ```shell
  kubectl describe pod pod_name
  ```

- Delete a Pod:
  ```shell
  kubectl delete pod pod_name
  ```

### Deployments

- Create a Deployment from a YAML file:
  ```shell
  kubectl create -f deployment.yaml
  ```

- List all Deployments in a namespace:
  ```shell
  kubectl get deployments
  ```

- Scale a Deployment:
  ```shell
  kubectl scale deployment deployment_name --replicas=3
  ```

- Rollback a Deployment:
  ```shell
  kubectl rollout undo deployment/deployment_name
  ```

### Services

- Create a Service from a YAML file:
  ```shell
  kubectl create -f service.yaml
  ```

- List all Services in a namespace:
  ```shell
  kubectl get services
  ```

- Expose a Deployment as a Service:
  ```shell
  kubectl expose deployment deployment_name --port=80 --type=LoadBalancer
  ```

- Delete a Service:
  ```shell
  kubectl delete service service_name
  ```

### ConfigMaps and Secrets

- Create a ConfigMap from a file:
  ```shell
  kubectl create configmap config_name --from-file=file_path
  ```

- Create a Secret from a file:
  ```shell
  kubectl create secret generic secret_name --from-file=file_path
  ```

### Namespaces

- Create a Namespace:
  ```shell
  kubectl create namespace namespace_name
  ```

- List all Namespaces:
  ```shell
  kubectl get namespaces
  ```

### Contexts

- List all available contexts:
  ```shell
  kubectl config get-contexts
  ```

- Switch to a different context:
  ```shell
  kubectl config use-context context_name
  ```

### Logs and Debugging

- View Pod logs:
  ```shell
  kubectl logs pod_name
  ```

- Execute a command in a running container:
  ```shell
  kubectl exec -it pod_name -- command
  ```

### Helm (Kubernetes Package Manager)

- Install a Helm chart:
  ```shell
  helm install my-release stable/chart_name
  ```

- Upgrade a Helm release:
  ```shell
  helm upgrade my-release stable/chart_name
  ```

- List Helm releases:
  ```shell
  helm list
  ```

## Conclusion

This cheat sheet covers some basic Kubernetes commands and concepts. Kubernetes offers a wide range of features and functionality; refer to the [Kubernetes documentation](https://kubernetes.io/docs/) for more in-depth information and advanced usage.
