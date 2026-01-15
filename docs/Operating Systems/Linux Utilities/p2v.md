# p2v

## Introduction

This cheat sheet provides a quick reference for some common P2V (Physical-to-Virtual) migration commands and concepts. P2V is the process of converting a physical machine into a virtual machine to run on virtualization platforms like VMware, Hyper-V, or VirtualBox.

## P2V Concepts

### Preparing the Physical Machine

Before performing a P2V migration, prepare the physical machine.

- Ensure the physical machine is in a clean and stable state.
- Backup important data and configurations.
- Uninstall or deactivate any hardware-specific drivers or software.

### Selecting a Virtualization Platform

Choose the virtualization platform where you will run the virtual machine (VM).

- VMware vCenter Converter Standalone is a tool for VMware environments.
- Hyper-V provides its own P2V capabilities.
- VirtualBox supports importing physical machines as VMs.

### P2V Conversion Process

Each virtualization platform may have its own P2V conversion process. Below are some common steps.

1. Install the virtualization platform's hypervisor on the destination server or host.

2. Launch the P2V conversion tool or wizard.

3. Provide the source physical machine's details:
   - IP address or hostname.
   - Credentials for access (username and password).

4. Select the destination:
   - Specify the virtualization host or server.
   - Configure VM settings (CPU, memory, storage).

5. Start the conversion process.
   - The tool will create a virtual disk image (VMDK, VHD, etc.).
   - It will transfer the operating system and data to the virtual machine.

6. Complete the setup:
   - Adjust VM settings as needed.
   - Boot the VM and install virtualization-specific tools or drivers.

### Post-Migration Tasks

After the P2V migration, perform these tasks:

- Test the VM thoroughly to ensure it operates as expected.
- Remove or uninstall any physical machine-specific drivers or software.
- Adjust network settings and configurations if necessary.
- Update any hardware-specific drivers inside the VM.

## P2V Command-Line

P2V migration is primarily done through graphical tools and wizards provided by virtualization platforms. However, you can automate and script certain aspects of the process using platform-specific command-line tools and scripting languages.

## Conclusion

This cheat sheet covers some common P2V (Physical-to-Virtual) migration concepts. P2V is a crucial process for organizations transitioning to virtualized environments, enabling them to consolidate physical servers into virtual machines for cost savings and improved manageability. The exact steps and tools may vary based on your chosen virtualization platform; refer to the documentation of your specific platform for detailed instructions.
