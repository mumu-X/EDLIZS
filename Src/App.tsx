import { StyleSheet } from 'react-native'
import React from 'react'
import HomeScreen from './Screens/Home'
import Diseases_and_Conditions from './Screens/Diseases_and_Conditions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadDataPage from './Screens/Adddata';
import ContentPage from './Screens/ContentPage';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      {
        <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'EDLIZ',
          headerStyle: {
            backgroundColor: 'green',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
         
        }} />
         <Stack.Screen name="Index" component={Diseases_and_Conditions}
         options={{headerStyle:{backgroundColor:'green'}}}/>
         <Stack.Screen name="UploadData" component={UploadDataPage}/>
         <Stack.Screen name="Content" component={ContentPage}/>
      </Stack.Navigator>
      }
      
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({})