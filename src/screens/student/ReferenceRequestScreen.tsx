import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Text, Button, Input, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ReferenceRequest, RequestPurpose, CourseInformation } from '../../types/request';
import { mockStudentRequest } from '../../data/mockStudentRequest';

type FormStep = 
  | 'basic'
  | 'courses'
  | 'academic'
  | 'achievements'
  | 'purpose'
  | 'submission';

const INTERACTION_CONTEXTS = [
  'Classroom',
  'Research Lab',
  'Academic Advisory',
  'Student Organization',
  'Independent Study',
  'Other',
];

const QUALITIES = [
  'Academic Excellence',
  'Research Aptitude',
  'Critical Thinking',
  'Leadership',
  'Communication Skills',
  'Problem Solving',
  'Teamwork',
  'Initiative',
  'Creativity',
  'Work Ethic',
];

const PURPOSES = [
  { label: 'Graduate School', value: 'graduate_school' },
  { label: 'Job Application', value: 'job_application' },
  { label: 'Scholarship', value: 'scholarship' },
  { label: 'Research Position', value: 'research_position' },
  { label: 'Internship', value: 'internship' },
  { label: 'Other', value: 'other' },
] as const;

const REFERENCE_TYPES = [
  { label: 'Academic', value: 'academic' },
  { label: 'Professional', value: 'professional' },
  { label: 'Character', value: 'character' },
] as const;

