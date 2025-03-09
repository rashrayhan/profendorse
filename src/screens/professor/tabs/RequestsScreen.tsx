import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, ButtonGroup, Card, Badge, Icon } from 'react-native-elements';

type Request = {
  id: string;
  studentName: string;
  program: string;
  status: 'pending' | 'in_progress' | 'completed';
  submittedAt: string;
  dueDate?: string;
};

const MOCK_REQUESTS: Request[] = [
  {
    id: '1',
    studentName: 'John Doe',
    program: 'MSc Computer Science',
    status: 'pending',
    submittedAt: '2024-03-20',
    dueDate: '2024-04-20',
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    program: 'PhD Physics',
    status: 'in_progress',
    submittedAt: '2024-03-15',
    dueDate: '2024-04-15',
  },
  {
    id: '3',
    studentName: 'Bob Johnson',
    program: 'MBA',
    status: 'completed',
    submittedAt: '2024-03-10',
  },
];

export default function RequestsScreen() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ['Pending', 'In Progress', 'Completed'];

  const getStatusColor = (status: Request['status']) => {
    switch (status) {
      case 'pending':
        return '#f1c40f';
      case 'in_progress':
        return '#3498db';
      case 'completed':
        return '#2ecc71';
      default:
        return '#95a5a6';
    }
  };

  const renderRequest = (request: Request) => (
    <View key={request.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text h4 style={styles.studentName}>{request.studentName}</Text>
        <Badge
          value={request.status.replace('_', ' ')}
          badgeStyle={{ backgroundColor: getStatusColor(request.status) }}
          containerStyle={styles.badge}
        />
      </View>
      <Text style={styles.program}>{request.program}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>
          <Icon name="calendar" type="feather" size={14} color="#666" />
          {' Submitted: '}{request.submittedAt}
        </Text>
        {request.dueDate && (
          <Text style={[styles.date, styles.dueDate]}>
            <Icon name="clock" type="feather" size={14} color="#e74c3c" />
            {' Due: '}{request.dueDate}
          </Text>
        )}
      </View>
      <View style={styles.actions}>
        <Button
          title="View Details"
          type="outline"
          containerStyle={styles.actionButton}
          onPress={() => console.log('View details', request.id)}
        />
        {request.status === 'pending' && (
          <Button
            title="Accept"
            containerStyle={styles.actionButton}
            onPress={() => console.log('Accept request', request.id)}
          />
        )}
      </View>
    </View>
  );

  const filteredRequests = MOCK_REQUESTS.filter(request => {
    const statusMap = ['pending', 'in_progress', 'completed'];
    return request.status === statusMap[selectedIndex];
  });

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Reference Requests</Text>
      <ButtonGroup
        onPress={setSelectedIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={styles.buttonGroup}
      />
      <ScrollView style={styles.content}>
        {filteredRequests.length > 0 ? (
          filteredRequests.map(renderRequest)
        ) : (
          <Text style={styles.emptyText}>No {buttons[selectedIndex].toLowerCase()} requests</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  buttonGroup: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentName: {
    fontSize: 18,
    flex: 1,
    marginRight: 10,
  },
  badge: {
    marginLeft: 10,
  },
  program: {
    color: '#666',
    marginBottom: 10,
  },
  dateContainer: {
    marginBottom: 15,
  },
  date: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  dueDate: {
    color: '#e74c3c',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 10,
    minWidth: 100,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
  },
}); 