import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

export const AccordionList = ({title,items, startLesson}) => {
    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
    const [expanded, setExpanded] = useState(false);

    const handleAnimation = () => {
        Animated.timing(rotateAnimation, {
        toValue: expanded ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
        }).start();
        setExpanded(!expanded);
    };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "90deg"],
    });

    const animatedStyle = {
        transform: [
        {
            rotate: interpolateRotating,
        },
        ],
        position:'absolute',
        left:0
    };

    const filterItems = (items) => {
      return items.filter((item) => {
        if(item.subItems){
          return item.subItems.some((subItem) => !subItem.started || subItem.subItems);
        }else{
          return !item.started;
        }
      })
      .map((item) => {
        if(item.subItems){
          return{
            ...item,
            subItems: filterItems(item.subItems),
          };
        }else{
          return item;
        }
      });
    };
    

    const filteredItems = filterItems(items);

    if(filteredItems.length === 0){
      return null;
    }

    return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={async () => handleAnimation()} style={styles.header}>
        <View style={styles.homeCardWrapper}>
            {filteredItems.some(item => item.subItems && item.subItems.length>0) && (
              <Image style={styles.homeCardImages} source={require("../assets/icons/pencil.jpg")}/>
            )}
            <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.expandIconWrapper}>
            <Animated.Text style={animatedStyle}>
                    <FontAwesome name="chevron-right" size={15} color="#374151" />
            </Animated.Text>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          {filteredItems.map((item, index) => (
            item.subItems ? (
                <AccordionList 
                startLesson={startLesson} 
                key={index} 
                title={item.title} 
                items={item.subItems} />
            ) : (
                <View key={index} style={styles.accordionItem}>
                  <Text key={index} style={styles.itemText}>{item.title}</Text>
                  <TouchableOpacity 
                  testID={`start-lesson-${item.title}`}
                  onPress={() => startLesson(item)} 
                  style={{padding:10}}>
                    <FontAwesome name='plus-circle' size={15} color="#374151" />
                  </TouchableOpacity>
                </View>
                )
          ))}
        </View>
      )}
    </View>
      );
}