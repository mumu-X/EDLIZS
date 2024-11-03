import { StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import MainTopicComponent from '../Components/components/MainTopicComponent';
import { MedicalGuidelineTopics } from '../models/Task';
import firestore from '@react-native-firebase/firestore';
import { useRealm } from '@realm/react';

export default function Diseases_and_Conditions({ navigation }: any) {


  const [medicalGuidelineTopics, setMedicalGuidelineTopics] = useState<any[]>([]);
  const realm = useRealm(); // Get the Realm instance from the provider
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const initializeAndFetchData = async () => {
      if (dataFetched) return;

      try {
        // Check if data exists in Realm
        const topicsInRealm = realm.objects<MedicalGuidelineTopics>('MedicalGuidelineTopic');

        if (topicsInRealm.length > 0) {
          // Data exists in Realm, fetch and set state
          const topicsArray = topicsInRealm.map((topic) => ({
            label: topic.label,
            subtopics: topic.subtopics,
          }));
          setMedicalGuidelineTopics(topicsArray);
        } else {
          // Data does not exist in Realm, fetch from Firestore
          const docRef = firestore().collection('lists').doc('medicalGuidelineTopics');
          const docSnapshot = await docRef.get();

          if (docSnapshot.exists) {
            const data = docSnapshot.data();
            console.log('Document data:', data);
            const topics = data?.topics || [];

           /* // Save to Realm
           realm.write(() => {
              topics.forEach((topic: any) => {
                realm.create(
                  'MedicalGuidelineTopic',
                  {
                    label: topic.label,
                    subtopics: topic.subtopics || [],
                  },
                  Realm.UpdateMode.Modified // Prevent duplicates
                );
              });
            });*/
            

            // Set state
            setMedicalGuidelineTopics(topics);
          } else {
          }
        }
      } catch (error) {
        console.warn('Error fetching data:', error);
      } finally {
        setDataFetched(true);
      }
    };

    initializeAndFetchData();

  }, [dataFetched, realm]);

  const navigatetocontent = (subtopics: string, title: string , collection : string) => {
    navigation.navigate('Content', { subtopics, title, collection});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={medicalGuidelineTopics}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <MainTopicComponent
            title={item.label}
            subtopics={item.subtopics}
            collection = "DIseases_Conditions"
            navigateToContent={navigatetocontent}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
