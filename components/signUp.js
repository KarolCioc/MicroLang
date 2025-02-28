import { useState, useEffect, useRef } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Animated } from "react-native";
import { useFonts } from "expo-font";
import  * as SplashScreen from 'expo-splash-screen';
import styles from './styles';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/firebase';
import { FontAwesome } from '@expo/vector-icons';
import initializeUserData from "./initializeUserData";

export default function SignUp({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const opacityAnim = useRef(new Animated.Value(1)).current;

    let [fontsLoaded] = useFonts({
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf')
    });

    useEffect(() => {
        if (fontsLoaded){
          SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const handleSignUp = async () => {
        if(!email || !password){
            console.log("Pole email i password nie może być puste");
            return;
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await initializeUserData(user);
            console.log("Wywołano inicjalizację danych");
        }catch(err){
            console.log('Błąd podczas rejestracji ', err.message);
        }
    };

    if (!fontsLoaded) {
        return (
            <View>
                <Text>Ładowanie...</Text>
            </View>
        );
    }

    return(
        <Animated.View style={[styles.signUpContainer, {opacity: opacityAnim}]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Micro</Text>
                <Text style={styles.titleText}>            Lang</Text>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image style={{resizeMode:'contain', width:200, height:200}} source={require("../assets/icons/signImage.png")} />
                </View>
            </View>
            <View style={styles.loginContainer}>
                <>
                    <View style={{padding:15}}>
                            <Text style={styles.loginContainerHeaderText}>Zarejestruj się za pomocą email</Text>
                    </View>
                    <View style={{padding:10, paddingTop:0}}>
                        <View style={styles.inputWrapperTwo}>
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={value=>setEmail(value)}
                                placeholderTextColor='white'
                                style={styles.textInput}
                            />
                            <FontAwesome name='envelope' size={15} color={'white'} style={{marginRight:15}}/>
                        </View>
                        <View style={styles.inputWrapperTwo}>
                            <TextInput
                                placeholder="Hasło"
                                value={password}
                                onChangeText={value=>setPassword(value)}
                                placeholderTextColor='white'
                                style={styles.textInput}
                                secureTextEntry
                            />
                            <FontAwesome name='eye' size={15} color={'white'} style={{marginRight:15}}/>
                        </View>
                    </View>
                </>
                <View style={{alignItems:'center', flex:1, justifyContent:'space-between'}}>
                    <TouchableOpacity testID="signUp-btn" onPress={handleSignUp} style={{...styles.loginButton, marginVertical:15}}>
                        <Text style={styles.loginText}>Zarejestruj</Text>
                    </TouchableOpacity>
                    <View style={styles.signUpTxtWrapper}>
                        <Text style={styles.signTxt}>Posiadasz konto? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signTxtTwo}>Zaloguj się</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};