// data/education.js

const education = [
  {
    institution: 'Binghamton University, State University of New York',
    logo: '/assets/binghamton-logo.png', // Ensure you have the logo saved at this path
    degree: 'Master of Science in Computer Science',
    date: 'Expected Graduation, December 2025',
    cgpa: '3.5/4.00',
    coursework: {
      graduate: [
        'Design Analysis & Algorithms',
        'Programming Languages',
        'Systems Programming',
        'Programming Systems and Tools',
        'Distributed Systems',
        'Design Patterns',
        'Object-Oriented Programming'
      ]
    }
  },
  {
    institution: 'MLR Institute of Technology, Hyderabad',
    logo: '/assets/mlrit.jpeg', // Ensure you have the logo saved at this path
    location: 'Hyderabad, India',
    degree: 'Bachelor of Science in Electronics and Communication Engineering',
    date: 'June 2022',
    cgpa: '8.00/10.00',
    coursework: {
      undergraduate: [
        'Programming in C',
        'Computer Organization & Architecture',
        'Analog Electronic Circuits',
        'Network Analysis and Synthesis',
        'Digital System Design & HDL',
        'Microprocessors & Microcontrollers',
        'Signals & Systems',
        'Embedded and Real Time Operating Systems',
        'Electromagnetic Fields and Waves',
        'Analog and Digital Communication'
      ]
    }
  }
];

export default education;
