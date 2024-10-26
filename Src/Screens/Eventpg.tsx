import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '../Components/components/Slider';
import { ImageSlider } from '../Constants/sliderImages';


export default function Eventpg() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Headerbox}>
        <Text style={styles.HeaderText}>
          Produce Your Certificate at Your Nearest MDPCZ Offices to Claim CPD Points.
        </Text>
      </View>
     <Slider itemList={ImageSlider} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'space-between',
    alignItems:'center',
  
  },
  HeaderText:{fontSize:20,
    fontWeight:'bold',
    marginStart:20,
    marginTop:20,
    },


  Headerbox:{
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:30,
    }
});