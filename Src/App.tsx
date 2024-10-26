import { StyleSheet } from 'react-native'
import React from 'react'
import HomeScreen from './Screens/Home'
import Diseases_and_Conditions from './Screens/Diseases_and_Conditions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadDataPage from './Screens/Adddata';
import ContentPage from './Screens/ContentPage';
import Eventpg from './Screens/Eventpg';
import Medicines from './Screens/Medicines';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      {
        <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'EDLIZ',
          headerStyle: {
            backgroundColor: '#73BBA3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
         
        }} />
         <Stack.Screen name="Index" component={Diseases_and_Conditions}
         options={{headerStyle:{backgroundColor:'#73BBA3'}}}/>
         <Stack.Screen name="UploadData" component={UploadDataPage}/>
         <Stack.Screen name="Content" component={ContentPage}/>
         <Stack.Screen name="Events" component={Eventpg}/>
         <Stack.Screen name="Medicine" component={Medicines}
          options={{headerStyle:{backgroundColor:'#73BBA3'}}}/>
      </Stack.Navigator>
      }
      
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({})