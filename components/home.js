import { Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styles from './styles';
import {AccordionList} from './accordionList';
import ProgressBar from 'react-native-progress/Bar';
const window = Dimensions.get("window");
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import colors from "../assets/colors/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDoc, getDoc } from "firebase/firestore";
import useAuth from '../hooks/useAuth';
import { doc} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function Home({refreshLessons}){
    const [lessons, setLessons] = useState([]);
    const [chosenLang, setChosenLang] = useState("Hiszpański");
    const {user} = useAuth();
    const [dailyGoal, setDailyGoal] = useState(20);
    const [completedMinutes, setCompletedMinutes] = useState(0);
    const progress = !isNaN(completedMinutes/dailyGoal) && dailyGoal > 0  
        ? Math.min(completedMinutes/dailyGoal,1)
        : 0;

    const loadFromStorage = async (userId) => {
        if (!userId) {
            console.error("Brak userId, nie można załadować danych");
            return;
        }

        try{
            const userDocRef = doc(db, "Users", userId);
            const userDoc = await getDoc(userDocRef);
        
            if(userDoc.exists()){
                const userData = userDoc.data();
                const dailyGoal = userData.dailyGoal || 20;
                await AsyncStorage.setItem("dailyGoal", dailyGoal.toString());
                console.log("Dodano daily goal do Async Storage ", dailyGoal);
            }else{
                console.log("Dokument użytkownika nie istnieje");
            }

            const today = new Date().toISOString().slice(0,10);
            const storedLessons = await AsyncStorage.getItem('lessons');
            const storedGoal = await AsyncStorage.getItem('dailyGoal');
            const storedLearningTime = await AsyncStorage.getItem('learningTime');
            let parsedData = storedLearningTime ? JSON.parse(storedLearningTime) : {};
            console.log("stored learning time ", storedLearningTime);
            if(storedLessons) setLessons(JSON.parse(storedLessons));
            if(storedGoal) setDailyGoal(Number(storedGoal));
            if(storedLearningTime){
                const minutes = Number(parsedData[today]) || 0;
                setCompletedMinutes(minutes);
                console.log("completed: ", completedMinutes);
            }
        }catch(error){
            console.error("Błąd podczas ładowania z AsyncStorage", error);
        }
    };
    
    const loadLearningTime = async (userId) => {
        try{
            const userDocRef = doc(db, "Users", userId);
            const userDoc = await getDoc(userDocRef);
        
            if(userDoc.exists()){
                const userData = userDoc.data();
                await AsyncStorage.setItem('learningTime',JSON.stringify(userData.learningTime));
                console.log("Dodano learningTime do asyncStorage HOME");
            }
        }catch(error){
            console.error("Błąd podczas ładowania z AsyncStorage", error);
        }
    };

    useEffect(() => {
        if(user?.uid){
            loadLearningTime(user?.uid);
        }else{
            console.log("nie znaleziono uid");
        }
    },[user]);


    useFocusEffect(
        React.useCallback(() =>{
            if(!user){
                console.log("czekam na załadowanie user");
                return;
            }
            if(user?.uid){
                loadFromStorage(user?.uid);
            }else{
                console.error("Brak userId");
            }
        }, [user?.uid])
    );

    const handleStartLesson = async (lesson) =>{
        try{
        const updatedLessons = lessons.map((lessonLang) => {
            if(lessonLang.language === chosenLang){
                return{
                ...lessonLang,
                subItems: lessonLang.subItems.map((subItem) => ({
                    ...subItem,
                    subItems: subItem.subItems.map((innerItem) =>
                        innerItem.title === lesson.title
                        ? { ...innerItem, started: true }
                        : innerItem
                ),
            })),
            };
          };
          return lessonLang;
        });
        
        setLessons(updatedLessons);
        //await AsyncStorage.setItem("lessons", JSON.stringify(updatedLessons));
        //sprawdź czy to było zbędne uzycie asyncStorage
        if (user?.uid) {
            const userDocRef = doc(db, "Users", user.uid);
            await setDoc(userDocRef, { lessons: updatedLessons }, { merge: true });
        }else{
            console.log("Nie znaleziono userID");
        }

        if(refreshLessons){
            refreshLessons();
        }
        } catch (error) {
            console.error("Nie udało się zaktualizować lekcji", error);
        }
    };
   
    return(
        <View style={styles.mainHomeContainer}>
            <View style={styles.welcomeHomeText}>
                <Text style={styles.welcomeFontOne}>Dzień dobry!</Text>
                <Text style={styles.welcomeFontTwo}>Gotowy na dzisiejszą lekcję?</Text>
            </View>
            <View style={styles.homeContainer}>
                <View style={{flexDirection:'column', marginVertical:20}}>
                    <View style={styles.dailyGoalWrapper}>
                        <Text style={styles.fontWhiteSmall}>Twój dzienny cel nauki</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={styles.fontWhiteSmall}>{completedMinutes} / {dailyGoal} min
                            </Text>
                            <FontAwesome style={styles.timeIcon}  name="clock-o" size={15} color='white'/>
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <ProgressBar color="#374151" style={{backgroundColor:'white', borderRadius:20}} progress={progress} width={window.width*0.925} height={10}/>
                    </View>
                </View>
                <View style={styles.homeLangCard}>
                    <View style={styles.homeCardContainer}>
                        <Image style={styles.homeCardImages} source={require("../assets/icons/book.jpg")}/>
                        <Text style={styles.textLearnLang}>Naucz się języka</Text> 
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-around', flex:1}}>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', flex:1}} onPress={() => setChosenLang("Hiszpański")}>
                            <Image testID="flag-es" style={chosenLang === 'Hiszpański' ? styles.selectedLangStyle : styles.notSelectedLangStyle} source={require("../assets/icons/spain.png")}/>
                            <Text style={chosenLang === 'Hiszpański' ? styles.selectedLangFont : styles.notSelectedLangFont}>Hiszpański</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center', flex:1}} onPress={() => setChosenLang("Angielski")}>
                            <Image testID="flag-en" style={chosenLang === 'Angielski' ? {...styles.selectedLangStyle, borderColor: colors.fontEN} : styles.notSelectedLangStyle} source={require("../assets/icons/en.png")}/>
                            <Text style={chosenLang === 'Angielski' ? {...styles.selectedLangFont, color: colors.fontEN} : styles.notSelectedLangFont} >Angielski</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center', flex:1}} onPress={() => setChosenLang("Włoski")}>
                            <Image testID="flag-it" style={chosenLang === 'Włoski' ? {...styles.selectedLangStyle, borderColor: colors.fontIT} : styles.notSelectedLangStyle} source={require("../assets/icons/it.png")}/>
                            <Text style={chosenLang === 'Włoski' ? {...styles.selectedLangFont, color: colors.fontIT} : styles.notSelectedLangFont}>Włoski</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.homeScrollView}>
                {lessons
                    .filter(lesson => lesson.language === chosenLang)
                    .map((lesson,index)=>(
                            <AccordionList 
                                key={index} 
                                title={lesson.title}
                                startLesson={handleStartLesson}
                                items={lesson.subItems} 
                                />
                        )
                )}
                </ScrollView>
            </View>
        </View>
    );

}