export default function ReferenceRequestScreen() {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState<FormStep>('basic');
  const [courseCount, setCourseCount] = useState(mockStudentRequest.coursesWithProfessor.length);
  
  const [formData, setFormData] = useState(mockStudentRequest);

  const handleAddCourse = () => {
    setFormData(prev => ({
      ...prev,
      coursesWithProfessor: [
        ...prev.coursesWithProfessor,
        {
          courseCode: '',
          courseName: '',
          termTaken: '',
          grade: '',
          achievements: [],
          projectWork: '',
        },
      ],
    }));
    setCourseCount(prev => prev + 1);
  };

  const handleUpdateCourse = (index: number, field: keyof CourseInformation, value: string) => {
    setFormData(prev => ({
      ...prev,
      coursesWithProfessor: prev.coursesWithProfessor.map((course, i) =>
        i === index ? { ...course, [field]: value } : course
      ),
    }));
  };

  const handleToggleInteractionContext = (context: string) => {
    setFormData(prev => ({
      ...prev,
      interactionContext: prev.interactionContext.includes(context)
        ? prev.interactionContext.filter(c => c !== context)
        : [...prev.interactionContext, context],
    }));
  };

  const handleToggleQuality = (quality: string) => {
    setFormData(prev => ({
      ...prev,
      strengthsAndQualities: prev.strengthsAndQualities.includes(quality)
        ? prev.strengthsAndQualities.filter(q => q !== quality)
        : [...prev.strengthsAndQualities, quality],
    }));
  };

  const renderBasicInfo = () => (
    <View style={styles.stepContainer}>
      <Text h4 style={styles.stepTitle}>Basic Information</Text>
      
      <Text style={styles.inputLabel}>Purpose of Reference</Text>
      <View style={styles.pickerContainer}>
        {PURPOSES.map((purpose) => (
          <CheckBox
            key={purpose.value}
            title={purpose.label}
            checked={formData.purpose === purpose.value}
            onPress={() => setFormData(prev => ({ ...prev, purpose: purpose.value }))}
            containerStyle={styles.checkboxContainer}
          />
        ))}
      </View>

      <Text style={styles.inputLabel}>Type of Reference</Text>
      <View style={styles.pickerContainer}>
        {REFERENCE_TYPES.map((type) => (
          <CheckBox
            key={type.value}
            title={type.label}
            checked={formData.referenceType === type.value}
            onPress={() => setFormData(prev => ({ ...prev, referenceType: type.value }))}
            containerStyle={styles.checkboxContainer}
          />
        ))}
      </View>

      {formData.purpose === 'other' && (
        <Input
          label="Custom Purpose"
          placeholder="Please specify the purpose"
          value={formData.customPurpose}
          onChangeText={(value) => setFormData(prev => ({ ...prev, customPurpose: value }))}
        />
      )}

      <Input
        label="Target Institution/Company"
        placeholder="Where will this reference be sent?"
        value={formData.targetAudience}
        onChangeText={(value) => setFormData(prev => ({ ...prev, targetAudience: value }))}
      />

      <Input
        label="Due Date"
        placeholder="When do you need this reference?"
        value={formData.dueDate}
        onChangeText={(value) => setFormData(prev => ({ ...prev, dueDate: value }))}
      />

      <Button
        title="Next: Course Information"
        onPress={() => {
          if (!formData.purpose) {
            Alert.alert('Error', 'Please select a purpose for the reference');
            return;
          }
          if (!formData.referenceType) {
            Alert.alert('Error', 'Please select a type of reference');
            return;
          }
          setCurrentStep('courses');
        }}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );

  const renderCourseInfo = () => (
    <View style={styles.stepContainer}>
      <Text h4 style={styles.stepTitle}>Course Information</Text>
      
      {(formData.coursesWithProfessor || []).map((course, index) => (
        <View key={index} style={styles.courseContainer}>
          <Text style={styles.courseTitle}>Course {index + 1}</Text>
          
          <Input
            label="Course Code"
            placeholder="e.g., CS101"
            value={course.courseCode}
            onChangeText={(value) => handleUpdateCourse(index, 'courseCode', value)}
          />

          <Input
            label="Course Name"
            placeholder="e.g., Introduction to Computer Science"
            value={course.courseName}
            onChangeText={(value) => handleUpdateCourse(index, 'courseName', value)}
          />

          <Input
            label="Term Taken"
            placeholder="e.g., Fall 2023"
            value={course.termTaken}
            onChangeText={(value) => handleUpdateCourse(index, 'termTaken', value)}
          />

          <Input
            label="Grade (Optional)"
            placeholder="Your grade in this course"
            value={course.grade}
            onChangeText={(value) => handleUpdateCourse(index, 'grade', value)}
          />

          <Input
            label="Project Work (Optional)"
            placeholder="Describe any significant projects"
            value={course.projectWork}
            onChangeText={(value) => handleUpdateCourse(index, 'projectWork', value)}
            multiline
          />
        </View>
      ))}

      <Button
        title="Add Another Course"
        onPress={handleAddCourse}
        type="outline"
        containerStyle={styles.buttonContainer}
      />

      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={() => setCurrentStep('basic')}
          type="outline"
          containerStyle={[styles.buttonContainer, styles.backButton]}
        />
        <Button
          title="Next: Academic Performance"
          onPress={() => setCurrentStep('academic')}
          containerStyle={[styles.buttonContainer, styles.nextButton]}
        />
      </View>
    </View>
  );

  const renderAcademicInfo = () => (
    <View style={styles.stepContainer}>
      <Text h4 style={styles.stepTitle}>Academic Performance</Text>

      <Input
        label="Current GPA"
        placeholder="Your current GPA"
        value={formData.academicPerformance.gpa}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          academicPerformance: { ...prev.academicPerformance, gpa: value }
        }))}
      />

      <Input
        label="Research Experience"
        placeholder="Describe your research experience"
        value={formData.academicPerformance.researchExperience}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          academicPerformance: { ...prev.academicPerformance, researchExperience: value }
        }))}
        multiline
      />

      <Input
        label="Relationship Duration"
        placeholder="How long have you known the professor?"
        value={formData.relationshipDuration}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          relationshipDuration: value
        }))}
      />

      <Text style={styles.sectionTitle}>Interaction Context</Text>
      <View style={styles.pickerContainer}>
        {INTERACTION_CONTEXTS.map((context) => (
          <CheckBox
            key={context}
            title={context}
            checked={formData.interactionContext.includes(context)}
            onPress={() => handleToggleInteractionContext(context)}
            containerStyle={styles.checkboxContainer}
          />
        ))}
      </View>

      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={() => setCurrentStep('courses')}
          type="outline"
          containerStyle={[styles.buttonContainer, styles.backButton]}
        />
        <Button
          title="Next: Achievements"
          onPress={() => {
            if (!formData.relationshipDuration) {
              Alert.alert('Error', 'Please specify how long you have known the professor');
              return;
            }
            if (formData.interactionContext.length === 0) {
              Alert.alert('Error', 'Please select at least one interaction context');
              return;
            }
            setCurrentStep('achievements');
          }}
          containerStyle={[styles.buttonContainer, styles.nextButton]}
        />
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.stepContainer}>
      <Text h4 style={styles.stepTitle}>Achievements & Qualities</Text>

      <Text style={styles.sectionTitle}>Key Strengths & Qualities</Text>
      <View style={styles.pickerContainer}>
        {QUALITIES.map((quality) => (
          <CheckBox
            key={quality}
            title={quality}
            checked={formData.strengthsAndQualities.includes(quality)}
            onPress={() => handleToggleQuality(quality)}
            containerStyle={styles.checkboxContainer}
          />
        ))}
      </View>

      <Input
        label="Academic Honors"
        placeholder="List any academic honors or awards (comma-separated)"
        value={(formData.academicPerformance.academicHonors || []).join(', ')}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          academicPerformance: {
            ...prev.academicPerformance,
            academicHonors: value.split(',').map(v => v.trim()).filter(Boolean)
          }
        }))}
        multiline
      />

      <Input
        label="Publications"
        placeholder="List any publications (comma-separated)"
        value={(formData.academicPerformance.publications || []).join(', ')}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          academicPerformance: {
            ...prev.academicPerformance,
            publications: value.split(',').map(v => v.trim()).filter(Boolean)
          }
        }))}
        multiline
      />

      <Input
        label="Presentations"
        placeholder="List any presentations (comma-separated)"
        value={(formData.academicPerformance.presentations || []).join(', ')}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          academicPerformance: {
            ...prev.academicPerformance,
            presentations: value.split(',').map(v => v.trim()).filter(Boolean)
          }
        }))}
        multiline
      />

      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={() => setCurrentStep('academic')}
          type="outline"
          containerStyle={[styles.buttonContainer, styles.backButton]}
        />
        <Button
          title="Next: Purpose"
          onPress={() => {
            if (formData.strengthsAndQualities.length === 0) {
              Alert.alert('Error', 'Please select at least one strength or quality');
              return;
            }
            setCurrentStep('purpose');
          }}
          containerStyle={[styles.buttonContainer, styles.nextButton]}
        />
      </View>
    </View>
  );

  const renderPurpose = () => (
    <View style={styles.stepContainer}>
      <Text h4 style={styles.stepTitle}>Purpose & Goals</Text>

      <Input
        label="Career Goals"
        placeholder="Describe your career goals"
        value={formData.careerGoals}
        onChangeText={(value) => setFormData(prev => ({ ...prev, careerGoals: value }))}
        multiline
      />

      <Input
        label="Reason for Request"
        placeholder="Why are you requesting this reference?"
        value={formData.reasonForRequest}
        onChangeText={(value) => setFormData(prev => ({ ...prev, reasonForRequest: value }))}
        multiline
      />

      <Input
        label="Extracurricular Activities"
        placeholder="List your extracurricular activities (comma-separated)"
        value={(formData.extracurricularActivities || []).join(', ')}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          extracurricularActivities: value.split(',').map(v => v.trim()).filter(Boolean)
        }))}
        multiline
      />

      <Input
        label="Additional Notes"
        placeholder="Any additional information for the professor"
        value={formData.additionalNotes}
        onChangeText={(value) => setFormData(prev => ({ ...prev, additionalNotes: value }))}
        multiline
      />

      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={() => setCurrentStep('achievements')}
          type="outline"
          containerStyle={[styles.buttonContainer, styles.backButton]}
        />
        <Button
          title="Next: Submission Details"
          onPress={() => {
            if (!formData.reasonForRequest) {
              Alert.alert('Error', 'Please provide a reason for your reference request');
              return;
            }
            setCurrentStep('submission');
          }}
          containerStyle={[styles.buttonContainer, styles.nextButton]}
        />
      </View>
    </View>
  );

  const renderSubmission = () => (
    <View style={styles.stepContainer}>
      <Text h4 style={styles.stepTitle}>Submission Details</Text>

      <Input
        label="Deadline Instructions"
        placeholder="Any specific deadline instructions"
        value={formData.deadlineInstructions}
        onChangeText={(value) => setFormData(prev => ({ ...prev, deadlineInstructions: value }))}
        multiline
      />

      <Text style={styles.sectionTitle}>Submission Method</Text>
      <View style={styles.pickerContainer}>
        {['email', 'portal', 'physical', 'other'].map((method) => (
          <CheckBox
            key={method}
            title={method.charAt(0).toUpperCase() + method.slice(1)}
            checked={formData.submissionMethod.type === method}
            onPress={() => setFormData(prev => ({
              ...prev,
              submissionMethod: { ...prev.submissionMethod, type: method as any }
            }))}
            containerStyle={styles.checkboxContainer}
          />
        ))}
      </View>

      <Input
        label="Submission Details"
        placeholder="Provide details for the submission method"
        value={formData.submissionMethod.details}
        onChangeText={(value) => setFormData(prev => ({
          ...prev,
          submissionMethod: { ...prev.submissionMethod, details: value }
        }))}
        multiline
      />

      <View style={styles.navigationButtons}>
        <Button
          title="Back"
          onPress={() => setCurrentStep('purpose')}
          type="outline"
          containerStyle={[styles.buttonContainer, styles.backButton]}
        />
        <Button
          title="Submit Request"
          onPress={handleSubmit}
          containerStyle={[styles.buttonContainer, styles.nextButton]}
        />
      </View>
    </View>
  );

  const handleSubmit = () => {
    // Validate form data
    if (!formData.purpose) {
      Alert.alert('Error', 'Please select a purpose for the reference');
      setCurrentStep('basic');
      return;
    }

    if (formData.coursesWithProfessor.length === 0) {
      Alert.alert('Error', 'Please add at least one course');
      setCurrentStep('courses');
      return;
    }

    if (formData.interactionContext.length === 0) {
      Alert.alert('Error', 'Please select at least one interaction context');
      setCurrentStep('academic');
      return;
    }

    if (formData.strengthsAndQualities.length === 0) {
      Alert.alert('Error', 'Please select at least one strength or quality');
      setCurrentStep('achievements');
      return;
    }

    if (!formData.submissionMethod.type || !formData.submissionMethod.details) {
      Alert.alert('Error', 'Please provide submission method details');
      return;
    }

    // TODO: Submit the reference request
    console.log('Submitting reference request:', formData);
    Alert.alert(
      'Success',
      'Your reference request has been submitted successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'basic':
        return renderBasicInfo();
      case 'courses':
        return renderCourseInfo();
      case 'academic':
        return renderAcademicInfo();
      case 'achievements':
        return renderAchievements();
      case 'purpose':
        return renderPurpose();
      case 'submission':
        return renderSubmission();
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Step {['basic', 'courses', 'academic', 'achievements', 'purpose', 'submission']
              .indexOf(currentStep) + 1} of 6
          </Text>
        </View>
        {renderCurrentStep()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  progressContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  stepContainer: {
    padding: 15,
  },
  stepTitle: {
    marginBottom: 20,
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2c3e50',
  },
  courseContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    marginRight: 5,
  },
  nextButton: {
    flex: 1,
    marginLeft: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#86939e',
    marginBottom: 10,
    marginLeft: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginLeft: 0,
    marginRight: 0,
    padding: 8,
  },
}); 