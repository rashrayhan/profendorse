import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Text, Button, ButtonGroup, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MOCK_REQUESTS } from '../../../data/mockRequests';
import { ReferenceRequest, RequestStatus, RequestHistory } from '../../../types/request';
import { RootStackParamList } from '../../../navigation';
import RequestCard from '../../../components/requests/RequestCard';
import { generateReferenceTemplate } from '../../../utils/request';

const STATUS_FILTERS = ['All', 'Pending', 'In Progress', 'Completed'] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

const getStatusFromFilter = (filter: StatusFilter): RequestStatus | null => {
  switch (filter) {
    case 'Pending':
      return 'pending';
    case 'In Progress':
      return 'in_progress';
    case 'Completed':
      return 'completed';
    default:
      return null;
  }
};

export default function RequestsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'urgency'>('date');
  const [requests, setRequests] = useState<ReferenceRequest[]>(MOCK_REQUESTS);

  const filteredRequests = useMemo(() => {
    let filtered = [...requests];

    // Apply status filter
    const selectedStatus = getStatusFromFilter(STATUS_FILTERS[selectedStatusIndex]);
    if (selectedStatus) {
      if (selectedStatus === 'completed') {
        // Show both completed and rejected requests under "Completed" tab
        filtered = filtered.filter(request => request.status === 'completed' || request.status === 'rejected');
      } else {
        filtered = filtered.filter(request => request.status === selectedStatus);
      }
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(request => {
        const student = request.student;
        return (
          `${student.firstName} ${student.lastName}`.toLowerCase().includes(query) ||
          student.program.toLowerCase().includes(query) ||
          request.purpose.toLowerCase().includes(query)
        );
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
      } else {
        const aUrgent = a.isUrgent ? 1 : 0;
        const bUrgent = b.isUrgent ? 1 : 0;
        return bUrgent - aUrgent;
      }
    });

    return filtered;
  }, [selectedStatusIndex, searchQuery, sortBy, requests]);

  // Separate completed and rejected requests
  const { fulfilledRequests, rejectedRequests } = useMemo(() => {
    if (STATUS_FILTERS[selectedStatusIndex] !== 'Completed') {
      return { fulfilledRequests: [], rejectedRequests: [] };
    }
    return {
      fulfilledRequests: filteredRequests.filter(r => r.status === 'completed'),
      rejectedRequests: filteredRequests.filter(r => r.status === 'rejected'),
    };
  }, [filteredRequests, selectedStatusIndex]);

  const handleRequestPress = (request: ReferenceRequest) => {
    if (!request) {
      Alert.alert('Error', 'Request details not available');
      return;
    }
    
    navigation.navigate('RequestDetails', {
      request,
      onAccept: handleAccept,
      onReject: handleReject,
    });
  };

  const handleAccept = (request: ReferenceRequest) => {
    Alert.alert(
      'Accept Request',
      `Are you sure you want to accept the reference request from ${request.student.firstName} ${request.student.lastName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: () => {
            // Generate reference template
            const referenceTemplate = generateReferenceTemplate(request);

            // Create new history entry
            const newHistory: RequestHistory = {
              id: `hist${request.history.length + 1}`,
              status: 'in_progress' as RequestStatus,
              timestamp: new Date().toISOString(),
              updatedBy: 'prof1', // TODO: Use actual professor ID
              note: 'Request accepted - Reference template generated',
            };

            // Update the request status and add template
            const updatedRequest: ReferenceRequest = {
              ...request,
              status: 'in_progress',
              history: [...request.history, newHistory],
              referenceTemplate,
            };

            // Update requests state
            setRequests(requests.map(r => r.id === request.id ? updatedRequest : r));

            // Navigate to request details for review
            navigation.navigate('RequestDetails', {
              request: updatedRequest,
              onAccept: handleAccept,
              onReject: handleReject,
            });
          },
        },
      ],
    );
  };

  const handleReject = (request: ReferenceRequest) => {
    Alert.alert(
      'Reject Request',
      `Are you sure you want to reject the reference request from ${request.student.firstName} ${request.student.lastName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            // Update the request status
            const updatedRequests = requests.map(r => {
              if (r.id === request.id) {
                const newStatus: RequestStatus = 'rejected';
                const newHistory: RequestHistory = {
                  id: `hist${r.history.length + 1}`,
                  status: newStatus,
                  timestamp: new Date().toISOString(),
                  updatedBy: 'prof1', // TODO: Use actual professor ID
                  note: 'Request rejected',
                };
                return {
                  ...r,
                  status: newStatus,
                  history: [...r.history, newHistory],
                };
              }
              return r;
            });
            setRequests(updatedRequests);
          },
        },
      ],
    );
  };

  const renderRequests = () => {
    if (STATUS_FILTERS[selectedStatusIndex] === 'Completed') {
      return (
        <>
          {fulfilledRequests.length > 0 && (
            <View style={styles.categorySection}>
              <Text style={styles.categoryTitle}>Fulfilled Requests</Text>
              {fulfilledRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onPress={handleRequestPress}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </View>
          )}
          
          {rejectedRequests.length > 0 && (
            <View style={styles.categorySection}>
              <Text style={styles.categoryTitle}>Rejected Requests</Text>
              {rejectedRequests.map(request => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onPress={handleRequestPress}
                  onAccept={handleAccept}
                  onReject={handleReject}
                />
              ))}
            </View>
          )}

          {fulfilledRequests.length === 0 && rejectedRequests.length === 0 && (
            <Text style={styles.emptyText}>
              No completed or rejected requests found
            </Text>
          )}
        </>
      );
    }

    return (
      <>
        {filteredRequests.length > 0 ? (
          filteredRequests.map(request => (
            <RequestCard
              key={request.id}
              request={request}
              onPress={handleRequestPress}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            No {STATUS_FILTERS[selectedStatusIndex].toLowerCase()} requests found
          </Text>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchAndFilters}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            type="feather"
            size={20}
            color="#666"
            containerStyle={styles.searchIcon}
          />
          <TextInput
            placeholder="Search requests..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            placeholderTextColor="#666"
          />
          {searchQuery !== '' && (
            <Icon
              name="x"
              type="feather"
              size={20}
              color="#666"
              onPress={() => setSearchQuery('')}
              containerStyle={styles.clearIcon}
            />
          )}
        </View>
        <View style={styles.sortButtons}>
          <Button
            title="Sort by Date"
            type={sortBy === 'date' ? 'solid' : 'outline'}
            onPress={() => setSortBy('date')}
            containerStyle={styles.sortButton}
            buttonStyle={styles.sortButtonInner}
          />
          <Button
            title="Sort by Urgency"
            type={sortBy === 'urgency' ? 'solid' : 'outline'}
            onPress={() => setSortBy('urgency')}
            containerStyle={styles.sortButton}
            buttonStyle={styles.sortButtonInner}
          />
        </View>
      </View>

      <ButtonGroup
        buttons={[...STATUS_FILTERS]}
        selectedIndex={selectedStatusIndex}
        onPress={setSelectedStatusIndex}
        containerStyle={styles.filterButtons}
      />

      <ScrollView style={styles.content}>
        {renderRequests()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchAndFilters: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#000',
    fontSize: 16,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  sortButtonInner: {
    paddingVertical: 5,
  },
  filterButtons: {
    marginHorizontal: 0,
    marginBottom: 10,
    height: 40,
  },
  content: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
}); 