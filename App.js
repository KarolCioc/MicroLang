import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyStack from './components/stack';
import { enableScreens } from 'react-native-screens';
import * as Notifications from 'expo-notifications';
import { useEffect } from "react";

export default function App() {
  enableScreens();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const getNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Brak uprawnień do wyświetlania powiadomień!');
    }
  };

  useEffect(() => {
    getNotificationPermissions();
  }, []);

  return (
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
  );
}