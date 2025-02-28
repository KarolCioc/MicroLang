import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StartedLessonsCard({lesson,navigation}){
    const handleStartLesson = async () => {
        const startTimestamp = Date.now();
        await AsyncStorage.setItem("lessonStart", JSON.stringify(startTimestamp));
    };

    const renderSubItems = (subItems)=>{
        return subItems.map((subItem, index)=>{
            if(subItem.subItems && subItem.subItems.some(innerItem => !innerItem.isCompleted && innerItem.started))
            return (
                <View key={index} >
                    <Text style={styles.startedLessonsText}>{subItem.title}</Text>
                    <View style={styles.lessonSubItemContainer}>
                        {subItem.subItems
                            .filter(innerItem => innerItem.started && !innerItem.isCompleted)
                            .map((innerItem, innerIndex)=>(
                                <View key={innerIndex} style={styles.innerItemAccordionList}>
                                    <View style={{flexDirection:'column', minWidth:'80%'}}>
                                        <Text style={styles.lessonSubjectText}>{innerItem.title}</Text>
                                        <Text style={styles.lessonSubjectText}>Etap: {innerItem.currentStage}/{innerItem.stages.length}</Text>
                                    </View>
                                    <TouchableOpacity
                                    testID="start-lesson-btn"
                                    onPress={() => {
                                        navigation.navigate("LessonProgress", {
                                            lessonData: { 
                                                ...innerItem, 
                                                language: lesson.language,
                                                lvlTitle: subItem.title},
                                        });
                                        handleStartLesson(); 
                                    }}
                                    >
                                    <FontAwesome style={styles.caretIcon} name="caret-right" size={20} color="#34D399" />
                                    </TouchableOpacity>
                                </View>
                        ))}
                    </View>
                </View>
        )});
    };

    const iconSources = {
        "Hiszpański":require("../assets/icons/spain.png"),
        "Angielski":require("../assets/icons/uk.png"),
        "Włoski":require("../assets/icons/it.png"),
    };

    const styleLangText = {
        "Hiszpański": styles.langEsFont,
        "Angielski": styles.langEngFont,
        "Włoski": styles.langITfont
    }

    return(
        <ScrollView>
        <View style={styles.startedLessonCard}>
            <View style={{flexDirection:'row', alignItems:'center', padding: 2}}>
                <Image style={{width:30, height:30}} source={iconSources[lesson.language]}/>
                <Text style={styleLangText[lesson.language]}>{lesson.language}</Text>
            </View>
            <View style={styles.lessonContentContainer}>
                {renderSubItems(lesson.subItems)}
            </View>
        </View>
        </ScrollView>
    );
}