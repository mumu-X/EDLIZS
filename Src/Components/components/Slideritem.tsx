import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Touchable, TouchableOpacity, Share } from 'react-native';
import { ImageSliderType } from '../../Constants/sliderImages';
import ImagePath from '../../Constants/ImagePath'; 
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';



type Props = {
    item : ImageSliderType
    index: number
    scrollX: SharedValue<number>
};


const { width } = Dimensions.get('screen');

const SliderItem = ({ item, index, scrollX } : Props) => {

    const rnAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: interpolate(
                    scrollX.value, 
                    [(index - 1)*width, index * width, (index + 1)*width], 
                    [-width * 0.20, 0, width*0.20],
                    Extrapolation.CLAMP),
},
{

    scale: interpolate(
        scrollX.value,
        [(index - 1)*width, index * width, (index + 1)*width],
        [0.9, 1, 0.9],
        Extrapolation.CLAMP
    ),
}
            ],
        };
    });
                    

     // State to track whether the heart icon is active
     const [isHeartActive, setHeartActive] = useState(false);

     // Function to toggle the heart icon state
     const toggleHeart = () => {
         setHeartActive(!isHeartActive); // Toggle between true and false
     };
     



    return (
        <Animated.View style={[styles.imageContainer, rnAnimatedStyle]}>
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <View style={styles.bg}>
                <View>
                  <TouchableOpacity onPress={toggleHeart}>
                        <Image source={isHeartActive ? ImagePath.HeartIconActive : ImagePath.HeartIconNotActive}
                    style={styles.heartIcon}/>
                    </TouchableOpacity>

                
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: width, // Ensures each image takes up full screen width
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width - 100, // Adjust the image width as necessary
        height: 500,
        margin: 10,
        borderRadius: 20,
    },
    bg:{
        position: 'absolute',
        width: width - 100, // Adjust the image width as necessary
        height: 500,
        margin: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        padding: 20,
        borderRadius: 20,
    },
            heartIcon: {
                width: 30,
                height: 30,
    }
});

export default SliderItem;