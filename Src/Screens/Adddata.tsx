import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UploadDataPage = () => {
  // JSON data to be uploaded
  const jsonData = {
    topics : [
        {
            label: "Tables",
            subtopics: [
                "Cardiology",
                "Neurology",
                "Dermatology",
                "Oncology",
                "Pediatrics",
                "Orthopedics",
                "Endocrinology",
                "Gastroenterology",
                "Nephrology",
                "Pulmonology",
            ]
        },
        {
            label: "Lists",
            subtopics: [
                "Symptoms Checklist",
                "Treatment Options",
                "Medications List",
                "Pre-Surgery Preparation",
                "Post-Surgery Follow-Up",
                "Rehabilitation Exercises",
                "Dietary Restrictions",
                "Preventative Care",
                "Emergency Contacts",
                "Allergy Information",
            ]
        },
        {
            label: "Text",
            subtopics: [
                "Introduction",
                "Overview of Condition",
                "Risk Factors",
                "Causes",
                "Symptoms",
                "Diagnosis",
                "Prognosis",
                "Complications",
                "Preventative Measures",
                "Lifestyle Changes",
            ]
        },
        {
            label: "Images",
            subtopics: [
                "X-Rays",
                "MRI Scans",
                "Ultrasound Images",
                "CT Scans",
                "Microscopic Views",
                "Diagrams",
                "Medical Illustrations",
                "Surgical Photos",
                "Pathology Slides",
                "Anatomical Charts",
            ]
        },
    ]
}
  
  

  // Function to upload the data to Firestore
  const uploadDataToFirestore = async () => {
    try {
      await firestore()
        .collection('lists')  // Replace with your collection name
        .doc("MedicinesTopics")  // Replace with your document ID
        .set(jsonData);
      
      Alert.alert('Success', 'Data uploaded successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload data.');
      console.error('Error uploading document: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Data to Firestore</Text>
      <Button
        title="Upload Data"
        onPress={uploadDataToFirestore}
        color="#6200ee"
      />
    </View>
  );
};

// Styles for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default UploadDataPage;
