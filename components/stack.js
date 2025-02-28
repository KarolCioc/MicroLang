import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';
import Login from './login';
import SignUp from './signUp';
import BottomTab from './bottomTabNav';
import useAuth from '../hooks/useAuth';

const Stack = createStackNavigator();

const screenOptions ={
  headerShown:false
};

export default function MyStack() {
  const {user} = useAuth();

  if(user){
    return (
      <Stack.Navigator screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        transitionSpec: {
            open: TransitionSpecs.BottomSheetSlideInSpec,
            close: TransitionSpecs.BottomSheetSlideOutSpec,
        },
    }}>
        <Stack.Screen name="BottomTab" component={BottomTab} options={screenOptions} />
      </Stack.Navigator>
    );
  }else{
    return (
      <Stack.Navigator  screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
        transitionSpec: {
            open: TransitionSpecs.BottomSheetSlideInSpec,
            close: TransitionSpecs.BottomSheetSlideOutSpec,
        },
    }}>
          <Stack.Screen name="SignUp" component={SignUp} options={screenOptions} />
          <Stack.Screen name="Login" component={Login} options={screenOptions} />
      </Stack.Navigator>
    );
  }
}