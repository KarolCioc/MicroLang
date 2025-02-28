import { StyleSheet, Dimensions } from "react-native";
import colors from '../assets/colors/colors';
const window = Dimensions.get("window");

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: colors.background,
        flex: 1,
    },
    signUpContainer:{
        justifyContent:'space-between',
        backgroundColor: colors.background,
        flex: 1,
    },
    titleText:{
        fontFamily:'Montserrat-Regular',
        fontSize: 24,
        color: 'white'
    },
    titleContainer:{
        marginTop: window.height*0.05,
        marginLeft: window.width*0.05
    },
    loginContainer:{
        height: window.height*0.6,
        borderTopStartRadius:40,
        borderTopEndRadius:40,
        backgroundColor: colors.darkYellow,
    },
    loginContainerHeaderText:{
        fontFamily:'Montserrat-Regular', 
        fontSize: 20,
        color: 'white'
    },
    signInHeader:{
        fontFamily:'Montserrat-Regular', 
        fontSize: 16
    },    
    textInput:{
        fontFamily:'Montserrat-Regular', 
        fontSize: 12,
        height: 40,
        flex:1,
        padding:5,
        color: 'white'
    },
    loginButton:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: colors.background,
        width: window.width*0.35,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    loginText:{
        fontFamily:'Montserrat-SemiBold', 
        fontSize: 12,
        color: 'white'
    },
    googleButton:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: colors.background,
        height: window.height*0.06,
        marginHorizontal:10,
        marginVertical: 20,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        
    },
    loginGoogleTxt:{
        color:'white',
        fontFamily:'Montserrat-SemiBold', 
        fontSize: 12,
        marginLeft: 5
    },
    signUpTxtWrapper:{
        flexDirection:'row', 
        justifyContent:'center',
        margin: 10
    },
    signTxt:{
        fontFamily:'Montserrat-SemiBold', 
        fontSize: 12,
        color: 'white'
    },
    signTxtTwo:{
        fontFamily:'Montserrat-SemiBold', 
        fontSize: 12,
        color: colors.background
    },
    leftLine:{
        height:1, 
        borderColor:'black', 
        backgroundColor:'black', 
        width:80, 
        marginLeft:10, 
        marginTop:8
    },
    rightLine:{
        height:1, 
        borderColor:'black', 
        backgroundColor:'black', 
        width:80, 
        marginRight:10, 
        marginTop:8
    },
    inputWrapperTwo:{
        backgroundColor: colors.background,
        flexDirection:'row',
        alignItems:'center',
        borderRadius: 50,
        marginVertical:5,
    },
    inputIcons:{
        width:20,
        height:20,
        marginRight:5
    },
    continueTxtWrapper:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    //Bottom Tab Navigation Screen
    tabBarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F2937',
      },
      activeTabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      selected: {
        width: 40,
        height: 40,
        backgroundColor: colors.beige,
        borderRadius: 15,
      },
    //Home screen
    mainHomeContainer:{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent:'center'
    },
    homeContainer:{
        //borderRadius:20,
        //justifyContent:'space-between', do zmiany przy dodaniu reszty elem
        backgroundColor: colors.darkYellow,
        borderWidth: 1,
        //margin: window.height*0.015,
        flex:1,
        //width: window.width*0.95,

        marginTop: window.height*0.02,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        //height: window.height*0.95,
      //  alignItems:'center'
    },
    welcomeHomeText:{
        marginLeft:10,
        marginTop:window.height*0.06,
    },
    welcomeFontOne:{
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        color: 'white'
    },
    welcomeFontTwo:{
        fontFamily: 'Montserrat-Regular',
        color: 'white',
        fontSize: 13
    },
    fontWhiteSmall:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        color: 'white'
    },
    dailyGoalWrapper:{
        justifyContent:'space-between', 
        flexDirection:'row',
        margin: window.height*0.015,
    },
    timeIcon:{
        marginLeft:3,
        marginTop:1,
    },
    homeLangCard:{
        backgroundColor: colors.background,
        height: window.height*0.2,
        margin: window.height*0.015,
        borderRadius: 20,
        padding: 5
    },
    textLearnLang:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: 'white'
    },
    langIcons:{
        width:30, 
        height: 30
    },
    homeGrammarCard:{
        backgroundColor: colors.lightWhite,
        borderRadius: 20,
        margin: window.height*0.015,
        width: window.width*0.85,
        height: window.height*0.07,
        borderWidth:1.5,
        borderColor:colors.borderColor
    },
    textHomeCard:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: colors.darkFont
    },
    homeCardContainer:{
        flex:1,
        flexDirection:'row',
        padding:5,
        alignItems:'center'
    },
    homeCardImages:{
        resizeMode:'contain',
        marginRight:5, 
        width:30,
        height: 30, 
        borderRadius:30,
    },
    homeScrollView:{
        borderRadius:24,
    },
    selectedLangStyle:{
        borderColor: colors.fontES,
        borderWidth: 2,
        width:40,
        height:40,
        resizeMode:'contain',
        borderRadius:20
    },
    notSelectedLangStyle:{
        width:30,
        height:30,
    },
    selectedLangFont:{
        color: colors.fontES,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    notSelectedLangFont:{
        color: colors.lightWhite,
        fontSize: 10,
        fontFamily: 'Montserrat-Regular',
    },
    langITfont:{
        color: colors.fontIT,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold', 
        marginLeft: 10,
        textShadowColor:colors.lightGrey,
        textShadowOffset:{width:2, height:2},
        textShadowRadius:3,
    },
    
    //AccordionList
    accordionContainer: {
        margin: window.height*0.015,
        padding: 5,
        backgroundColor: colors.lightWhite,
        borderRadius: 20,
        borderWidth: 1,
        flex: 1,
        borderColor: '#ddd',
        overflow: 'hidden'
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      headerText: {
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        color: colors.darkFont,
        textShadowColor:colors.lightGrey,
        textShadowOffset:{width:3, height:3},
        textShadowRadius:3,
      },
      content: {
        marginTop: 10,
      },
      itemText: {
        fontSize: 12,
        color: colors.darkFont,
        paddingVertical: 5,
        flexWrap:'wrap',
        maxWidth:'90%'
      },
      homeCardWrapper:{
        flexDirection:'row', 
        alignItems:'center',
    },
    expandIconWrapper:{
        flexDirection:'row', 
        alignItems:'center',
         marginRight:15
    },
    accordionItem:{
        justifyContent:'space-between', 
        flexDirection:'row', 
        alignItems:'center',
    },
    innerItemAccordionList:{
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        borderColor:'grey', 
        borderWidth:1, 
        borderRadius:20, 
        padding:10, 
        marginVertical:5
    },
    // Lesson screen
    mainLessonContainer:{
        flex:1,
        marginTop: window.height*0.05,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        backgroundColor: colors.darkYellow,
        flexDirection:'column',
        padding:10,
        justifyContent:'space-around',
        alignItems:'center'
    },
    lessonLangContainer:{
        height: window.height*0.1,
        width: window.width*0.85,
        backgroundColor: colors.lightWhite,
        justifyContent: 'center',
        borderRadius:20,
        borderWidth:1,
        borderColor: colors.lightGrey,
    },
    langEsFont:{
        color: colors.fontES,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10,
        textShadowColor:colors.lightGrey,
        textShadowOffset:{width:2, height:2},
        textShadowRadius:3,
    },
    lessonSubjectFont:{
        color: colors.darkFont,
        fontSize: 10,
        fontFamily: 'Montserrat-Bold',
        marginLeft: 10,
        textShadowColor:colors.lightGrey,
        textShadowOffset:{width:3, height:3},
        textShadowRadius:3,
    },
    lessonCard:{
        height: window.height*0.5,
        width: window.width*0.85,
        backgroundColor: colors.lightWhite,
        borderRadius:20,
        padding:10
    },
    lessonCardTranslateWrapper:{
        flex:1,
        flexDirection: 'row',
        alignItems:'center'
    },
    lessonCardWrapper:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        margin: window.width*0.05,
    },
    langEsFontCard:{
        color: colors.fontES,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        flexWrap:'wrap',
        maxWidth:'95%'

    },langEngFontCard:{
        color: colors.fontEN,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        flexWrap:'wrap',
        maxWidth:'95%'

    },langItFontCard:{
        color: colors.fontIT,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        flexWrap:'wrap',
        maxWidth:'95%'
    },
    translatedLangFont:{
        color: colors.darkFont,
        fontSize: 15,
        fontFamily: 'Montserrat-Regular',
    },
    exampleVocabularyFont:{
        color: colors.fontExample,
        fontFamily: 'Montserrat-Italic',
        fontSize: 14,
    },
    buttonNext:{
        backgroundColor: colors.background,
        width:window.width*0.35,
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonNextFont:{
        color: 'white',
        fontSize: 12,
        fontFamily: 'Montserrat-Regular',
    },
    //No lesson screen (default lesson screen) !!!!!!DO ULEPSZENIA WYGLAD!!!!
    bookIcon:{
        width:250,
        height:250, 
        borderRadius: 20
    },
    noLessonContainer:{
        backgroundColor: colors.lightWhite,
        width: window.width*0.85,
        //height: window.height*0.08,
        borderRadius: 20,
        padding:10,
        justifyContent:'center'
   },
   noLessonText:{
        color: colors.darkFont,
        fontSize: 12,
        textAlign:'center',
        fontFamily: 'Montserrat-Bold',
   },
   buttonNoLesson:{
        minHeight: window.height*0.07,
        backgroundColor: colors.lightGreen,
        //marginBottom:10,
        justifyContent:'center',
        width:window.width*0.35,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
   },
   buttonNoLessonText:{
        color: colors.darkFont,
        fontSize: 10,
        textAlign:'center',
        fontFamily: 'Montserrat-Bold',
   },
   //Lesson list screen
   startedLessonsContainer:{
        backgroundColor: colors.lightWhite,
        width: window.width*0.9,
        height: window.height*0.05,
        borderRadius:15,
        padding: 5,
        paddingLeft:10,
        flexDirection:'row',
        alignItems:'center',
        borderColor:colors.lightGrey,
        borderWidth:1.5
   },
   startedLessonsText:{
        color: colors.darkFont,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
   },
   startedLessonsContainerText:{
        color: colors.darkFont,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        paddingLeft:5
   },
   startedLessonCard:{
        backgroundColor: colors.lightWhite,
        width: window.width*0.9,
        borderRadius: 20,
        padding:10,
        marginVertical:10,
        borderColor:colors.lightGrey,
        borderWidth:1.5,
   },
   lessonSubItemContainer:{
        marginVertical:10,
        paddingLeft:20
   },
   lessonContentContainer:{
        padding: 10,
   },
   lessonSubjectText:{
        color: colors.darkFont,
        fontSize: 10,
        fontFamily: 'Montserrat-Bold',
        flexWrap:'wrap',
        maxWidth:'97%',
        marginVertical:8
   },
   caretIcon:{
        paddingHorizontal:8,
   },
   scrollViewContainer:{
        marginVertical:10, 
        borderRadius:20
   },
   langEngFont:{
        color: colors.fontEN,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold', 
        marginLeft: 10,
        textShadowColor:colors.lightGrey,
        textShadowOffset:{width:2, height:2},
        textShadowRadius:3,
   },
   counterCardsText:{
        color: colors.darkFont,
        fontSize: 10,
        fontFamily: 'Montserrat-Bold',
        textAlign:'center'
   },
   excHeaderText:{
        color: colors.darkFont,
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold',
   },
   excHeaderContainer:{
        width: window.width*0.85,
        backgroundColor: colors.lightWhite,
        borderRadius:20,
        justifyContent:'center',
        padding:10,
        borderWidth:1,
        borderColor: colors.lightGrey,
   },
   excWordContainer:{
        minHeight: window.height*0.05,
        minWidth: window.width*0.35,
        backgroundColor: colors.lightWhite,
        borderRadius:20,
        justifyContent:'center',
        borderWidth:1,
        borderColor: colors.lightGrey,
        padding:5
   },
   quizContainer:{
        backgroundColor:colors.lightWhite,
        flexDirection:'row', 
        flexWrap:'wrap',
        minHeight: window.height*0.3,
        width: window.width*0.85,
        borderRadius:50,
        borderWidth:1,
        borderColor: colors.lightGrey,
        paddingHorizontal:10,
        justifyContent:'center',
        alignContent:'center'
    },
    quizAnswerContainer:{
        borderWidth:1,
        borderColor:"#C5C5C5",
        backgroundColor:colors.lightGrey,
        //height: window.height*0.05,
        minWidth: window.width*0.75,
        marginVertical:10,
        borderRadius:50,
        padding:10
    },
    wordIconContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'
    },
    flashcard:{
        backgroundColor:colors.lightWhite,
        width: window.width*0.7,
        minHeight: window.height*0.4,
        borderRadius: 40,
        borderColor:colors.lightGrey,
        borderWidth:1,
    },
    buttonRepeatFlashcard:{
        backgroundColor: colors.lightGreen,
        minHeight:window.height*0.05,
        width:window.width*0.25,
        borderRadius: 50,
        justifyContent:'center',
        marginBottom:10,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonFlashcardFont:{
        color: colors.darkFont,
        fontSize: 10,
        fontFamily: 'Montserrat-SemiBold',
        textAlign:'center'
    },
    endOfFlashcards:{
        backgroundColor:colors.lightWhite, 
        alignItems:'center',
        width: window.width*0.7,
        height: window.height*0.4,
    },
    finishExcText:{
        color: colors.darkFont,
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        textAlign:'center'
    },
    finishExcContainer:{
        height: window.height*0.3,
        width: window.width*0.85,
        justifyContent:'center'
    },
    //Settings
    settingsContainer:{
        backgroundColor:colors.darkYellow,
        flex:1,
        marginTop: window.height*0.1,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        alignItems:'center'
    },
    logoutButton:{
        width:window.width*0.35,
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:50
    },
    logoutButtonText:{
        color: colors.lightWhite,
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
    },
    settingsText:{
        color: colors.lightWhite,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        marginVertical:10
    },
    settingsWrapper:{
        flexDirection:'row', 
        alignItems:'center', 
        width:window.width*0.9, 
        backgroundColor:colors.lightWhite,
        borderRadius:20,
        marginVertical:10,
        padding:10
    },
    settingsFont:{
        color: colors.darkFont,
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    goalSettingWrapper:{
        flexDirection:'row',
        width: '100%',
        justifyContent:'space-between'
    },
    loadingPage:{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: colors.background 
    },
    //SUMMMARY
    summaryWrapper:{
        /*backgroundColor:colors.darkYellow,
        flex:1,
        marginVertical:5,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,*/
        marginVertical: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width:window.width*0.99,
        elevation: 3,
    },
    chart:{
        borderRadius: 16,
        alignSelf: 'center',
    },
    summaryLangText:{
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151'
    },
    animatedContainer: {
        flex: 1,
        backgroundColor: '#F4F4F9',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userPhoto: {
        width: 50,
        height: 50,
        borderRadius: 40,
        resizeMode: 'cover',
    },
});
export default styles;