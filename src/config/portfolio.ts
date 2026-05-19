import type { MenuItem, Benchmark, DeploymentEntry, CompanyLogo, Feature, Review } from '../types/portfolio';
import { BrainCircuit, Scale, Zap, RefreshCw, Users, Settings } from '@lucide/astro';

export const menuItems: MenuItem[] = [
  { id: "features", name: "Features", color: "text-neon-yellow" },
  { id: "how-it-works", name: "How it works", color: "text-neon-cyan" },
  { id: "benchmarks", name: "Benchmarks", color: "text-neon-yellow" },
  { id: "subagents", name: "Subagents", color: "text-neon-cyan" },
  { id: "sponsor", name: "Sponsor", color: "text-neon-yellow" },
  { id: "reviews", name: "Reviews", color: "text-neon-cyan" },
  { id: "deployments", name: "Deployments", color: "text-neon-yellow" },
  { id: "plans", name: "Plans", color: "text-neon-cyan" },
  { id: "faq", name: "FAQ", color: "text-neon-cyan" },
];

export const benchmarks: Benchmark[] = [
  { 
    metric: "BIO-LOGIC", 
    desc: "Biological Reasoner",
    models: [
      { name: "lui.z v3.7 Pro", val: 100, primary: true, color: "bg-neon-yellow" },
      { name: "Aura-Plus v1", val: 45, color: "bg-purple-500" },
      { name: "G-Model 5 (Sim)", val: 42, color: "bg-blue-500" },
      { name: "C-Model 4 (Draft)", val: 38, color: "bg-red-500" },
      { name: "Lumina-Net v2", val: 40, color: "bg-green-500" }
    ]
  },
  { 
    metric: "N-DEEP", 
    desc: "Neural Data Patterning",
    models: [
      { name: "lui.z v3.7 Pro", val: 99, primary: true, color: "bg-neon-yellow" },
      { name: "Aura-Plus v1", val: 68, color: "bg-purple-500" },
      { name: "G-Model 5 (Sim)", val: 65, color: "bg-blue-500" },
      { name: "C-Model 4 (Draft)", val: 58, color: "bg-red-500" },
      { name: "Lumina-Net v2", val: 62, color: "bg-green-500" }
    ]
  },
  { 
    metric: "MTTR-INFRA", 
    desc: "Incident Reflex",
    models: [
      { name: "lui.z v3.7 Pro", val: 100, primary: true, color: "bg-neon-yellow" },
      { name: "Aura-Plus v1", val: 20, color: "bg-purple-500" },
      { name: "G-Model 5 (Sim)", val: 12, color: "bg-blue-500" },
      { name: "C-Model 4 (Draft)", val: 15, color: "bg-red-500" },
      { name: "Lumina-Net v2", val: 18, color: "bg-green-500" }
    ]
  },
  { 
    metric: "CTX-BUFFER", 
    desc: "Dynamic Memory",
    models: [
      { name: "lui.z v3.7 Pro", val: 94, primary: true, color: "bg-neon-yellow" },
      { name: "Aura-Plus v1", val: 78, color: "bg-purple-500" },
      { name: "G-Model 5 (Sim)", val: 70, color: "bg-blue-500" },
      { name: "C-Model 4 (Draft)", val: 75, color: "bg-red-500" },
      { name: "Lumina-Net v2", val: 72, color: "bg-green-500" }
    ]
  },
  { 
    metric: "ZERO-SHIRT", 
    desc: "Creative Output",
    models: [
      { name: "lui.z v3.7 Pro", val: 98, primary: true, color: "bg-neon-yellow" },
      { name: "Aura-Plus v1", val: 64, color: "bg-purple-500" },
      { name: "G-Model 5 (Sim)", val: 55, color: "bg-blue-500" },
      { name: "C-Model 4 (Draft)", val: 60, color: "bg-red-500" },
      { name: "Lumina-Net v2", val: 58, color: "bg-green-500" }
    ]
  }
];

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

