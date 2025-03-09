import { RequestPurpose, CourseInformation } from '../types/request';

export const mockStudentRequest = {
  purpose: 'graduate_school' as RequestPurpose,
  customPurpose: '',
  referenceType: 'academic' as 'academic' | 'professional' | 'character',
  dueDate: '2024-06-30',
  targetAudience: 'Stanford University',
  coursesWithProfessor: [
    {
      courseCode: 'CS401',
      courseName: 'Advanced Algorithms',
      termTaken: 'Fall 2023',
      grade: 'A',
      achievements: ['Top project in class', 'Perfect score on final exam'],
      projectWork: 'Implemented a novel graph algorithm for social network analysis',
    },
    {
      courseCode: 'CS450',
      courseName: 'Machine Learning',
      termTaken: 'Spring 2023',
      grade: 'A-',
      achievements: ['Best presentation award'],
      projectWork: 'Developed a deep learning model for medical image classification',
    }
  ] as CourseInformation[],
  relationshipDuration: '2 years',
  interactionContext: ['Classroom', 'Research Lab', 'Academic Advisory'],
  strengthsAndQualities: [
    'Academic Excellence',
    'Research Aptitude',
    'Critical Thinking',
    'Problem Solving',
    'Initiative'
  ],
  academicPerformance: {
    gpa: '3.92',
    academicHonors: [
      'Dean\'s List 2022-2023',
      'Department Honors',
      'Outstanding Junior Award'
    ],
    researchExperience: 'Undergraduate Research Assistant in the AI Lab, working on natural language processing projects',
    publications: [
      'Smith et al., "Novel Approaches to NLP", Conference on AI 2023',
      'Contributing author on "Machine Learning Applications" workshop paper'
    ],
    presentations: [
      'Department Research Symposium 2023',
      'Undergraduate Research Conference'
    ],
  },
  extracurricularActivities: [
    'AI Student Society - President',
    'Competitive Programming Team',
    'Computer Science Tutoring Program'
  ],
  relevantProjects: [
    'Developed an AI-powered study assistant',
    'Created a distributed computing framework for campus research'
  ],
  careerGoals: 'Pursuing a Ph.D. in Computer Science with a focus on artificial intelligence and its applications in healthcare',
  reasonForRequest: 'Seeking admission to Stanford\'s Ph.D. program in Computer Science, specializing in AI and Machine Learning',
  deadlineInstructions: 'Reference letters should be submitted through the university portal by June 30, 2024',
  submissionMethod: {
    type: 'portal',
    details: 'Stanford Graduate Admissions Portal - Link will be sent via email',
  },
  additionalNotes: 'I would greatly appreciate if you could highlight my research experience and technical skills in the recommendation letter.',
}; 