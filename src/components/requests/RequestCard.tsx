import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Badge, Icon, Button } from 'react-native-elements';
import { ReferenceRequest } from '../../types/request';
import {
  getStatusColor,
  getStatusLabel,
  getPurposeLabel,
  formatDate,
  getUrgencyLevel,
  getUrgencyColor,
} from '../../utils/request';

type RequestCardProps = {
  request: ReferenceRequest;
  onPress: (request: ReferenceRequest) => void;
  onAccept?: (request: ReferenceRequest) => void;
  onReject?: (request: ReferenceRequest) => void;
};

export default function RequestCard({ request, onPress, onAccept, onReject }: RequestCardProps) {
  const urgencyLevel = getUrgencyLevel(request.dueDate);
  const isPending = request.status === 'pending';

  const handleAccept = (e: any) => {
    e.stopPropagation();
    onAccept?.(request);
  };

  const handleReject = (e: any) => {
    e.stopPropagation();
    onReject?.(request);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(request)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.studentInfo}>
          <Text style={styles.name}>
            {request.student.firstName} {request.student.lastName}
          </Text>
          <Text style={styles.program}>{request.student.program}</Text>
        </View>
        <Badge
          value={getStatusLabel(request.status)}
          badgeStyle={[styles.badge, { backgroundColor: getStatusColor(request.status) }]}
        />
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Icon
            name="graduation-cap"
            type="font-awesome"
            size={14}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            {getPurposeLabel(request.purpose)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon
            name="calendar"
            type="feather"
            size={14}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            Requested: {formatDate(request.requestDate)}
          </Text>
        </View>

        {request.dueDate && (
          <View style={styles.detailRow}>
            <Icon
              name="clock"
              type="feather"
              size={14}
              color={getUrgencyColor(urgencyLevel)}
              style={styles.icon}
            />
            <Text style={[styles.detailText, { color: getUrgencyColor(urgencyLevel) }]}>
              Due: {formatDate(request.dueDate)}
            </Text>
          </View>
        )}
      </View>

      {request.student.documents.length > 0 && (
        <View style={styles.documents}>
          <Icon
            name="paperclip"
            type="feather"
            size={14}
            color="#666"
            style={styles.icon}
          />
          <Text style={styles.detailText}>
            {request.student.documents.length} document{request.student.documents.length !== 1 ? 's' : ''} attached
          </Text>
        </View>
      )}

      {isPending && (
        <View style={styles.actions}>
          <Button
            title="Accept"
            type="solid"
            buttonStyle={[styles.actionButton, styles.acceptButton]}
            titleStyle={styles.actionButtonTitle}
            onPress={handleAccept}
            icon={{
              name: 'check',
              type: 'feather',
              size: 15,
              color: '#fff',
            }}
          />
          <Button
            title="Reject"
            type="solid"
            buttonStyle={[styles.actionButton, styles.rejectButton]}
            titleStyle={styles.actionButtonTitle}
            onPress={handleReject}
            icon={{
              name: 'x',
              type: 'feather',
              size: 15,
              color: '#fff',
            }}
          />
        </View>
      )}

      <Icon
        name="chevron-right"
        type="feather"
        size={20}
        color="#666"
        containerStyle={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  studentInfo: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  program: {
    fontSize: 14,
    color: '#666',
  },
  badge: {
    paddingHorizontal: 10,
  },
  details: {
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
    width: 14,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  documents: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  chevron: {
    position: 'absolute',
    right: 15,
    top: '50%',
    marginTop: -10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  actionButtonTitle: {
    fontSize: 14,
    marginLeft: 5,
  },
  acceptButton: {
    backgroundColor: '#2ecc71',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
  },
}); 