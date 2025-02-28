import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './styles';

export default function NoLessonsScreen({navigation}){
    return(
        <View style={styles.mainHomeContainer}>
            <View style={styles.mainLessonContainer}>
                <Image style={styles.bookIcon} source={require("../assets/icons/book.jpg")}/>
                <View style={styles.noLessonContainer}>
                    <Text style={styles.noLessonText}>Nie masz jeszcze rozpoczętych lekcji!{"\n"}Zacznij naukę już teraz wybierając nową lekcję.</Text>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate("Home")} style={styles.buttonNoLesson}>
                    <Text style={styles.buttonNoLessonText}>Wybierz nową lekcję</Text>
                </TouchableOpacity>
            </View> 
        </View>
    );
}