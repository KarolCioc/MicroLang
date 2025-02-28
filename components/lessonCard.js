import { Text,View, Image, TouchableOpacity, Animated, Easing, Dimensions } from "react-native";
import styles from './styles';
import StepProgressBar from "./stepProgressBar";
import { useState, useEffect, useRef } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import * as Speech from  'expo-speech';
const window = Dimensions.get("window");

export default function LessonCard({lessonData, refreshLessons}){
    const [currentStage, setCurrentStage] = useState(lessonData.currentStage);
    const [keyProgress, setKeyProgress] = useState(0);
    const currentLessonStage = lessonData.stages[currentStage-1];
    const [currentIndex, setCurrentIndex]  = useState(0);
    const totalWords = currentLessonStage?.content?.length || 0;
    const [isFlipped, setIsFlipped] = useState(false);
    const flipAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const [lessons, setLessons] = useState([]);
    const navigation = useNavigation();
    const {user} = useAuth();
    const [isAnimating, setIsAnimating] = useState(false);
    const translateXAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    const handleNextWord = ()=>{
        setCurrentIndex((prevIndex)=>(prevIndex+1)%totalWords);
    };
    const handlePrevWord = ()=>{
        setCurrentIndex((prevIndex)=>(prevIndex-1 + totalWords)%totalWords);
    };

    const handleCompleteLesson = () => {
        Animated.timing(opacityAnim, {
            toValue:0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate('LessonsList');
        })
    };

    const handleNextStage = async () => {
        if(isAnimating) return;
        setIsAnimating(true);

        try{
            if(currentStage < lessonData?.stages.length){
                Animated.timing(translateXAnim, {
                    toValue: -window.width,
                    duration:300,
                    easing:Easing.ease,
                    useNativeDriver:true,
                }).start(() =>{
                    translateXAnim.setValue(500);
                    Animated.timing(translateXAnim, {
                        toValue:0,
                        duration:300,
                        easing: Easing.ease,
                        useNativeDriver: true
                    }).start(() => {
                        setIsAnimating(false);
                    });
                });

                setCurrentIndex(0);
                setCurrentStage((prevStage) => prevStage+1);
                setIsExerciseCompleted(false);
                setCanGoNext(false);

                const updatedLessons= lessons.map(((lessonLang) => ({
                    ...lessonLang,
                    subItems: lessonLang.subItems.map((subItem) => ({
                        ...subItem,
                        subItems: subItem.subItems.map((innerItem) => 
                            lessonLang.language === lessonData.language &&
                            subItem.title === lessonData.lvlTitle &&
                            innerItem.title === lessonData.title && 
                            innerItem.started
                                ? {...innerItem, currentStage: currentStage+1}
                                : innerItem
                        ),
                    })),
                })),
            );
                setLessons(updatedLessons);

                await AsyncStorage.setItem("lessons", JSON.stringify(updatedLessons));

                if(user?.uid){
                    const userDocRef = doc(db, "Users", user.uid);;
                    await setDoc(userDocRef, { lessons: updatedLessons }, { merge: true });
                }else{
                    console.log("Nie znaleziono uid uzytkownika");
                }

                if(refreshLessons){
                    refreshLessons();
                }

            }else{
                const updatedLessons= lessons.map(((lessonLang) => ({
                        ...lessonLang,
                        subItems: lessonLang.subItems.map((subItem) => ({
                            ...subItem,
                            subItems: subItem.subItems.map((innerItem) => 
                                lessonLang.language === lessonData.language &&
                                subItem.title === lessonData.lvlTitle &&
                                innerItem.title === lessonData.title && 
                                innerItem.started
                                    ? {...innerItem, isCompleted: true}
                                    : innerItem
                            ),
                        })),
                    })),
                );

                handleCompleteLesson();

                setLessons(updatedLessons);

                await AsyncStorage.setItem('lessons',JSON.stringify(updatedLessons));

                if(user?.uid){
                    const userDocRef = doc(db,"Users",user.uid);
                    await setDoc(userDocRef, { lessons:updatedLessons }, { merge: true });
                }else{
                    console.log("Nie znaleziono userId");
                }

                if(refreshLessons){
                    refreshLessons();
                }
            }
        }catch(error){
            console.error("Błąd podczas nextStage", error);
        }
    };

    const [selectedOption, setSelectedOption] = useState(null);
    const [isExerciseCompleted, setIsExerciseCompleted] = useState(false);

    const handleAnswer = (item)=>{
    const isCorrect = item === currentWord.correctAnswer;
        setSelectedOption({
            answer:item,
            isCorrect: isCorrect,
        });
        
        if(isCorrect){
            setTimeout(()=>{
                if(currentIndex < totalWords-1){
                    setCurrentIndex(currentIndex+1);
                    setSelectedOption(null);
                }else{
                    setIsExerciseCompleted(true);
                    setCanGoNext(true);
                }
            },1000)
        }
    };

    const handleLessonPause = async (userId) => {
        const storedStart = await AsyncStorage.getItem('lessonStart');
        if(!storedStart) return;

        const start = JSON.parse(storedStart);
        const end = Date.now();
        const diff = end - start;
        const minutesSpent =  Math.floor(diff/60000);

        const today = new Date().toISOString().slice(0,10);
        const storedData = await AsyncStorage.getItem('learningTime');
        let parsedData = storedData ? JSON.parse(storedData) : {};

        parsedData[today] = (parsedData[today] || 0) + minutesSpent;
        await AsyncStorage.setItem('learningTime', JSON.stringify(parsedData));
        if(userId){
            const userDocRef = doc(db,"Users",userId);
            await setDoc(userDocRef, { learningTime:parsedData }, { merge: true });
        }else{
            console.log("Nie znaleziono userId");
        }
        await AsyncStorage.removeItem('lessonStart');
    };

    const [canGoNext, setCanGoNext] = useState(true);

    useEffect(()=>{
        setKeyProgress((prevKey)=> prevKey+1);
        ///ostatnia zmiana, sprawdz
        if (currentLessonStage?.type === "Fiszki") {
            setRemainedWords(currentLessonStage?.content);
            console.log("Ustawienie remainedWords, currentlessonStage.type === 'fiszki'")
          } else {
            setRemainedWords(undefined);
        }
    },[currentStage]);

    useEffect(() => {
        const unsub = navigation.addListener('blur', () => {
            if(user?.uid){
                handleLessonPause(user.uid);
            }else{
                console.log("Brak userID")
            }
            if(navigation.canGoBack()){
                navigation.popToTop();
            }
        });
        return unsub;
    },[navigation, user])

    const currentWord = currentLessonStage?.content ? currentLessonStage.content[currentIndex] : null;

    const handleFlipCard = () => {
        Animated.timing(flipAnim, {
            toValue: isFlipped ? 0 : 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
        setIsFlipped(!isFlipped);
    };

    const frontInterpolate = flipAnim.interpolate({
        inputRange: [0,1],
        outputRange: ['0deg', '180deg']
    });

    const backInterpolate = flipAnim.interpolate({
        inputRange: [0,1],
        outputRange: ['180deg','360deg']
    });

    const flipFrontStyle = {
        transform: [
            {rotateY: frontInterpolate}
        ]
    };

    const flipBackStyle = {
        transform: [
            {rotateY: backInterpolate}
        ]
    };
    const [remainedWords, setRemainedWords] = useState();

    const handleRemoveWord = () => {
        const updatedWords = remainedWords.filter((_,index) => index !== currentIndex);
        setRemainedWords(updatedWords);

        if(updatedWords.length > 0){
            setCurrentIndex((prevIndex) => prevIndex % updatedWords.length);
        };
        handleFlipCard();
    };
    const handleRepeatWord = () => {
        setCurrentIndex((prevIndex) => (prevIndex+1) % remainedWords.length);
        handleFlipCard();
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
    };
    const styleLangCardText = {
        "Hiszpański": styles.langEsFontCard,
        "Angielski": styles.langEngFontCard,
        "Włoski": styles.langItFontCard
    };

    useEffect(() => {
        if(isExerciseCompleted){
            startPulseAnimation();
        }
    },[isExerciseCompleted]);
    
    useEffect(() => {
        if(currentLessonStage?.type === "Ćwiczenie" || currentLessonStage?.type === "Quiz"){
            setCanGoNext(isExerciseCompleted);
        }else if(currentLessonStage?.type === "Fiszki" && remainedWords?.length === 0){
            setCanGoNext(true);
        }else if(currentLessonStage?.type === "Słownictwo"){
            setCanGoNext(true);
        }else{
            setCanGoNext(false);
        }
    },[currentStage, isExerciseCompleted,remainedWords]);

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease)
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease)
                })
            ])
        ).start();
    };

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
    },[]);

    const langCodes = {
        "Hiszpański":'es',
        "Angielski":'en',
        "Włoski":'it',
    };

    const speakWord = (word, language) => {
        Speech.speak(word, {
            language: language,
            pitch: 1.0,
            rate: 0.5,
        });
    }

    return(
        <Animated.View style={{...styles.mainLessonContainer, transform:[{translateX: translateXAnim}], opacity: opacityAnim}}>
            <StepProgressBar currentStage={currentStage} key={keyProgress}/>
                <View style={styles.lessonLangContainer}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={{marginLeft:5,width:30, height:30}} source={iconSources[lessonData.language]}/>
                        <Text style={styleLangText[lessonData.language]}>{lessonData.language}</Text>
                    </View>
                    <Text style={styles.lessonSubjectFont}>Temat Lekcji: {lessonData.title}</Text>
                </View>
                
                {currentLessonStage && (
                <>
                    {currentLessonStage.type === "Słownictwo" && currentWord && (
                        <View style={styles.lessonCard}>
                            <View style={styles.lessonCardWrapper}>
                            <Text style={styleLangCardText[lessonData.language]}>{currentWord.word}</Text>
                                <TouchableOpacity onPress={() => speakWord(currentWord.word,langCodes[lessonData.language])}>
                                    <FontAwesome name='volume-up' size={18} style={{marginRight:5}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lessonCardTranslateWrapper}>
                                <TouchableOpacity testID="left-btn" onPress={handlePrevWord}>
                                    <Image source={require("../assets/icons/left.png")}/>
                                </TouchableOpacity>
                                <Text style={styles.translatedLangFont}>{currentWord.translation}</Text>
                                <TouchableOpacity testID="right-btn" onPress={handleNextWord} style={{marginLeft:'auto'}}>
                                    <Image source={require("../assets/icons/right.png")}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.lessonCardWrapper}>
                                <Text style={styles.exampleVocabularyFont}>{currentWord.example}{"\n"}{currentWord.exampleTransl}</Text>
                            </View>
                            <Text style={styles.counterCardsText}>{currentIndex+1}/{totalWords}</Text>
                        </View>
                    )}
                    {currentLessonStage.type === "Ćwiczenie" && currentWord && (
                    <>
                    <View style={styles.excHeaderContainer}>
                        <Text style={styles.excHeaderText}>Dopasuj słowo do tłumaczenia</Text>
                    </View>
                    {!isExerciseCompleted ? (
                    <>
                    <View style={styles.excWordContainer}>
                        <Text style={{...styleLangCardText[lessonData.language], textAlign:'center', marginLeft:0}}>{currentWord.question}</Text>
                    </View>
                    <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
                    {currentWord?.options?.map((item,index)=>(
                        <TouchableOpacity 
                        testID="answer-btn"
                        onPress={() => handleAnswer(item)} 
                        key={index} 
                        style={
                            {...styles.excWordContainer, 
                            margin:10,
                            
                            backgroundColor: 
                                selectedOption?.answer === item
                                    ? selectedOption.isCorrect
                                        ? '#34D399'
                                        : '#FF4D4D'
                                    : '#F4F4F9',
                            }}>
                            <Text style={{...styles.translatedLangFont, textAlign:'center', marginLeft:0}}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                    </>
                    ):(
                        <View style={styles.finishExcContainer}>
                            <Animated.Text 
                                style={{...styles.finishExcText,
                                    transform:[{scale:pulseAnim}],
                                }}
                                >Brawo! Ukończyłeś ćwiczenie
                            </Animated.Text>
                        </View>
                    )}
                    </>
                )}
                {currentLessonStage.type === "Quiz" && currentWord && (
                    <>
                    {!isExerciseCompleted ? (
                    <>
                    <View style={styles.excHeaderContainer}>
                        <Text style={{...styles.excHeaderText, fontFamily:'Montserrat-Bold'}}>{currentWord.question}</Text>
                    </View>
                    <View style={styles.quizContainer}>
                    {currentWord?.options?.map((item,index) => (
                        <TouchableOpacity
                            onPress={() => handleAnswer(item)}
                            key={index} 
                            style={{
                                ...styles.quizAnswerContainer,
                                backgroundColor: selectedOption?.answer === item
                                    ? selectedOption.isCorrect
                                        ? 'rgba(52, 211, 153, 0.8)'
                                        : 'rgba(255, 77, 77, 0.8)'
                                    : '#F4F4F9',
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <FontAwesome 
                                    name={selectedOption?.answer === item
                                        ? selectedOption.isCorrect
                                            ? 'check-circle'
                                            : 'times-circle'
                                        : 'circle-o'}
                                    size={15}
                                    color={selectedOption?.answer === item
                                        ? selectedOption.isCorrect
                                            ? '#34D399'
                                            : '#FF4D4D'
                                        : '#C5C5C5'
                                    }
                                    style={{marginRight:10}}
                                />
                                <Text style={{...styles.excHeaderText, fontFamily:'Montserrat-SemiBold'}}>
                                    {`${index+1}. ${item}`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                    </View>
                    </>
                    ):(
                        <View style={styles.finishExcContainer}>
                            <Animated.Text 
                                style={{...styles.finishExcText,
                                    transform:[{scale:pulseAnim}],
                                }}
                                >Brawo! Ukończyłeś quiz
                            </Animated.Text>
                        </View>
                    )}
                    </>
                )}
                {currentLessonStage.type === "Fiszki" && remainedWords?.length > 0 && (
                    <>
                    <View style={styles.excHeaderContainer}>
                        <Text style={{...styles.excHeaderText, fontFamily:'Montserrat-Bold'}}>Powtórka słownictwa - Fiszki</Text>
                    </View>
                    <TouchableOpacity testID="flip-flashcard" onPress={handleFlipCard} >
                        {!isFlipped ? (
                            <Animated.View style={[styles.flashcard, flipFrontStyle]} >
                                <View style={styles.wordIconContainer}>
                                    <Text style={{
                                        ...styleLangCardText[lessonData.language],
                                        textAlign:'center', 
                                        marginLeft:0,
                                        marginVertical:20
                                    }}>{remainedWords[currentIndex].front}</Text>
                                    <TouchableOpacity onPress={() => speakWord(remainedWords[currentIndex].front,langCodes[lessonData.language])}>
                                        <FontAwesome name='volume-up' size={18} style={{marginRight:5}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginBottom:5}}>
                                    <Text style={styles.counterCardsText}>{currentIndex+1}/{remainedWords.length}</Text>
                                </View>
                            </Animated.View>
                        ) : (
                            <Animated.View style={[styles.flashcard, flipBackStyle]} >
                                <View style={styles.wordIconContainer}>
                                    <Text style={{
                                        ...styles.translatedLangFont,
                                        textAlign:'center',
                                        fontFamily:'Montserrat-Bold',
                                        marginLeft:0,
                                        fontSize:18,
                                        marginVertical:20,
                                    }}>{remainedWords[currentIndex].back}</Text>
                                    <Text style={{
                                        ...styleLangCardText[lessonData.language],
                                        textAlign:'center', 
                                        marginLeft:0
                                    }}>{remainedWords[currentIndex].example}</Text>
                                    <Text style={{
                                        ...styles.translatedLangFont,
                                        textAlign:'center',
                                        fontFamily:'Montserrat-Bold',
                                        marginLeft:0,
                                    }}>{remainedWords[currentIndex].exampleTransl}</Text>
                                    <TouchableOpacity onPress={() => speakWord(remainedWords[currentIndex].example,langCodes[lessonData.language])}>
                                        <FontAwesome name='volume-up' size={18} style={{marginRight:5}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                    <TouchableOpacity testID="remember-btn" onPress={handleRemoveWord} style={styles.buttonRepeatFlashcard}>
                                        <Text style={styles.buttonFlashcardFont}>Zapamiętałem</Text>
                                    </TouchableOpacity>
                                    <View style={{justifyContent:'center',marginBottom:10,width:20}}>
                                        <Text style={styles.counterCardsText}>{currentIndex+1}/{remainedWords.length}</Text>
                                    </View>
                                    {remainedWords.length > 1 && 
                                    <TouchableOpacity onPress={handleRepeatWord} style={{...styles.buttonRepeatFlashcard,backgroundColor:'#C5C5C5'}}>
                                        <Text style={styles.buttonFlashcardFont}>Jeszcze raz</Text>
                                    </TouchableOpacity>
                                    }
                                </View>
                            </Animated.View>
                        )}
                    </TouchableOpacity>
                    </>
                )}
                {currentLessonStage.type === 'Fiszki' && remainedWords?.length === 0 ? (
                    <>
                    <View style={{...styles.flashcard, justifyContent:'center'}}>
                        <Text style={{...styles.startedLessonsText,textAlign:'center'}}>Koniec powtórki!</Text>
                    </View>
                    <TouchableOpacity testID="end-btn" onPress={handleNextStage} style={styles.buttonNext}>
                        <Text style={styles.buttonNextFont}>Zakończ</Text>
                    </TouchableOpacity>
                    </>
                ): canGoNext ? (
                    <TouchableOpacity testID="goNext-btn" onPress={handleNextStage} style={styles.buttonNext}>
                        <Text style={styles.buttonNextFont}>Przejdź dalej</Text>
                    </TouchableOpacity>
                ) : (
                    <View/>
                )}
                </>
                )}
        </Animated.View>
    );
}