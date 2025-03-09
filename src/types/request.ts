export type RequestStatus = 
  | 'pending'
  | 'in_progress'  // includes needs_info
  | 'completed'
  | 'rejected';

export type RequestPurpose =
  | 'graduate_school'
  | 'job_application'
  | 'scholarship'
  | 'research_position'
  | 'other'
  | 'internship';

export type Document = {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
};

export type CourseInformation = {
  courseCode: string;
  courseName: string;
  termTaken: string;
  grade?: string;
  achievements?: string[];
  projectWork?: string;
};

export type AcademicPerformance = {
  gpa?: string;
  academicHonors?: string[];
  researchExperience?: string;
  publications?: string[];
  presentations?: string[];
};

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  institution: string;
  department: string;
  program: string;
  documents: Document[];
  yearOfStudy: string;
  expectedGraduation?: string;
};

export type RequestHistory = {
  id: string;
  status: RequestStatus;
  timestamp: string;
  note?: string;
  updatedBy: string;
};

export type ReferenceRequest = {
  id: string;
  student: Student;
  status: RequestStatus;
  purpose: RequestPurpose;
  customPurpose?: string;
  requestDate: string;
  dueDate?: string;
  additionalNotes?: string;
  estimatedCompletionDate?: string;
  history: RequestHistory[];
  documents: Document[];
  institutionalEmail?: string;
  referenceType: 'academic' | 'professional' | 'character';
  isUrgent: boolean;
  referenceTemplate?: string;
  
  // New fields for detailed reference information
  coursesWithProfessor: CourseInformation[];
  academicPerformance: AcademicPerformance;
  relationshipDuration: string;
  interactionContext: string[];  // e.g., ["Classroom", "Research Lab", "Academic Advisory"]
  strengthsAndQualities: string[];
  extracurricularActivities?: string[];
  relevantProjects?: string[];
  careerGoals?: string;
  reasonForRequest: string;
  targetAudience?: string;  // Specific institution/company/program the letter is for
  deadlineInstructions?: string;
  submissionMethod?: {
    type: 'email' | 'portal' | 'physical' | 'other';
    details: string;
  };
}; 