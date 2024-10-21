import { StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainTopicComponent from '../Components/components/MainTopicComponent';
//import { medicalGuidelineTopics } from '../Constants/TopicList';
import firestore from '@react-native-firebase/firestore';

export default function Diseases_and_Conditions({ navigation }: any) {

  // Navigation function that does not pass non-serializable data
  const navigatetocontent = (subtopics: string) => {
    navigation.navigate('Content', { subtopics });  // Ensure only serializable values
    console.log(`${subtopics} clicked`);  // Log to confirm correct value
  };

  // Get data from Firestore
  const [medicalGuidelineTopics, setMedicalGuidelineTopics] = useState<any[]>([]);

  // Function to fetch data
  const getdata = async () => {
    try {
      const docRef = firestore()
        .collection('lists')
        .doc('medicalGuidelineTopics'); // Access the specific document

      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        const data = docSnapshot.data(); // Retrieve the document data
        console.log('Document data:', data);
        setMedicalGuidelineTopics(data?.topics|| []); // Save data to state
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  useEffect(() => {
    getdata(); // Fetch data when component mounts
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={medicalGuidelineTopics} // Array with topics
        keyExtractor={(item) => item.label} // Unique key for each item
        renderItem={({ item }) => (
          <MainTopicComponent 
            title={item.label}  // Pass title (label) to MainTopicComponent
            flag={item.flag}    // Pass flag to MainTopicComponent
            subtopics={item.subtopics}  // Pass subtopics to MainTopicComponent
            navigateToContent={navigatetocontent}  // Navigation function
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'  
  }
});
