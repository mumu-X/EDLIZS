import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, useWindowDimensions, ImageBackground } from 'react-native';
import ImagePath from '../Constants/ImagePath';

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ImageBackground
        source={ImagePath.ZebraBG}
        style={styles.logo}
      >
        <View style={styles.container}>
          <View>
            <Image source={ImagePath.noBGicon}
              style={{
                width: 150,
                height: 165,
                marginBottom: 30
              }} />
          </View>

          <Text style={styles.title}>
            Ministry of Health and Child Care
          </Text>
          <Text style={styles.subtitle}>
            Essential Medicines List and Standard Treatment Guidelines for Zimbabwe
          </Text>

          <View style={styles.descriptionContainer}>
            <View>
              <Text style={styles.description}>
                The authoritative point-of-care medical reference for healthcare professionals in Zimbabwe.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => (console.warn('MedicinesScreenPressed'), navigation.navigate('Medicine'))}>
                <Text style={styles.buttonText}>Medicines</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => (console.warn('DiseasesConditionsScreen'), navigation.navigate('Index'))}>
                <Text style={styles.buttonText}>Diseases and Conditions</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => console.warn('ToolsResourcesScreen')}>
                <Text style={styles.buttonText}>Tools and Resources</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => (console.warn('SmartSearchScreen'), navigation.navigate('Events'))}>
                <Text style={styles.buttonText}>CPD Events</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#73BBA3'
  },
  
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',

  },

  logo: {
    flex: 1, // Ensure the background image takes up the full space
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  descriptionContainer: {
    backgroundColor: '#DAE0E2',
    padding: 10,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',

  },

  button: {
    backgroundColor: '#ececec',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '45%', // Adjusted to fit two buttons per row
    maxWidth: '45%', // Ensures buttons don't stretch too wide
    aspectRatio: 1, // Makes the height equal to the width
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
