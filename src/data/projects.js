// data/projects.js

const projects = [
  {
    title: 'Custom Kernel Development and Virtual File System Implementation',
    tech: 'C, Kernel Programming, File Systems, Memory Management',
    points: [
      'Developed kernel processes and threads using C, with emphasis on thread manipulation, synchronization, and context switching.',
      'Constructed a Virtual File System (RAMFS) with implemented system calls and polymorphism to manage file operations efficiently.',
      'Implemented virtual memory management, including creating a virtual address space, page fault handler, and user-space shell using shadow objects.'
    ]
  },
  {
    title: 'Reinforcement Learning-based Cluster Formation in Ad-hoc Networks',
    tech: 'Python, Reinforcement Learning, Network Simulation',
    points: [
      'Engineered communication protocols for multi-agent systems in ad-hoc networks without pre-existing wireless infrastructure using Python.',
      'Implemented a reinforcement learning algorithm using PyTorch to optimize cluster formation among agents based on stable communication channels.',
      'Developed a simulation environment using NS3 to model multi-agent systems, enabling testing and training of the learning algorithm across various agent trajectories.'
    ]
  }
];

export default projects;
