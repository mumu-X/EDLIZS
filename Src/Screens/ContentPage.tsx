import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

type ContentBlock = {
  type: 'paragraph' | 'list' | 'image';
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
};

type Section = {
  header: string;
  content: ContentBlock[];
};

type DataType = {
  title: string;
  subtitle?: string;
  sections: Section[];
};

const ContentPage = ({ route, navigation }: any) => {
  const [data, setData] = useState<DataType | null>(null);

  const contentTitle=route.params.subtopics

  // Function to load data from Firestore
  const loadDataFromFirestore = async () => {
    try {
      const snapshot = await firestore()
        .collection('DIseases_Conditions') // Replace with your collection name
        .where("title", "==", `${contentTitle}`) // Example condition
        .get();

      if (!snapshot.empty) {
        const fetchedData = snapshot.docs[0].data() as DataType; // Assuming the first doc matches
        setData(fetchedData);
        Alert.alert('Success', 'Data loaded successfully!');
      } else {
        Alert.alert('No Data', 'No matching documents found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load data.');
      console.error('Error loading document: ', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadDataFromFirestore();
  }, []);

  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No information for this topic</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      {data.subtitle && <Text style={styles.subtitle}>{data.subtitle}</Text>}
      {data.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.header}>{section.header}</Text>
          {section.content.map((block, idx) => {
            if (block.type === 'paragraph') {
              return <Text key={idx} style={styles.paragraph}>{block.text}</Text>;
            } else if (block.type === 'list') {
              return block.items?.map((item, i) => (
                <Text key={i} style={styles.listItem}>• {item}</Text>
              ));
            } else if (block.type === 'image' && block.url) {
              return (
                <View key={idx} style={styles.imageContainer}>
                  <Image 
                    source={{ uri: block.url }} 
                    style={styles.image} 
                    resizeMode="contain" 
                  />
                  {block.caption && <Text style={styles.caption}>{block.caption}</Text>}
                </View>
              );
            }
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
  },
  section: {
    marginVertical: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  caption: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContentPage;
