export type FeatureIconName = 'BrainCircuit' | 'Scale' | 'Zap' | 'RefreshCw' | 'Users' | 'Settings';

export interface MenuItem {
  id: string;
  name: string;
  color: string;
}

export interface BenchmarkModel {
  name: string;
  val: number;
  primary?: boolean;
  color?: string;
}

export interface Benchmark {
  metric: string;
  desc: string;
  models: BenchmarkModel[];
}

export interface Role {
  version: string;
  title: string;
  date: string;
  summary: string;
}

export interface DeploymentEntry {
  id: string;
  status: 'CURRENT' | 'ARCHIVED';
  org: string;
  url: string;
  region: string;
  period: string;
  release: string;
  roles: Role[];
}

export interface CompanyLogo {
  name: string;
  src: string;
  href: string;
  large?: boolean;
}

export interface Feature {
  title: string;
  desc: string;
  icon: FeatureIconName;
  color: string;
  border: string;
}

export interface Review {
  text: string;
  org: string;
  url: string;
}

export interface FAQ {
  q: string;
  a: string;
}