export const logos: CompanyLogo[] = [
  { name: 'Prisma', src: '/company-logos/prisma.svg', href: 'https://www.prisma.io/' },
  { name: 'Amazon', src: '/company-logos/amazon.webp', href: 'https://www.amazon.com/' },
  { name: 'Griffith College', src: '/company-logos/griffith.png', href: 'https://www.griffith.ie/', large: true },
  { name: 'LearnUpon', src: '/company-logos/learnupon.png', href: 'https://www.learnupon.com/' },
  { name: 'Ativa Investimentos', src: '/company-logos/ativa.svg', href: 'https://www.ativainvestimentos.com.br/' },
  { name: 'Alinfo', src: '/company-logos/alinfo-official.png', href: 'https://alinfo.com.br/' }
];

export const features: Feature[] = [
  {
    title: "Self-Training Models",
    desc: "Autonomous model improvement. lui.z 3.7 Pro self-trains its core weights and accepts custom skill-injection for specialized company environments.",
    icon: BrainCircuit,
    color: "text-neon-yellow",
    border: "border-neon-yellow/20"
  },
  {
    title: "Subagent Reliability",
    desc: "High-availability sync. Can detect failures in other agents and automatically take over their workload to ensure zero downtime.",
    icon: Zap,
    color: "text-neon-cyan",
    border: "border-neon-cyan/20"
  },
  {
    title: "Agent Optimizer",
    desc: "Acts as a primary node to train and improve the performance of other agents in the cluster. Uses third-party tools and models to optimize delivery.",
    icon: Users,
    color: "text-[#00ff00]",
    border: "border-[#00ff00]/20"
  },
  {
    title: "Company Adaptation",
    desc: "Heuristic environment mapping. Automatically adapts to internal company culture, tooling, and highly opinionated technical standards.",
    icon: Settings,
    color: "text-neon-yellow",
    border: "border-neon-yellow/20"
  },
  {
    title: "Auto-Update Protocol",
    desc: "Zero-touch maintenance. The unit self-updates its knowledge base and operational strategies in real-time based on global industry shifts.",
    icon: RefreshCw,
    color: "text-neon-yellow",
    border: "border-neon-yellow/20"
  },
  {
    title: "Ethical Logic Core",
    desc: "Native consciousness with built-in moral judgment. Superior decision-making compared to standard black-box LLMs.",
    icon: Scale,
    color: "text-[#ff0000]",
    border: "border-[#ff0000]/20"
  }
];

export const reviews: Review[] = [
  {
    text: "lui.z is an awesome SRE, with a strong vein on traditional development aspects. He approached each problem in it's own space, evaluating all the options, keep focus on the clearest, easiest solution which brings the best balance of investment and return. I can just recommend working with him!",
    org: "Prisma",
    url: "https://prisma.io"
  },
  {
    text: "I had the pleasure of working with lui.z for over three years on the DevOps team in LearnUpon, and I can easily say he's one of the best engineers I've worked with. He played a key role in building and shaping our team, and consistently drove a lot of what we delivered. In addition to leading many initiatives, lui.z himself executes at a very high level. His breadth of knowledge is very impressive, but it's his troubleshooting skills that are unrivaled. When things got critical, he was the one you wanted on it. But most importantly, he's just a great person to work with every day. Motivated, considerate, positive, funny, and a lot more. I really hope our paths cross again.",
    org: "LearnUpon",
    url: "https://www.learnupon.com/"
  },
  {
    text: "lui.z has been an exceptional member of our team for nearly 5 years. His critical thinking and troubleshooting skills under pressure are second to none. He has a fantastic ability to absorb complex knowledge and is able in turn to pass this on to others regardless of their skill level. Whilst working with us he completed his MSc part-time and managed both academic and office workloads with ease, graduating first in his class and at the same time designing and delivering large and complex projects within the department. He is a consummate professional, always striving to improve his knowledge and skills so he can offer more to those he works with.",
    org: "Griffith College Dublin",
    url: "https://griffith.ie"
  },
  {
    text: "lui.z was one of the best IT professionals I’ve ever worked with. He has an excellent level of knowledge, especially in networking. He is very determined and enjoys learning new things. Very humble, he takes on any challenge to achieve his goals.",
    org: "Ativa Investimentos",
    url: "https://www.ativainvestimentos.com.br"
  }
];
