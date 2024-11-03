import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Realm from 'realm';
import firestore from '@react-native-firebase/firestore';
import { Disease, Drugslist, MedicalGuidelineTopics } from '../../models/Task';
import ImagePath from '../../Constants/ImagePath';
import { useRealm } from '@realm/react';

export default function HeaderButton() {
  const realm = useRealm(); // Get the Realm instance from the provider
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const topics = realm.objects<MedicalGuidelineTopics>('MedicalGuidelineTopic');
    const drugs = realm.objects<Drugslist>('Drugslist')

    setHasData(topics.length > 0);

    const listener = () => {
      setHasData(topics.length > 0);
    };
    topics.addListener(listener);

    return () => {
      topics.removeListener(listener);
    };
  }, [realm]);


  // Function to fetch data from Firestore and save to Realm
  const getDataFromFirestore = useCallback(async () => {
    if (!realm || realm.isClosed) return;

    try {
      const docRef = firestore().collection('lists').doc('medicalGuidelineTopics');
      const docSnapshot = await docRef.get();

      if (docSnapshot.exists) {
        const data = docSnapshot.data();
        console.log('Topics list data:', data);

        realm.write(() => {
          data?.topics.forEach((topic: any) => {
            realm.create(
              'MedicalGuidelineTopic',
              {
                label: topic.label,
                subtopics: topic.subtopics || [],
              },
              Realm.UpdateMode.Modified // Prevent duplicates
            );
          });
        });
        console.log('Data saved to Realm for offline use');
      } else {
        console.log('No such document!');
      }

      const docRef2 = firestore().collection('lists').doc('MedicinesTopics');
      const docSnapshot2 = await docRef2.get();

      if (docSnapshot2.exists) {
        const data = docSnapshot.data();
        console.log('Drugs list data:', data);

        realm.write(() => {
          data?.topics.forEach((topic: any) => {
            realm.create(
              'Drugslist',
              {
                label: topic.label,
                subtopics: topic.subtopics || [],
              },
              Realm.UpdateMode.Modified // Prevent duplicates
            );
          });
        });
        console.log('Data saved to Realm for offline use');
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }, []);

  // Function to fetch data from signed URL and save to Realm
  const getSignedUrlData = useCallback(async () => {
    if (!realm || realm.isClosed) {
      console.error('Realm is not open');
      return;
    }

    const url = 'https://us-central1-edliz-2.cloudfunctions.net/downloadMasteredlizConditions';

    try {
      // Step 1: Get the signed URL
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch signed URL');

      const data = await response.json();
      const signedUrl = data.url;

      // Step 2: Fetch JSON from the signed URL
      const signedUrlResponse = await fetch(signedUrl);
      if (!signedUrlResponse.ok) throw new Error('Failed to fetch JSON from signed URL');

      const jsonData = await signedUrlResponse.json();

      // Step 3: Save to Realm
      realm.write(() => {
        jsonData.EDLIZ.forEach((diseaseItem: any) => {
          realm.create(
            'Disease',
            {
              label: diseaseItem.label,
              SArray: diseaseItem.SArray.map((subtopicItem: any) => ({
                subtopic: subtopicItem.subtopic,
                sections: subtopicItem.sections.map((sectionItem: any) => ({
                  header: sectionItem.header,
                  content: sectionItem.content.map((contentItem: any) => ({
                    type: contentItem.type,
                    text: contentItem.text,
                  })),
                })),
              })),
            },
            Realm.UpdateMode.Modified // Prevent duplicates
          );
        });
      });

      console.log('Disease Data saved to Realm for offline use');
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  }, []);

  // Function to clear data from Realm
  const clearRealmData = useCallback(() => {
    if (!realm || realm.isClosed) return;

    realm.write(() => {
      realm.deleteAll();
    });
    console.log('All data in Realm has been cleared.');
  }, []);

  const handleInfoPress = () => {
    hasData ? setDeleteModalVisible(true) : setModalVisible(true);
  };

  const handleDownloadConfirm = () => {
    setModalVisible(false);
    getDataFromFirestore();
    getSignedUrlData();
  };

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(false);
    clearRealmData();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleInfoPress}>
        {hasData ? (
          <Image source={ImagePath.DBon} style={{ width: 25, height: 25 }} />
        ) : (
          <Image source={ImagePath.DBoff} style={{ width: 25, height: 25 }} />
        )}
      </TouchableOpacity>

      {/* Modal for download confirmation */}
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Do you want to download data for offline use?</Text>
            <Button title="Yes" onPress={handleDownloadConfirm} />
            <Button title="No" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Modal for delete confirmation */}
      <Modal transparent={true} visible={deleteModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Do you want to delete offline data?</Text>
            <Button title="Yes" onPress={handleDeleteConfirm} />
            <Button title="No" onPress={() => setDeleteModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Adjusted to prevent the modal from blocking touches to the rest of the app
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});