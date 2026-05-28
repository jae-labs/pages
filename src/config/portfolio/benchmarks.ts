import type { Benchmark } from '../../types/portfolio';

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
