import { StyleSheet } from 'react-native'
import React from 'react'
import HomeScreen from './Screens/Home'
import Diseases_and_Conditions from './Screens/Diseases_and_Conditions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContentPage from './Screens/ContentPage';
import Eventpg from './Screens/Eventpg';
import Medicines from './Screens/Medicines';
import { RealmProvider } from '@realm/react';
import { schemas, } from './models/Task';
import HeaderButton from './Components/components/HeaderButton';
import SearchPage from './Screens/Searchpage';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer >
      {
        <RealmProvider schema={schemas}>
          <Stack.Navigator initialRouteName="HOME" >
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
                <HeaderButton />
              ),

            }} />
            <Stack.Screen name="Index" component={Diseases_and_Conditions}
              options={{
                headerStyle: { backgroundColor: '#73BBA3' },
                title: '',
                headerTintColor: '#000000',
              }} />
            <Stack.Screen name="Content" component={ContentPage}
              options={{ headerStyle: { backgroundColor: '#73BBA3' }, title: '',  headerTintColor: '#000000',headerTitleStyle: {fontWeight: 'bold',}, }} />
            <Stack.Screen name="Events" component={Eventpg}
              options={{ headerStyle: { backgroundColor: '#73BBA3' },  title: '', headerTintColor: '#000000',headerTitleStyle: {fontWeight: 'bold',}, }} />
            <Stack.Screen name="Medicine" component={Medicines}
              options={{ headerStyle: { backgroundColor: '#73BBA3' },  title: '', headerTintColor: '#000000',headerTitleStyle: {fontWeight: 'bold',}, }} />
             <Stack.Screen name="Search" component={SearchPage}
              options={{ headerStyle: { backgroundColor: '#73BBA3' },  title: '', headerTintColor: '#000000',headerTitleStyle: {fontWeight: 'bold',}, }} />
          </Stack.Navigator>
        </RealmProvider>
      }

    </NavigationContainer>

  );
}

export default App;

const styles = StyleSheet.create({})