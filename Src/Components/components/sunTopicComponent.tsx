import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function sunTopicComponent() {
  return (
    <TouchableOpacity style={styles.SubTopic}>
        <Text style={styles.SubTopicText}>Sun Topic Component</Text>
    </TouchableOpacity>  
    )
}

const styles = StyleSheet.create({

    SubTopic: {
        backgroundColor: '#F5F5F5',
        padding: 10,
        marginLeft: 10,},

    SubTopicText: {}
})