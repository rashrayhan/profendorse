import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text, Button, Icon, Divider } from 'react-native-elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReferenceRequest, RequestStatus, RequestHistory } from '../../../types/request';
import {
  getStatusColor,
  getStatusLabel,
  getPurposeLabel,
  formatDate,
  getUrgencyLevel,
  getUrgencyColor,
} from '../../../utils/request';

type RequestDetailsProps = NativeStackScreenProps<any, 'RequestDetails'> & {
  route: {
    params: {
      request: ReferenceRequest;
      onAccept?: (request: ReferenceRequest) => void;
      onReject?: (request: ReferenceRequest) => void;
      onComplete?: (request: ReferenceRequest) => void;
    };
  };
};

export default function RequestDetailsScreen({ route, navigation }: RequestDetailsProps) {
  const { request, onAccept, onReject, onComplete } = route.params;
  const [editedTemplate, setEditedTemplate] = useState(request.referenceTemplate || '');
  const urgencyLevel = getUrgencyLevel(request.dueDate);
  const isPending = request.status === 'pending';
  const isInProgress = request.status === 'in_progress';

  const handleComplete = () => {
    const newHistory: RequestHistory = {
      id: `hist${request.history.length + 1}`,
      status: 'completed' as RequestStatus,
      timestamp: new Date().toISOString(),
      updatedBy: 'prof1', // TODO: Use actual professor ID
      note: 'Reference letter completed',
    };

    const updatedRequest: ReferenceRequest = {
      ...request,
      status: 'completed',
      history: [...request.history, newHistory],
      referenceTemplate: editedTemplate,
    };

    // Call the onComplete callback with the updated request
    onComplete?.(updatedRequest);

    // Navigate back
    navigation.goBack();
  };

  const renderDocumentList = (title: string, documents: Array<{ name: string; type: string }>) => {
    if (documents.length === 0) return null;
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {documents.map((doc, index) => (
          <View key={index} style={styles.documentItem}>
            <Icon
              name="file-text"
              type="feather"
              size={20}
              color="#666"
              style={styles.documentIcon}
            />
            <Text style={styles.documentName}>{doc.name}</Text>
            <Text style={styles.documentType}>{doc.type.toUpperCase()}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
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

      {isInProgress && (
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
            onPress={handleComplete}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Student Information</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email</Text>
          <Text style={styles.detailValue}>{request.student.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Institution</Text>
          <Text style={styles.detailValue}>{request.student.institution}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Department</Text>
          <Text style={styles.detailValue}>{request.student.department}</Text>
        </View>
      </View>

      {request.additionalNotes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <Text style={styles.notes}>{request.additionalNotes}</Text>
        </View>
      )}

      {renderDocumentList('Attached Documents', request.documents)}

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

      {isPending && (
        <View style={styles.actions}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  documentIcon: {
    marginRight: 10,
  },
  documentName: {
    flex: 1,
    marginRight: 10,
  },
  documentType: {
    color: '#666',
    fontSize: 12,
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
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
}); 