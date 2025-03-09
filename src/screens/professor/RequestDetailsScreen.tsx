import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Text, Button, Icon, Divider, Header } from 'react-native-elements';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ReferenceRequest, RequestStatus, RequestHistory } from '../../types/request';
import { RootStackParamList } from '../../navigation';
import {
  getStatusColor,
  getStatusLabel,
  getPurposeLabel,
  formatDate,
  getUrgencyLevel,
  getUrgencyColor,
} from '../../utils/request';

type RequestDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'RequestDetails'>;

type RequestDetailsParams = {
  RequestDetails: {
    request: ReferenceRequest;
    onAccept?: (request: ReferenceRequest) => void;
    onReject?: (request: ReferenceRequest) => void;
    onComplete?: (request: ReferenceRequest) => void;
  };
};

export default function RequestDetailsScreen() {
  const route = useRoute<RouteProp<RequestDetailsParams, 'RequestDetails'>>();
  const navigation = useNavigation<RequestDetailsScreenNavigationProp>();
  const request = route.params?.request;
  const { onAccept, onReject, onComplete } = route.params || {};
  const [editedTemplate, setEditedTemplate] = useState(request?.referenceTemplate || '');
  const urgencyLevel = request?.dueDate ? getUrgencyLevel(request.dueDate) : null;
  const isPending = request?.status === 'pending';
  const isInProgress = request?.status === 'in_progress';

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Reference Request',
      headerTitleStyle: styles.headerTitle,
      headerLeft: () => (
        <Icon
          name="arrow-left"
          type="feather"
          size={24}
          color="#000"
          containerStyle={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
      ),
      headerStyle: styles.headerStyle,
      headerShadowVisible: false,
    });
  }, [navigation]);

  if (!request) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Request details not found</Text>
        <Button
          title="Go Back"
          onPress={() => navigation.goBack()}
          containerStyle={styles.buttonContainer}
        />
      </View>
    );
  }

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {content}
    </View>
  );

  const renderDocuments = () => {
    const allDocuments = [...(request.documents || []), ...(request.student.documents || [])];
    if (allDocuments.length === 0) {
      return (
        <Text style={styles.emptyText}>No documents attached</Text>
      );
    }

    return allDocuments.map((doc, index) => (
      <View key={index} style={styles.documentItem}>
        <Icon
          name="file-text"
          type="feather"
          size={20}
          color="#666"
          style={styles.documentIcon}
        />
        <View style={styles.documentInfo}>
          <Text style={styles.documentName}>{doc.name}</Text>
          <Text style={styles.documentMeta}>
            {doc.type.toUpperCase()} • Uploaded on {formatDate(doc.uploadedAt)}
          </Text>
        </View>
        <Icon
          name="download"
          type="feather"
          size={20}
          color="#3498db"
          onPress={() => {/* TODO: Implement download */}}
        />
      </View>
    ));
  };

  const renderCourseInfo = () => {
    if (!request.coursesWithProfessor || request.coursesWithProfessor.length === 0) {
      return (
        <Text style={styles.emptyText}>No course information available</Text>
      );
    }

    return request.coursesWithProfessor.map((course, index) => (
      <View key={index} style={styles.courseContainer}>
        <View style={styles.courseHeader}>
          <Text style={styles.courseName}>
            {course.courseName} ({course.courseCode})
          </Text>
          <Text style={[styles.courseGrade, { color: course.grade === 'A' || course.grade === 'A-' ? '#2ecc71' : '#3498db' }]}>
            {course.grade}
          </Text>
        </View>
        <Text style={styles.courseMeta}>Taken in {course.termTaken}</Text>
        
        {course.achievements && course.achievements.length > 0 && (
          <View style={styles.courseSection}>
            <Text style={styles.courseSectionTitle}>Achievements:</Text>
            {course.achievements.map((achievement, i) => (
              <View key={i} style={styles.achievementItem}>
                <Icon
                  name="check-circle"
                  type="feather"
                  size={14}
                  color="#2ecc71"
                  style={styles.achievementIcon}
                />
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        )}
        
        {course.projectWork && (
          <View style={styles.courseSection}>
            <Text style={styles.courseSectionTitle}>Project Work:</Text>
            <Text style={styles.projectText}>{course.projectWork}</Text>
          </View>
        )}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text h4 style={styles.name}>
                {request.student.firstName} {request.student.lastName}
              </Text>
              <Text
                style={[
                  styles.status,
                  { backgroundColor: getStatusColor(request.status) },
                ]}
              >
                {getStatusLabel(request.status)}
              </Text>
            </View>
            <Text style={styles.program}>{request.student.program}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Request Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Purpose</Text>
              <Text style={styles.detailValue}>{getPurposeLabel(request.purpose)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Reference Type</Text>
              <Text style={styles.detailValue}>
                {request.referenceType.charAt(0).toUpperCase() + request.referenceType.slice(1)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Requested Date</Text>
              <Text style={styles.detailValue}>{formatDate(request.requestDate)}</Text>
            </View>
            {request.dueDate && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Due Date</Text>
                <Text style={[styles.detailValue, { color: getUrgencyColor(urgencyLevel) }]}>
                  {formatDate(request.dueDate)}
                </Text>
              </View>
            )}
          </View>

          <Divider style={styles.divider} />

          {request.additionalNotes && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional Notes</Text>
                <Text style={styles.notes}>{request.additionalNotes}</Text>
              </View>
              <Divider style={styles.divider} />
            </>
          )}

          {renderSection('Courses with Professor', renderCourseInfo())}

          <Divider style={styles.divider} />

          {renderSection('Documents', renderDocuments())}

          <Divider style={styles.divider} />

          {isInProgress && (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Reference Letter Draft</Text>
                <TextInput
                  multiline
                  style={styles.templateInput}
                  value={editedTemplate}
                  onChangeText={setEditedTemplate}
                  placeholder="Loading template..."
                />
                <Button
                  title="Complete Reference"
                  icon={{
                    name: 'check',
                    type: 'feather',
                    size: 20,
                    color: '#fff',
                  }}
                  buttonStyle={[styles.actionButton, styles.completeButton]}
                  onPress={() => {
                    onComplete?.({
                      ...request,
                      referenceTemplate: editedTemplate,
                    });
                    navigation.goBack();
                  }}
                />
              </View>
              <Divider style={styles.divider} />
            </>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Request History</Text>
            {request.history.map((entry, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyStatus}>
                    {getStatusLabel(entry.status)}
                  </Text>
                  <Text style={styles.historyDate}>
                    {formatDate(entry.timestamp)}
                  </Text>
                </View>
                {entry.note && <Text style={styles.historyNote}>{entry.note}</Text>}
              </View>
            ))}
          </View>
          
          {/* Add padding at the bottom for the fixed buttons */}
          <View style={{ height: isPending ? 100 : 20 }} />
        </ScrollView>

        {isPending && (
          <View style={styles.fixedActions}>
            <Button
              title="Accept Request"
              icon={{
                name: 'check',
                type: 'feather',
                size: 20,
                color: '#fff',
              }}
              buttonStyle={[styles.actionButton, styles.acceptButton]}
              onPress={() => {
                onAccept?.(request);
                navigation.goBack();
              }}
            />
            <Button
              title="Reject Request"
              icon={{
                name: 'x',
                type: 'feather',
                size: 20,
                color: '#fff',
              }}
              buttonStyle={[styles.actionButton, styles.rejectButton]}
              onPress={() => {
                onReject?.(request);
                navigation.goBack();
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    padding: 10,
    marginLeft: 5,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    flex: 1,
    marginRight: 10,
  },
  status: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  program: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#666',
    flex: 1,
  },
  detailValue: {
    flex: 2,
    textAlign: 'right',
    fontWeight: '500',
  },
  notes: {
    color: '#666',
    lineHeight: 20,
  },
  templateInput: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    padding: 15,
    minHeight: 300,
    textAlignVertical: 'top',
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  documentIcon: {
    marginRight: 10,
  },
  documentInfo: {
    flex: 1,
    marginRight: 10,
  },
  documentName: {
    fontSize: 15,
    marginBottom: 2,
  },
  documentMeta: {
    fontSize: 12,
    color: '#666',
  },
  historyItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  historyStatus: {
    fontWeight: '500',
  },
  historyDate: {
    color: '#666',
  },
  historyNote: {
    color: '#666',
    fontSize: 14,
  },
  fixedActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
  },
  acceptButton: {
    backgroundColor: '#2ecc71',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
  },
  completeButton: {
    backgroundColor: '#3498db',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    padding: 20,
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  courseContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 10,
  },
  courseGrade: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  courseMeta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  courseSection: {
    marginTop: 10,
  },
  courseSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  achievementIcon: {
    marginRight: 8,
  },
  achievementText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  projectText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  divider: {
    height: 10,
    backgroundColor: '#f5f5f5',
  },
}); 