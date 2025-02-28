import { useState, useRef, useEffect } from "react";
import { Text, TextInput, View, Image, TouchableOpacity, Animated } from "react-native";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../config/firebase";
import { FontAwesome } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import initializeUserData from "./initializeUserData";
import styles from './styles';

export default function Login({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const opacityAnim = useRef(new Animated.Value(1)).current;
    const handleLogin = async () => {
        if(!email || !password){
            console.log("Email i hasło są wymagane");
            return;
        }
        try{
            await signInWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.log('error', err.message);
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '43248885389-qk5mboeadmpeq8d5ts96nc6adoena79i.apps.googleusercontent.com',
          });
    },[]);

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            
            const signInResult = await GoogleSignin.signIn();
    
            const idToken = signInResult?.data?.idToken || signInResult?.idToken;
    
            if (!idToken) {
                throw new Error('No ID token found');
            }
    
            const googleCredential = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(auth, googleCredential);
            
            const user = userCredential.user;
            await initializeUserData(user);
        } catch (error) {
            console.error('Google Sign-In Error:', error.message);
        }
    }

    return(
        <Animated.View style={[styles.signUpContainer,{opacity: opacityAnim}]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Micro</Text>
                <Text style={styles.titleText}>            Lang</Text>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Image style={{resizeMode:'contain', width:200, height:200}} source={require("../assets/icons/signImage.png")} />
                </View>
            </View>
            <View style={styles.loginContainer}>
                <View style={{padding:15}}>
                    <Text style={styles.loginContainerHeaderText}>Zaloguj się za pomocą email</Text>
                </View>
                <View style={{padding:10}}>
                    <View style={styles.inputWrapperTwo}>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={value => setEmail(value)}
                            placeholderTextColor='white'
                            style={styles.textInput}
                        />
                        <FontAwesome name='envelope' size={15} color={'white'} style={{marginRight:15}}/>
                    </View>
                    <View style={styles.inputWrapperTwo}>
                        <TextInput
                            placeholder="Hasło"
                            value={password}
                            onChangeText={value => setPassword(value)}
                            placeholderTextColor='white'
                            style={styles.textInput}
                            secureTextEntry
                        />
                        <FontAwesome name='eye' size={15} color={'white'} style={{marginRight:15}}/>
                    </View>
                </View>
                <View>
                    <View style={{alignItems:'center', paddingBottom:20}} >
                        <TouchableOpacity testID="login-btn" onPress={handleLogin} style={styles.loginButton} >
                            <Text style={styles.loginText}>Zaloguj</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.continueTxtWrapper}>
                        <View style={styles.leftLine}></View>
                        <View><Text style={styles.signTxt}>albo kontynuuj z</Text></View>
                        <View style={styles.rightLine}></View>
                    </View>
                </View>
                <View style={{justifyContent:'space-between', flex:1}}>
                    <TouchableOpacity style={styles.googleButton}>
                        <TouchableOpacity onPress={onGoogleButtonPress} style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={require("../assets/icons/googleLogo.png")}/>
                            <Text style={styles.loginGoogleTxt}>Zaloguj się z Google</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <View style={styles.signUpTxtWrapper}>
                        <Text style={styles.signTxt}>Nie posiadasz konta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signTxtTwo}>Zarejestruj się</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Animated.View>
    );
};