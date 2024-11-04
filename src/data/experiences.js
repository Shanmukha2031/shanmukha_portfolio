// data/experiences.js
const experiences = [
  {
    position: 'Software Development Engineer',
    company: 'Capgemini',
    location: 'Bengaluru, India',
    date: 'June 2022 - Dec 2023',
    tech: 'Java, Python, C++, Wireshark, GDB, Jenkins, Linux',
    points: [
      'Analyzed and optimized Wi-Fi application software layers, specifically targeting the interface between the UI and lower Wi-Fi stack, using tools such as Wireshark and GDB for seamless communication and performance optimization.',
      'Executed hardware-software integration tests and conducted Root Cause Analysis on STA/P2P/AP roles, using Linux command-line tools and custom scripts to diagnose and resolve defects, ensuring proper functionality and robust performance across Wi-Fi software layers.',
      'Reproduced customer-reported issues using Jenkins and in-house testing frameworks for sanity and unit testing, and integrated vendor-provided fixes to enhance compatibility and performance within the Wi-Fi stack.'
    ]
  },
  {
    position: 'Software Development Engineer Intern',
    company: 'Capgemini',
    location: 'Bengaluru, India',
    date: 'Mar 2022 - Jun 2022',
    tech: 'Wireshark, Linux, Socket Programming, TCP/IP',
    points: [
      'Performed detailed analysis of WLAN 802.11a/b/g/n/i and P2P specifications, conducting a functional breakdown of WLAN drivers to map and optimize communication flows.',
      'Executed packet capture and analysis on WLAN devices using tools like Wireshark, validating WLAN specification compliance and troubleshooting communication issues.',
      'Mapped and optimized the Linux WLAN stack architecture, detailing interactions between wpa_supplicant, hostapd, nl80211, cfg80211, mac80211, and ath9k driver to enhance performance and reliability.',
      'Implemented and tested socket programming using the TCP/IP protocol suite, leveraging Unix system calls for network communication and debugging.'
    ]
  },
];

export default experiences;
