import type { DeploymentEntry } from '../../types/portfolio';

export const deploymentEntries: DeploymentEntry[] = [
  {
    id: "LOG_01",
    status: "CURRENT",
    org: "Prisma",
    url: "https://www.prisma.io/",
    region: "eu-west-1",
    period: "Jan 2026 - Present",
    release: "v3.7",
    roles: [
      {
        version: "v3.7",
        title: "Senior Software Engineer (Infrastructure)",
        date: "Jan 2026 - Present",
        summary: "Provisioned AI-assisted Grafana stacks reducing dashboard creation by >90%. Engineered autonomous user management via IaC/Bots to eliminate 95% of manual toil. Deployed zero-leak SAST workflows and host-level DoS protection with near-zero overhead while synchronizing architectural requirements across 3+ engineering nodes."
      }
    ]
  },
  {
    id: "LOG_02",
    status: "ARCHIVED",
    org: "AWS",
    url: "https://aws.amazon.com/",
    region: "eu-west-1",
    period: "Jul 2025 - Oct 2025",
    release: "v3.7",
    roles: [
      {
        version: "v3.7",
        title: "Senior Systems Engineer (L6)",
        date: "Jul 2025 - Oct 2025",
        summary: "Architected EUSC regional BI dashboards for real-time deliverable tracking. Automated PoC to production data pipelines reducing manual effort by >90%. Streamlined bulk task processing from hours to minutes, establishing a primary source of truth for thousands of cross-team deliverables."
      }
    ]
  },
  {
    id: "LOG_03",
    status: "ARCHIVED",
    org: "LearnUpon",
    url: "https://www.learnupon.com/",
    region: "eu-west-1",
    period: "Jul 2019 - Jul 2025",
    release: "v3.7",
    roles: [
      {
        version: "v3.7",
        title: "Senior Staff DevOps Engineer",
        date: "Apr 2025 – Jul 2025",
        summary: "Spearheaded global DevOps strategy and high-level technical mentorship. Boosted team productivity threefold and established high-performance standards, resulting in back-to-back award-winning engineering units."
      },
      {
        version: "v3.4 - v3.7",
        title: "Staff DevOps Engineer",
        date: "Feb 2023 – Apr 2025",
        summary: "Scaled EKS infrastructure to 99.99% uptime while optimizing resource utilization for 30% cost savings. Modernized CI/CD pipelines via GitLab/Terraform, cutting deployment latency by 70% and enabling zero-downtime production cycles."
      },
      {
        version: "v3.2 - v3.4",
        title: "Senior DevOps Engineer",
        date: "Jul 2021 – Feb 2023",
        summary: "Implemented advanced monitoring (Prometheus/Loki) and Slack-integrated alerting to reduce MTTR by 60%. Automated cross-region infrastructure provisioning to eliminate 90% of configuration drift."
      },
      {
        version: "v3.1 - v3.2",
        title: "DevOps Engineer",
        date: "Jun 2020 – Jul 2021",
        summary: "Built ephemeral containerized environments and hot-reload tooling to triple developer velocity. Standardized reusable infrastructure components for rapid multi-tenant provisioning."
      },
      {
        version: "v3.0 - v3.1",
        title: "Site Reliability Engineer",
        date: "Jul 2019 – Jun 2020",
        summary: "Executed large-scale migration of legacy self-hosted nodes to managed cloud solutions. Reduced operational overhead by 40% while enhancing system scalability and security posture."
      }
    ]
  },
  {
    id: "LOG_04",
    status: "ARCHIVED",
    org: "Griffith College Dublin",
    url: "https://www.griffith.ie/",
    region: "eu-west-1",
    period: "Jan 2015 - Jul 2019",
    release: "v3.0",
    roles: [
      {
        version: "v3.0",
        title: "Systems Operations Manager",
        date: "Mar 2019 – Jul 2019",
        summary: "Orchestrated campus-wide virtualization (Hyper-V/KVM), improving uptime by 40% for 8,000+ nodes. Deployed high-availability SD-WAN reducing connectivity overhead by 25%."
      },
      {
        version: "v2.6 - v3.0",
        title: "Senior Systems & Network Administrator",
        date: "Jan 2015 – Mar 2019",
        summary: "Integrated full-stack monitoring and CDN layers for optimized system delivery. Revamped infra-pipelines to reduce deployment cycles from hours to seconds, eliminating 90% of manual configuration entropy."
      }
    ]
  },
  {
    id: "LOG_05",
    status: "ARCHIVED",
    org: "Ativa Investimentos",
    url: "https://www.ativainvestimentos.com.br/",
    region: "sa-east-1 (Sao Paulo)",
    period: "Nov 2008 - May 2014",
    release: "v2.5",
    roles: [
      {
        version: "v2.4 - v2.5",
        title: "IT Manager",
        date: "Aug 2013 – May 2014",
        summary: "Directed enterprise LAN/WAN deployments for 1,200+ units, ensuring 99.99% availability. Led zero-downtime datacenter migrations and aligned infrastructure capacity with long-term financial growth targets."
      },
      {
        version: "v2.3 - v2.4",
        title: "Network Team Leader",
        date: "Sep 2012 – Aug 2013",
        summary: "Automated core maintenance and backup protocols via Ansible, reducing operational toil by 50%. Managed complex vendor relationships and internal biological sub-nodes (Team Members)."
      },
      {
        version: "v2.0 - v2.3",
        title: "Senior Network Engineer",
        date: "Oct 2009 – Sep 2012",
        summary: "Optimized ultra-low-latency networks for high-frequency trading via BGP, OSPF, and MPLS. Provisioned high-performance market-data systems with strict latency constraints."
      },
      {
        version: "v1.9 - v2.0",
        title: "Network Analyst Intern",
        date: "Nov 2008 – Oct 2009",
        summary: "Transitioned legacy clusters to virtualized environments. Introduced early-stage CI/CD practices for accelerated deployment cycles and improved system resiliency."
      }
    ]
  },
  {
    id: "LOG_06",
    status: "ARCHIVED",
    org: "Alinfo",
    url: "https://alinfo.com.br/",
    region: "sa-east-1 (Sao Paulo)",
    period: "Jan 2008 - Nov 2008",
    release: "v1.9",
    roles: [
      {
        version: "v1.9",
        title: "Network Analyst",
        date: "Jan 2008 – Nov 2008",
        summary: "Executed complex Cisco deployments and RF site surveys. Maintained 24/7 on-call availability for high-traffic regional network nodes."
      }
    ]
  },
  {
    id: "LOG_07",
    status: "ARCHIVED",
    org: "Assessorial Ltda Epp",
    url: "https://www.assessorial.com.br/",
    region: "sa-east-1 (Sao Paulo)",
    period: "Jul 2007 - Dec 2007",
    release: "v1.8",
    roles: [
      {
        version: "v1.8",
        title: "Infrastructure Analyst",
        date: "Jul 2007 - Dec 2007",
        summary: "Managed on-premise hardware clusters including firewalls, storage nodes, and server environments. Provided primary helpdesk support for internal operational units."
      }
    ]
  }
];
