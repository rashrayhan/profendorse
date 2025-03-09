import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Icon, Divider } from 'react-native-elements';

type Template = {
  id: string;
  name: string;
  type: 'system' | 'custom';
  lastUsed?: string;
  description: string;
};

const MOCK_TEMPLATES: Template[] = [
  {
    id: '1',
    name: 'General Academic Reference',
    type: 'system',
    lastUsed: '2024-03-15',
    description: 'A comprehensive academic reference letter suitable for graduate school applications.',
  },
  {
    id: '2',
    name: 'Research Assistant Reference',
    type: 'system',
    description: 'Specifically designed for students applying for research positions.',
  },
  {
    id: '3',
    name: 'Custom Graduate School',
    type: 'custom',
    lastUsed: '2024-03-20',
    description: 'My personalized template for graduate school recommendations.',
  },
];

export default function TemplatesScreen() {
  const [selectedType, setSelectedType] = useState<'all' | 'system' | 'custom'>('all');

  const filteredTemplates = MOCK_TEMPLATES.filter(template => 
    selectedType === 'all' ? true : template.type === selectedType
  );

  const renderTemplate = (template: Template) => (
    <View key={template.id} style={styles.card}>
      <View style={styles.templateHeader}>
        <Text h4 style={styles.templateName}>{template.name}</Text>
        <View style={styles.templateType}>
          <Icon
            name={template.type === 'system' ? 'lock' : 'edit'}
            type="feather"
            size={16}
            color="#666"
          />
          <Text style={styles.templateTypeText}>
            {template.type === 'system' ? 'System' : 'Custom'}
          </Text>
        </View>
      </View>
      <Text style={styles.description}>{template.description}</Text>
      {template.lastUsed && (
        <Text style={styles.lastUsed}>
          Last used: {template.lastUsed}
        </Text>
      )}
      <View style={styles.templateActions}>
        <Button
          title="Preview"
          type="outline"
          icon={
            <Icon
              name="eye"
              type="feather"
              size={16}
              color="#2089dc"
              style={{ marginRight: 10 }}
            />
          }
          containerStyle={styles.actionButton}
          onPress={() => console.log('Preview template', template.id)}
        />
        {template.type === 'custom' && (
          <Button
            title="Edit"
            type="outline"
            icon={
              <Icon
                name="edit-2"
                type="feather"
                size={16}
                color="#2089dc"
                style={{ marginRight: 10 }}
              />
            }
            containerStyle={styles.actionButton}
            onPress={() => console.log('Edit template', template.id)}
          />
        )}
        <Button
          title="Use"
          icon={
            <Icon
              name="check"
              type="feather"
              size={16}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          }
          containerStyle={styles.actionButton}
          onPress={() => console.log('Use template', template.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4>Reference Templates</Text>
        <Button
          title="Create New Template"
          icon={
            <Icon
              name="plus"
              type="feather"
              size={16}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          }
          onPress={() => console.log('Create new template')}
        />
      </View>

      <View style={styles.filters}>
        <Button
          title="All"
          type={selectedType === 'all' ? 'solid' : 'outline'}
          containerStyle={styles.filterButton}
          onPress={() => setSelectedType('all')}
        />
        <Button
          title="System"
          type={selectedType === 'system' ? 'solid' : 'outline'}
          containerStyle={styles.filterButton}
          onPress={() => setSelectedType('system')}
        />
        <Button
          title="Custom"
          type={selectedType === 'custom' ? 'solid' : 'outline'}
          containerStyle={styles.filterButton}
          onPress={() => setSelectedType('custom')}
        />
      </View>

      <Divider style={styles.divider} />

      <ScrollView style={styles.content}>
        {filteredTemplates.map(renderTemplate)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  divider: {
    marginVertical: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
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
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  templateName: {
    fontSize: 18,
    flex: 1,
    marginRight: 10,
  },
  templateType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  templateTypeText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 14,
  },
  description: {
    color: '#666',
    marginBottom: 10,
  },
  lastUsed: {
    color: '#666',
    fontSize: 12,
    marginBottom: 10,
  },
  templateActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 10,
    minWidth: 100,
  },
}); 