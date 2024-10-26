import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions, FlatList } from 'react-native';

export default function Diseases_and_Conditions({ title, flag, subtopics, navigateToContent}: any) {
  // Track whether the topic is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  // Get window dimensions
  const windowheight = useWindowDimensions().height;
  const windowwidth = useWindowDimensions().width;

  // Toggle the expand/collapse state
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      {/* Touchable main topic */}
      <TouchableOpacity
        style={[styles.Topic, { height: windowheight / 8 , width: windowwidth * 0.9, }]}
        onPress={handleToggleExpand}
      >
        <Text style={styles.TopicText}>{flag} {title}</Text>
      </TouchableOpacity>

      {/* Conditionally render the subtopics when expanded */}
      {isExpanded && (
        <FlatList
          data={subtopics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            style={styles.SubTopic}
            onPress={() => navigateToContent(item)}>
              <Text style={styles.SubTopicText}>• {item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  Topic: {
    flex: 1,
    backgroundColor: '#F6FB7A',
    justifyContent: 'center',
    alignItems: 'flex-start',
    //width: '97%',
    marginVertical: 2,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  TopicText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  SubTopic: {
    backgroundColor: '#73BBA3',
    padding: 10,
    marginVertical: 1,
    marginLeft: 20,
    borderRadius: 5,
    elevation: 2,
  },
  SubTopicText: {
    fontSize: 16,
    color: '#333',
  },
});
