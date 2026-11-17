import type { PortfolioPlan } from '../../types/portfolio';

export const plans: PortfolioPlan[] = [
  {
    name: 'Community',
    price: '$0',
    desc: 'Pro-bono integration for non-profits, charities, and open-source contributions.',
    features: ['Full human agent capability', 'Subject to bio-unit availability'],
    cta: 'Contact Us',
    tenancy: 'Shared Tenancy'
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    desc: 'Single-tenant provisioning for high-scale, mission-critical environments.',
    features: [
      'Self-hosted (eu-west-1), Hybrid or Cloud',
      'Flexible pricing',
      'Dedicated processing power',
      'Subagent failover sync',
      'Custom skill injection',
      'Reduced cancellation fee during probation',
      'Additional On-Call bundles available',
      'Direct API access'
    ],
    cta: 'Contact Us',
    popular: true,
    tenancy: 'Single Tenant'
  }
];
