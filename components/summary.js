import { View, Text, ScrollView, Dimensions} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { BarChart } from 'react-native-chart-kit';
import styles from './styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const window = Dimensions.get("window");

export default function Summary() {
const [weeklyData, setWeeklydata] = useState([0,0,0,0,0,0,0]);
const [languageProgress, setLanguageProgress] = useState({}); 

const styleLangText = {
    "Hiszpański": styles.langEsFontCard,
    "Angielski": styles.langEngFontCard,
    "Włoski": styles.langItFontCard
};

const languageColors = {
    "Hiszpański":"#FF5252",
    "Angielski":"#2B31A9",
    "Włoski":"#34D399"
};
//pobierz learning time z firestore

const loadLearningTime = React.useCallback( async () => {
  const learningTime = await AsyncStorage.getItem('learningTime');
  console.log("Learning time: ",learningTime);
  if(learningTime){
    const learningData = JSON.parse(learningTime);
    const now = new Date();
    let last7Days = Array(7).fill(0);
    const jsDayToIndex = (day) => (day === 0 ? 6 : day - 1);
    const currentDay = jsDayToIndex(now.getDay());
    for(let i = 0 ; i<7; i++){
      const d = new Date(now);
      const diffDays = i - currentDay;
      d.setDate(now.getDate() + diffDays);
      const dayStr = d.toISOString().slice(0,10);
      last7Days[i] = learningData[dayStr] || 0;
      console.log("learningData[]: ",learningData[dayStr]);
    }
    setWeeklydata(last7Days);
  }else{
    console.log("brak danych o czasie w Async storage");
  }
},[]);

const calculateLangProgress = async () => {
  const storedLessons = await AsyncStorage.getItem('lessons');
  if(storedLessons){
    const lessonData = JSON.parse(storedLessons);
    const progress = {};

    lessonData.forEach(lessonLang => {
      let total = 0;
      let completed = 0;

      lessonLang.subItems.forEach(subItem =>{
        subItem.subItems.forEach(innerItem =>{
          total++;
          if(innerItem.isCompleted) completed++;
        });
      });

      const percentage = total > 0 ? (completed/total) * 100 : 0;
      progress[lessonLang.language] = percentage;
    });
    setLanguageProgress(progress);
  }else{
    console.log("Brak danych lekcji w ASync Storage");
  }
};

useFocusEffect(
  React.useCallback(() =>{
    loadLearningTime();
    calculateLangProgress();
  },[loadLearningTime])
);

  return (
    <View style={styles.mainContainer}>
      <View style={{...styles.settingsContainer,justifyContent:'space-between'}}>
        <ScrollView>
        <View style={{alignItems:'center', paddingTop:10}}>
          <Text style={styles.settingsText}>Podsumowanie</Text>

          <View style={{...styles.summaryWrapper}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
              <Text style={{...styles.settingsText, fontSize:14,color:'#374151', textAlign:'center'}}>Tygodniowy czas nauki</Text>
              <FontAwesome name='calendar' size={20} color={'black'} style={{marginLeft:15}}/>
            </View>
            <BarChart
                data={{
                  labels: ["Pn", "Wt", "Śr", "Czw", "Pt", "Sb", "Nd"],
                  datasets: [{ data: weeklyData }]
                  }}
                width={window.width*0.95}
                height={220}
                yAxisLabel=""
                chartConfig={{
                  backgroundColor: "#1F2937",
                  backgroundGradientFrom: "#c79c4a",
                  backgroundGradientTo: "#fbbf24",
                  fillShadowGradient: "#7F5FFF",
                  fillShadowGradientOpacity: 1,
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  propsForLabels: {
                    fontSize: "10",
                    fontWeight: "bold",
                  },
                  propsForBackgroundLines: {
                    stroke: "#000000",
                    strokeWidth: 0.5,
                  },
                }}
                style={styles.chart}
              />
            <Text style={{...styles.settingsText, fontSize:14, color:'#37415'}}>Średni czas nauki: {(weeklyData.reduce((a,b)=> a+b,0)/7).toFixed(0)} min </Text>
            <Text style={{...styles.settingsText, fontSize:14, color:'#37415'}}>Najdłuższa sesja: {Math.max(...weeklyData)} min </Text>
          </View>

          <View style={{...styles.summaryWrapper}}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <Text style={{...styles.settingsText, color:'#374151', fontSize:14,textAlign:'center'}}>Postęp w językach</Text>
            <FontAwesome name='language' size={20} color={'black'} style={{marginLeft:15}}/>
            </View>
            <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    paddingVertical: 10}}>
            {Object.keys(languageProgress).map((language, index) => (
                <View key={index} style={{alignItems: 'center',marginBottom: 15}}>
                   <AnimatedCircularProgress
                      size={110}
                      width={15}
                      fill={languageProgress[language]}
                      tintColor={languageColors[language]}
                      backgroundColor="#F2F2F2"
                      lineCap="round"
                    >
                      {(fill) => (
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: languageColors[language],
                          }}>
                          {languageProgress[language].toFixed(0)}%
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                    <Text style={{...styleLangText[language], marginLeft:0, fontSize:18}}>{language}</Text>
                </View>
            ))}
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}