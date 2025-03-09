import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Platform } from 'react-native';
import { Text, Button, Icon, ButtonGroup, Input } from 'react-native-elements';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'withdrawal' | 'payment';
  status: 'completed' | 'pending';
  description: string;
  reference?: string;
  university?: string;
  paymentMethod?: string;
  category: 'reference_letter' | 'consultation' | 'withdrawal' | 'deposit' | 'payment';
  recipientId?: string;
  recipientName?: string;
}

type DateRange = 'all' | 'week' | 'month' | '3months' | 'custom';
type SortOrder = 'newest' | 'oldest' | 'highest' | 'lowest';

const cardShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
} as const;

export default function EarningsScreen() {
  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2024-03-20',
      amount: 150.00,
      type: 'credit',
      status: 'completed',
      description: 'Reference Letter - John Doe',
      reference: 'REF-2024-001-STF',
      university: 'Stanford University',
      category: 'reference_letter',
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      date: '2024-03-18',
      amount: 75.00,
      type: 'withdrawal',
      status: 'completed',
      description: 'Withdrawal to Bank Account',
      reference: 'WD-2024-001-BANK',
      category: 'withdrawal',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '3',
      date: '2024-03-15',
      amount: 200.00,
      type: 'credit',
      status: 'completed',
      description: 'Research Consultation - Sarah Smith',
      reference: 'CON-2024-002-MIT',
      university: 'MIT',
      category: 'consultation',
      paymentMethod: 'PayPal'
    },
    {
      id: '4',
      date: '2024-03-12',
      amount: 150.00,
      type: 'credit',
      status: 'pending',
      description: 'Reference Letter - Michael Johnson',
      reference: 'REF-2024-003-HRV',
      university: 'Harvard University',
      category: 'reference_letter',
      paymentMethod: 'Credit Card'
    },
    {
      id: '5',
      date: '2024-03-10',
      amount: 100.00,
      type: 'withdrawal',
      status: 'completed',
      description: 'Withdrawal to Bank Account',
      reference: 'WD-2024-002-BANK',
      category: 'withdrawal',
      paymentMethod: 'Bank Transfer'
    },
    {
      id: '6',
      date: '2024-03-08',
      amount: 175.00,
      type: 'credit',
      status: 'completed',
      description: 'Reference Letter - Emily Brown',
      reference: 'REF-2024-004-UCB',
      university: 'UC Berkeley',
      category: 'reference_letter',
      paymentMethod: 'Credit Card'
    },
    {
      id: '7',
      date: '2024-03-05',
      amount: 125.00,
      type: 'credit',
      status: 'pending',
      description: 'Reference Letter - David Wilson',
      reference: 'REF-2024-005-CLB',
      university: 'Columbia University',
      category: 'reference_letter',
      paymentMethod: 'Credit Card'
    },
    {
      id: '8',
      date: '2024-03-01',
      amount: 150.00,
      type: 'credit',
      status: 'completed',
      description: 'Reference Letter - Lisa Anderson',
      reference: 'REF-2024-006-YLE',
      university: 'Yale University',
      category: 'reference_letter',
      paymentMethod: 'Credit Card'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isAddFundsModalVisible, setIsAddFundsModalVisible] = useState(false);
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const [isPayModalVisible, setIsPayModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [recipientName, setRecipientName] = useState('');

  // Accurate financial calculations
  const financialStats = useMemo(() => {
    return transactions.reduce((stats, transaction) => {
      if (transaction.type === 'credit') {
        stats.totalEarnings += transaction.amount;
        if (transaction.status === 'pending') {
          stats.pendingPayments += transaction.amount;
        } else if (transaction.status === 'completed') {
          stats.completedCredits += transaction.amount;
        }
      } else if (transaction.type === 'withdrawal' && transaction.status === 'completed') {
        stats.totalWithdrawals += transaction.amount;
      } else if (transaction.type === 'payment' && transaction.status === 'completed') {
        stats.totalPayments += transaction.amount;
      }

      return stats;
    }, {
      totalEarnings: 0,
      completedCredits: 0,
      totalWithdrawals: 0,
      totalPayments: 0,
      pendingPayments: 0,
      get availableBalance() {
        return this.completedCredits - this.totalWithdrawals - this.totalPayments;
      }
    });
  }, [transactions]);

  const sortedAndFilteredTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      switch (sortOrder) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.amount - a.amount;
        case 'lowest':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
  }, [transactions, sortOrder]);

  const handleAddFunds = () => {
    // Implementation for adding funds
    console.log('Adding funds:', { amount, paymentMethod });
    setIsAddFundsModalVisible(false);
    setAmount('');
    setPaymentMethod('');
  };

  const handleWithdraw = () => {
    // Implementation for withdrawing funds
    console.log('Withdrawing funds:', { amount, paymentMethod });
    setIsWithdrawModalVisible(false);
    setAmount('');
    setPaymentMethod('');
  };

  const handlePay = () => {
    // Implementation for paying another professor
    console.log('Paying professor:', { amount, recipientId, recipientName });
    setIsPayModalVisible(false);
    setAmount('');
    setRecipientId('');
    setRecipientName('');
  };

  const handleTransactionPress = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalVisible(true);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const searchLower = searchQuery.toLowerCase();
    return (
      transaction.description.toLowerCase().includes(searchLower) ||
      transaction.reference?.toLowerCase().includes(searchLower) ||
      transaction.date.includes(searchQuery) ||
      transaction.amount.toString().includes(searchQuery)
    );
  });

  const renderTransaction = (transaction: Transaction) => (
    <TouchableOpacity 
      key={transaction.id}
      onPress={() => handleTransactionPress(transaction)}
      style={[styles.transactionCard, styles.cardShadow]}
    >
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
        <Text style={[
          styles.transactionAmount,
          { color: transaction.type === 'credit' ? '#2ecc71' : '#e74c3c' }
        ]}>
          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </Text>
      </View>
      <Text style={styles.transactionDescription}>{transaction.description}</Text>
      <Text style={[
        styles.transactionStatus,
        { color: transaction.status === 'completed' ? '#2ecc71' : '#f39c12' }
      ]}>
        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  const renderTransactionModal = () => (
    <Modal
      visible={isModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text h4>Transaction Details</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          {selectedTransaction && (
            <>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Date:</Text>
                <Text style={styles.modalValue}>{selectedTransaction.date}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Amount:</Text>
                <Text style={[
                  styles.modalValue,
                  { color: selectedTransaction.type === 'credit' ? '#2ecc71' : '#e74c3c' }
                ]}>
                  {selectedTransaction.type === 'credit' ? '+' : '-'}${selectedTransaction.amount.toFixed(2)}
                </Text>
              </View>
              {selectedTransaction.university && (
                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>University:</Text>
                  <Text style={styles.modalValue}>{selectedTransaction.university}</Text>
                </View>
              )}
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Status:</Text>
                <Text style={[
                  styles.modalValue,
                  { color: selectedTransaction.status === 'completed' ? '#2ecc71' : '#f39c12' }
                ]}>
                  {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                </Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Reference:</Text>
                <Text style={styles.modalValue}>{selectedTransaction.reference || 'N/A'}</Text>
              </View>
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Description:</Text>
                <Text style={styles.modalValue}>{selectedTransaction.description}</Text>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderFilterModal = () => (
    <Modal
      visible={isFilterModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsFilterModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsFilterModalVisible(false)}
      >
        <View style={[styles.modalContent, styles.filterModalContent]}>
          <View style={styles.modalHeader}>
            <Text h4>Sort Transactions</Text>
            <TouchableOpacity onPress={() => setIsFilterModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.filterOptions}>
            {['newest', 'oldest', 'highest', 'lowest'].map((option, index) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  sortOrder === option && styles.filterOptionSelected
                ]}
                onPress={() => {
                  setSortOrder(option as SortOrder);
                  setIsFilterModalVisible(false);
                }}
              >
                <Text style={[
                  styles.filterOptionText,
                  sortOrder === option && styles.filterOptionTextSelected
                ]}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
                {sortOrder === option && (
                  <Icon
                    name="check"
                    size={20}
                    color="#fff"
                    style={styles.filterOptionIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderAddFundsModal = () => (
    <Modal
      visible={isAddFundsModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsAddFundsModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsAddFundsModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text h4>Add Funds</Text>
            <TouchableOpacity onPress={() => setIsAddFundsModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          <Input
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            leftIcon={<Icon name="attach-money" size={24} color="#666" />}
          />
          <Input
            placeholder="Payment Method"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
            leftIcon={<Icon name="payment" size={24} color="#666" />}
          />
          <Button
            title="Add Funds"
            onPress={handleAddFunds}
            buttonStyle={styles.actionButton}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderWithdrawModal = () => (
    <Modal
      visible={isWithdrawModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsWithdrawModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsWithdrawModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text h4>Withdraw Funds</Text>
            <TouchableOpacity onPress={() => setIsWithdrawModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          <Input
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            leftIcon={<Icon name="attach-money" size={24} color="#666" />}
          />
          <Input
            placeholder="Payment Method"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
            leftIcon={<Icon name="payment" size={24} color="#666" />}
          />
          <Button
            title="Withdraw"
            onPress={handleWithdraw}
            buttonStyle={styles.actionButton}
            disabled={parseFloat(amount) > financialStats.availableBalance}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const renderPayModal = () => (
    <Modal
      visible={isPayModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsPayModalVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => setIsPayModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text h4>Pay for Reference</Text>
            <TouchableOpacity onPress={() => setIsPayModalVisible(false)}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          <Input
            placeholder="Professor ID"
            value={recipientId}
            onChangeText={setRecipientId}
            leftIcon={<Icon name="person" size={24} color="#666" />}
          />
          <Input
            placeholder="Professor Name"
            value={recipientName}
            onChangeText={setRecipientName}
            leftIcon={<Icon name="person-outline" size={24} color="#666" />}
          />
          <Input
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            leftIcon={<Icon name="attach-money" size={24} color="#666" />}
          />
          <Button
            title="Pay"
            onPress={handlePay}
            buttonStyle={styles.actionButton}
            disabled={parseFloat(amount) > financialStats.availableBalance}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <ScrollView style={styles.container}>
      <Text h4 style={styles.title}>My Earnings</Text>
      
      {/* Earnings Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.label}>Available Balance</Text>
          <Text h3 style={styles.balance}>${financialStats.availableBalance.toFixed(2)}</Text>
          <View style={styles.actionButtonsContainer}>
            <Button
              title="Add Funds"
              onPress={() => setIsAddFundsModalVisible(true)}
              buttonStyle={[styles.actionButton, styles.addButton]}
              icon={<Icon name="add" size={20} color="#fff" />}
            />
            <Button
              title="Withdraw"
              onPress={() => setIsWithdrawModalVisible(true)}
              buttonStyle={[styles.actionButton, styles.withdrawButton]}
              icon={<Icon name="account-balance-wallet" size={20} color="#fff" />}
              disabled={financialStats.availableBalance <= 0}
            />
            <Button
              title="Pay"
              onPress={() => setIsPayModalVisible(true)}
              buttonStyle={[styles.actionButton, styles.payButton]}
              icon={<Icon name="payment" size={20} color="#fff" />}
              disabled={financialStats.availableBalance <= 0}
            />
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Earnings</Text>
            <Text style={styles.statValue}>${financialStats.totalEarnings.toFixed(2)}</Text>
            <Text style={styles.statSubtext}>All time earnings</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>${financialStats.pendingPayments.toFixed(2)}</Text>
            <Text style={styles.statSubtext}>Awaiting completion</Text>
          </View>
        </View>
      </View>

      {/* Transaction History */}
      <View style={styles.content}>
        <Text h4 style={styles.sectionTitle}>Transaction History</Text>
        
        {/* Search and Filter Bar */}
        <View style={styles.searchFilterContainer}>
          <View style={[styles.searchContainer, styles.cardShadow]}>
            <Icon name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search transactions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.filterButton, styles.cardShadow]}
            onPress={() => setIsFilterModalVisible(true)}
          >
            <Icon name="filter-list" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {sortedAndFilteredTransactions.length > 0 ? (
          sortedAndFilteredTransactions.map(renderTransaction)
        ) : (
          <Text style={styles.subtitle}>
            {searchQuery.length > 0 ? 'No matching transactions found' : 'No transactions yet'}
          </Text>
        )}
      </View>

      {renderAddFundsModal()}
      {renderWithdrawModal()}
      {renderPayModal()}
      {renderTransactionModal()}
      {renderFilterModal()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  summaryContainer: {
    paddingHorizontal: 20,
  },
  balanceContainer: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    ...cardShadow,
  },
  label: {
    color: '#666',
    marginBottom: 5,
    fontSize: 16,
  },
  balance: {
    color: '#2ecc71',
    marginBottom: 15,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: '#2ecc71',
    flex: 1,
  },
  withdrawButton: {
    backgroundColor: '#3498db',
    flex: 1,
  },
  payButton: {
    backgroundColor: '#e67e22',
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    ...cardShadow,
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statSubtext: {
    color: '#999',
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
    ...cardShadow,
  },
  cardShadow,
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionDate: {
    color: '#666',
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 15,
    color: '#2c3e50',
    marginBottom: 5,
  },
  transactionStatus: {
    fontSize: 13,
    fontWeight: '500',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  filterButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterModalContent: {
    maxHeight: '50%',
  },
  filterOptions: {
    marginTop: 10,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f8f9fa',
  },
  filterOptionSelected: {
    backgroundColor: '#3498db',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  filterOptionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterOptionIcon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    ...cardShadow,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  modalValue: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 2,
    textAlign: 'right',
  },
}); 