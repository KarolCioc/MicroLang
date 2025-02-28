import { View, Text, Image } from "react-native";
import styles from './styles';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import StartedLessonsCard from "./startedLessonsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function LessonList({refreshKey}){
    const [lessons, setLessons] = useState([]);
    const navigation = useNavigation();

    const loadFromStorage = async () => {
        try{
            const storedLessons = await AsyncStorage.getItem('lessons');
            if(storedLessons){
                setLessons(JSON.parse(storedLessons));
            }else{
                console.log("Brak danych lekcji w AsyncStorage");
            }
        }catch(error){
            console.error("Błąd podczas ładowania z AsyncStorage", error);
        }
    };

    useEffect(() => {
        loadFromStorage();
    },[refreshKey]);

    return(
        <View style={styles.mainHomeContainer}>
            <View style={styles.mainLessonContainer}>
                <View style={styles.startedLessonsContainer}>
                    <Image style={styles.homeCardImages} source={require("../assets/icons/learn.jpg")}/>
                    <Text style={styles.startedLessonsContainerText}>Rozpoczęte lekcje</Text>
                </View>
                <ScrollView style={styles.scrollViewContainer}>
                    {lessons
                        .filter(lesson =>
                            lesson.subItems.some(subItem => 
                                subItem.subItems.some(innerItem => innerItem.started && !innerItem.isCompleted)
                            )
                        )
                        .map((lesson,index) => (
                            <StartedLessonsCard key={index} lesson={lesson} navigation={navigation}/>
                    ))}
                </ScrollView>
                <TouchableOpacity onPress={()=> navigation.navigate("Home")} style={styles.buttonNoLesson}>
                    <Text style={styles.buttonNoLessonText}>Przejdź do wyboru lekcji</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}