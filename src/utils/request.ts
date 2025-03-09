import { RequestStatus, RequestPurpose, ReferenceRequest, CourseInformation } from '../types/request';

export const getStatusColor = (status: RequestStatus): string => {
  switch (status) {
    case 'pending':
      return '#f1c40f'; // yellow
    case 'in_progress':
      return '#3498db'; // blue
    case 'completed':
      return '#2ecc71'; // green
    case 'rejected':
      return '#e74c3c'; // red
    default:
      return '#95a5a6'; // gray
  }
};

export const getStatusLabel = (status: RequestStatus): string => {
  switch (status) {
    case 'completed':
      return 'Fulfilled';
    case 'in_progress':
      return 'In Progress';
    case 'pending':
      return 'Pending';
    case 'rejected':
      return 'Rejected';
  }
};

export const getPurposeLabel = (purpose: RequestPurpose): string => {
  return purpose.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getDaysRemaining = (dueDate?: string): number | null => {
  if (!dueDate) return null;
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getUrgencyLevel = (dueDate?: string): 'high' | 'medium' | 'low' | null => {
  const daysRemaining = getDaysRemaining(dueDate);
  if (daysRemaining === null) return null;
  if (daysRemaining <= 3) return 'high';
  if (daysRemaining <= 7) return 'medium';
  return 'low';
};

export const getUrgencyColor = (urgencyLevel: 'high' | 'medium' | 'low' | null): string => {
  switch (urgencyLevel) {
    case 'high':
      return '#e74c3c'; // red
    case 'medium':
      return '#f1c40f'; // yellow
    case 'low':
      return '#2ecc71'; // green
    default:
      return '#95a5a6'; // gray
  }
};

const formatCoursesList = (courses: CourseInformation[]): string => {
  return courses.map(course => {
    let courseText = `${course.courseName} (${course.courseCode}) during ${course.termTaken}`;
    if (course.grade) {
      courseText += `, achieving a grade of ${course.grade}`;
    }
    if (course.achievements?.length) {
      courseText += `. Notable achievements include: ${course.achievements.join(', ')}`;
    }
    if (course.projectWork) {
      courseText += `. ${course.projectWork}`;
    }
    return courseText;
  }).join('. ');
};

const formatAchievements = (request: ReferenceRequest): string => {
  const achievements = [];
  
  if (request.academicPerformance.gpa) {
    achievements.push(`maintained a GPA of ${request.academicPerformance.gpa}`);
  }
  
  if (request.academicPerformance.academicHonors?.length) {
    achievements.push(`received ${request.academicPerformance.academicHonors.join(', ')}`);
  }
  
  if (request.academicPerformance.researchExperience) {
    achievements.push(`gained valuable research experience in ${request.academicPerformance.researchExperience}`);
  }
  
  if (request.academicPerformance.publications?.length) {
    achievements.push(`contributed to publications including ${request.academicPerformance.publications.join(', ')}`);
  }
  
  if (request.academicPerformance.presentations?.length) {
    achievements.push(`presented research at ${request.academicPerformance.presentations.join(', ')}`);
  }
  
  return achievements.join(', and ');
};

export const generateReferenceTemplate = (request: ReferenceRequest): string => {
  const { student, purpose, referenceType } = request;
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const coursesList = formatCoursesList(request.coursesWithProfessor);
  const achievements = formatAchievements(request);
  const qualities = request.strengthsAndQualities.join(', ');

  const templates: Record<'academic' | 'professional' | 'character', string> = {
    academic: `
${date}

${request.targetAudience ? `To: ${request.targetAudience}` : 'To Whom It May Concern'}:

I am writing this letter to strongly recommend ${student.firstName} ${student.lastName}, who is applying for ${purpose === 'graduate_school' ? 'graduate studies' : purpose.replace('_', ' ')}. As a professor at ${student.institution}, I have had the pleasure of knowing ${student.firstName} for ${request.relationshipDuration} through our interactions in ${request.interactionContext.join(', ')}.

During this time, ${student.firstName} has taken the following courses with me: ${coursesList}.

${student.firstName} has demonstrated exceptional academic performance, where they ${achievements}. What truly sets ${student.firstName} apart are their outstanding qualities of ${qualities}.

${request.relevantProjects ? `I was particularly impressed by their work on ${request.relevantProjects.join(', ')}.` : ''}
${request.extracurricularActivities ? `Beyond academics, ${student.firstName} has shown leadership and initiative through involvement in ${request.extracurricularActivities.join(', ')}.` : ''}

${request.careerGoals ? `${student.firstName}'s career goal is to ${request.careerGoals}, and I am confident that their academic preparation and personal qualities make them an excellent candidate for this opportunity.` : `I am confident that ${student.firstName} would be an outstanding candidate for ${purpose.replace('_', ' ')}.`}

Please feel free to contact me if you require any additional information.

Sincerely,
[Professor's Name]
[Department]
[Institution]`,

    professional: `
${date}

${request.targetAudience ? `To: ${request.targetAudience}` : 'To Whom It May Concern'}:

I am writing to provide my highest recommendation for ${student.firstName} ${student.lastName}, who is seeking ${purpose.replace('_', ' ')}. As their professor at ${student.institution}, I have known ${student.firstName} for ${request.relationshipDuration} through ${request.interactionContext.join(', ')}.

During our association, I have observed ${student.firstName}'s exceptional capabilities through ${coursesList}. ${student.firstName} has consistently demonstrated ${qualities}, which are essential qualities for success in their chosen field.

${achievements ? `Their academic achievements include: ${achievements}.` : ''}

${request.relevantProjects ? `Of particular note is their work on ${request.relevantProjects.join(', ')}, which demonstrated their practical skills and professional potential.` : ''}
${request.extracurricularActivities ? `Additionally, ${student.firstName} has shown leadership and initiative through ${request.extracurricularActivities.join(', ')}.` : ''}

${request.careerGoals ? `${student.firstName} has expressed a strong interest in ${request.careerGoals}, and I believe their combination of technical skills, professional demeanor, and strong work ethic makes them an ideal candidate for this opportunity.` : `${student.firstName} would be a valuable addition to any organization, bringing a strong combination of technical skills, professional demeanor, and work ethic.`}

Please don't hesitate to contact me for any additional information.

Sincerely,
[Professor's Name]
[Department]
[Institution]`,

    character: `
${date}

${request.targetAudience ? `To: ${request.targetAudience}` : 'To Whom It May Concern'}:

I am writing to provide a character reference for ${student.firstName} ${student.lastName}, whom I have known for ${request.relationshipDuration} as their professor at ${student.institution}. Through our interactions in ${request.interactionContext.join(', ')}, I have had the opportunity to observe ${student.firstName}'s character and personal qualities closely.

${student.firstName} consistently demonstrates ${qualities}. These qualities have been evident in their academic work, where they ${achievements}.

${request.extracurricularActivities ? `Beyond the classroom, ${student.firstName} has shown their character through involvement in ${request.extracurricularActivities.join(', ')}.` : ''}

${request.careerGoals ? `Given ${student.firstName}'s goal to ${request.careerGoals}, I am confident that their personal qualities and character will serve them well in their future endeavors.` : `I am confident that ${student.firstName}'s strong character and personal qualities will serve them well in their future endeavors.`}

Please feel free to contact me if you require any additional information about ${student.firstName}'s character and capabilities.

Sincerely,
[Professor's Name]
[Department]
[Institution]`
  };

  return templates[referenceType] || templates.academic;
}; 