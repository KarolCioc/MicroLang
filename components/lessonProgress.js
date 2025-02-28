import { View } from "react-native";
import styles from './styles';
import LessonCard from "./lessonCard";
import { useRoute } from "@react-navigation/native";

export default function LessonProgress({refreshLessons}){
    const route = useRoute();
    const {lessonData} = route.params;
    return(
        <View style={styles.mainHomeContainer}>
                <LessonCard refreshLessons={refreshLessons} lessonData={lessonData}/>
        </View>
    );
}