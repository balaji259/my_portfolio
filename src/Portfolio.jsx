import React, { useState, useEffect } from 'react';
import { Moon, Sun, Download, Github, Linkedin, Twitter, Mail, MapPin, ExternalLink, ChevronDown, Code, Database, Globe, Zap, Award, Calendar } from 'lucide-react';
import emailjs from 'emailjs-com';
import { useRef } from 'react';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

    const form = useRef();

      const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_v4gr136',     // Replace with your actual Service ID
      'template_3d5lgia',    // Replace with your actual Template ID
      form.current,
      '8UnRp3HkmXhkBDkTH'      // Replace with your actual Public Key
    )
    .then(() => {
      alert('✅ Message sent! I will get back to you soon.');
      form.current.reset();
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      alert('❌ Failed to send message. Please try again.');
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'education', 'resume', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = {
    Languages: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
    Frontend: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
    Backend: ['Node.js', 'Express.js', 'Django', 'FastAPI', 'REST APIs'],
    Database: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    Tools: ['Git', 'Docker', 'AWS', 'VS Code', 'Postman', 'Figma'],
    Others: ['GraphQL', 'Socket.io', 'Jest', 'Webpack', 'Linux']
  };

  const skillLogos = {
  JavaScript: 'https://skillicons.dev/icons?i=js',
  TypeScript: 'https://skillicons.dev/icons?i=ts',
  Python: 'https://skillicons.dev/icons?i=python',
  Java: 'https://skillicons.dev/icons?i=java',
  'C++': 'https://skillicons.dev/icons?i=cpp',

  React: 'https://skillicons.dev/icons?i=react',
  'Next.js': 'https://skillicons.dev/icons?i=nextjs',
  'Vue.js': 'https://skillicons.dev/icons?i=vue',
  'Tailwind CSS': 'https://skillicons.dev/icons?i=tailwind',
  HTML5: 'https://skillicons.dev/icons?i=html',
  CSS3: 'https://skillicons.dev/icons?i=css',

  'Node.js': 'https://skillicons.dev/icons?i=nodejs',
  'Express.js': 'https://skillicons.dev/icons?i=express',
  Django: 'https://skillicons.dev/icons?i=django',
  FastAPI: '', // Not available on Skillicons
  'REST APIs': '',

  MongoDB: 'https://skillicons.dev/icons?i=mongodb',
  PostgreSQL: 'https://skillicons.dev/icons?i=postgres',
  MySQL: 'https://skillicons.dev/icons?i=mysql',
  Redis: 'https://skillicons.dev/icons?i=redis',

  Git: 'https://skillicons.dev/icons?i=git',
  Docker: 'https://skillicons.dev/icons?i=docker',
  AWS: 'https://skillicons.dev/icons?i=aws',
  'VS Code': 'https://skillicons.dev/icons?i=vscode',
  Postman: 'https://skillicons.dev/icons?i=postman',
  Figma: 'https://skillicons.dev/icons?i=figma',

  GraphQL: 'https://skillicons.dev/icons?i=graphql',
  'Socket.io': '', // Not available
  Jest: 'https://skillicons.dev/icons?i=jest',
  Webpack: 'https://skillicons.dev/icons?i=webpack',
  Linux: 'https://skillicons.dev/icons?i=linux'
};


  const projects = [
    {
      title: 'friendsbook',
      description: 'Full-stack MERN application with payment integration, admin dashboard, and real-time notifications.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
      github: 'https://github.com/username/ecommerce',
      demo: 'https://demo-ecommerce.com',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Real-Time Chat Application',
      description: 'WebSocket-based chat app with rooms, file sharing, and emoji reactions.',
      tech: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      github: 'https://github.com/username/chat-app',
      demo: 'https://demo-chat.com',
      image: '/api/placeholder/400/250'
    },
    {
      title: 'AI-Powered Task Manager',
      description: 'Smart task management with AI categorization and priority suggestions.',
      tech: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL'],
      github: 'https://github.com/username/ai-tasks',
      demo: 'https://demo-tasks.com',
      image: '/api/placeholder/400/250'
    }
  ];

  const experiences = [
    {
      company: 'Pragyashal',
      role: 'Web Dev Intern',
      duration: 'May 2025 - July 2025',
      points: [
        'Built multiple responsive and visually engaging web pages based on client requirements',
        'Led a small team to ensure timely delivery of high-quality frontend components',
        'Managed project timelines and delegated tasks effectively within the team'
      ]
    },
    {
      company: 'Friendsbook',
      role: 'Full-Stack Developer (MERN)',
      duration: 'Oct 2024 - March 2025',
      points: [
        'Built friendsbook - social media application using mern stack',
        'Used socket.io to make real time messaging feature.',
        'Used tailwindcss to make the application responsive across all screens.'
      ]
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Balaji
            </div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`transition-colors duration-300 hover:text-blue-600 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              {/* <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse`}>
                {/* <div className={`w-full h-full rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  B
                </div> */}
                {/* <img className={`w-32 h-32 mx-auto rounded-full  p-1 animate-pulse`} src="blob:https://web.whatsapp.com/48fc9478-c02b-443f-b242-34aa4e586ccb" /> */}
              {/* </div> */} 
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="/images/BALAJI.png"
                  alt="Profile Pic"
                />
              </div>
            </div>

            </div>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Balaji</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A Full-Stack Developer
            </p>
            <p className={`text-lg mb-12 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Building digital solutions that solve real-world problems with cutting-edge technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('resume')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                View Resume
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-4 border-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${darkMode ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white' : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'}`}
              >
                Contact Me
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
        </div>
      </section>

      {/* About Me */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm a passionate full-stack developer with a love for creating innovative web applications that make a difference. 
                Currently pursuing my Computer Science degree, I spend my time building projects that challenge me to learn new technologies.
              </p>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                My expertise lies in the MERN stack, but I'm always excited to explore new frameworks and languages. 
                I believe in writing clean, maintainable code and creating user experiences that are both beautiful and functional.
              </p>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                When I'm not coding, you'll find me contributing to open-source projects, reading tech blogs, or playing chess. 
                I'm always ready for a new challenge!
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <Code className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Clean Code</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Writing maintainable and scalable code</p>
              </div>
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <Globe className="w-8 h-8 text-green-500 mb-4" />
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Web Development</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full-stack web applications</p>
              </div>
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <Database className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Database Design</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Efficient data management</p>
              </div>
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Performance</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Optimized user experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {/* {skillList.map((skill) => (
                    <span key={skill} className={`px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 cursor-default`}>
                      {skill}
                    </span>
                  ))} */}
                  {skillList.map((skill) => (
                    <span
                        key={skill}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        } hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 cursor-default`}
                    >
                        {skillLogos[skill] && (
                        <img
                            src={skillLogos[skill]}
                            alt={`${skill} logo`}
                            className="w-5 h-5"
                        />
                        )}
                        {skill}
                    </span>
                    ))}

                </div>
              </div>
            ))}


          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors duration-300`}>
                      <Github size={16} />
                      Code
                    </a>
                    <a href={project.demo} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'} transition-colors duration-300`}>
                      <ExternalLink size={16} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Experience
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {exp.role}
                    </h3>
                    <p className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {exp.company}
                    </p>
                  </div>
                  <span className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                    <Calendar size={16} />
                    {exp.duration}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} flex items-start gap-2`}>
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Achievements & Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'HackTheCode Winner', desc: 'First place in college hackathon', icon: Award },
              { title: 'React Developer Certified', desc: 'Meta React Developer Certification', icon: Award },
              { title: 'LeetCode 500+', desc: 'Solved 500+ coding problems', icon: Code },
              { title: 'Open Source Contributor', desc: 'Contributed to 5+ projects', icon: Github },
              { title: 'Tech Talk Speaker', desc: 'Spoke about React at local meetup', icon: Globe },
              { title: 'AWS Cloud Practitioner', desc: 'AWS Certified Cloud Practitioner', icon: Award }
            ].map((achievement, index) => (
              <div key={index} className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <achievement.icon className="w-8 h-8 text-purple-500 mb-4" />
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {achievement.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {achievement.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Education
          </h2>
          <div className={`max-w-4xl mx-auto p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Bachelor of Technology in Computer Science
                </h3>
                <p className={`text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  Indian Institute of Technology
                </p>
              </div>
              <div className="text-right">
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2021 - 2025</p>
                <p className={`text-lg font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>CGPA: 8.5/10</p>
              </div>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Relevant Coursework:</h4>
              <div className="flex flex-wrap gap-2">
                {['Data Structures & Algorithms', 'Database Management Systems', 'Web Development', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Machine Learning', 'Distributed Systems'].map((course) => (
                  <span key={course} className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Resume
          </h2>
          <p className={`text-lg mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Download my latest resume to learn more about my experience and qualifications.
          </p>
          {/* <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            <Download size={20} />
            Download Resume (PDF)
          </button> */}
           <a
            href="/BALAJI_RESUME.pdf" // this assumes it's in the public folder
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            <Download size={20} />
            Download Resume (PDF)
          </a>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Let's Work Together
              </h3>
              <p className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>balajipuneti259@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Kadapa, Andhra Pradesh, India</span>
                </div>
              </div>
              <div className="flex gap-6 mt-8">
                <a href="https://github.com/balaji259" className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'} transition-all duration-300 hover:-translate-y-1`}>
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/balaji-puneti" className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'} transition-all duration-300 hover:-translate-y-1`}>
                  <Linkedin size={24} />
                </a>
                {/* <a href="#" className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'} transition-all duration-300 hover:-translate-y-1`}>
                  <Twitter size={24} />
                </a> */}

              


              </div>
            </div>
            {/* <form className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Send Message
              </button>
            </form> */}

               <form ref={form} onSubmit={sendEmail} className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
        <input type="text" name="from_name" required
          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          placeholder="Your name" />
      </div>

      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
        <input type="email" name="from_email" required
          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          placeholder="you@example.com" />
      </div>

      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
        <textarea name="message" rows={5} required
          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          placeholder="Your message..." />
      </div>

      <button type="submit"
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        Send Message
      </button>
    </form>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Balaji
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4 md:mt-0`}>
              © 2025 Balaji. Built with React & Tailwind CSS.
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
      >
        <ChevronDown className="w-6 h-6 transform rotate-180" />
      </button>
    </div>
  );
};

export default Portfolio;