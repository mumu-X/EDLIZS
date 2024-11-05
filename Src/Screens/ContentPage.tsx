import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRealm } from '@realm/react';
import { Disease, MedicalGuidelineTopics} from '../models/Task';

type ContentBlock = {
  type: string;
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
};

type TableRow = {
  [key: string]: string;
};

interface Section {
  header: string;
  content: ContentBlock[];
}

interface DataType {
  title: string;
  subtitle?: string;
  sections: Section[];
  label?: string;
  subtopic?: string;
}

interface Heading {
  contentSubtitle: string;
  contentTitle: string;
  
}

const ContentPage = ({ route, navigation }: any) => {
  const realm = useRealm();
  const [data, setData] = useState<DataType | null>(null);
  const [hasData, setHasData] = useState<boolean | null>(null);
  

  // Corrected assignments
  const contentTitle = route.params.title;
  const contentSubtitle = route.params.subtopics;
  const collectionName = route.params.collection;


  useEffect(() => {
  const topics = realm.objects<MedicalGuidelineTopics>('MedicalGuidelineTopic');
  setHasData(topics.length > 0);

  const listener = () => {
    setHasData(topics.length > 0);
  };
  topics.addListener(listener);

  return () => {
    topics.removeListener(listener);
  };
}, [realm]);

  // Load data based on hasData and if data is already set
  useEffect(() => {
    if (hasData === null || data !== null) {
      // We don't have the hasData value yet or data is already loaded, so do nothing
      return;
    }
  
    if (hasData) {
      getDiseasefromRealm({ contentTitle, contentSubtitle });
    } else {
      loadDataFromFirestore();
    }
  }, [hasData, data]);

  const loadDataFromFirestore = async () => {
    try {
      const snapshot = await firestore()
        .collection(collectionName)
        .where('title', '==', contentTitle)
        .where ('subtitle', '==', contentSubtitle)
        .get();

      if (!snapshot.empty) {
        const fetchedData = snapshot.docs[0].data() as DataType;
        setData(fetchedData);
        Alert.alert('Success', 'Data loaded successfully!');
      } else {
        Alert.alert('No Data', 'No matching documents found.');
        console.log('not suppose to run when data in realm')
        console.log(hasData)
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load data.');
    }
  };

  const getDiseasefromRealm = async ({ contentTitle, contentSubtitle }: Heading) => {
    try {
      // Removed backslash before \$0
      const ItemInRealm = realm.objects<Disease>('Disease').filtered('label == \$0', contentSubtitle);
      console.log('Diseases in Realm:', ItemInRealm);

      if (ItemInRealm.length === 0) {
        console.warn('No matching label found for:', contentSubtitle);
        return;
      }

      const labelitem = ItemInRealm[0];
      console.log('Selected Disease:', labelitem);

      const data = labelitem.SArray.find((sArray) => sArray.subtopic === contentTitle);

      if (!data) {
        console.warn('No matching subtopic found for:', contentTitle);
        return;
      }

      setData({
        title: labelitem.label,
        subtitle: data.subtopic,
        sections: data.sections,
      });
    } catch (error) {
      console.error('Error fetching subtopic data from Realm:', error);
    }
  };

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

      {data.sections.map((section, index) => {
        console.log('Section:', section);
        return (
          <View key={index} style={styles.section}>
            {section.content.map((block, idx) => {
              console.log('Block:', block);
              switch (block.type) {
                case 'paragraph':
                  return (
                    <Text key={idx} style={styles.paragraph}>
                      {block.text}
                    </Text>
                  );
                case 'text':
                  if (block.items) {
                    return block.items.map((item, i) => (
                      <Text key={i} style={styles.bulletItem}>
                        • {item}
                      </Text>
                    ));
                  } else if (block.text) {
                    return (
                      <Text key={idx} style={styles.paragraph}>
                        {block.text}
                      </Text>
                    );
                  } else {
                    return null;
                  }
                case 'numberbullet':
                  return block.items?.map((item, i) => (
                    <Text key={i} style={styles.numberBulletItem}>
                      {`${i + 1}. ${item}`}
                    </Text>
                  ));
                case 'Titleheading':
                  return (
                    <Text key={idx} style={styles.titleHeading}>
                      {block.text}
                    </Text>
                  );
                case 'sectionheading':
                  return (
                    <Text key={idx} style={styles.sectionHeading}>
                      {block.text}
                    </Text>
                  );
                case 'bullet':
                  return (
                    <Text key={idx} style={styles.bulletItem}>
                      • {block.text}
                    </Text>
                  );
                case 'table':
                  if (Array.isArray(block.text)) {
                    return (
                      <View key={idx} style={styles.tableContainer}>
                        {(block.text as TableRow[]).map((row, rowIndex) => (
                          <View key={rowIndex} style={styles.tableRow}>
                            {Object.values(row).map((cell, cellIndex) => (
                              <Text key={cellIndex} style={styles.tableCell}>
                                {cell || '-'}
                              </Text>
                            ))}
                          </View>
                        ))}
                      </View>
                    );
                  } else {
                    return null;
                  }
                case 'image':
                  if (block.url) {
                    return (
                      <View key={idx} style={styles.imageContainer}>
                        <Image source={{ uri: block.url }} style={styles.image} resizeMode="contain" />
                        {block.caption && <Text style={styles.caption}>{block.caption}</Text>}
                      </View>
                    );
                  } else {
                    return null;
                  }
                default:
                  console.warn('Unknown block type:', block.type);
                  return null;
              }
            })}
          </View>
        );
      })}
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
  bulletItem: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,  // Space between bullet points
  },
  numberBulletItem: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 4,  // Space between numbered items
  },
  titleHeading: {
    fontSize: 26, // Larger font for title heading
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 16, // Space below the title heading
  },
  sectionHeading: {
    fontSize: 22, // Slightly smaller than title heading
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,  // Space below section heading
    textAlign: 'left',
  },

  tableContainer: {
    marginTop: 10,
    backgroundColor: '#f3f3f3',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1, // Adjusts the cell size equally
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
  },

});


export default ContentPage;
