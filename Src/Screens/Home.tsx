import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, useWindowDimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImagePath from '../Constants/ImagePath';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const HomeScreen = ({ navigation}: any) => {
  //const navigation = useNavigation();

  // Function to handle navigation to different sections
  /*const handleNavigate = (screen: string) => {
    navigation.navigate(screen);
  };*/
  const windowheight = useWindowDimensions().height;
const windowwidth = useWindowDimensions().width;

  return (
    <SafeAreaView style={styles.safeContainer}>
       <ImageBackground
        source={ImagePath.ZebraBG} 
        style={styles.logo} 
      >
      <View style={styles.container}>
       <View>
         <Image source={ImagePath.noBGicon} 
        style={{ width: 150, 
        height: 165, 
        marginBottom: 30}} />
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
        <TouchableOpacity style={styles.button} onPress={() => console.warn('MedicinesScreen Pressed')
         //handleNavigate('MedicinesScreen')
          }>
          <Text style={styles.buttonText}>Medicines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => (console.warn('DiseasesConditionsScreen'), navigation.navigate('Index') )
          //handleNavigate('DiseasesConditionsScreen')
          }>
          <Text style={styles.buttonText}>Diseases and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() =>console.warn('ToolsResourcesScreen')
           //handleNavigate('ToolsResourcesScreen')
           }>
          <Text style={styles.buttonText}>Tools and Resources</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => (console.warn('SmartSearchScreen'), navigation.navigate('Index') )
          //handleNavigate('SmartSearchScreen')
          }>
          <Text style={styles.buttonText}>Smart Search</Text>
        </TouchableOpacity>
      </View>
     </View>
    </View>
    </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer:{
    flex:1,
    backgroundColor:'green'

  },
  

  container: {
    //flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    
  },
  logo: {
   width: '100%',
    height: '100%',
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

  descriptionContainer:{
    flex:1,
    backgroundColor: '#DAE0E2',
    padding: 5,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',  
    justifyContent: 'center',

  },

  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  button: {
    backgroundColor: '#ececec',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal:8,
    alignItems: 'center',
    height: '60%',
    width: '40%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
