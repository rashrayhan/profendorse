import { ReferenceRequest } from '../types/request';

export const MOCK_REQUESTS: ReferenceRequest[] = [
  {
    id: '1',
    student: {
      id: 'std1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@university.edu',
      institution: 'University of Technology',
      department: 'Computer Science',
      program: 'MSc Computer Science',
      yearOfStudy: '2',
      documents: [
        {
          id: 'doc1',
          name: 'Transcript',
          type: 'pdf',
          url: 'https://example.com/transcript.pdf',
          uploadedAt: '2024-03-15',
        },
        {
          id: 'doc2',
          name: 'CV',
          type: 'pdf',
          url: 'https://example.com/cv.pdf',
          uploadedAt: '2024-03-15',
        },
      ],
    },
    coursesWithProfessor: [
      {
        courseCode: 'CS501',
        courseName: 'Advanced Algorithms',
        termTaken: 'Fall 2023',
        grade: 'A',
        achievements: ['Implemented a distributed consensus algorithm', 'Developed an efficient graph processing system'],
        projectWork: 'Led team project on distributed systems'
      },
      {
        courseCode: 'CS502',
        courseName: 'Machine Learning',
        termTaken: 'Spring 2024',
        grade: 'A-',
        achievements: ['Built a neural network from scratch', 'Developed a recommendation system'],
        projectWork: 'Implemented deep learning models for computer vision'
      }
    ],
    academicPerformance: {
      gpa: '3.95',
      academicHonors: ['Dean\'s List 2023', 'Outstanding Graduate Student Award'],
      researchExperience: 'Research Assistant in Distributed Systems Lab',
      publications: ['Efficient Graph Processing in Distributed Systems, IEEE 2023'],
      presentations: ['Conference on Distributed Computing 2023']
    },
    relationshipDuration: '1.5 years',
    interactionContext: ['Classroom', 'Research Lab', 'Academic Advisory'],
    strengthsAndQualities: ['Technical Excellence', 'Research Aptitude', 'Problem Solving', 'Leadership'],
    reasonForRequest: 'Seeking admission to top PhD programs in Computer Science',
    status: 'pending',
    purpose: 'graduate_school',
    requestDate: '2024-03-15',
    dueDate: '2024-04-15',
    additionalNotes: 'Applying for PhD programs in Computer Science',
    documents: [
        {
          id: 'doc1',
          name: 'Transcript',
          type: 'pdf',
          url: 'https://example.com/transcript.pdf',
          uploadedAt: '2024-03-15',
        },
        {
          id: 'doc2',
          name: 'CV',
          type: 'pdf',
          url: 'https://example.com/cv.pdf',
          uploadedAt: '2024-03-15',
        },
      ],
    history: [
      {
        id: 'hist1',
        status: 'pending',
        timestamp: '2024-03-15T10:00:00Z',
        updatedBy: 'system',
      },
    ],
    referenceType: 'academic',
    isUrgent: true,
  },
  {
    id: '2',
    student: {
      id: 'std2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@university.edu',
      institution: 'University of Technology',
      department: 'Physics',
      program: 'PhD Physics',
      yearOfStudy: '3',
      documents: [
        {
          id: 'doc3',
          name: 'Research Paper',
          type: 'pdf',
          url: 'https://example.com/paper.pdf',
          uploadedAt: '2024-03-10',
        },
      ],
    },
    coursesWithProfessor: [
      {
        courseCode: 'PHY601',
        courseName: 'Quantum Mechanics II',
        termTaken: 'Fall 2023',
        grade: 'A',
        achievements: ['Quantum entanglement simulation', 'Quantum computing algorithms'],
        projectWork: 'Research on quantum cryptography'
      },
      {
        courseCode: 'PHY602',
        courseName: 'Advanced Particle Physics',
        termTaken: 'Spring 2024',
        grade: 'A',
        achievements: ['Particle collision analysis', 'Dark matter detection methods'],
        projectWork: 'Development of particle detection algorithms'
      }
    ],
    academicPerformance: {
      gpa: '4.0',
      academicHonors: ['Physics Department Excellence Award', 'Research Fellowship 2023'],
      researchExperience: 'Lead Researcher in Quantum Computing Lab',
      publications: ['Quantum Cryptography Applications, Nature Physics 2023'],
      presentations: ['International Physics Conference 2023', 'Quantum Computing Workshop']
    },
    relationshipDuration: '2 years',
    interactionContext: ['Research Lab', 'Advanced Coursework', 'Research Supervision'],
    strengthsAndQualities: ['Research Innovation', 'Analytical Skills', 'Scientific Writing', 'Project Leadership'],
    reasonForRequest: 'Applying for research position at CERN to advance particle physics research',
    status: 'in_progress',
    purpose: 'research_position',
    requestDate: '2024-03-10',
    dueDate: '2024-03-25',
    additionalNotes: 'Applying for research position at CERN',
    documents: [],
    history: [
      {
        id: 'hist2',
        status: 'pending',
        timestamp: '2024-03-10T09:00:00Z',
        updatedBy: 'system',
      },
      {
        id: 'hist3',
        status: 'in_progress',
        timestamp: '2024-03-12T14:30:00Z',
        updatedBy: 'prof1',
        note: 'Started working on the reference',
      },
    ],
    referenceType: 'academic',
    isUrgent: true,
  },
  {
    id: '3',
    student: {
      id: 'std3',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@university.edu',
      institution: 'University of Technology',
      department: 'Business',
      program: 'MBA',
      yearOfStudy: '2',
      documents: [
        {
          id: 'doc4',
          name: 'Resume',
          type: 'pdf',
          url: 'https://example.com/resume.pdf',
          uploadedAt: '2024-03-01',
        },
      ],
    },
    coursesWithProfessor: [
      {
        courseCode: 'BUS501',
        courseName: 'Strategic Management',
        termTaken: 'Fall 2023',
        grade: 'A-',
        achievements: ['Corporate strategy analysis', 'Market expansion plan'],
        projectWork: 'Led team project on business strategy'
      },
      {
        courseCode: 'BUS502',
        courseName: 'Financial Analysis',
        termTaken: 'Spring 2024',
        grade: 'B+',
        achievements: ['Investment portfolio optimization', 'Risk assessment model'],
        projectWork: 'Developed financial modeling tools'
      }
    ],
    academicPerformance: {
      gpa: '3.8',
      academicHonors: ['MBA Leadership Award'],
      researchExperience: 'Business Strategy Research Assistant',
      publications: ['Business Strategy in Tech Companies, MBA Review 2023'],
      presentations: ['MBA Case Competition 2023']
    },
    relationshipDuration: '1 year',
    interactionContext: ['Classroom', 'Case Study Projects', 'Career Mentoring'],
    strengthsAndQualities: ['Strategic Thinking', 'Leadership', 'Financial Analysis', 'Project Management'],
    reasonForRequest: 'Seeking management position to apply strategic and financial expertise',
    status: 'completed',
    purpose: 'job_application',
    requestDate: '2024-03-01',
    additionalNotes: 'Applying for management position at Tech Corp',
    documents: [],
    history: [
      {
        id: 'hist4',
        status: 'pending',
        timestamp: '2024-03-01T11:00:00Z',
        updatedBy: 'system',
      },
      {
        id: 'hist5',
        status: 'in_progress',
        timestamp: '2024-03-02T09:15:00Z',
        updatedBy: 'prof1',
      },
      {
        id: 'hist6',
        status: 'completed',
        timestamp: '2024-03-05T16:45:00Z',
        updatedBy: 'prof1',
        note: 'Reference completed and sent',
      },
    ],
    referenceType: 'professional',
    isUrgent: false,
  },
  {
    id: '4',
    student: {
      id: 'std4',
      firstName: 'Alice',
      lastName: 'Brown',
      email: 'alice.brown@university.edu',
      institution: 'University of Technology',
      department: 'Computer Science',
      program: 'BSc Computer Science',
      yearOfStudy: '4',
      documents: [],
    },
    coursesWithProfessor: [
      {
        courseCode: 'CS401',
        courseName: 'Software Engineering',
        termTaken: 'Fall 2023',
        grade: 'A',
        achievements: ['Developed a task management system', 'Led team project on cloud deployment'],
        projectWork: 'Full-stack development of enterprise application'
      },
      {
        courseCode: 'CS402',
        courseName: 'Database Systems',
        termTaken: 'Spring 2024',
        grade: 'A-',
        achievements: ['Designed a distributed database', 'Implemented query optimization'],
        projectWork: 'Database optimization research'
      }
    ],
    academicPerformance: {
      gpa: '3.9',
      academicHonors: ['Outstanding Senior Award', 'CS Department Scholarship'],
      researchExperience: 'Undergraduate Research in Database Systems',
      publications: ['Optimizing Database Performance, Undergraduate Research Journal 2023'],
      presentations: ['Senior Project Showcase 2024']
    },
    relationshipDuration: '2 years',
    interactionContext: ['Classroom', 'Project Supervision', 'Research Mentoring'],
    strengthsAndQualities: ['Technical Skills', 'Project Leadership', 'Problem Solving', 'Team Collaboration'],
    reasonForRequest: 'Applying for merit scholarship to support continued academic excellence',
    status: 'in_progress',
    purpose: 'scholarship',
    requestDate: '2024-03-18',
    dueDate: '2024-04-01',
    additionalNotes: 'Applying for merit scholarship',
    documents: [],
    history: [
      {
        id: 'hist7',
        status: 'pending',
        timestamp: '2024-03-18T13:20:00Z',
        updatedBy: 'system',
      },
      {
        id: 'hist8',
        status: 'in_progress',
        timestamp: '2024-03-19T10:00:00Z',
        updatedBy: 'prof1',
        note: 'Need transcript and project details',
      },
    ],
    referenceType: 'academic',
    isUrgent: true,
  },
  {
    id: '5',
    student: {
      id: 'std5',
      firstName: 'Michael',
      lastName: 'Wilson',
      email: 'michael.wilson@university.edu',
      institution: 'University of Technology',
      department: 'Engineering',
      program: 'MEng Mechanical Engineering',
      yearOfStudy: '1',
      documents: [
        {
          id: 'doc5',
          name: 'Transcript',
          type: 'pdf',
          url: 'https://example.com/transcript_wilson.pdf',
          uploadedAt: '2024-03-01',
        }
      ],
    },
    coursesWithProfessor: [
      {
        courseCode: 'ME501',
        courseName: 'Advanced Thermodynamics',
        termTaken: 'Fall 2023',
        grade: 'B+',
        achievements: ['Heat exchanger design', 'Energy efficiency analysis'],
        projectWork: 'Thermal system optimization research'
      },
      {
        courseCode: 'ME502',
        courseName: 'Robotics',
        termTaken: 'Spring 2024',
        grade: 'A-',
        achievements: ['Robot arm kinematics', 'Autonomous navigation system'],
        projectWork: 'Development of robotic control systems'
      }
    ],
    academicPerformance: {
      gpa: '3.5',
      academicHonors: ['Engineering Innovation Award'],
      researchExperience: 'Graduate Research Assistant in Robotics Lab',
      publications: [],
      presentations: ['Engineering Design Showcase 2023']
    },
    relationshipDuration: '6 months',
    interactionContext: ['Classroom', 'Lab Work'],
    strengthsAndQualities: ['Technical Knowledge', 'Practical Skills', 'Innovation'],
    reasonForRequest: 'Seeking admission to Stanford\'s graduate program in Mechanical Engineering',
    status: 'rejected',
    purpose: 'graduate_school',
    requestDate: '2024-03-01',
    dueDate: '2024-03-20',
    additionalNotes: 'Applying for Stanford University graduate program',
    documents: [],
    history: [
      {
        id: 'hist9',
        status: 'pending',
        timestamp: '2024-03-01T09:00:00Z',
        updatedBy: 'system',
      },
      {
        id: 'hist10',
        status: 'rejected',
        timestamp: '2024-03-02T14:30:00Z',
        updatedBy: 'prof1',
        note: 'Unable to provide reference due to insufficient interaction in coursework',
      }
    ],
    referenceType: 'academic',
    isUrgent: false,
  },
  {
    id: '6',
    student: {
      id: 'std6',
      firstName: 'Sarah',
      lastName: 'Chen',
      email: 'sarah.chen@university.edu',
      institution: 'University of Technology',
      department: 'Data Science',
      program: 'MSc Data Science',
      yearOfStudy: '2',
      documents: [
        {
          id: 'doc6',
          name: 'Research Proposal',
          type: 'pdf',
          url: 'https://example.com/proposal.pdf',
          uploadedAt: '2024-03-20',
        }
      ],
    },
    coursesWithProfessor: [
      {
        courseCode: 'DS501',
        courseName: 'Advanced Data Mining',
        termTaken: 'Fall 2023',
        grade: 'A',
        achievements: ['Developed novel clustering algorithm', 'Best project award'],
        projectWork: 'Big data analysis for healthcare'
      },
      {
        courseCode: 'DS502',
        courseName: 'Neural Networks',
        termTaken: 'Spring 2024',
        grade: 'A',
        achievements: ['Published research paper', 'Conference presentation'],
        projectWork: 'Deep learning for medical imaging'
      }
    ],
    academicPerformance: {
      gpa: '4.0',
      academicHonors: ['Graduate Research Excellence Award', 'Department Scholarship'],
      researchExperience: 'Lead Researcher in AI Healthcare Lab',
      publications: ['Neural Networks in Healthcare, IEEE 2024'],
      presentations: ['AI in Medicine Conference 2024']
    },
    relationshipDuration: '2 years',
    interactionContext: ['Research Lab', 'Classroom', 'Conference'],
    strengthsAndQualities: ['Research Excellence', 'Innovation', 'Technical Skills', 'Leadership'],
    reasonForRequest: 'Applying for research position at Google AI Health',
    status: 'pending',
    purpose: 'job_application',
    requestDate: '2024-03-20',
    dueDate: '2024-04-10',
    additionalNotes: 'Position focuses on AI applications in healthcare',
    documents: [],
    history: [
      {
        id: 'hist11',
        status: 'pending',
        timestamp: '2024-03-20T10:00:00Z',
        updatedBy: 'system',
      }
    ],
    referenceType: 'academic',
    isUrgent: true,
  },
  {
    id: '7',
    student: {
      id: 'std7',
      firstName: 'David',
      lastName: 'Park',
      email: 'david.park@university.edu',
      institution: 'University of Technology',
      department: 'Computer Science',
      program: 'BSc Computer Science',
      yearOfStudy: '3',
      documents: [],
    },
    coursesWithProfessor: [
      {
        courseCode: 'CS301',
        courseName: 'Operating Systems',
        termTaken: 'Fall 2023',
        grade: 'A-',
        achievements: ['Kernel modification project', 'System optimization'],
        projectWork: 'Developed custom scheduler'
      }
    ],
    academicPerformance: {
      gpa: '3.7',
      academicHonors: ['Merit Scholarship'],
      researchExperience: 'Systems Lab Assistant',
      publications: [],
      presentations: ['Systems Workshop 2024']
    },
    relationshipDuration: '1 year',
    interactionContext: ['Classroom', 'Lab Sessions'],
    strengthsAndQualities: ['Technical Skills', 'Problem Solving', 'Team Work'],
    reasonForRequest: 'Summer internship at Microsoft',
    status: 'pending',
    purpose: 'internship',
    requestDate: '2024-03-19',
    dueDate: '2024-04-05',
    additionalNotes: 'Internship in Windows Kernel team',
    documents: [],
    history: [
      {
        id: 'hist12',
        status: 'pending',
        timestamp: '2024-03-19T15:30:00Z',
        updatedBy: 'system',
      }
    ],
    referenceType: 'academic',
    isUrgent: true,
  },
  {
    id: '8',
    student: {
      id: 'std8',
      firstName: 'Emma',
      lastName: 'Garcia',
      email: 'emma.garcia@university.edu',
      institution: 'University of Technology',
      department: 'Computer Science',
      program: 'PhD Computer Science',
      yearOfStudy: '2',
      documents: [],
    },
    coursesWithProfessor: [
      {
        courseCode: 'CS701',
        courseName: 'Advanced AI',
        termTaken: 'Fall 2023',
        grade: 'A',
        achievements: ['Research publication', 'Conference presentation'],
        projectWork: 'Reinforcement learning research'
      }
    ],
    academicPerformance: {
      gpa: '3.95',
      academicHonors: ['PhD Fellowship', 'Research Grant'],
      researchExperience: 'AI Lab Researcher',
      publications: ['Reinforcement Learning Advances, NeurIPS 2023'],
      presentations: ['AI Conference 2024']
    },
    relationshipDuration: '2 years',
    interactionContext: ['Research', 'Teaching Assistant'],
    strengthsAndQualities: ['Research', 'Teaching', 'Leadership'],
    reasonForRequest: 'Research grant application',
    status: 'in_progress',
    purpose: 'research_position',
    requestDate: '2024-03-18',
    dueDate: '2024-04-15',
    additionalNotes: 'NSF Research Grant Application',
    documents: [],
    history: [
      {
        id: 'hist13',
        status: 'pending',
        timestamp: '2024-03-18T09:00:00Z',
        updatedBy: 'system',
      },
      {
        id: 'hist14',
        status: 'in_progress',
        timestamp: '2024-03-19T14:00:00Z',
        updatedBy: 'prof1',
      }
    ],
    referenceType: 'academic',
    isUrgent: false,
  },
  {
    id: '9',
    student: {
      id: 'std9',
      firstName: 'Ryan',
      lastName: 'Murphy',
      email: 'ryan.murphy@university.edu',
      institution: 'University of Technology',
      department: 'Computer Science',
      program: 'MSc Computer Science',
      yearOfStudy: '1',
      documents: [],
    },
    coursesWithProfessor: [
      {
        courseCode: 'CS601',
        courseName: 'Cloud Computing',
        termTaken: 'Fall 2023',
        grade: 'B+',
        achievements: ['AWS certification', 'Cloud deployment project'],
        projectWork: 'Serverless architecture implementation'
      }
    ],
    academicPerformance: {
      gpa: '3.5',
      academicHonors: [],
      researchExperience: 'Cloud Computing Lab',
      publications: [],
      presentations: []
    },
    relationshipDuration: '6 months',
    interactionContext: ['Classroom'],
    strengthsAndQualities: ['Technical Skills', 'Cloud Expertise'],
    reasonForRequest: 'Job application at Amazon AWS',
    status: 'rejected',
    purpose: 'job_application',
    requestDate: '2024-03-15',
    dueDate: '2024-03-30',
    additionalNotes: 'Position in AWS development team',
    documents: [],
    history: [
      {
        id: 'hist15',
        status: 'pending',
        timestamp: '2024-03-15T11:00:00Z',
        updatedBy: 'system',
      },
      {
        id: 'hist16',
        status: 'rejected',
        timestamp: '2024-03-16T09:00:00Z',
        updatedBy: 'prof1',
        note: 'Insufficient interaction time and course performance'
      }
    ],
    referenceType: 'professional',
    isUrgent: true,
  },
  {
    id: '10',
    student: {
      id: 'std10',
      firstName: 'Olivia',
      lastName: 'Taylor',
      email: 'olivia.taylor@university.edu',
      institution: 'University of Technology',
      department: 'Computer Science',
      program: 'MSc Computer Science',
      yearOfStudy: '2',
      documents: [
        {
          id: 'doc7',
          name: 'Project Portfolio',
          type: 'pdf',
          url: 'https://example.com/portfolio.pdf',
          uploadedAt: '2024-03-17',
        }
      ],
    },
    coursesWithProfessor: [
      {
        courseCode: 'CS550',
        courseName: 'Computer Graphics',
        termTaken: 'Fall 2023',
        grade: 'A',
        achievements: ['3D rendering engine', 'Graphics optimization'],
        projectWork: 'Real-time ray tracing implementation'
      }
    ],
    academicPerformance: {
      gpa: '3.85',
      academicHonors: ['Graphics Lab Excellence Award'],
      researchExperience: 'Graphics and Visualization Lab',
      publications: ['Real-time Rendering Techniques, SIGGRAPH 2024'],
      presentations: ['Graphics Symposium 2024']
    },
    relationshipDuration: '1.5 years',
    interactionContext: ['Research Lab', 'Classroom'],
    strengthsAndQualities: ['Technical Innovation', 'Research Skills', 'Problem Solving'],
    reasonForRequest: 'PhD application to MIT',
    status: 'completed',
    purpose: 'graduate_school',
    requestDate: '2024-03-17',
    dueDate: '2024-04-01',
    additionalNotes: 'Applying to MIT Graphics Lab',
    documents: [],
    history: [
      {
        id: 'hist17',
        status: 'pending',
        timestamp: '2024-03-17T10:00:00Z',
        updatedBy: 'system',
      },
      {
        id: 'hist18',
        status: 'in_progress',
        timestamp: '2024-03-18T09:00:00Z',
        updatedBy: 'prof1',
      },
      {
        id: 'hist19',
        status: 'completed',
        timestamp: '2024-03-19T16:00:00Z',
        updatedBy: 'prof1',
        note: 'Strong letter of recommendation submitted'
      }
    ],
    referenceType: 'academic',
    isUrgent: false,
  }
]; 