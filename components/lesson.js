import { View } from "react-native";
import styles from './styles';
import LessonCard from "./lessonCard";

export default function Lesson(){
    return(
        <View style={styles.mainHomeContainer}>
                <LessonCard/>
        </View>
    );
}