import React,{ useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from '../hooks/useAuth';
import { db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore'; 
import { ActivityIndicator } from 'react-native';
import Home from './home';
import Settings from './settings';
import styles from './styles';
import Summary from './summary';
import LessonStackNavigator from './lessonStackNav';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, accessibilityState }) => {
  const isSelected = accessibilityState.selected;
  return (
    <TouchableOpacity
      style={styles.tabBarButton}
      onPress={onPress}
    >
      <View style={[styles.activeTabStyle, isSelected ? styles.selected : null]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const iconsName = {
  'Home':'home',
  'Lesson':'graduation-cap',
  'Settings':'gear',
  'Summary':'line-chart'
};

export default function BottomTab() {
  const [lessons, setLessons] = useState([]);
  const {user} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => (
      <FontAwesome
        name={iconsName[route.name]}
        size={15}
        color={focused ? "white" : "grey"}
      />
    ),
    tabBarButton: (props) => (
      <CustomTabBarButton
        {...props}
      />
    ),
    tabBarShowLabel: false,
    headerShown: false,
  });

  const getLessons = async (userId) => {
    if(!userId) return;
    try{
      const userDocRef = doc(db, "Users", userId)
      const userDoc = await getDoc(userDocRef);
      if(userDoc.exists()){
          const lessons = userDoc.data().lessons;
          await AsyncStorage.setItem('lessons', JSON.stringify(lessons));
          setLessons(lessons);
          console.log("Dane pobrane i zapisane do AsyncStorage z Firestore");
      }else{
          console.log("Nie znaleziono dokumentu");
      }
    }catch(error){
        console.error("Bład podczas pobierania danych z Firestore do Async Storage ", error);
    }finally{
      setIsLoading(false);
    }
};

const refreshLessons = () => {
  setRefreshKey((prevKey) => prevKey+1);
};

const [startedLessons,setStartedLessons] = useState([]);

const filterStartedLessons = (allLessons) =>{
  return allLessons.filter((lesson) => 
    lesson.subItems.some((subItem) => 
      subItem.subItems.some((innerItem) => innerItem.started)
    )
  );
};

useEffect(() => {
    if(user?.uid){
        getLessons(user.uid);
    }
},[user?.uid, refreshKey]);

useEffect(() => {
  if(lessons.length > 0){
    setStartedLessons(filterStartedLessons(lessons));
  }
},[lessons]);


  if(isLoading){
    return (
      <View style={styles.mainHomeContainer}>
        <View style={styles.mainLessonContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Lesson">{() => LessonStackNavigator({lessons: startedLessons, refreshKey, refreshLessons})}</Tab.Screen>
      <Tab.Screen name="Home">{() => <Home refreshLessons={refreshLessons} />}</Tab.Screen>
      <Tab.Screen name="Summary" component={Summary}/>
      <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  );
}
