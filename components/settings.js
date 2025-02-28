import { signOut } from 'firebase/auth';
import { TouchableOpacity, View, Text, Animated, Easing, Switch, Image } from 'react-native';
import { auth } from '../config/firebase';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth';
import Slider from '@react-native-community/slider';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Settings() {
  const {user} = useAuth();
  const [dailyGoal, setDailyGoal] = useState(20);
  const [notificationSettings, setNotificationSettings] = useState({enabled: false, hour: 9, minute: 30});
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const [showPicker, setShowPicker] = useState(false);

  const loadDailyGoalFromStorage = async () => {
    try{
      const storedGoal = await AsyncStorage.getItem("dailyGoal");
      if(storedGoal){
        setDailyGoal(Number(storedGoal));
      }
    }catch(error){
      console.error("Nie udało się zaktualizować daily goal z AsyncStorage ", error);
    };
  };

  const updateGoalToFirestore = async (dailyGoal, userId) => {
    if(!userId){
        console.log("Nie znaleziono uzytkownika");
        return;
    }

    try{
        const userDocRef = doc(db, "Users", user.uid);
        await setDoc(userDocRef, {dailyGoal}, {merge: true});
        console.log("Zaktualizowano dailyGoal w firestore");
    }catch(error){
        console.error("Nie udało sie dodac dailyGoal ", error);
    }
};

  const handleGoalChange = async (value) =>{
    setDailyGoal(value);
  };

  const handleSlidingComplete = async (value) => {
    try{
      await AsyncStorage.setItem('dailyGoal', value.toString());
      if(user?.uid){
        await updateGoalToFirestore(value, user.uid);
      }
    }catch(error){
      console.error("Błąd podczas aktualizacji dailyGoal ", error);
    }
  };

  useEffect(() => {
    loadDailyGoalFromStorage();
  },[])

  const handleLogout = async () =>{
    Animated.timing(opacityAnim, {
      toValue:0,
      duration:500,
      easing:Easing.ease,
      useNativeDriver:true,
    }).start(async () =>{
      try{
        await signOut(auth);
        console.log("Wylogowano pomyślnie");
      }catch(error){
        console.error("Błąd podczas wylogowania ", error);
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver:true,
        }).start();
      }
    });
  };

  //Powiadomienia
  const handleUpdateNotification = async (userId, settings) => {
    try{
      const userDocRef = doc(db, "Users", userId);
      await setDoc(userDocRef, { notification: settings }, { merge: true });
    }catch(error){
      console.error("Nie udało się zaktualizować notification w firestore ", error);
    }
  };

  const loadNotification = async (userId) =>{
    try{
      const userDocRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userDocRef);
      if(userDoc.exists()){
        const userData =  userDoc.data();
        if(userData.notification){
          setNotificationSettings(userData.notification);
        }
      }else{
        console.log("Nie znaleziono dokumentu");
      }
    }catch(error){
      console.error("Nie udało się załadować notification z firestore ", error);
    }
  };

  const scheduleDailyNotification = async (hour, minute) => {
    try{
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log("Wywołano cancelAllScheduledNot...")
      await Notifications.scheduleNotificationAsync({
        content:{
          title:"Przypomnienie o nauce",
          body:"Czas na dzienną sesję nauki!",
        },
        trigger:{
          hour:hour,
          minute:minute,
          repeats:true,
        },
      });
    }catch(error){
      console.error("Błąd podczas planowania powiadomienia ",error);
    }
  };

  const cancelScheduleDailyNotification = async () =>{
    try{
      await Notifications.cancelAllScheduledNotificationsAsync();
    }catch(error){
      console.error("Błąd podczas anulowania planowania powiadomienia ", error);
    }
  };

  const handleToggleNotifications = async () =>{
    try{
      const newSettings = {...notificationSettings, enabled: !notificationSettings.enabled};
      setNotificationSettings(newSettings);
      if(user?.uid){
        await handleUpdateNotification(user.uid, newSettings);
      }
    }catch(error){
      console.error("Błąd podczas włączania powiadomień ", error);
    }
  };

  const handleNotificationTimeChange = async (hour, minute) =>{
    try{
      const newSettings = {...notificationSettings, hour, minute};
      setNotificationSettings(newSettings);
      if(user?.uid){
        await handleUpdateNotification(user.uid, newSettings);
      }
    }catch(error){
      console.error("Błąd podczas zmiany czasu powiadomienia ", error);
    }
  };

  useEffect(() => {
    if(notificationSettings.enabled){
      scheduleDailyNotification(notificationSettings.hour,notificationSettings.minute);
    }else{
      cancelScheduleDailyNotification();
    }
  },[notificationSettings]);
  
  useEffect(() => {
    if(user?.uid){
      loadNotification(user?.uid);
    }
  },[user?.uid]);

  return (
    <Animated.View style={[styles.mainContainer, {opacity: opacityAnim}]}>
      <View style={{...styles.settingsContainer,justifyContent:'space-between'}}>
        <View style={{alignItems:'center'}}>
          <Text style={styles.settingsText}>Ustawienia</Text>
          <View style={styles.settingsWrapper}>
            <View style={{margin:10}}>
              {user?.photoURL || user?.photo ? (
                    <Image style={styles.userPhoto} source={{ uri: user?.photoURL || user?.photo }}/>
                ) : <FontAwesome name='user-circle' size={50} style={{marginRight:15}}/>}
            </View>
            <View>
              <Text style={styles.settingsFont}>e-mail: {user?.email}</Text>
            </View>
          </View>
          <View style={{...styles.settingsWrapper,justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <TouchableOpacity testID='show-picker-btn' onPress={() => setShowPicker(!showPicker)}>
                <FontAwesome style={{marginRight:5}} name='pencil-square-o' size={20}/>
              </TouchableOpacity>
              <Text style={styles.settingsFont}>Powiadomienia</Text>
            </View>
            <Switch
              testID='notification-switch'
              style={{width:30, height:25}}
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={notificationSettings.enabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleToggleNotifications}
              value={notificationSettings.enabled}
            />
          </View>
          <View style={{...styles.settingsWrapper,padding:0, marginVertical:0,flexDirection:'column'}}>
            <View style={{...styles.goalSettingWrapper, padding:10,paddingLeft:15}}>
              <Text style={styles.settingsFont}>Dzienny cel: {dailyGoal} minut</Text>
              <FontAwesome name='clock-o' size={15}/>
            </View>
            <Slider 
              testID='daily-goal'
              style={{width:'100%',height:40}}
              minimumValue={5}
              maximumValue={60}
              step={5}
              value={dailyGoal}
              onValueChange={handleGoalChange}
              onSlidingComplete={handleSlidingComplete}
              minimumTrackTintColor="#1E90FF"
              maximumTrackTintColor="#D3D3D3"
              thumbTintColor="#1E90FF"
            />
          </View>
          {showPicker && (
            <DateTimePicker
              testID='time-picker' 
              value={new Date(2020,0,1,notificationSettings.hour,notificationSettings.minute)} 
              mode='time' 
              display='spinner'
              onChange={(event, selectedTime) => {
                setShowPicker(false);
                if(selectedTime){
                  const hour = selectedTime.getHours();
                  const minute = selectedTime.getMinutes();
                  handleNotificationTimeChange(hour,minute);
                }
              }}
            />
          )
          }
        </View>
        <TouchableOpacity testID='logOut-btn' style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Wyloguj</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}