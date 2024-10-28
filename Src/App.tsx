import { Button, StyleSheet } from 'react-native'
import React from 'react'
import HomeScreen from './Screens/Home'
import Diseases_and_Conditions from './Screens/Diseases_and_Conditions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UploadDataPage from './Screens/Adddata';
import ContentPage from './Screens/ContentPage';
import Eventpg from './Screens/Eventpg';
import Medicines from './Screens/Medicines';
import { RealmProvider } from '@realm/react';
import { Task } from './models/Task';


const Stack = createNativeStackNavigator();

function App() {
  function alert(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <NavigationContainer >
      {
        <RealmProvider schema={[Task]}>
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
          headerRight: () => (
            <Button onPress={() => alert('Right button!')} title="Info" color="#000" />
          ),
         
        }} />
         <Stack.Screen name="Index" component={Diseases_and_Conditions}
         options={{headerStyle:{backgroundColor:'#73BBA3'},
         title:'',
         headerTintColor: '#000000',
         }}/>
         <Stack.Screen name="UploadData" component={UploadDataPage}/>
         <Stack.Screen name="Content" component={ContentPage}
          options={{headerStyle:{backgroundColor:'#73BBA3'}}}/>
         <Stack.Screen name="Events" component={Eventpg}
          options={{headerStyle:{backgroundColor:'#73BBA3'}}}/>
         <Stack.Screen name="Medicine" component={Medicines}
          options={{headerStyle:{backgroundColor:'#73BBA3'}}}/>
      </Stack.Navigator>
      </RealmProvider>
      }
      
    </NavigationContainer>
    
  );
}

export default App;

const styles = StyleSheet.create({})