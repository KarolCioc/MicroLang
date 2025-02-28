import { getDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default async function initializeUserData(user){
    if(!user?.uid) return;
    
    const userDocRef = doc(db, "Users", user?.uid);

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    try{
        const userDoc = await getDoc(userDocRef);

        if(!userDoc.exists()){
            const initialData = {
                learningTime: {
                    [getTodayDate()]:0,
                },
                dailyGoal:20,
                notification:{
                    enabled:false,
                    hour:9,
                    minute:0
                },
                lessons:[
                    {
                      language: "Angielski",
                      title: "Lekcje Angielskiego",
                      subItems: [
                        {
                          title: "A1 - Początkujący",
                          subItems: [
                            {
                              title: "Powitania i przedstawianie się",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Hello", translation: "Cześć", example: "Hello, how are you?", exampleTransl: "Cześć, jak się masz?" },
                                    { word: "Good morning", translation: "Dzień dobry", example: "Good morning, everyone!", exampleTransl: "Dzień dobry wszystkim!" },
                                    { word: "My name is...", translation: "Nazywam się...", example: "My name is John.", exampleTransl: "Nazywam się John." },
                                    { word: "Nice to meet you", translation: "Miło Cię poznać", example: "Nice to meet you, Sarah.", exampleTransl: "Miło Cię poznać, Sarah." },
                                    { word: "How are you?", translation: "Jak się masz?", example: "How are you today?", exampleTransl: "Jak się dzisiaj masz?" },
                                    { word: "I'm fine", translation: "Mam się dobrze", example: "I'm fine, thank you.", exampleTransl: "Mam się dobrze, dziękuję." },
                                    { word: "Please", translation: "Proszę", example: "Please, have a seat.", exampleTransl: "Proszę, usiądź." },
                                    { word: "Thank you", translation: "Dziękuję", example: "Thank you for your help.", exampleTransl: "Dziękuję za pomoc." },
                                    { word: "Yes", translation: "Tak", example: "Yes, I understand.", exampleTransl: "Tak, rozumiem." },
                                    { word: "No", translation: "Nie", example: "No, I don't need it.", exampleTransl: "Nie, nie potrzebuję tego." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Dzień dobry' po angielsku?", options: ["Good morning", "Good night", "Goodbye"], correctAnswer: "Good morning" },
                                    { question: "Co znaczy 'Thank you'?", options: ["Proszę", "Dziękuję", "Przepraszam"], correctAnswer: "Dziękuję" },
                                    { question: "Jak zapytasz o imię?", options: ["What is your name?", "How are you?", "Where are you from?"], correctAnswer: "What is your name?" },
                                    { question: "Jak odpowiedzieć na 'How are you?'", options: ["I'm fine", "My name is...", "Thank you"], correctAnswer: "I'm fine" },
                                    { question: "Co znaczy 'Yes'?", options: ["Tak", "Nie", "Może"], correctAnswer: "Tak" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: ___, my name is Anna.", options: ["Hello", "Goodbye", "Please"], correctAnswer: "Hello" },
                                    { question: "Jak się przywitasz rano?", options: ["Good morning", "Good evening", "Good night"], correctAnswer: "Good morning" },
                                    { question: "Co powiesz, gdy kogoś poznasz?", options: ["Nice to meet you", "See you later", "Goodbye"], correctAnswer: "Nice to meet you" },
                                    { question: "Jak powiedzieć 'Proszę' w prośbie?", options: ["Please", "Thank you", "Sorry"], correctAnswer: "Please" },
                                    { question: "Co znaczy 'No'?", options: ["Tak", "Nie", "Może"], correctAnswer: "Nie" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Good evening", back: "Dobry wieczór", example: "Good evening, ladies and gentlemen.", exampleTransl: "Dobry wieczór, panie i panowie." },
                                    { front: "Goodbye", back: "Do widzenia", example: "Goodbye, see you tomorrow.", exampleTransl: "Do widzenia, do zobaczenia jutro." },
                                    { front: "Sorry", back: "Przepraszam", example: "Sorry for being late.", exampleTransl: "Przepraszam za spóźnienie." },
                                    { front: "Please", back: "Proszę", example: "Please, can you help me?", exampleTransl: "Proszę, czy możesz mi pomóc?" },
                                    { front: "Yes", back: "Tak", example: "Yes, I would like that.", exampleTransl: "Tak, chciałbym tego." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Liczby i czas",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "One", translation: "Jeden", example: "I have one sister.", exampleTransl: "Mam jedną siostrę." },
                                    { word: "Two", translation: "Dwa", example: "Two birds are singing.", exampleTransl: "Dwa ptaki śpiewają." },
                                    { word: "Three", translation: "Trzy", example: "She has three dogs.", exampleTransl: "Ona ma trzy psy." },
                                    { word: "Four", translation: "Cztery", example: "We need four chairs.", exampleTransl: "Potrzebujemy czterech krzeseł." },
                                    { word: "Five", translation: "Pięć", example: "There are five apples.", exampleTransl: "Tam jest pięć jabłek." },
                                    { word: "Morning", translation: "Poranek", example: "I wake up in the morning.", exampleTransl: "Budzę się rano." },
                                    { word: "Afternoon", translation: "Popołudnie", example: "I study in the afternoon.", exampleTransl: "Uczę się po południu." },
                                    { word: "Evening", translation: "Wieczór", example: "We relax in the evening.", exampleTransl: "Relaksujemy się wieczorem." },
                                    { word: "Night", translation: "Noc", example: "Good night!", exampleTransl: "Dobranoc!" },
                                    { word: "Today", translation: "Dzisiaj", example: "Today is sunny.", exampleTransl: "Dzisiaj jest słonecznie." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    {
                                      question: "Co znaczy 'Four'?",
                                      options: ["Trzy", "Cztery", "Pięć"],
                                      correctAnswer: "Cztery",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Wieczór' po angielsku?",
                                      options: ["Morning", "Evening", "Night"],
                                      correctAnswer: "Evening",
                                    },
                                    {
                                      question: "Co znaczy 'Today'?",
                                      options: ["Wczoraj", "Dzisiaj", "Jutro"],
                                      correctAnswer: "Dzisiaj",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Pięć' po angielsku?",
                                      options: ["Five", "Four", "Six"],
                                      correctAnswer: "Five",
                                    },
                                    {
                                      question: "Co znaczy 'Night'?",
                                      options: ["Dzień", "Noc", "Rano"],
                                      correctAnswer: "Noc",
                                    },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    {
                                      question: "Uzupełnij: She has ___ brothers.",
                                      options: ["three", "tree", "free"],
                                      correctAnswer: "three",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Popołudnie' po angielsku?",
                                      options: ["Morning", "Afternoon", "Evening"],
                                      correctAnswer: "Afternoon",
                                    },
                                    {
                                      question: "Co znaczy 'Good night'?",
                                      options: ["Dzień dobry", "Dobranoc", "Do widzenia"],
                                      correctAnswer: "Dobranoc",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Dzisiaj jest ciepło'?",
                                      options: ["Today is cold", "Today is warm", "Today is raining"],
                                      correctAnswer: "Today is warm",
                                    },
                                    {
                                      question: "Co znaczy 'Five'?",
                                      options: ["Pięć", "Sześć", "Siedem"],
                                      correctAnswer: "Pięć",
                                    },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    {
                                      front: "Tomorrow",
                                      back: "Jutro",
                                      example: "See you tomorrow.",
                                      exampleTransl: "Do zobaczenia jutro.",
                                    },
                                    {
                                      front: "Week",
                                      back: "Tydzień",
                                      example: "There are seven days in a week.",
                                      exampleTransl: "W tygodniu jest siedem dni.",
                                    },
                                    {
                                      front: "Month",
                                      back: "Miesiąc",
                                      example: "October is my favorite month.",
                                      exampleTransl: "Październik to mój ulubiony miesiąc.",
                                    },
                                    {
                                      front: "Year",
                                      back: "Rok",
                                      example: "Happy New Year!",
                                      exampleTransl: "Szczęśliwego Nowego Roku!",
                                    },
                                    {
                                      front: "Clock",
                                      back: "Zegar",
                                      example: "Look at the clock.",
                                      exampleTransl: "Spójrz na zegar.",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Rodzina i przyjaciele",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Family", translation: "Rodzina", example: "I love spending time with my family.", exampleTransl: "Uwielbiam spędzać czas z moją rodziną." },
                                    { word: "Mother", translation: "Mama", example: "My mother is a teacher.", exampleTransl: "Moja mama jest nauczycielką." },
                                    { word: "Father", translation: "Tata", example: "My father likes reading books.", exampleTransl: "Mój tata lubi czytać książki." },
                                    { word: "Brother", translation: "Brat", example: "I have one younger brother.", exampleTransl: "Mam jednego młodszego brata." },
                                    { word: "Sister", translation: "Siostra", example: "My sister lives in London.", exampleTransl: "Moja siostra mieszka w Londynie." },
                                    { word: "Friend", translation: "Przyjaciel", example: "My best friend is very kind.", exampleTransl: "Mój najlepszy przyjaciel jest bardzo miły." },
                                    { word: "Grandmother", translation: "Babcia", example: "My grandmother makes delicious cakes.", exampleTransl: "Moja babcia robi pyszne ciasta." },
                                    { word: "Grandfather", translation: "Dziadek", example: "My grandfather tells interesting stories.", exampleTransl: "Mój dziadek opowiada ciekawe historie." },
                                    { word: "Cousin", translation: "Kuzyn/Kuzynka", example: "My cousin is coming to visit us.", exampleTransl: "Mój kuzyn przyjeżdża nas odwiedzić." },
                                    { word: "Uncle", translation: "Wujek", example: "My uncle lives in a big house.", exampleTransl: "Mój wujek mieszka w dużym domu." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    {
                                      question: "Jak powiedzieć 'Mama' po angielsku?",
                                      options: ["Mother", "Father", "Sister"],
                                      correctAnswer: "Mother",
                                    },
                                    {
                                      question: "Co znaczy 'Brother'?",
                                      options: ["Siostra", "Brat", "Kuzyn"],
                                      correctAnswer: "Brat",
                                    },
                                    {
                                      question: "Jak zapytasz 'Kto to jest?'?",
                                      options: ["Who is this?", "What is this?", "Where is this?"],
                                      correctAnswer: "Who is this?",
                                    },
                                    {
                                      question: "Co znaczy 'Grandmother'?",
                                      options: ["Babcia", "Dziadek", "Ciocia"],
                                      correctAnswer: "Babcia",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Przyjaciel' po angielsku?",
                                      options: ["Friend", "Cousin", "Uncle"],
                                      correctAnswer: "Friend",
                                    },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    {
                                      question: "Uzupełnij: My ___ loves cooking cakes.",
                                      options: ["grandmother", "brother", "father"],
                                      correctAnswer: "grandmother",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Dziadek' po angielsku?",
                                      options: ["Father", "Uncle", "Grandfather"],
                                      correctAnswer: "Grandfather",
                                    },
                                    {
                                      question: "Co znaczy 'Cousin'?",
                                      options: ["Kuzyn/Kuzynka", "Ciocia", "Brat"],
                                      correctAnswer: "Kuzyn/Kuzynka",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Wujek' po angielsku?",
                                      options: ["Uncle", "Friend", "Grandfather"],
                                      correctAnswer: "Uncle",
                                    },
                                    {
                                      question: "Co znaczy 'Sister'?",
                                      options: ["Siostra", "Brat", "Przyjaciel"],
                                      correctAnswer: "Siostra",
                                    },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    {
                                      front: "Father",
                                      back: "Tata",
                                      example: "My father is very strong.",
                                      exampleTransl: "Mój tata jest bardzo silny.",
                                    },
                                    {
                                      front: "Mother",
                                      back: "Mama",
                                      example: "My mother works in a hospital.",
                                      exampleTransl: "Moja mama pracuje w szpitalu.",
                                    },
                                    {
                                      front: "Grandfather",
                                      back: "Dziadek",
                                      example: "My grandfather likes gardening.",
                                      exampleTransl: "Mój dziadek lubi ogrodnictwo.",
                                    },
                                    {
                                      front: "Friend",
                                      back: "Przyjaciel",
                                      example: "My friend helps me with my homework.",
                                      exampleTransl: "Mój przyjaciel pomaga mi z pracą domową.",
                                    },
                                    {
                                      front: "Sister",
                                      back: "Siostra",
                                      example: "My sister plays the piano.",
                                      exampleTransl: "Moja siostra gra na pianinie.",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Jedzenie i napoje",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Apple", translation: "Jabłko", example: "I eat an apple every day.", exampleTransl: "Jem jabłko codziennie." },
                                    { word: "Bread", translation: "Chleb", example: "Can you buy some bread?", exampleTransl: "Czy możesz kupić trochę chleba?" },
                                    { word: "Milk", translation: "Mleko", example: "I like milk with my coffee.", exampleTransl: "Lubię mleko do kawy." },
                                    { word: "Cheese", translation: "Ser", example: "Cheese is my favorite food.", exampleTransl: "Ser to moje ulubione jedzenie." },
                                    { word: "Water", translation: "Woda", example: "I drink a lot of water.", exampleTransl: "Piję dużo wody." },
                                    { word: "Tea", translation: "Herbata", example: "Would you like a cup of tea?", exampleTransl: "Czy chciałbyś filiżankę herbaty?" },
                                    { word: "Coffee", translation: "Kawa", example: "I need coffee to wake up.", exampleTransl: "Potrzebuję kawy, żeby się obudzić." },
                                    { word: "Banana", translation: "Banan", example: "Bananas are rich in potassium.", exampleTransl: "Banany są bogate w potas." },
                                    { word: "Juice", translation: "Sok", example: "Orange juice is very refreshing.", exampleTransl: "Sok pomarańczowy jest bardzo orzeźwiający." },
                                    { word: "Egg", translation: "Jajko", example: "I had eggs for breakfast.", exampleTransl: "Zjadłem jajka na śniadanie." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    {
                                      question: "Jak powiedzieć 'Chleb' po angielsku?",
                                      options: ["Milk", "Bread", "Cheese"],
                                      correctAnswer: "Bread",
                                    },
                                    {
                                      question: "Co znaczy 'Water'?",
                                      options: ["Mleko", "Woda", "Sok"],
                                      correctAnswer: "Woda",
                                    },
                                    {
                                      question: "Jak zapytać 'Czy chciałbyś filiżankę herbaty?'?",
                                      options: [
                                        "Would you like a cup of tea?",
                                        "Do you want coffee?",
                                        "Can you bring milk?",
                                      ],
                                      correctAnswer: "Would you like a cup of tea?",
                                    },
                                    {
                                      question: "Co znaczy 'Egg'?",
                                      options: ["Jajko", "Banan", "Chleb"],
                                      correctAnswer: "Jajko",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Sok' po angielsku?",
                                      options: ["Milk", "Juice", "Water"],
                                      correctAnswer: "Juice",
                                    },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    {
                                      question: "Uzupełnij: I drink ___ every morning.",
                                      options: ["coffee", "bread", "banana"],
                                      correctAnswer: "coffee",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Banan' po angielsku?",
                                      options: ["Banana", "Cheese", "Apple"],
                                      correctAnswer: "Banana",
                                    },
                                    {
                                      question: "Co znaczy 'Tea'?",
                                      options: ["Kawa", "Herbata", "Woda"],
                                      correctAnswer: "Herbata",
                                    },
                                    {
                                      question: "Jak powiedzieć 'Jabłko' po angielsku?",
                                      options: ["Bread", "Apple", "Egg"],
                                      correctAnswer: "Apple",
                                    },
                                    {
                                      question: "Co znaczy 'Milk'?",
                                      options: ["Mleko", "Woda", "Sok"],
                                      correctAnswer: "Mleko",
                                    },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    {
                                      front: "Orange",
                                      back: "Pomarańcza",
                                      example: "I like orange juice for breakfast.",
                                      exampleTransl: "Lubię sok pomarańczowy na śniadanie.",
                                    },
                                    {
                                      front: "Cheese",
                                      back: "Ser",
                                      example: "Can I have a cheese sandwich?",
                                      exampleTransl: "Czy mogę dostać kanapkę z serem?",
                                    },
                                    {
                                      front: "Egg",
                                      back: "Jajko",
                                      example: "I had a boiled egg this morning.",
                                      exampleTransl: "Zjadłem ugotowane jajko dzisiaj rano.",
                                    },
                                    {
                                      front: "Juice",
                                      back: "Sok",
                                      example: "I prefer apple juice over soda.",
                                      exampleTransl: "Wolę sok jabłkowy od napojów gazowanych.",
                                    },
                                    {
                                      front: "Coffee",
                                      back: "Kawa",
                                      example: "Coffee is my favorite drink.",
                                      exampleTransl: "Kawa to mój ulubiony napój.",
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Kierunki i miejsca",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Street", translation: "Ulica", example: "I live on Baker Street.", exampleTransl: "Mieszkam na Baker Street." },
                                    { word: "Park", translation: "Park", example: "We are going to the park this afternoon.", exampleTransl: "Idziemy do parku po południu." },
                                    { word: "School", translation: "Szkoła", example: "My school is near my house.", exampleTransl: "Moja szkoła jest blisko mojego domu." },
                                    { word: "Hospital", translation: "Szpital", example: "The hospital is on the left side of the street.", exampleTransl: "Szpital jest po lewej stronie ulicy." },
                                    { word: "Library", translation: "Biblioteka", example: "I borrow books from the library.", exampleTransl: "Wypożyczam książki z biblioteki." },
                                    { word: "Museum", translation: "Muzeum", example: "The museum opens at 10 AM.", exampleTransl: "Muzeum otwiera się o 10 rano." },
                                    { word: "Airport", translation: "Lotnisko", example: "We need to get to the airport by 6 PM.", exampleTransl: "Musimy być na lotnisku do 18:00." },
                                    { word: "Train station", translation: "Stacja kolejowa", example: "The train station is five minutes away.", exampleTransl: "Stacja kolejowa jest pięć minut stąd." },
                                    { word: "Market", translation: "Targ", example: "I bought fresh vegetables at the market.", exampleTransl: "Kupiłem świeże warzywa na targu." },
                                    { word: "Post office", translation: "Poczta", example: "The post office is next to the bank.", exampleTransl: "Poczta jest obok banku." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    {
                                      question: "Które miejsce służy do wypożyczania książek?",
                                      options: ["Library", "Hospital", "Market"],
                                      correctAnswer: "Library",
                                    },
                                    {
                                      question: "Do czego służy 'train station'?",
                                      options: ["Kupowania biletów", "Łapania pociągu", "Brania autobusu"],
                                      correctAnswer: "Łapania pociągu",
                                    },
                                    {
                                      question: "Skąd zazwyczaj wylatują samoloty?",
                                      options: ["Park", "Airport", "Museum"],
                                      correctAnswer: "Airport",
                                    },
                                    {
                                      question: "Które miejsce znajduje się przy ulicy i ma drzewa oraz trawę?",
                                      options: ["Park", "Market", "School"],
                                      correctAnswer: "Park",
                                    },
                                    {
                                      question: "Gdzie możesz wysłać list?",
                                      options: ["Post office", "Library", "Hospital"],
                                      correctAnswer: "Post office",
                                    },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    {
                                      question: "Uzupełnij zdanie: Muzeum jest otwarte od ___ do 18:00.",
                                      options: ["10:00", "17:00", "12:00"],
                                      correctAnswer: "10:00",
                                    },
                                    {
                                      question: "Do którego miejsca idą ludzie, gdy są chorzy?",
                                      options: ["Hospital", "School", "Park"],
                                      correctAnswer: "Hospital",
                                    },
                                    {
                                      question: "Gdzie uczniowie chodzą codziennie?",
                                      options: ["School", "Airport", "Library"],
                                      correctAnswer: "School",
                                    },
                                    {
                                      question: "Które miejsce znajduje się poza miastem i skąd startują samoloty?",
                                      options: ["Train station", "Market", "Airport"],
                                      correctAnswer: "Airport",
                                    },
                                    {
                                      question: "Które miejsce jest często zatłoczone w weekendy i sprzedaje świeże produkty?",
                                      options: ["Market", "Park", "Museum"],
                                      correctAnswer: "Market",
                                    },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    {
                                      front: "Street",
                                      back: "Ulica",
                                      example: "There is a lot of traffic on the main street.",
                                      exampleTransl: "Na głównej ulicy jest duży ruch.",
                                    },
                                    {
                                      front: "Library",
                                      back: "Biblioteka",
                                      example: "The library has a large collection of books.",
                                      exampleTransl: "Biblioteka ma dużą kolekcję książek.",
                                    },
                                    {
                                      front: "Museum",
                                      back: "Muzeum",
                                      example: "The museum displays ancient artifacts.",
                                      exampleTransl: "Muzeum prezentuje starożytne artefakty.",
                                    },
                                    {
                                      front: "Airport",
                                      back: "Lotnisko",
                                      example: "The flight departs from the international airport.",
                                      exampleTransl: "Lot odlatuje z międzynarodowego lotniska.",
                                    },
                                    {
                                      front: "Post office",
                                      back: "Poczta",
                                      example: "The post office closes at 5 PM.",
                                      exampleTransl: "Poczta zamyka się o 17:00.",
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          title: "A2 - Początkujący wyższy",
                          subItems: [
                            {
                              title: "Zakupy i usługi",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Price", translation: "Cena", example: "What is the price of this?", exampleTransl: "Jaka jest cena tego?" },
                                    { word: "Discount", translation: "Zniżka", example: "Is there a discount on this item?", exampleTransl: "Czy na ten przedmiot jest zniżka?" },
                                    { word: "Cash", translation: "Gotówka", example: "Do you accept cash?", exampleTransl: "Czy akceptujecie gotówkę?" },
                                    { word: "Credit card", translation: "Karta kredytowa", example: "Can I pay with a credit card?", exampleTransl: "Czy mogę zapłacić kartą kredytową?" },
                                    { word: "Receipt", translation: "Paragon", example: "Can I have a receipt, please?", exampleTransl: "Czy mogę prosić o paragon?" },
                                    { word: "Change", translation: "Reszta", example: "Here is your change.", exampleTransl: "Oto twoja reszta." },
                                    { word: "Size", translation: "Rozmiar", example: "Do you have this in size M?", exampleTransl: "Czy macie to w rozmiarze M?" },
                                    { word: "Try on", translation: "Przymierzyć", example: "Can I try this on?", exampleTransl: "Czy mogę to przymierzyć?" },
                                    { word: "Refund", translation: "Zwrot", example: "Can I get a refund?", exampleTransl: "Czy mogę otrzymać zwrot?" },
                                    { word: "Exchange", translation: "Wymiana", example: "Can I exchange this item?", exampleTransl: "Czy mogę wymienić ten przedmiot?" },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Czy mogę to przymierzyć?' po angielsku?", options: ["Can I try this on?", "Can I buy this?", "Can I see this?"], correctAnswer: "Can I try this on?" },
                                    { question: "Co znaczy 'Receipt'?", options: ["Paragon", "Reszta", "Cena"], correctAnswer: "Paragon" },
                                    { question: "Jak zapytać o zniżkę?", options: ["Is there a discount?", "What is the price?", "Do you accept cash?"], correctAnswer: "Is there a discount?" },
                                    { question: "Co oznacza 'Refund'?", options: ["Wymiana", "Zwrot", "Zniżka"], correctAnswer: "Zwrot" },
                                    { question: "Jak zapytać o płatność kartą?", options: ["Can I pay with a credit card?", "Do you accept cash?", "Can I have a receipt?"], correctAnswer: "Can I pay with a credit card?" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: Here is your ___ (reszta).", options: ["Discount", "Change", "Receipt"], correctAnswer: "Change" },
                                    { question: "Jak powiedzieć 'Rozmiar' po angielsku?", options: ["Size", "Price", "Exchange"], correctAnswer: "Size" },
                                    { question: "Co znaczy 'Try on'?", options: ["Kupić", "Przymierzyć", "Zwrócić"], correctAnswer: "Przymierzyć" },
                                    { question: "Jak zapytać o zwrot pieniędzy?", options: ["Can I get a refund?", "Can I exchange this?", "Can I try this on?"], correctAnswer: "Can I get a refund?" },
                                    { question: "Co oznacza 'Exchange'?", options: ["Zwrot", "Wymiana", "Zniżka"], correctAnswer: "Wymiana" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Bargain", back: "Okazja", example: "This dress is a real bargain.", exampleTransl: "Ta sukienka to prawdziwa okazja." },
                                    { front: "Customer service", back: "Obsługa klienta", example: "The customer service here is excellent.", exampleTransl: "Obsługa klienta tutaj jest doskonała." },
                                    { front: "Out of stock", back: "Brak w magazynie", example: "I'm sorry, this item is out of stock.", exampleTransl: "Przepraszam, tego przedmiotu nie ma w magazynie." },
                                    { front: "Delivery", back: "Dostawa", example: "Do you offer free delivery?", exampleTransl: "Czy oferujecie darmową dostawę?" },
                                    { front: "Order", back: "Zamówienie", example: "I would like to place an order.", exampleTransl: "Chciałbym złożyć zamówienie." },
                                  ],
                                },
                              ],
                            },
                                {
                                  title: "Przymiotniki opisujące cechy charakteru i wygląd",
                                  isCompleted: false,
                                  started: false,
                                  currentStage: 1,
                                  stages: [
                                    {
                                      stage: 1,
                                      type: "Słownictwo",
                                      content: [
                                        { word: "Tall", translation: "Wysoki", example: "He is tall and athletic.", exampleTransl: "On jest wysoki i wysportowany." },
                                        { word: "Short", translation: "Niski", example: "She is short but very energetic.", exampleTransl: "Ona jest niska, ale bardzo energiczna." },
                                        { word: "Friendly", translation: "Przyjazny", example: "Our neighbor is very friendly.", exampleTransl: "Nasz sąsiad jest bardzo przyjazny." },
                                        { word: "Rude", translation: "Niegrzeczny", example: "The waiter was rude to us.", exampleTransl: "Kelner był wobec nas niegrzeczny." },
                                        { word: "Smart", translation: "Bystry, inteligentny", example: "He is one of the smartest people I know.", exampleTransl: "On jest jednym z najbystrzejszych ludzi, jakich znam." },
                                        { word: "Lazy", translation: "Leniwy", example: "He is too lazy to clean his room.", exampleTransl: "On jest zbyt leniwy, by posprzątać swój pokój." },
                                        { word: "Beautiful", translation: "Piękny", example: "The view from the mountain is beautiful.", exampleTransl: "Widok z góry jest piękny." },
                                        { word: "Ugly", translation: "Brzydki", example: "The building looks old and ugly.", exampleTransl: "Budynek wygląda na stary i brzydki." },
                                        { word: "Kind", translation: "Miły, uprzejmy", example: "She is always kind to everyone.", exampleTransl: "Ona zawsze jest miła dla wszystkich." },
                                        { word: "Talkative", translation: "Rozmowny", example: "He is very talkative and loves meeting new people.", exampleTransl: "On jest bardzo rozmowny i uwielbia poznawać nowych ludzi." },
                                      ],
                                    },
                                    {
                                      stage: 2,
                                      type: "Ćwiczenie",
                                      content: [
                                        { question: "Jak powiedzieć 'przyjazny' po angielsku?", options: ["Rude", "Kind", "Friendly"], correctAnswer: "Friendly" },
                                        { question: "Co znaczy 'beautiful'?", options: ["Piękny", "Brzydki", "Miły"], correctAnswer: "Piękny" },
                                        { question: "Jak powiedzieć 'leniwy' po angielsku?", options: ["Lazy", "Smart", "Talkative"], correctAnswer: "Lazy" },
                                        { question: "Co oznacza 'rude'?", options: ["Niegrzeczny", "Uprzejmy", "Bystry"], correctAnswer: "Niegrzeczny" },
                                        { question: "Jak powiedzieć 'wysoki' po angielsku?", options: ["Tall", "Short", "Kind"], correctAnswer: "Tall" },
                                      ],
                                    },
                                    {
                                      stage: 3,
                                      type: "Quiz",
                                      content: [
                                        { question: "Uzupełnij: She is very ___ to animals.", options: ["kind", "rude", "lazy"], correctAnswer: "kind" },
                                        { question: "Jak powiedzieć 'rozmowny' po angielsku?", options: ["Smart", "Talkative", "Short"], correctAnswer: "Talkative" },
                                        { question: "Co znaczy 'ugly'?", options: ["Brzydki", "Piękny", "Przyjazny"], correctAnswer: "Brzydki" },
                                        { question: "Jak powiedzieć 'inteligentny' po angielsku?", options: ["Lazy", "Smart", "Friendly"], correctAnswer: "Smart" },
                                        { question: "Co oznacza 'short'?", options: ["Niski", "Wysoki", "Stary"], correctAnswer: "Niski" },
                                      ],
                                    },
                                    {
                                      stage: 4,
                                      type: "Fiszki",
                                      content: [
                                        { front: "Tall", back: "Wysoki", example: "She is tall and slim.", exampleTransl: "Ona jest wysoka i szczupła." },
                                        { front: "Friendly", back: "Przyjazny", example: "He is very friendly to strangers.", exampleTransl: "On jest bardzo przyjazny wobec nieznajomych." },
                                        { front: "Beautiful", back: "Piękny", example: "The garden is beautiful in spring.", exampleTransl: "Ogród jest piękny wiosną." },
                                        { front: "Lazy", back: "Leniwy", example: "He is too lazy to do his homework.", exampleTransl: "On jest zbyt leniwy, by zrobić swoje zadanie domowe." },
                                        { front: "Talkative", back: "Rozmowny", example: "She is very talkative during meetings.", exampleTransl: "Ona jest bardzo rozmowna podczas spotkań." },
                                      ],
                                    },
                                  ],
                                },                
                                {
                                  title: "Codzienne życie",
                                  isCompleted: false,
                                  started: false,
                                  currentStage: 1,
                                  stages: [
                                    {
                                      stage: 1,
                                      type: "Słownictwo",
                                      content: [
                                        { word: "Breakfast", translation: "Śniadanie", example: "I have eggs for breakfast.", exampleTransl: "Jem jajka na śniadanie." },
                                        { word: "Lunch", translation: "Obiad", example: "What do you usually eat for lunch?", exampleTransl: "Co zazwyczaj jesz na obiad?" },
                                        { word: "Dinner", translation: "Kolacja", example: "We have dinner at 7 PM.", exampleTransl: "Jemy kolację o 19:00." },
                                        { word: "Work", translation: "Praca", example: "I work from 9 to 5.", exampleTransl: "Pracuję od 9 do 17." },
                                        { word: "Homework", translation: "Zadanie domowe", example: "I have to do my homework.", exampleTransl: "Muszę zrobić zadanie domowe." },
                                        { word: "Shopping", translation: "Zakupy", example: "She goes shopping on Saturdays.", exampleTransl: "Ona chodzi na zakupy w soboty." },
                                        { word: "Relax", translation: "Relaksować się", example: "I like to relax after work.", exampleTransl: "Lubię relaksować się po pracy." },
                                        { word: "Clean", translation: "Sprzątać", example: "I clean my room every week.", exampleTransl: "Sprzątam swój pokój co tydzień." },
                                        { word: "Exercise", translation: "Ćwiczyć", example: "I exercise every morning.", exampleTransl: "Ćwiczę każdego ranka." },
                                        { word: "Commute", translation: "Dojazd", example: "I commute to work by bus.", exampleTransl: "Dojazd do pracy zajmuje mi autobusem." },
                                      ],
                                    },
                                    {
                                      stage: 2,
                                      type: "Ćwiczenie",
                                      content: [
                                        { question: "Jak powiedzieć 'Śniadanie' po angielsku?", options: ["Breakfast", "Lunch", "Dinner"], correctAnswer: "Breakfast" },
                                        { question: "Co znaczy 'Shopping'?", options: ["Praca", "Zakupy", "Odpoczynek"], correctAnswer: "Zakupy" },
                                        { question: "Jak zapytasz o obiad?", options: ["What do you eat for lunch?", "Do you have dinner?", "How do you shop?"], correctAnswer: "What do you eat for lunch?" },
                                        { question: "Jak powiedzieć 'Ćwiczyć' po angielsku?", options: ["Exercise", "Relax", "Work"], correctAnswer: "Exercise" },
                                        { question: "Co znaczy 'Commute'?", options: ["Dojazd", "Sprzątanie", "Relaks"], correctAnswer: "Dojazd" },
                                      ],
                                    },
                                    {
                                      stage: 3,
                                      type: "Quiz",
                                      content: [
                                        { question: "Uzupełnij: I ___ to work every day.", options: ["commute", "relax", "exercise"], correctAnswer: "commute" },
                                        { question: "Jak powiedzieć 'Zakupy' po angielsku?", options: ["Shopping", "Cleaning", "Relaxing"], correctAnswer: "Shopping" },
                                        { question: "Co powiesz, gdy chcesz powiedzieć o swoim śniadaniu?", options: ["I have breakfast.", "I do homework.", "I clean my room."], correctAnswer: "I have breakfast." },
                                        { question: "Jak powiedzieć 'Praca' po angielsku?", options: ["Work", "Clean", "Exercise"], correctAnswer: "Work" },
                                        { question: "Co znaczy 'Relax'?", options: ["Ćwiczyć", "Relaksować się", "Sprzątać"], correctAnswer: "Relaksować się" },
                                      ],
                                    },
                                    {
                                      stage: 4,
                                      type: "Fiszki",
                                      content: [
                                        { front: "Breakfast", back: "Śniadanie", example: "I eat breakfast at 8 AM.", exampleTransl: "Jem śniadanie o 8 rano." },
                                        { front: "Dinner", back: "Kolacja", example: "Dinner is ready.", exampleTransl: "Kolacja jest gotowa." },
                                        { front: "Work", back: "Praca", example: "I have a lot of work to do.", exampleTransl: "Mam dużo pracy do zrobienia." },
                                        { front: "Shopping", back: "Zakupy", example: "I enjoy shopping with friends.", exampleTransl: "Lubię robić zakupy z przyjaciółmi." },
                                        { front: "Commute", back: "Dojazd", example: "My commute takes 30 minutes.", exampleTransl: "Mój dojazd zajmuje 30 minut." },
                                      ],
                                    },
                                  ],
                                },
                            {
                              title: "Podróże i transport",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Ticket", translation: "Bilet", example: "I bought a ticket for the train.", exampleTransl: "Kupiłem bilet na pociąg." },
                                    { word: "Train", translation: "Pociąg", example: "The train leaves at 5 PM.", exampleTransl: "Pociąg odjeżdża o 17:00." },
                                    { word: "Airport", translation: "Lotnisko", example: "The airport is very busy today.", exampleTransl: "Lotnisko jest dziś bardzo zatłoczone." },
                                    { word: "Luggage", translation: "Bagaż", example: "Where can I leave my luggage?", exampleTransl: "Gdzie mogę zostawić swój bagaż?" },
                                    { word: "Bus", translation: "Autobus", example: "I take the bus to school every day.", exampleTransl: "Codziennie jeżdżę autobusem do szkoły." },
                                    { word: "Taxi", translation: "Taksówka", example: "We need a taxi to the hotel.", exampleTransl: "Potrzebujemy taksówki do hotelu." },
                                    { word: "Map", translation: "Mapa", example: "Do you have a map of the city?", exampleTransl: "Czy masz mapę miasta?" },
                                    { word: "Passport", translation: "Paszport", example: "Don't forget your passport!", exampleTransl: "Nie zapomnij paszportu!" },
                                    { word: "Station", translation: "Stacja", example: "The bus station is near the park.", exampleTransl: "Dworzec autobusowy jest blisko parku." },
                                    { word: "Journey", translation: "Podróż", example: "How was your journey?", exampleTransl: "Jak minęła Twoja podróż?" },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Bilet' po angielsku?", options: ["Ticket", "Luggage", "Station"], correctAnswer: "Ticket" },
                                    { question: "Co znaczy 'Airport'?", options: ["Lotnisko", "Dworzec", "Mapa"], correctAnswer: "Lotnisko" },
                                    { question: "Jak zapytasz o miejsce na bagaż?", options: ["Where can I leave my luggage?", "Where is the bus station?", "Do you have a map?"], correctAnswer: "Where can I leave my luggage?" },
                                    { question: "Jak powiedzieć 'Autobus' po angielsku?", options: ["Bus", "Taxi", "Train"], correctAnswer: "Bus" },
                                    { question: "Co znaczy 'Journey'?", options: ["Podróż", "Stacja", "Paszport"], correctAnswer: "Podróż" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: The ___ leaves at 6 PM.", options: ["train", "taxi", "passport"], correctAnswer: "train" },
                                    { question: "Jak powiedzieć 'Lotnisko' po angielsku?", options: ["Airport", "Station", "Luggage"], correctAnswer: "Airport" },
                                    { question: "Co powiesz, gdy chcesz znaleźć miejsce na bagaż?", options: ["Where can I leave my luggage?", "Where is the airport?", "How much is the ticket?"], correctAnswer: "Where can I leave my luggage?" },
                                    { question: "Jak powiedzieć 'Taksówka' po angielsku?", options: ["Taxi", "Bus", "Map"], correctAnswer: "Taxi" },
                                    { question: "Co znaczy 'Station'?", options: ["Stacja", "Mapa", "Podróż"], correctAnswer: "Stacja" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Ticket", back: "Bilet", example: "How much is a ticket to London?", exampleTransl: "Ile kosztuje bilet do Londynu?" },
                                    { front: "Train", back: "Pociąg", example: "The train is late.", exampleTransl: "Pociąg jest spóźniony." },
                                    { front: "Airport", back: "Lotnisko", example: "The airport is far from here.", exampleTransl: "Lotnisko jest daleko stąd." },
                                    { front: "Luggage", back: "Bagaż", example: "My luggage is very heavy.", exampleTransl: "Mój bagaż jest bardzo ciężki." },
                                    { front: "Passport", back: "Paszport", example: "Show me your passport, please.", exampleTransl: "Pokaż mi proszę Twój paszport." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czas wolny i hobby",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Hobby", translation: "Hobby", example: "My hobby is painting.", exampleTransl: "Moje hobby to malowanie." },
                                    { word: "Music", translation: "Muzyka", example: "I love listening to music.", exampleTransl: "Uwielbiam słuchać muzyki." },
                                    { word: "Reading", translation: "Czytanie", example: "She enjoys reading books.", exampleTransl: "Ona lubi czytać książki." },
                                    { word: "Swimming", translation: "Pływanie", example: "We go swimming every weekend.", exampleTransl: "Chodzimy pływać co weekend." },
                                    { word: "Cooking", translation: "Gotowanie", example: "He is good at cooking Italian dishes.", exampleTransl: "On jest dobry w gotowaniu włoskich dań." },
                                    { word: "Gardening", translation: "Ogrodnictwo", example: "Gardening is very relaxing.", exampleTransl: "Ogrodnictwo jest bardzo relaksujące." },
                                    { word: "Painting", translation: "Malowanie", example: "I started painting last year.", exampleTransl: "Zacząłem malować w zeszłym roku." },
                                    { word: "Traveling", translation: "Podróżowanie", example: "Traveling helps me learn about new cultures.", exampleTransl: "Podróżowanie pomaga mi poznawać nowe kultury." },
                                    { word: "Fishing", translation: "Wędkarstwo", example: "My father enjoys fishing on weekends.", exampleTransl: "Mój ojciec lubi wędkować w weekendy." },
                                    { word: "Dancing", translation: "Taniec", example: "She is learning dancing.", exampleTransl: "Ona uczy się tańca." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Muzyka' po angielsku?", options: ["Music", "Painting", "Dancing"], correctAnswer: "Music" },
                                    { question: "Co znaczy 'Gardening'?", options: ["Ogrodnictwo", "Pływanie", "Gotowanie"], correctAnswer: "Ogrodnictwo" },
                                    { question: "Jak zapytasz o czyjeś hobby?", options: ["What is your hobby?", "What do you read?", "Where do you swim?"], correctAnswer: "What is your hobby?" },
                                    { question: "Jak powiedzieć 'Gotowanie' po angielsku?", options: ["Cooking", "Reading", "Traveling"], correctAnswer: "Cooking" },
                                    { question: "Co znaczy 'Fishing'?", options: ["Wędkarstwo", "Podróżowanie", "Taniec"], correctAnswer: "Wędkarstwo" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: My favorite hobby is ___.", options: ["painting", "station", "passport"], correctAnswer: "painting" },
                                    { question: "Jak powiedzieć 'Podróżowanie' po angielsku?", options: ["Traveling", "Fishing", "Gardening"], correctAnswer: "Traveling" },
                                    { question: "Co powiesz, gdy ktoś pyta o Twoje hobby?", options: ["My hobby is music.", "I like the station.", "I love tickets."], correctAnswer: "My hobby is music." },
                                    { question: "Jak powiedzieć 'Pływanie' po angielsku?", options: ["Swimming", "Reading", "Cooking"], correctAnswer: "Swimming" },
                                    { question: "Co znaczy 'Dancing'?", options: ["Taniec", "Czytanie", "Podróżowanie"], correctAnswer: "Taniec" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Hobby", back: "Hobby", example: "Do you have any hobbies?", exampleTransl: "Czy masz jakieś hobby?" },
                                    { front: "Music", back: "Muzyka", example: "Music makes me happy.", exampleTransl: "Muzyka sprawia, że jestem szczęśliwy." },
                                    { front: "Traveling", back: "Podróżowanie", example: "I love traveling with friends.", exampleTransl: "Uwielbiam podróżować z przyjaciółmi." },
                                    { front: "Gardening", back: "Ogrodnictwo", example: "Gardening is my favorite activity.", exampleTransl: "Ogrodnictwo to moja ulubiona aktywność." },
                                    { front: "Painting", back: "Malowanie", example: "She enjoys painting landscapes.", exampleTransl: "Ona lubi malować krajobrazy." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Zdrowie i samopoczucie",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Doctor", translation: "Lekarz", example: "I need to see a doctor.", exampleTransl: "Muszę zobaczyć się z lekarzem." },
                                    { word: "Hospital", translation: "Szpital", example: "The hospital is near my house.", exampleTransl: "Szpital jest blisko mojego domu." },
                                    { word: "Medicine", translation: "Lekarstwo", example: "Did you take your medicine?", exampleTransl: "Czy wziąłeś swoje lekarstwo?" },
                                    { word: "Pain", translation: "Ból", example: "I have pain in my back.", exampleTransl: "Mam ból w plecach." },
                                    { word: "Fever", translation: "Gorączka", example: "He has a high fever.", exampleTransl: "On ma wysoką gorączkę." },
                                    { word: "Headache", translation: "Ból głowy", example: "I have a terrible headache.", exampleTransl: "Mam okropny ból głowy." },
                                    { word: "Cold", translation: "Przeziębienie", example: "I caught a cold last week.", exampleTransl: "Przeziębiłem się w zeszłym tygodniu." },
                                    { word: "Healthy", translation: "Zdrowy", example: "Eating fruits is healthy.", exampleTransl: "Jedzenie owoców jest zdrowe." },
                                    { word: "Tired", translation: "Zmęczony", example: "I feel tired after work.", exampleTransl: "Czuję się zmęczony po pracy." },
                                    { word: "Exercise", translation: "Ćwiczenie", example: "Regular exercise is good for your health.", exampleTransl: "Regularne ćwiczenia są dobre dla zdrowia." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Lekarz' po angielsku?", options: ["Doctor", "Hospital", "Medicine"], correctAnswer: "Doctor" },
                                    { question: "Co znaczy 'Headache'?", options: ["Ból głowy", "Przeziębienie", "Gorączka"], correctAnswer: "Ból głowy" },
                                    { question: "Jak zapytasz o swoje zdrowie?", options: ["Do you feel healthy?", "Do you need a doctor?", "Are you in pain?"], correctAnswer: "Do you feel healthy?" },
                                    { question: "Jak powiedzieć 'Ćwiczenie' po angielsku?", options: ["Exercise", "Medicine", "Fever"], correctAnswer: "Exercise" },
                                    { question: "Co znaczy 'Tired'?", options: ["Zmęczony", "Zdrowy", "Chory"], correctAnswer: "Zmęczony" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: I need to take my ___.", options: ["medicine", "exercise", "doctor"], correctAnswer: "medicine" },
                                    { question: "Jak powiedzieć 'Szpital' po angielsku?", options: ["Hospital", "Doctor", "Pain"], correctAnswer: "Hospital" },
                                    { question: "Co powiesz, gdy masz ból głowy?", options: ["I have a headache.", "I am tired.", "I feel healthy."], correctAnswer: "I have a headache." },
                                    { question: "Jak powiedzieć 'Zdrowy' po angielsku?", options: ["Healthy", "Fever", "Cold"], correctAnswer: "Healthy" },
                                    { question: "Co znaczy 'Cold'?", options: ["Przeziębienie", "Ból", "Zmęczenie"], correctAnswer: "Przeziębienie" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Doctor", back: "Lekarz", example: "The doctor gave me medicine.", exampleTransl: "Lekarz dał mi lekarstwo." },
                                    { front: "Pain", back: "Ból", example: "Pain in the legs is common after exercise.", exampleTransl: "Ból w nogach jest powszechny po ćwiczeniach." },
                                    { front: "Fever", back: "Gorączka", example: "She has a fever and needs rest.", exampleTransl: "Ona ma gorączkę i potrzebuje odpoczynku." },
                                    { front: "Healthy", back: "Zdrowy", example: "A healthy diet is important.", exampleTransl: "Zdrowa dieta jest ważna." },
                                    { front: "Tired", back: "Zmęczony", example: "He is tired after the long journey.", exampleTransl: "On jest zmęczony po długiej podróży." },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          title: "B1 - Średniozaawansowany",
                          subItems: [
                            {
                              title: "Czasowniki regularne i nieregularne",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Work - Worked - Worked", translation: "Pracować", example: "I worked yesterday.", exampleTransl: "Wczoraj pracowałem." },
                                    { word: "Play - Played - Played", translation: "Grać", example: "We played football last weekend.", exampleTransl: "Graliśmy w piłkę nożną w zeszły weekend." },
                                    { word: "Go - Went - Gone", translation: "Iść", example: "She went to the park.", exampleTransl: "Ona poszła do parku." },
                                    { word: "Eat - Ate - Eaten", translation: "Jeść", example: "I have eaten lunch.", exampleTransl: "Zjadłem obiad." },
                                    { word: "Speak - Spoke - Spoken", translation: "Mówić", example: "He spoke with the manager.", exampleTransl: "On rozmawiał z kierownikiem." },
                                    { word: "Write - Wrote - Written", translation: "Pisać", example: "She has written a book.", exampleTransl: "Ona napisała książkę." },
                                    { word: "Buy - Bought - Bought", translation: "Kupować", example: "They bought a new car.", exampleTransl: "Oni kupili nowy samochód." },
                                    { word: "Run - Ran - Run", translation: "Biegać", example: "He ran 5 kilometers.", exampleTransl: "On przebiegł 5 kilometrów." },
                                    { word: "Study - Studied - Studied", translation: "Uczyć się", example: "I studied for the test.", exampleTransl: "Uczyłem się na test." },
                                    { word: "Take - Took - Taken", translation: "Brać", example: "She has taken her medicine.", exampleTransl: "Ona wzięła swoje lekarstwo." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak brzmi druga forma czasownika 'go'?", options: ["gone", "went", "going"], correctAnswer: "went" },
                                    { question: "Co znaczy 'study'?", options: ["Biegać", "Uczyć się", "Mówić"], correctAnswer: "Uczyć się" },
                                    { question: "Jak brzmi trzecia forma czasownika 'write'?", options: ["wrote", "written", "writing"], correctAnswer: "written" },
                                    { question: "Jak powiedzieć 'Ona poszła do parku'?", options: ["She went to the park.", "She go to the park.", "She gone to the park."], correctAnswer: "She went to the park." },
                                    { question: "Co znaczy 'eat'?", options: ["Jeść", "Pisać", "Brać"], correctAnswer: "Jeść" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: He ___ a book last year.", options: ["write", "wrote", "written"], correctAnswer: "wrote" },
                                    { question: "Jak powiedzieć 'Oni kupili nowy samochód'?", options: ["They buy a new car.", "They bought a new car.", "They have buying a new car."], correctAnswer: "They bought a new car." },
                                    { question: "Jak brzmi druga forma czasownika 'run'?", options: ["ran", "run", "runned"], correctAnswer: "ran" },
                                    { question: "Uzupełnij: I ___ lunch today.", options: ["eat", "ate", "eaten"], correctAnswer: "ate" },
                                    { question: "Co znaczy 'spoken'?", options: ["Mówił", "Napisał", "Uczył się"], correctAnswer: "Mówił" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Go - Went - Gone", back: "Iść - Poszedł - Poszedł/Poszło", example: "I went to the store.", exampleTransl: "Poszedłem do sklepu." },
                                    { front: "Eat - Ate - Eaten", back: "Jeść - Jadł - Zjedzony", example: "He has eaten the cake.", exampleTransl: "On zjadł ciasto." },
                                    { front: "Buy - Bought - Bought", back: "Kupować - Kupił - Kupił", example: "She bought a new dress.", exampleTransl: "Ona kupiła nową sukienkę." },
                                    { front: "Speak - Spoke - Spoken", back: "Mówić - Mówił - Powiedziany", example: "I have spoken to her.", exampleTransl: "Rozmawiałem z nią." },
                                    { front: "Write - Wrote - Written", back: "Pisać - Pisał - Napisany", example: "She wrote an amazing letter.", exampleTransl: "Ona napisała niesamowity list." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czasowniki regularne i nieregularne – część 2",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Begin - Began - Begun", translation: "Zaczynać", example: "They began the meeting at 10 AM.", exampleTransl: "Zaczęli spotkanie o 10 rano." },
                                    { word: "Break - Broke - Broken", translation: "Łamać", example: "He broke his phone yesterday.", exampleTransl: "Wczoraj zepsuł telefon." },
                                    { word: "Choose - Chose - Chosen", translation: "Wybierać", example: "I have chosen the blue shirt.", exampleTransl: "Wybrałem niebieską koszulę." },
                                    { word: "Drink - Drank - Drunk", translation: "Pić", example: "She drank a cup of coffee.", exampleTransl: "Wypiła filiżankę kawy." },
                                    { word: "Drive - Drove - Driven", translation: "Prowadzić (pojazd)", example: "He drove to work this morning.", exampleTransl: "On pojechał do pracy dziś rano." },
                                    { word: "Forget - Forgot - Forgotten", translation: "Zapominać", example: "I forgot my keys at home.", exampleTransl: "Zostawiłem klucze w domu." },
                                    { word: "Give - Gave - Given", translation: "Dawać", example: "She gave me a present.", exampleTransl: "Ona dała mi prezent." },
                                    { word: "Know - Knew - Known", translation: "Wiedzieć/Znać", example: "I knew the answer.", exampleTransl: "Znałem odpowiedź." },
                                    { word: "See - Saw - Seen", translation: "Widzieć", example: "We saw a beautiful sunset.", exampleTransl: "Widzieliśmy piękny zachód słońca." },
                                    { word: "Think - Thought - Thought", translation: "Myśleć", example: "I thought it was a good idea.", exampleTransl: "Myślałem, że to dobry pomysł." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak brzmi druga forma czasownika 'begin'?", options: ["begun", "began", "begin"], correctAnswer: "began" },
                                    { question: "Co znaczy 'break'?", options: ["Łamać", "Myśleć", "Zapominać"], correctAnswer: "Łamać" },
                                    { question: "Jak brzmi trzecia forma czasownika 'choose'?", options: ["chose", "choose", "chosen"], correctAnswer: "chosen" },
                                    { question: "Jak powiedzieć 'Ona wypiła kawę'?", options: ["She drank coffee.", "She drunk coffee.", "She drinks coffee."], correctAnswer: "She drank coffee." },
                                    { question: "Co znaczy 'drive'?", options: ["Prowadzić", "Widzieć", "Myśleć"], correctAnswer: "Prowadzić" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: He ___ a beautiful sunset.", options: ["see", "saw", "seen"], correctAnswer: "saw" },
                                    { question: "Jak powiedzieć 'Znałem odpowiedź'?", options: ["I knew the answer.", "I know the answer.", "I known the answer."], correctAnswer: "I knew the answer." },
                                    { question: "Jak brzmi druga forma czasownika 'give'?", options: ["gave", "given", "give"], correctAnswer: "gave" },
                                    { question: "Uzupełnij: She has ___ her homework.", options: ["forgot", "forgotten", "forget"], correctAnswer: "forgotten" },
                                    { question: "Co znaczy 'thought'?", options: ["Myślał", "Wiedział", "Widziała"], correctAnswer: "Myślał" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Begin - Began - Begun", back: "Zaczynać - Zaczął - Zaczęty", example: "I have begun a new project.", exampleTransl: "Rozpocząłem nowy projekt." },
                                    { front: "Break - Broke - Broken", back: "Łamać - Złamał - Złamany", example: "He has broken his arm.", exampleTransl: "On złamał rękę." },
                                    { front: "Choose - Chose - Chosen", back: "Wybierać - Wybrał - Wybrany", example: "They chose the best option.", exampleTransl: "Wybrali najlepszą opcję." },
                                    { front: "Drink - Drank - Drunk", back: "Pić - Pił - Wypity", example: "I have drunk too much coffee.", exampleTransl: "Wypiłem za dużo kawy." },
                                    { front: "Think - Thought - Thought", back: "Myśleć - Myślał - Myślany", example: "She thought about the problem.", exampleTransl: "Ona myślała o problemie." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czasowniki regularne i nieregularne – część 3",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Become - Became - Become", translation: "Stać się", example: "He became a doctor last year.", exampleTransl: "On został lekarzem w zeszłym roku." },
                                    { word: "Build - Built - Built", translation: "Budować", example: "They built a new house.", exampleTransl: "Zbudowali nowy dom." },
                                    { word: "Catch - Caught - Caught", translation: "Łapać", example: "She caught the ball.", exampleTransl: "Złapała piłkę." },
                                    { word: "Feel - Felt - Felt", translation: "Czuć", example: "I felt very tired yesterday.", exampleTransl: "Czułem się bardzo zmęczony wczoraj." },
                                    { word: "Find - Found - Found", translation: "Znajdować", example: "I found my lost keys.", exampleTransl: "Znalazłem zgubione klucze." },
                                    { word: "Get - Got - Gotten", translation: "Dostawać/Otrzymywać", example: "She has gotten a promotion.", exampleTransl: "Ona dostała awans." },
                                    { word: "Keep - Kept - Kept", translation: "Trzymać", example: "He kept his promise.", exampleTransl: "On dotrzymał obietnicy." },
                                    { word: "Learn - Learnt - Learnt", translation: "Uczyć się", example: "We learnt a lot in this class.", exampleTransl: "Nauczyliśmy się dużo na tych zajęciach." },
                                    { word: "Meet - Met - Met", translation: "Spotykać", example: "I met my friend yesterday.", exampleTransl: "Wczoraj spotkałem swojego przyjaciela." },
                                    { word: "Send - Sent - Sent", translation: "Wysyłać", example: "He sent me an email.", exampleTransl: "On wysłał mi e-mail." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak brzmi druga forma czasownika 'become'?", options: ["become", "became", "becoming"], correctAnswer: "became" },
                                    { question: "Co znaczy 'build'?", options: ["Budować", "Znajdować", "Trzymać"], correctAnswer: "Budować" },
                                    { question: "Jak brzmi trzecia forma czasownika 'catch'?", options: ["caught", "catch", "catched"], correctAnswer: "caught" },
                                    { question: "Jak powiedzieć 'On wysłał mi wiadomość'?", options: ["He sent me a message.", "He send me a message.", "He sended me a message."], correctAnswer: "He sent me a message." },
                                    { question: "Co znaczy 'keep'?", options: ["Trzymać", "Czuć", "Otrzymywać"], correctAnswer: "Trzymać" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: She ___ a new friend at the event.", options: ["meet", "met", "meeted"], correctAnswer: "met" },
                                    { question: "Jak powiedzieć 'Znalazłem klucze'?", options: ["I find the keys.", "I found the keys.", "I finding the keys."], correctAnswer: "I found the keys." },
                                    { question: "Jak brzmi druga forma czasownika 'learn'?", options: ["learnt", "learned", "learning"], correctAnswer: "learnt" },
                                    { question: "Uzupełnij: He ___ his promise.", options: ["keep", "kept", "keeping"], correctAnswer: "kept" },
                                    { question: "Co znaczy 'felt'?", options: ["Czuł", "Budował", "Otrzymał"], correctAnswer: "Czuł" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Become - Became - Become", back: "Stać się - Stał się - Stał się", example: "She became a teacher.", exampleTransl: "Ona została nauczycielką." },
                                    { front: "Build - Built - Built", back: "Budować - Zbudował - Zbudowany", example: "They have built a bridge.", exampleTransl: "Zbudowali most." },
                                    { front: "Catch - Caught - Caught", back: "Łapać - Złapał - Złapany", example: "I caught the train.", exampleTransl: "Złapałem pociąg." },
                                    { front: "Feel - Felt - Felt", back: "Czuć - Czuł - Poczuty", example: "I felt happy yesterday.", exampleTransl: "Czułem się szczęśliwy wczoraj." },
                                    { front: "Send - Sent - Sent", back: "Wysyłać - Wysłał - Wysłany", example: "She sent me a postcard.", exampleTransl: "Ona wysłała mi pocztówkę." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Stopniowanie przymiotników",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Big - Bigger - The Biggest", translation: "Duży - Większy - Największy", example: "This house is bigger than mine.", exampleTransl: "Ten dom jest większy niż mój." },
                                    { word: "Small - Smaller - The Smallest", translation: "Mały - Mniejszy - Najmniejszy", example: "That car is the smallest here.", exampleTransl: "Tamten samochód jest najmniejszy tutaj." },
                                    { word: "Fast - Faster - The Fastest", translation: "Szybki - Szybszy - Najszybszy", example: "This train is faster than a bus.", exampleTransl: "Ten pociąg jest szybszy niż autobus." },
                                    { word: "Beautiful - More Beautiful - The Most Beautiful", translation: "Piękny - Piękniejszy - Najpiękniejszy", example: "This is the most beautiful place I’ve seen.", exampleTransl: "To jest najpiękniejsze miejsce, jakie widziałem." },
                                    { word: "Comfortable - More Comfortable - The Most Comfortable", translation: "Wygodny - Wygodniejszy - Najwygodniejszy", example: "This sofa is more comfortable than the chair.", exampleTransl: "Ta sofa jest wygodniejsza niż krzesło." },
                                    { word: "Hot - Hotter - The Hottest", translation: "Gorący - Gorętszy - Najgorętszy", example: "Today is the hottest day of the year.", exampleTransl: "Dzisiaj jest najgorętszy dzień roku." },
                                    { word: "Cold - Colder - The Coldest", translation: "Zimny - Zimniejszy - Najzimniejszy", example: "Winter is colder than autumn.", exampleTransl: "Zima jest zimniejsza niż jesień." },
                                    { word: "Interesting - More Interesting - The Most Interesting", translation: "Ciekawy - Ciekawszy - Najciekawszy", example: "This book is more interesting than the last one.", exampleTransl: "Ta książka jest ciekawsza niż poprzednia." },
                                    { word: "Expensive - More Expensive - The Most Expensive", translation: "Drogi - Droższy - Najdroższy", example: "This car is the most expensive here.", exampleTransl: "Ten samochód jest tutaj najdroższy." },
                                    { word: "Good - Better - The Best", translation: "Dobry - Lepszy - Najlepszy", example: "This is the best pizza in town.", exampleTransl: "To jest najlepsza pizza w mieście." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak brzmi stopień wyższy przymiotnika 'big'?", options: ["bigger", "biggest", "more big"], correctAnswer: "bigger" },
                                    { question: "Co znaczy 'the most beautiful'?", options: ["Najpiękniejszy", "Piękniejszy", "Piękny"], correctAnswer: "Najpiękniejszy" },
                                    { question: "Jak powiedzieć 'zimniejszy' po angielsku?", options: ["colder", "coldest", "more cold"], correctAnswer: "colder" },
                                    { question: "Jak brzmi stopień najwyższy przymiotnika 'fast'?", options: ["the fastest", "faster", "fastest"], correctAnswer: "the fastest" },
                                    { question: "Co znaczy 'better'?", options: ["Lepszy", "Dobry", "Najlepszy"], correctAnswer: "Lepszy" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: This house is ___ than ours.", options: ["bigger", "biggest", "big"], correctAnswer: "bigger" },
                                    { question: "Jak powiedzieć 'najwygodniejszy' po angielsku?", options: ["the most comfortable", "more comfortable", "comfortable"], correctAnswer: "the most comfortable" },
                                    { question: "Co znaczy 'hotter'?", options: ["Gorętszy", "Gorący", "Najgorętszy"], correctAnswer: "Gorętszy" },
                                    { question: "Uzupełnij: This book is ___ interesting than the last one.", options: ["more", "most", "more interesting"], correctAnswer: "more interesting" },
                                    { question: "Jak brzmi stopień najwyższy przymiotnika 'good'?", options: ["the best", "better", "the most good"], correctAnswer: "the best" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Big - Bigger - The Biggest", back: "Duży - Większy - Największy", example: "This car is the biggest in the showroom.", exampleTransl: "Ten samochód jest największy w salonie." },
                                    { front: "Comfortable - More Comfortable - The Most Comfortable", back: "Wygodny - Wygodniejszy - Najwygodniejszy", example: "This bed is the most comfortable one.", exampleTransl: "To łóżko jest najwygodniejsze." },
                                    { front: "Hot - Hotter - The Hottest", back: "Gorący - Gorętszy - Najgorętszy", example: "Today is hotter than yesterday.", exampleTransl: "Dzisiaj jest gorętszy dzień niż wczoraj." },
                                    { front: "Beautiful - More Beautiful - The Most Beautiful", back: "Piękny - Piękniejszy - Najpiękniejszy", example: "The sunset is the most beautiful at the beach.", exampleTransl: "Zachód słońca jest najpiękniejszy na plaży." },
                                    { front: "Good - Better - The Best", back: "Dobry - Lepszy - Najlepszy", example: "This is the best decision we could make.", exampleTransl: "To jest najlepsza decyzja, jaką mogliśmy podjąć." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Przymiotniki nieregularne",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Good - Better - The Best", translation: "Dobry - Lepszy - Najlepszy", example: "She is the best student in the class.", exampleTransl: "Ona jest najlepszą uczennicą w klasie." },
                                    { word: "Bad - Worse - The Worst", translation: "Zły - Gorszy - Najgorszy", example: "This is the worst movie I’ve ever seen.", exampleTransl: "To jest najgorszy film, jaki widziałem." },
                                    { word: "Far - Farther - The Farthest", translation: "Daleki - Dalszy - Najdalszy", example: "He lives farther from the school.", exampleTransl: "On mieszka dalej od szkoły." },
                                    { word: "Far - Further - The Furthest", translation: "Daleko (abstrakcyjnie) - Dalszy - Najdalszy", example: "Let's discuss this further tomorrow.", exampleTransl: "Omówmy to szerzej jutro." },
                                    { word: "Little - Less - The Least", translation: "Mało - Mniej - Najmniej", example: "I have less time than you.", exampleTransl: "Mam mniej czasu niż ty." },
                                    { word: "Many - More - The Most", translation: "Wiele - Więcej - Najwięcej", example: "She has the most friends in her class.", exampleTransl: "Ona ma najwięcej przyjaciół w klasie." },
                                    { word: "Much - More - The Most", translation: "Dużo - Więcej - Najwięcej", example: "I need more information.", exampleTransl: "Potrzebuję więcej informacji." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak brzmi stopień wyższy przymiotnika 'good'?", options: ["better", "best", "gooder"], correctAnswer: "better" },
                                    { question: "Co znaczy 'worse'?", options: ["Gorszy", "Najgorszy", "Zły"], correctAnswer: "Gorszy" },
                                    { question: "Jak powiedzieć 'najmniej' po angielsku?", options: ["least", "less", "little"], correctAnswer: "least" },
                                    { question: "Jak brzmi stopień najwyższy przymiotnika 'far' w znaczeniu dosłownym?", options: ["the farthest", "the furthest", "the farther"], correctAnswer: "the farthest" },
                                    { question: "Co znaczy 'more'?", options: ["Więcej", "Najwięcej", "Mniej"], correctAnswer: "Więcej" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: This is ___ than the last one.", options: ["better", "best", "good"], correctAnswer: "better" },
                                    { question: "Jak powiedzieć 'najgorszy' po angielsku?", options: ["the worst", "worse", "bad"], correctAnswer: "the worst" },
                                    { question: "Co oznacza 'the least'?", options: ["Najmniej", "Mniej", "Mało"], correctAnswer: "Najmniej" },
                                    { question: "Uzupełnij: I need ___ help with this task.", options: ["more", "most", "much"], correctAnswer: "more" },
                                    { question: "Jak brzmi stopień najwyższy przymiotnika 'far' w znaczeniu abstrakcyjnym?", options: ["the furthest", "the farthest", "the farther"], correctAnswer: "the furthest" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Good - Better - The Best", back: "Dobry - Lepszy - Najlepszy", example: "This coffee is better than that one.", exampleTransl: "Ta kawa jest lepsza niż tamta." },
                                    { front: "Bad - Worse - The Worst", back: "Zły - Gorszy - Najgorszy", example: "This weather is worse than yesterday.", exampleTransl: "Ta pogoda jest gorsza niż wczoraj." },
                                    { front: "Far - Farther - The Farthest", back: "Daleki - Dalszy - Najdalszy", example: "The farthest planet is Neptune.", exampleTransl: "Najdalszą planetą jest Neptun." },
                                    { front: "Little - Less - The Least", back: "Mało - Mniej - Najmniej", example: "I spent the least money on this trip.", exampleTransl: "Wydałem najmniej pieniędzy na tej wycieczce." },
                                    { front: "Much/Many - More - The Most", back: "Dużo/Wiele - Więcej - Najwięcej", example: "She has the most books in her collection.", exampleTransl: "Ona ma najwięcej książek w swojej kolekcji." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czas Present Simple",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "I work", translation: "Ja pracuję", example: "I work every day.", exampleTransl: "Pracuję codziennie." },
                                    { word: "She works", translation: "Ona pracuje", example: "She works in a hospital.", exampleTransl: "Ona pracuje w szpitalu." },
                                    { word: "Do you play?", translation: "Czy grasz?", example: "Do you play football?", exampleTransl: "Czy grasz w piłkę nożną?" },
                                    { word: "He doesn't like", translation: "On nie lubi", example: "He doesn't like coffee.", exampleTransl: "On nie lubi kawy." },
                                    { word: "They read", translation: "Oni czytają", example: "They read books in the evening.", exampleTransl: "Oni czytają książki wieczorem." },
                                    { word: "We don't watch TV", translation: "My nie oglądamy telewizji", example: "We don't watch TV at night.", exampleTransl: "Nie oglądamy telewizji w nocy." },
                                    { word: "Does she sing?", translation: "Czy ona śpiewa?", example: "Does she sing in the choir?", exampleTransl: "Czy ona śpiewa w chórze?" },
                                    { word: "I don't like chocolate", translation: "Nie lubię czekolady", example: "I don't like chocolate, but I love ice cream.", exampleTransl: "Nie lubię czekolady, ale uwielbiam lody." },
                                    { word: "You study", translation: "Ty uczysz się", example: "You study English twice a week.", exampleTransl: "Uczysz się angielskiego dwa razy w tygodniu." },
                                    { word: "Does he work here?", translation: "Czy on tu pracuje?", example: "Does he work here?", exampleTransl: "Czy on tu pracuje?" }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Czy ona pracuje?'?", options: ["Does she work?", "Does she works?", "Do she work?"], correctAnswer: "Does she work?" },
                                    { question: "Uzupełnij: I ___ (go) to school every day.", options: ["go", "goes", "going"], correctAnswer: "go" },
                                    { question: "Jak powiedzieć 'On nie lubi kawy'?", options: ["He doesn't like coffee.", "He don't like coffee.", "He likes coffee."], correctAnswer: "He doesn't like coffee." },
                                    { question: "Co znaczy 'Do you play football?'?", options: ["Czy grasz w piłkę nożną?", "Ty grasz w piłkę nożną.", "Grasz w piłkę nożną."], correctAnswer: "Czy grasz w piłkę nożną?" },
                                    { question: "Jak powiedzieć 'Nie oglądamy telewizji w nocy'?", options: ["We don't watch TV at night.", "We not watch TV at night.", "We no watch TV at night."], correctAnswer: "We don't watch TV at night." },
                                    { question: "Uzupełnij: Does he ___ (sing) in the choir?", options: ["sing", "sings", "singing"], correctAnswer: "sing" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: She ___ (work) every day.", options: ["works", "work", "working"], correctAnswer: "works" },
                                    { question: "Jak zapytasz 'Czy oni czytają książki?'?", options: ["Do they read books?", "Does they read books?", "Are they reading books?"], correctAnswer: "Do they read books?" },
                                    { question: "Co znaczy 'He doesn't like coffee'?", options: ["On nie lubi kawy.", "On lubi kawę.", "Czy on lubi kawę?"], correctAnswer: "On nie lubi kawy." },
                                    { question: "Uzupełnij: We ___ (study) English twice a week.", options: ["study", "studies", "studying"], correctAnswer: "study" },
                                    { question: "Uzupełnij: I ___ (not like) chocolate.", options: ["don't like", "not like", "doesn't like"], correctAnswer: "don't like" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "I work", back: "Ja pracuję", example: "I work from 9 to 5.", exampleTransl: "Pracuję od 9 do 17." },
                                    { front: "She works", back: "Ona pracuje", example: "She works as a teacher.", exampleTransl: "Ona pracuje jako nauczycielka." },
                                    { front: "Do you play?", back: "Czy grasz?", example: "Do you play any musical instruments?", exampleTransl: "Czy grasz na jakimś instrumencie muzycznym?" },
                                    { front: "He doesn't like", back: "On nie lubi", example: "He doesn't like cold weather.", exampleTransl: "On nie lubi zimnej pogody." },
                                    { front: "We don't watch TV", back: "My nie oglądamy telewizji", example: "We don't watch TV in the morning.", exampleTransl: "Nie oglądamy telewizji rano." },
                                    { front: "Does she sing?", back: "Czy ona śpiewa?", example: "Does she sing at weddings?", exampleTransl: "Czy ona śpiewa na weselach?" }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czas Past Simple",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "I went", translation: "Poszedłem", example: "I went to the park yesterday.", exampleTransl: "Poszedłem wczoraj do parku." },
                                    { word: "She saw", translation: "Ona zobaczyła", example: "She saw a beautiful bird.", exampleTransl: "Ona zobaczyła pięknego ptaka." },
                                    { word: "Did you watch?", translation: "Czy oglądałeś?", example: "Did you watch the movie?", exampleTransl: "Czy oglądałeś film?" },
                                    { word: "They didn't like", translation: "Oni nie lubili", example: "They didn't like the food.", exampleTransl: "Oni nie lubili tego jedzenia." },
                                    { word: "We played", translation: "My graliśmy", example: "We played football after school.", exampleTransl: "Graliśmy w piłkę po szkole." },
                                    { word: "I didn't understand", translation: "Nie zrozumiałem", example: "I didn't understand the lesson.", exampleTransl: "Nie zrozumiałem lekcji." },
                                    { word: "Did he help?", translation: "Czy on pomógł?", example: "Did he help you with homework?", exampleTransl: "Czy on pomógł ci z pracą domową?" },
                                    { word: "She didn't call", translation: "Ona nie zadzwoniła", example: "She didn't call me last night.", exampleTransl: "Ona nie zadzwoniła do mnie zeszłej nocy." },
                                    { word: "We went", translation: "Poszliśmy", example: "We went to the cinema yesterday.", exampleTransl: "Poszliśmy do kina wczoraj." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Czy ona zobaczyła ptaka?'?", options: ["Did she see a bird?", "Did she saw a bird?", "She saw a bird?"], correctAnswer: "Did she see a bird?" },
                                    { question: "Uzupełnij: I ___ (go) to the park yesterday.", options: ["went", "go", "gone"], correctAnswer: "went" },
                                    { question: "Jak powiedzieć 'Oni nie lubili jedzenia'?", options: ["They didn't like the food.", "They don't like the food.", "They liked the food."], correctAnswer: "They didn't like the food." },
                                    { question: "Co znaczy 'Did you watch the movie?'?", options: ["Czy oglądałeś film?", "Ty oglądałeś film.", "Oglądałeś film?"], correctAnswer: "Czy oglądałeś film?" },
                                    { question: "Uzupełnij: We ___ (play) football after school.", options: ["played", "play", "playing"], correctAnswer: "played" },
                                    { question: "Jak powiedzieć 'Ona nie zadzwoniła do mnie zeszłej nocy'?", options: ["She didn't call me last night.", "She didn't called me last night.", "She calls me last night."], correctAnswer: "She didn't call me last night." },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: She ___ (see) a beautiful bird.", options: ["saw", "see", "seen"], correctAnswer: "saw" },
                                    { question: "Jak zapytasz 'Czy oglądałeś film?'?", options: ["Did you watch the movie?", "Do you watch the movie?", "Have you watched the movie?"], correctAnswer: "Did you watch the movie?" },
                                    { question: "Co oznacza 'They didn't like the food'?", options: ["Oni nie lubili jedzenia.", "Oni lubili jedzenie.", "Oni nie zjedli jedzenia."], correctAnswer: "Oni nie lubili jedzenia." },
                                    { question: "Uzupełnij: We ___ (go) to the park yesterday.", options: ["went", "go", "gone"], correctAnswer: "went" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "I went", back: "Poszedłem", example: "I went to the store.", exampleTransl: "Poszedłem do sklepu." },
                                    { front: "Did you watch?", back: "Czy oglądałeś?", example: "Did you watch the game last night?", exampleTransl: "Czy oglądałeś mecz zeszłej nocy?" },
                                    { front: "They didn't like", back: "Oni nie lubili", example: "They didn't like the movie.", exampleTransl: "Oni nie lubili tego filmu." },
                                    { front: "We played", back: "My graliśmy", example: "We played tennis last weekend.", exampleTransl: "Graliśmy w tenisa w zeszły weekend." },
                                    { front: "She didn't call", back: "Ona nie zadzwoniła", example: "She didn't call me this morning.", exampleTransl: "Ona nie zadzwoniła do mnie tego ranka." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czas Future Simple",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "I will work", translation: "Będę pracować", example: "I will work tomorrow.", exampleTransl: "Będę pracować jutro." },
                                    { word: "She will help", translation: "Ona pomoże", example: "She will help you with the homework.", exampleTransl: "Ona pomoże ci w zadaniu domowym." },
                                    { word: "Will you go?", translation: "Czy pójdziesz?", example: "Will you go to the party?", exampleTransl: "Czy pójdziesz na imprezę?" },
                                    { word: "He won't come", translation: "On nie przyjdzie", example: "He won't come to the meeting tomorrow.", exampleTransl: "On nie przyjdzie na spotkanie jutro." },
                                    { word: "They will play", translation: "Oni będą grać", example: "They will play football after school.", exampleTransl: "Oni będą grać w piłkę po szkole." },
                                    { word: "I won't stay", translation: "Nie zostanę", example: "I won't stay for long.", exampleTransl: "Nie zostanę na długo." },
                                    { word: "Will she call?", translation: "Czy ona zadzwoni?", example: "Will she call you later?", exampleTransl: "Czy ona zadzwoni do ciebie później?" },
                                    { word: "We will travel", translation: "Będziemy podróżować", example: "We will travel to Italy next year.", exampleTransl: "Będziemy podróżować do Włoch w przyszłym roku." },
                                    { word: "They won't wait", translation: "Oni nie będą czekać", example: "They won't wait for us.", exampleTransl: "Oni nie będą na nas czekać." },
                                    { word: "You will succeed", translation: "Odniesiesz sukces", example: "You will succeed if you try.", exampleTransl: "Odniesiesz sukces, jeśli spróbujesz." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Czy ona zadzwoni?'?", options: ["Will she call?", "Does she call?", "Is she calling?"], correctAnswer: "Will she call?" },
                                    { question: "Uzupełnij: I ___ (work) tomorrow.", options: ["will work", "works", "worked"], correctAnswer: "will work" },
                                    { question: "Jak powiedzieć 'Oni nie będą czekać'?", options: ["They won't wait.", "They don't wait.", "They didn't wait."], correctAnswer: "They won't wait." },
                                    { question: "Co znaczy 'Will you go to the party?'?", options: ["Czy pójdziesz na imprezę?", "Pójdziesz na imprezę.", "Pójdziecie na imprezę?"], correctAnswer: "Czy pójdziesz na imprezę?" },
                                    { question: "Uzupełnij: He ___ (not come) to the meeting tomorrow.", options: ["won't come", "doesn't come", "didn't come"], correctAnswer: "won't come" },
                                    { question: "Jak powiedzieć 'Ona pomoże ci w zadaniu domowym'?", options: ["She will help you with the homework.", "She helps you with the homework.", "She is helping you with the homework."], correctAnswer: "She will help you with the homework." },
                                    { question: "Uzupełnij: They ___ (play) football tomorrow.", options: ["will play", "play", "played"], correctAnswer: "will play" },
                                    { question: "Co znaczy 'I won't stay for long'?", options: ["Nie zostanę na długo.", "Zostanę na długo.", "Nie chcę zostać."], correctAnswer: "Nie zostanę na długo." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: She ___ (call) you later.", options: ["will call", "calls", "calling"], correctAnswer: "will call" },
                                    { question: "Jak zapytasz 'Czy on przyjdzie?'?", options: ["Will he come?", "Does he come?", "Is he coming?"], correctAnswer: "Will he come?" },
                                    { question: "Co oznacza 'We will travel to Italy next year'?", options: ["Będziemy podróżować do Włoch w przyszłym roku.", "Podróżowaliśmy do Włoch w przyszłym roku.", "Podróżujemy do Włoch w przyszłym roku."], correctAnswer: "Będziemy podróżować do Włoch w przyszłym roku." },
                                    { question: "Uzupełnij: I ___ (not go) to the park tomorrow.", options: ["won't go", "not go", "don't go"], correctAnswer: "won't go" },
                                    { question: "Jak powiedzieć 'Czy odniesiesz sukces?'?", options: ["Will you succeed?", "Do you succeed?", "Are you succeeding?"], correctAnswer: "Will you succeed?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "I will work", back: "Będę pracować", example: "I will work in the office tomorrow.", exampleTransl: "Będę pracować w biurze jutro." },
                                    { front: "Will she call?", back: "Czy ona zadzwoni?", example: "Will she call me tomorrow?", exampleTransl: "Czy ona zadzwoni do mnie jutro?" },
                                    { front: "They won't wait", back: "Oni nie będą czekać", example: "They won't wait for the bus.", exampleTransl: "Oni nie będą czekać na autobus." },
                                    { front: "You will succeed", back: "Odniesiesz sukces", example: "You will succeed if you study hard.", exampleTransl: "Odniesiesz sukces, jeśli będziesz się ciężko uczyć." },
                                    { front: "We will travel", back: "Będziemy podróżować", example: "We will travel by train to Paris.", exampleTransl: "Będziemy podróżować pociągiem do Paryża." }
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      {
                        title: "B2 - Średniozaawansowany wyższy",
                        subItems: [
                          {
                            title: "Użycie trybu warunkowego (Conditionals)",
                            isCompleted: false,
                            started: false,
                            currentStage: 1,
                            stages: [
                              {
                                stage: 1,
                                type: "Słownictwo",
                                content: [
                                  { word: "If I were you", translation: "Gdybym był tobą", example: "If I were you, I would apologize.", exampleTransl: "Gdybym był tobą, przeprosiłbym." },
                                  { word: "Unless", translation: "Jeśli nie", example: "We won’t succeed unless we work together.", exampleTransl: "Nie odniesiemy sukcesu, jeśli nie będziemy współpracować." },
                                  { word: "Provided that", translation: "Pod warunkiem, że", example: "You can borrow the car provided that you return it by 6 PM.", exampleTransl: "Możesz pożyczyć samochód pod warunkiem, że zwrócisz go przed 18:00." },
                                  { word: "As long as", translation: "Tak długo, jak", example: "You can stay as long as you behave.", exampleTransl: "Możesz zostać, tak długo, jak będziesz się dobrze zachowywać." },
                                  { word: "If only", translation: "Gdyby tylko", example: "If only I hadn’t forgotten her birthday.", exampleTransl: "Gdybym tylko nie zapomniał o jej urodzinach." },
                                  { word: "Even if", translation: "Nawet jeśli", example: "Even if it rains, we’ll still go hiking.", exampleTransl: "Nawet jeśli będzie padać, wciąż pójdziemy na wędrówkę." },
                                  { word: "In case", translation: "Na wypadek gdyby", example: "Take an umbrella in case it rains.", exampleTransl: "Weź parasol, na wypadek gdyby padało." }
                                ],
                              },
                              {
                                stage: 2,
                                type: "Ćwiczenie",
                                content: [
                                  { question: "Jak powiedzieć 'Pod warunkiem, że skończysz zadanie'?", options: ["Provided that you finish the task.", "If only you finish the task.", "Unless you finish the task."], correctAnswer: "Provided that you finish the task." },
                                  { question: "Uzupełnij: If I ___ (be) you, I would explain everything.", options: ["were", "am", "was"], correctAnswer: "were" },
                                  { question: "Jak przetłumaczyć 'Nie odniesiesz sukcesu, jeśli nie będziesz pracować ciężko'?", options: ["You won’t succeed unless you work hard.", "You won’t succeed if you work hard.", "You will succeed unless you work hard."], correctAnswer: "You won’t succeed unless you work hard." },
                                  { question: "Uzupełnij: I will take my coat ___ it gets cold.", options: ["in case", "if only", "unless"], correctAnswer: "in case" },
                                  { question: "Jak powiedzieć 'Gdyby tylko wiedział o spotkaniu'?", options: ["If only he knew about the meeting.", "Unless he knew about the meeting.", "Provided he knew about the meeting."], correctAnswer: "If only he knew about the meeting." },
                                  { question: "Uzupełnij: Even if it ___ (snow), we’ll go skiing.", options: ["snows", "snowed", "will snow"], correctAnswer: "snows" }
                                ],
                              },
                              {
                                stage: 3,
                                type: "Quiz",
                                content: [
                                  { question: "Uzupełnij: You ___ (pass) the test if you study hard.", options: ["will pass", "pass", "passed"], correctAnswer: "will pass" },
                                  { question: "Co oznacza 'Even if it rains, we’ll still go hiking'?", options: ["Nawet jeśli będzie padać, wciąż pójdziemy na wędrówkę.", "Jeśli będzie padać, pójdziemy na wędrówkę.", "Nie pójdziemy na wędrówkę, jeśli będzie padać."], correctAnswer: "Nawet jeśli będzie padać, wciąż pójdziemy na wędrówkę." },
                                  { question: "Uzupełnij: If only I ___ (know) the answer, I would have told you.", options: ["had known", "knew", "know"], correctAnswer: "had known" },
                                  { question: "Jak powiedzieć 'Nie pójdę na spacer, jeśli będzie zimno'?", options: ["I won’t go for a walk if it’s cold.", "I will go for a walk unless it’s cold.", "I won’t go for a walk unless it’s cold."], correctAnswer: "I won’t go for a walk if it’s cold." }
                                ],
                              },
                              {
                                stage: 4,
                                type: "Fiszki",
                                content: [
                                  { front: "If I were you", back: "Gdybym był tobą", example: "If I were you, I would call her now.", exampleTransl: "Gdybym był tobą, zadzwoniłbym do niej teraz." },
                                  { front: "Unless", back: "Jeśli nie", example: "You won’t pass unless you study.", exampleTransl: "Nie zdasz, jeśli się nie uczysz." },
                                  { front: "Provided that", back: "Pod warunkiem, że", example: "He can borrow my car provided that he returns it tomorrow.", exampleTransl: "Może pożyczyć mój samochód, pod warunkiem, że zwróci go jutro." },
                                  { front: "Even if", back: "Nawet jeśli", example: "Even if she invites me, I won’t go.", exampleTransl: "Nawet jeśli mnie zaprosi, nie pójdę." },
                                  { front: "If only", back: "Gdyby tylko", example: "If only he had listened to me!", exampleTransl: "Gdyby tylko mnie posłuchał!" }
                                ],
                              },
                            ],
                          },
                          {
                            title: "Wyrażenia czasownikowe (Phrasal Verbs)",
                            isCompleted: false,
                            started: false,
                            currentStage: 1,
                            stages: [
                              {
                                stage: 1,
                                type: "Słownictwo",
                                content: [
                                  { word: "Give up", translation: "Poddać się", example: "She gave up trying to solve the problem.", exampleTransl: "Ona poddała się próbom rozwiązania problemu." },
                                  { word: "Take off", translation: "Startować (o samolocie)", example: "The plane took off despite the bad weather.", exampleTransl: "Samolot wystartował pomimo złej pogody." },
                                  { word: "Look after", translation: "Opiekować się", example: "He looks after his younger sister.", exampleTransl: "On opiekuje się swoją młodszą siostrą." },
                                  { word: "Run out of", translation: "Zabraknąć", example: "We ran out of gas on the highway.", exampleTransl: "Zabrakło nam paliwa na autostradzie." },
                                  { word: "Get along with", translation: "Dogadywać się", example: "Do you get along with your colleagues?", exampleTransl: "Czy dogadujesz się ze swoimi kolegami z pracy?" },
                                  { word: "Turn down", translation: "Odrzucić", example: "She turned down the job offer.", exampleTransl: "Ona odrzuciła ofertę pracy." },
                                  { word: "Break down", translation: "Zepsuć się", example: "My car broke down on the way to work.", exampleTransl: "Mój samochód zepsuł się w drodze do pracy." },
                                  { word: "Pick up", translation: "Odebrać", example: "I’ll pick you up from the airport.", exampleTransl: "Odbiorę cię z lotniska." }
                                ],
                              },
                              {
                                stage: 2,
                                type: "Ćwiczenie",
                                content: [
                                  { question: "Co znaczy 'She gave up trying to solve the problem'?", options: ["Ona poddała się próbom rozwiązania problemu.", "Ona próbowała rozwiązać problem.", "Ona rozwiązała problem."], correctAnswer: "Ona poddała się próbom rozwiązania problemu." },
                                  { question: "Jak powiedzieć 'Zabrakło nam paliwa'?", options: ["We ran out of gas.", "We gave up gas.", "We turned down gas."], correctAnswer: "We ran out of gas." },
                                  { question: "Uzupełnij: The plane ___ (take off) at 8 PM.", options: ["took off", "takes off", "take off"], correctAnswer: "took off" },
                                  { question: "Jak powiedzieć 'Ona odrzuciła ofertę pracy'?", options: ["She turned down the job offer.", "She broke down the job offer.", "She gave up the job offer."], correctAnswer: "She turned down the job offer." }
                                ],
                              },
                              {
                                stage: 3,
                                type: "Quiz",
                                content: [
                                  { question: "Uzupełnij: I ___ (get along) with my boss.", options: ["get along", "got along", "get alongs"], correctAnswer: "get along" },
                                  { question: "Jak powiedzieć 'Nie poddawaj się'?", options: ["Don’t give up.", "Don’t run out.", "Don’t look after."], correctAnswer: "Don’t give up." },
                                  { question: "Co znaczy 'The plane took off'?", options: ["Samolot wystartował.", "Samolot wylądował.", "Samolot zatrzymał się."], correctAnswer: "Samolot wystartował." },
                                  { question: "Uzupełnij: My car ___ (break down) yesterday.", options: ["broke down", "breaks down", "breaking down"], correctAnswer: "broke down" }
                                ],
                              },
                              {
                                stage: 4,
                                type: "Fiszki",
                                content: [
                                  { front: "Give up", back: "Poddać się", example: "I never give up easily.", exampleTransl: "Nigdy nie poddaję się łatwo." },
                                  { front: "Run out of", back: "Zabraknąć", example: "We ran out of time during the exam.", exampleTransl: "Zabrakło nam czasu na egzaminie." },
                                  { front: "Turn down", back: "Odrzucić", example: "He turned down the invitation.", exampleTransl: "On odrzucił zaproszenie." },
                                  { front: "Pick up", back: "Odebrać", example: "Can you pick up the kids from school?", exampleTransl: "Czy możesz odebrać dzieci ze szkoły?" },
                                  { front: "Break down", back: "Zepsuć się", example: "The washing machine broke down last night.", exampleTransl: "Pralka zepsuła się zeszłej nocy." }
                                ],
                              },
                            ],
                          },
                          {
                            title: "Mowa zależna (Reported Speech)",
                            isCompleted: false,
                            started: false,
                            currentStage: 1,
                            stages: [
                              {
                                stage: 1,
                                type: "Słownictwo",
                                content: [
                                  { word: "She said (that)", translation: "Ona powiedziała (że)", example: "She said that she was happy.", exampleTransl: "Ona powiedziała, że jest szczęśliwa." },
                                  { word: "He told me (that)", translation: "On powiedział mi (że)", example: "He told me that he couldn’t come.", exampleTransl: "Powiedział mi, że nie mógł przyjść." },
                                  { word: "They asked if", translation: "Zapytali, czy", example: "They asked if I could help them.", exampleTransl: "Zapytali, czy mogę im pomóc." },
                                  { word: "She wanted to know", translation: "Ona chciała wiedzieć", example: "She wanted to know where I had been.", exampleTransl: "Chciała wiedzieć, gdzie byłem." },
                                  { word: "He said (that) he would", translation: "On powiedział (że) będzie", example: "He said that he would call me.", exampleTransl: "Powiedział, że do mnie zadzwoni." },
                                ],
                              },
                              {
                                stage: 2,
                                type: "Ćwiczenie",
                                content: [
                                  { question: "Jak przekształcić 'I am happy' na mowę zależną?", options: ["She said that she was happy.", "She said that she is happy.", "She says that she was happy."], correctAnswer: "She said that she was happy." },
                                  { question: "Jak powiedzieć 'Zapytali, czy mogę pomóc'?", options: ["They asked if I could help.", "They asked if I can help.", "They asked that I help."], correctAnswer: "They asked if I could help." },
                                  { question: "Uzupełnij: He told me ___ (że) he was busy.", options: ["that", "if", "whether"], correctAnswer: "that" },
                                  { question: "Jak przekształcić 'I will call you' na mowę zależną?", options: ["He said that he would call me.", "He said that he will call me.", "He said he calls me."], correctAnswer: "He said that he would call me." },
                                  { question: "Jak przekształcić 'Where are you?' na mowę zależną?", options: ["She wanted to know where I was.", "She wanted to know where am I.", "She wanted to know where I am."], correctAnswer: "She wanted to know where I was." }
                                ],
                              },
                              {
                                stage: 3,
                                type: "Quiz",
                                content: [
                                  { question: "Jak powiedzieć 'Zapytali, gdzie byłeś?'?", options: ["They asked where I had been.", "They asked where I was.", "They asked where had I been."], correctAnswer: "They asked where I had been." },
                                  { question: "Co oznacza 'He told me that he was busy'?", options: ["Powiedział mi, że był zajęty.", "Powiedział mi, że jest zajęty.", "Powiedział mi, że będzie zajęty."], correctAnswer: "Powiedział mi, że był zajęty." },
                                  { question: "Uzupełnij: She said ___ (że) she had finished her homework.", options: ["that", "if", "whether"], correctAnswer: "that" },
                                  { question: "Jak przekształcić 'Do you like pizza?' na mowę zależną?", options: ["She asked if I liked pizza.", "She asked do I like pizza.", "She asks if I like pizza."], correctAnswer: "She asked if I liked pizza." }
                                ],
                              },
                              {
                                stage: 4,
                                type: "Fiszki",
                                content: [
                                  { front: "She said (that)", back: "Ona powiedziała (że)", example: "She said that she was tired.", exampleTransl: "Ona powiedziała, że jest zmęczona." },
                                  { front: "He told me (that)", back: "On powiedział mi (że)", example: "He told me that he would be late.", exampleTransl: "Powiedział mi, że się spóźni." },
                                  { front: "They asked if", back: "Zapytali, czy", example: "They asked if I had seen the movie.", exampleTransl: "Zapytali, czy widziałem ten film." },
                                  { front: "She wanted to know", back: "Ona chciała wiedzieć", example: "She wanted to know why I left early.", exampleTransl: "Ona chciała wiedzieć, dlaczego wyszedłem wcześniej." }
                                ],
                              },
                            ],
                          },
                          {
                            title: "Czas Present Perfect",
                            isCompleted: false,
                            started: false,
                            currentStage: 1,
                            stages: [
                              {
                                stage: 1,
                                type: "Słownictwo",
                                content: [
                                  { word: "I have finished", translation: "Skończyłem", example: "I have finished my homework.", exampleTransl: "Skończyłem swoją pracę domową." },
                                  { word: "She has visited", translation: "Ona odwiedziła", example: "She has visited London twice.", exampleTransl: "Ona odwiedziła Londyn dwa razy." },
                                  { word: "Have you ever?", translation: "Czy kiedykolwiek?", example: "Have you ever been to Japan?", exampleTransl: "Czy kiedykolwiek byłeś w Japonii?" },
                                  { word: "They have just left", translation: "Oni właśnie wyszli", example: "They have just left the building.", exampleTransl: "Oni właśnie wyszli z budynku." },
                                  { word: "We haven’t seen", translation: "Nie widzieliśmy", example: "We haven’t seen her for a long time.", exampleTransl: "Nie widzieliśmy jej od dawna." },
                                  { word: "It has already started", translation: "To już się zaczęło", example: "The meeting has already started.", exampleTransl: "Spotkanie już się zaczęło." },
                                  { word: "She hasn’t finished", translation: "Ona nie skończyła", example: "She hasn’t finished her work yet.", exampleTransl: "Ona jeszcze nie skończyła swojej pracy." }
                                ],
                              },
                              {
                                stage: 2,
                                type: "Ćwiczenie",
                                content: [
                                  { question: "Jak powiedzieć 'Ona odwiedziła Londyn dwa razy'?", options: ["She has visited London twice.", "She visited London twice.", "She has been visiting London twice."], correctAnswer: "She has visited London twice." },
                                  { question: "Uzupełnij: I ___ (not see) this movie before.", options: ["haven’t seen", "didn’t see", "haven’t been seeing"], correctAnswer: "haven’t seen" },
                                  { question: "Co znaczy 'They have just left the building'?", options: ["Oni właśnie wyszli z budynku.", "Oni wychodzą z budynku.", "Oni wychodzili z budynku."], correctAnswer: "Oni właśnie wyszli z budynku." },
                                  { question: "Jak zapytać 'Czy kiedykolwiek byłeś w Japonii?'?", options: ["Have you ever been to Japan?", "Did you ever go to Japan?", "Are you ever in Japan?"], correctAnswer: "Have you ever been to Japan?" },
                                  { question: "Uzupełnij: She ___ (not finish) her work yet.", options: ["hasn’t finished", "didn’t finish", "doesn’t finish"], correctAnswer: "hasn’t finished" }
                                ],
                              },
                              {
                                stage: 3,
                                type: "Quiz",
                                content: [
                                  { question: "Uzupełnij: They ___ (see) this movie three times.", options: ["have seen", "saw", "have been seeing"], correctAnswer: "have seen" },
                                  { question: "Co oznacza 'We haven’t seen her for a long time'?", options: ["Nie widzieliśmy jej od dawna.", "Nie widzieliśmy jej przez chwilę.", "Nie widzieliśmy jej od wczoraj."], correctAnswer: "Nie widzieliśmy jej od dawna." },
                                  { question: "Jak powiedzieć 'Spotkanie już się zaczęło'?", options: ["The meeting has already started.", "The meeting already starts.", "The meeting had already started."], correctAnswer: "The meeting has already started." },
                                  { question: "Uzupełnij: He ___ (never try) sushi before.", options: ["has never tried", "never tried", "hasn’t tried"], correctAnswer: "has never tried" }
                                ],
                              },
                              {
                                stage: 4,
                                type: "Fiszki",
                                content: [
                                  { front: "I have finished", back: "Skończyłem", example: "I have finished reading the book.", exampleTransl: "Skończyłem czytać książkę." },
                                  { front: "They have just left", back: "Oni właśnie wyszli", example: "They have just left the office.", exampleTransl: "Oni właśnie wyszli z biura." },
                                  { front: "She hasn’t finished", back: "Ona nie skończyła", example: "She hasn’t finished her project yet.", exampleTransl: "Ona jeszcze nie skończyła swojego projektu." },
                                  { front: "Have you ever?", back: "Czy kiedykolwiek?", example: "Have you ever seen a rainbow?", exampleTransl: "Czy kiedykolwiek widziałeś tęczę?" }
                                ],
                              },
                            ],
                          },
                          {
                            title: "Czas Past Perfect",
                            isCompleted: false,
                            started: false,
                            currentStage: 1,
                            stages: [
                              {
                                stage: 1,
                                type: "Słownictwo",
                                content: [
                                  { word: "I had finished", translation: "Skończyłem", example: "I had finished my homework before the class started.", exampleTransl: "Skończyłem swoją pracę domową, zanim zaczęły się zajęcia." },
                                  { word: "We had already left", translation: "Już wyszliśmy", example: "We had already left when they arrived.", exampleTransl: "Już wyszliśmy, kiedy oni przyjechali." },
                                  { word: "They hadn’t seen", translation: "Oni nie widzieli", example: "They hadn’t seen the movie until yesterday.", exampleTransl: "Nie widzieli tego filmu aż do wczoraj." },
                                  { word: "She had been there", translation: "Ona tam była", example: "She had been there before I arrived.", exampleTransl: "Ona tam była, zanim ja przyjechałem." },
                                  { word: "Had you ever?", translation: "Czy kiedykolwiek?", example: "Had you ever visited Paris before?", exampleTransl: "Czy kiedykolwiek odwiedziłeś Paryż wcześniej?" }
                                ],
                              },
                              {
                                stage: 2,
                                type: "Ćwiczenie",
                                content: [
                                  { question: "Jak powiedzieć 'Nie widzieli filmu aż do wczoraj'?", options: ["They hadn’t seen the movie until yesterday.", "They haven’t seen the movie until yesterday.", "They didn’t see the movie until yesterday."], correctAnswer: "They hadn’t seen the movie until yesterday." },
                                  { question: "Uzupełnij: I ___ (finish) my homework before the class started.", options: ["had finished", "finished", "have finished"], correctAnswer: "had finished" },
                                  { question: "Jak powiedzieć 'Ona była tam zanim ja przyjechałem'?", options: ["She had been there before I arrived.", "She has been there before I arrived.", "She was there before I arrived."], correctAnswer: "She had been there before I arrived." },
                                  { question: "Uzupełnij: We ___ (already leave) when they arrived.", options: ["had already left", "already left", "have already left"], correctAnswer: "had already left" },
                                  { question: "Jak powiedzieć 'Zapomnieliśmy o urodzinach Anny, zanim ona nam przypomniała'?", options: ["We had forgotten Anna’s birthday before she reminded us.", "We forgot Anna’s birthday before she reminded us.", "We have forgotten Anna’s birthday before she reminded us."], correctAnswer: "We had forgotten Anna’s birthday before she reminded us." },
                                  { question: "Uzupełnij: By the time the police arrived, the thief ___ (escape).", options: ["had escaped", "escaped", "has escaped"], correctAnswer: "had escaped" }
                                ],
                              },
                              {
                                stage: 3,
                                type: "Quiz",
                                content: [
                                  { question: "Jak zapytać 'Czy kiedykolwiek odwiedziłeś Paryż wcześniej?'?", options: ["Had you ever visited Paris before?", "Did you ever visit Paris before?", "Have you ever visited Paris before?"], correctAnswer: "Had you ever visited Paris before?" },
                                  { question: "Co oznacza 'She had been there before I arrived'?", options: ["Ona tam była, zanim ja przyjechałem.", "Ona tam była, gdy przyjechałem.", "Ona tam była później."], correctAnswer: "Ona tam była, zanim ja przyjechałem." },
                                  { question: "Uzupełnij: They ___ (not see) the movie until yesterday.", options: ["hadn’t seen", "haven’t seen", "didn’t see"], correctAnswer: "hadn’t seen" },
                                  { question: "Jak powiedzieć 'Kiedy dotarłem na stację, pociąg już odjechał'?", options: ["When I arrived at the station, the train had already left.", "When I arrived at the station, the train already left.", "When I arrived at the station, the train has already left."], correctAnswer: "When I arrived at the station, the train had already left." },
                                  { question: "Uzupełnij: Before they arrived, we ___ (eat) dinner.", options: ["had eaten", "ate", "have eaten"], correctAnswer: "had eaten" },
                                  { question: "Co oznacza 'He hadn’t prepared for the exam before the teacher told him'?", options: ["On nie przygotował się do egzaminu, zanim nauczyciel mu powiedział.", "On przygotował się do egzaminu po rozmowie z nauczycielem.", "On nie zamierzał przygotować się do egzaminu."], correctAnswer: "On nie przygotował się do egzaminu, zanim nauczyciel mu powiedział." }
                                ],
                              },
                              {
                                stage: 4,
                                type: "Fiszki",
                                content: [
                                  { front: "I had finished", back: "Skończyłem", example: "I had finished eating before the call.", exampleTransl: "Skończyłem jeść przed telefonem." },
                                  { front: "They hadn’t seen", back: "Oni nie widzieli", example: "They hadn’t seen the ending of the play.", exampleTransl: "Nie widzieli zakończenia sztuki." },
                                  { front: "We had already left", back: "Już wyszliśmy", example: "We had already left before the rain started.", exampleTransl: "Już wyszliśmy, zanim zaczęło padać." },
                                  { front: "She had been there", back: "Ona tam była", example: "She had been there twice before.", exampleTransl: "Ona była tam dwa razy wcześniej." },
                                  { front: "Had you ever?", back: "Czy kiedykolwiek?", example: "Had you ever tried Indian food before?", exampleTransl: "Czy kiedykolwiek próbowałeś wcześniej indyjskiego jedzenia?" },
                                  { front: "We had forgotten", back: "Zapomnieliśmy", example: "We had forgotten to lock the door.", exampleTransl: "Zapomnieliśmy zamknąć drzwi." },
                                  { front: "By the time", back: "Do czasu gdy", example: "By the time we arrived, the party had ended.", exampleTransl: "Do czasu gdy dotarliśmy, impreza się skończyła." }
                                ],
                              },
                            ],
                          }
                        ]
                      }
                      ],
                    },
                    {
                      language: "Hiszpański",
                      title: "Lekcje Hiszpańskiego",
                      subItems: [
                        {
                          title: "A1 - Początkujący",
                          subItems: [
                            {
                              title: "Przedstawianie i zwroty grzecznościowe",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Hola", translation: "Cześć", example: "Hola, ¿cómo te llamas?", exampleTransl: "Cześć, jak się nazywasz?" },
                                    { word: "Buenos días", translation: "Dzień dobry", example: "Buenos días, señor.", exampleTransl: "Dzień dobry, proszę pana." },
                                    { word: "Buenas tardes", translation: "Dobry wieczór", example: "Buenas tardes, señora.", exampleTransl: "Dobry wieczór, proszę pani." },
                                    { word: "Adiós", translation: "Do widzenia", example: "Adiós, hasta luego.", exampleTransl: "Do widzenia, do zobaczenia później." },
                                    { word: "Por favor", translation: "Proszę", example: "Una cerveza, por favor.", exampleTransl: "Piwo, proszę." },
                                    { word: "Gracias", translation: "Dziękuję", example: "Gracias por tu ayuda.", exampleTransl: "Dziękuję za twoją pomoc." },
                                    { word: "Sí", translation: "Tak", example: "Sí, me gustaría.", exampleTransl: "Tak, chciałbym." },
                                    { word: "No", translation: "Nie", example: "No, no necesito nada.", exampleTransl: "Nie, niczego nie potrzebuję." },
                                    { word: "Disculpe", translation: "Przepraszam", example: "Disculpe, ¿dónde está el baño?", exampleTransl: "Przepraszam, gdzie jest łazienka?" },
                                    { word: "Mucho gusto", translation: "Miło mi", example: "Hola, mucho gusto.", exampleTransl: "Cześć, miło mi." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Dziękuję' po hiszpańsku?", options: ["Gracias", "Por favor", "Hola"], correctAnswer: "Gracias" },
                                    { question: "Co znaczy 'Adiós'?", options: ["Cześć", "Do widzenia", "Przepraszam"], correctAnswer: "Do widzenia" },
                                    { question: "Jak zapytasz o imię?", options: ["¿Cómo te llamas?", "¿Cómo estás?", "¿De dónde eres?"], correctAnswer: "¿Cómo te llamas?" },
                                    { question: "Jak powiedzieć 'Przepraszam' w prośbie o uwagę?", options: ["Disculpe", "Gracias", "Por favor"], correctAnswer: "Disculpe" },
                                    { question: "Co znaczy 'Sí'?", options: ["Tak", "Nie", "Może"], correctAnswer: "Tak" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: ___, me llamo Carlos.", options: ["Hola", "Adiós", "Por favor"], correctAnswer: "Hola" },
                                    { question: "Jak się przywitasz rano?", options: ["Buenos días", "Buenas tardes", "Buenas noches"], correctAnswer: "Buenos días" },
                                    { question: "Co powiesz, gdy kogoś poznasz?", options: ["Mucho gusto", "Hasta luego", "Adiós"], correctAnswer: "Mucho gusto" },
                                    { question: "Jak powiedzieć 'Proszę' w prośbie?", options: ["Por favor", "Gracias", "Disculpe"], correctAnswer: "Por favor" },
                                    { question: "Co znaczy 'No'?", options: ["Tak", "Nie", "Może"], correctAnswer: "Nie" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Buenas noches", back: "Dobranoc", example: "Buenas noches, que descanses.", exampleTransl: "Dobranoc, odpocznij dobrze." },
                                    { front: "Hasta luego", back: "Do zobaczenia", example: "Adiós, hasta luego.", exampleTransl: "Do widzenia, do zobaczenia." },
                                    { front: "Perdón", back: "Przepraszam", example: "Perdón, no escuché.", exampleTransl: "Przepraszam, nie usłyszałem." },
                                    { front: "De nada", back: "Nie ma za co", example: "Gracias. - De nada.", exampleTransl: "Dziękuję. - Nie ma za co." },
                                    { front: "Por favor", back: "Proszę", example: "Una mesa para dos, por favor.", exampleTransl: "Stolik dla dwóch osób, proszę." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Liczby i dni tygodnia",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Uno", translation: "Jeden", example: "Uno más uno son dos.", exampleTransl: "Jeden plus jeden to dwa." },
                                    { word: "Dos", translation: "Dwa", example: "Tengo dos libros.", exampleTransl: "Mam dwie książki." },
                                    { word: "Tres", translation: "Trzy", example: "Tres amigos vinieron a la fiesta.", exampleTransl: "Trzech przyjaciół przyszło na imprezę." },
                                    { word: "Cuatro", translation: "Cztery", example: "Tengo cuatro hermanas.", exampleTransl: "Mam cztery siostry." },
                                    { word: "Cinco", translation: "Pięć", example: "Hay cinco sillas en la mesa.", exampleTransl: "Jest pięć krzeseł przy stole." },
                                    { word: "Seis", translation: "Sześć", example: "La reunión es a las seis.", exampleTransl: "Spotkanie jest o szóstej." },
                                    { word: "Siete", translation: "Siedem", example: "Siete días hacen una semana.", exampleTransl: "Siedem dni tworzy tydzień." },
                                    { word: "Ocho", translation: "Osiem", example: "El autobús llega a las ocho.", exampleTransl: "Autobus przyjeżdża o ósmej." },
                                    { word: "Nueve", translation: "Dziewięć", example: "Hay nueve estudiantes en la clase.", exampleTransl: "W klasie jest dziewięciu uczniów." },
                                    { word: "Diez", translation: "Dziesięć", example: "Diez manzanas están en la mesa.", exampleTransl: "Dziesięć jabłek leży na stole." },
                                    { word: "Lunes", translation: "Poniedziałek", example: "El lunes empiezo un nuevo trabajo.", exampleTransl: "W poniedziałek zaczynam nową pracę." },
                                    { word: "Martes", translation: "Wtorek", example: "El martes hay una reunión importante.", exampleTransl: "We wtorek jest ważne spotkanie." },
                                    { word: "Miércoles", translation: "Środa", example: "Miércoles es el día del mercado.", exampleTransl: "Środa to dzień targowy." },
                                    { word: "Jueves", translation: "Czwartek", example: "El jueves vamos al cine.", exampleTransl: "W czwartek idziemy do kina." },
                                    { word: "Viernes", translation: "Piątek", example: "El viernes es el último día laboral.", exampleTransl: "Piątek to ostatni dzień pracy." },
                                    { word: "Sábado", translation: "Sobota", example: "El sábado hacemos una barbacoa.", exampleTransl: "W sobotę robimy grilla." },
                                    { word: "Domingo", translation: "Niedziela", example: "El domingo descansamos.", exampleTransl: "W niedzielę odpoczywamy." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Siedem' po hiszpańsku?", options: ["Siete", "Seis", "Ocho"], correctAnswer: "Siete" },
                                    { question: "Co znaczy 'Domingo'?", options: ["Niedziela", "Sobota", "Poniedziałek"], correctAnswer: "Niedziela" },
                                    { question: "Jak powiedzieć 'Dziesięć'?", options: ["Diez", "Nueve", "Once"], correctAnswer: "Diez" },
                                    { question: "Uzupełnij: Uno más uno son ___.", options: ["dos", "tres", "uno"], correctAnswer: "dos" },
                                    { question: "Jak zapytać 'Ile jest dni w tygodniu?'?", options: ["¿Cuántos días hay en una semana?", "¿Qué día es hoy?", "¿Cuántos meses hay en un año?"], correctAnswer: "¿Cuántos días hay en una semana?" },
                                    { question: "Jak powiedzieć 'Poniedziałek'?", options: ["Lunes", "Martes", "Miércoles"], correctAnswer: "Lunes" },
                                    { question: "Jak utworzyć liczbę 15?", options: ["Diez y cinco", "Quince", "Cinco más diez"], correctAnswer: "Quince" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: Ocho más dos son ___.", options: ["diez", "doce", "ocho"], correctAnswer: "diez" },
                                    { question: "Jak powiedzieć 'Sześć'?", options: ["Seis", "Siete", "Cinco"], correctAnswer: "Seis" },
                                    { question: "Co znaczy 'Jueves'?", options: ["Czwartek", "Piątek", "Środa"], correctAnswer: "Czwartek" },
                                    { question: "Uzupełnij: Hay ___ días en una semana.", options: ["siete", "diez", "cinco"], correctAnswer: "siete" },
                                    { question: "Jak zapytać 'Jaki dziś dzień?'?", options: ["¿Qué día es hoy?", "¿Cuántos días faltan?", "¿Cuántos días hay?"], correctAnswer: "¿Qué día es hoy?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Nueve", back: "Dziewięć", example: "Hay nueve platos en la mesa.", exampleTransl: "Na stole jest dziewięć talerzy." },
                                    { front: "Sábado", back: "Sobota", example: "El sábado vamos a una fiesta.", exampleTransl: "W sobotę idziemy na imprezę." },
                                    { front: "Quince", back: "Piętnaście", example: "Quince años de experiencia.", exampleTransl: "Piętnaście lat doświadczenia." },
                                    { front: "Diez", back: "Dziesięć", example: "Diez minutos más, por favor.", exampleTransl: "Dziesięć minut więcej, proszę." },
                                    { front: "Martes", back: "Wtorek", example: "El martes no tengo trabajo.", exampleTransl: "We wtorek nie mam pracy." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Kolory",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Rojo", translation: "Czerwony", example: "El coche es rojo.", exampleTransl: "Samochód jest czerwony." },
                                    { word: "Azul", translation: "Niebieski", example: "El cielo es azul.", exampleTransl: "Niebo jest niebieskie." },
                                    { word: "Verde", translation: "Zielony", example: "La hierba es verde.", exampleTransl: "Trawa jest zielona." },
                                    { word: "Amarillo", translation: "Żółty", example: "El sol es amarillo.", exampleTransl: "Słońce jest żółte." },
                                    { word: "Negro", translation: "Czarny", example: "La noche es negra.", exampleTransl: "Noc jest czarna." },
                                    { word: "Blanco", translation: "Biały", example: "La nieve es blanca.", exampleTransl: "Śnieg jest biały." },
                                    { word: "Rosa", translation: "Różowy", example: "Las flores son rosas.", exampleTransl: "Kwiaty są różowe." },
                                    { word: "Gris", translation: "Szary", example: "El cielo está gris.", exampleTransl: "Niebo jest szare." },
                                    { word: "Marrón", translation: "Brązowy", example: "El oso es marrón.", exampleTransl: "Niedźwiedź jest brązowy." },
                                    { word: "Naranja", translation: "Pomarańczowy", example: "La naranja es naranja.", exampleTransl: "Pomarańcza jest pomarańczowa." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Zielony'?", options: ["Verde", "Rojo", "Amarillo"], correctAnswer: "Verde" },
                                    { question: "Co znaczy 'Blanco'?", options: ["Biały", "Czarny", "Żółty"], correctAnswer: "Biały" },
                                    { question: "Jak zapytać o kolor samochodu?", options: ["¿De qué color es el coche?", "¿Qué coche tienes?", "¿Dónde está el coche?"], correctAnswer: "¿De qué color es el coche?" },
                                    { question: "Jak powiedzieć 'Pomarańczowy'?", options: ["Naranja", "Amarillo", "Rosa"], correctAnswer: "Naranja" },
                                    { question: "Co znaczy 'Rosa'?", options: ["Różowy", "Czerwony", "Niebieski"], correctAnswer: "Różowy" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Czerwony'?", options: ["Rojo", "Azul", "Verde"], correctAnswer: "Rojo" },
                                    { question: "Co znaczy 'Negro'?", options: ["Czarny", "Biały", "Żółty"], correctAnswer: "Czarny" },
                                    { question: "Uzupełnij: El cielo es ___.", options: ["azul", "rojo", "negro"], correctAnswer: "azul" },
                                    { question: "Jak zapytać 'Jakiego koloru są twoje buty?'?", options: ["¿De qué color son tus zapatos?", "¿Qué color es tu casa?", "¿De qué color es tu coche?"], correctAnswer: "¿De qué color son tus zapatos?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Rosa", back: "Różowy", example: "Mi vestido es rosa.", exampleTransl: "Moja sukienka jest różowa." },
                                    { front: "Marrón", back: "Brązowy", example: "El suelo es marrón.", exampleTransl: "Podłoga jest brązowa." },
                                    { front: "Amarillo", back: "Żółty", example: "La flor es amarilla.", exampleTransl: "Kwiat jest żółty." },
                                    { front: "Blanco", back: "Biały", example: "El papel es blanco.", exampleTransl: "Papier jest biały." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czas i pory dnia",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "¿Qué hora es?", translation: "Która jest godzina?", example: "¿Qué hora es? - Son las tres.", exampleTransl: "Która jest godzina? - Jest trzecia." },
                                    { word: "Son las dos", translation: "Jest druga", example: "La clase empieza a las dos.", exampleTransl: "Zajęcia zaczynają się o drugiej." },
                                    { word: "Media", translation: "Połowa/godzina wpół do", example: "Son las cinco y media.", exampleTransl: "Jest wpół do szóstej." },
                                    { word: "Cuarto", translation: "Kwadrans", example: "Son las tres y cuarto.", exampleTransl: "Jest kwadrans po trzeciej." },
                                    { word: "De la mañana", translation: "Rano", example: "Son las ocho de la mañana.", exampleTransl: "Jest ósma rano." },
                                    { word: "De la tarde", translation: "Po południu", example: "Es la una de la tarde.", exampleTransl: "Jest pierwsza po południu." },
                                    { word: "De la noche", translation: "Wieczorem/w nocy", example: "Son las diez de la noche.", exampleTransl: "Jest dziesiąta wieczorem." },
                                    { word: "Hoy", translation: "Dziś", example: "Hoy es miércoles.", exampleTransl: "Dziś jest środa." },
                                    { word: "Mañana", translation: "Jutro", example: "Mañana vamos al parque.", exampleTransl: "Jutro idziemy do parku." },
                                    { word: "Tarde", translation: "Popołudnie", example: "Por la tarde leo un libro.", exampleTransl: "Po południu czytam książkę." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Która jest godzina?'?", options: ["¿Qué hora es?", "¿Qué día es hoy?", "¿Cuántos años tienes?"], correctAnswer: "¿Qué hora es?" },
                                    { question: "Co znaczy 'Son las dos'?", options: ["Jest druga", "Jest rano", "Jest wieczór"], correctAnswer: "Jest druga" },
                                    { question: "Jak powiedzieć 'Jest ósma rano'?", options: ["Son las ocho de la mañana.", "Son las ocho de la tarde.", "Son las ocho de la noche."], correctAnswer: "Son las ocho de la mañana." },
                                    { question: "Jak powiedzieć 'Dziś' po hiszpańsku?", options: ["Hoy", "Tarde", "Mañana"], correctAnswer: "Hoy" },
                                    { question: "Co znaczy 'Media' w kontekście godziny?", options: ["Wpół do", "Kwadrans", "Cała"], correctAnswer: "Wpół do" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak zapytać o godzinę?", options: ["¿Qué hora es?", "¿Qué día es hoy?", "¿Cuántos años tienes?"], correctAnswer: "¿Qué hora es?" },
                                    { question: "Jak powiedzieć 'Jest pierwsza po południu'?", options: ["Es la una de la tarde.", "Es la una de la mañana.", "Es la una de la noche."], correctAnswer: "Es la una de la tarde." },
                                    { question: "Co znaczy 'Por la tarde'?", options: ["Po południu", "Rano", "Wieczorem"], correctAnswer: "Po południu" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Media", back: "Wpół do", example: "Son las seis y media.", exampleTransl: "Jest wpół do siódmej." },
                                    { front: "Hoy", back: "Dziś", example: "Hoy vamos al cine.", exampleTransl: "Dziś idziemy do kina." },
                                    { front: "De la noche", back: "Wieczorem", example: "Son las diez de la noche.", exampleTransl: "Jest dziesiąta wieczorem." },
                                    { front: "Cuarto", back: "Kwadrans", example: "Son las tres menos cuarto.", exampleTransl: "Jest za kwadrans trzecia." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Rodzina",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Madre", translation: "Matka", example: "Mi madre es profesora.", exampleTransl: "Moja mama jest nauczycielką." },
                                    { word: "Padre", translation: "Ojciec", example: "Mi padre trabaja en una oficina.", exampleTransl: "Mój tata pracuje w biurze." },
                                    { word: "Hermano", translation: "Brat", example: "Tengo un hermano mayor.", exampleTransl: "Mam starszego brata." },
                                    { word: "Hermana", translation: "Siostra", example: "Mi hermana es muy simpática.", exampleTransl: "Moja siostra jest bardzo miła." },
                                    { word: "Abuelo", translation: "Dziadek", example: "Mi abuelo vive en el campo.", exampleTransl: "Mój dziadek mieszka na wsi." },
                                    { word: "Abuela", translation: "Babcia", example: "Mi abuela cocina muy bien.", exampleTransl: "Moja babcia bardzo dobrze gotuje." },
                                    { word: "Tío", translation: "Wujek", example: "Mi tío tiene una tienda.", exampleTransl: "Mój wujek ma sklep." },
                                    { word: "Tía", translation: "Ciocia", example: "Mi tía vive en España.", exampleTransl: "Moja ciocia mieszka w Hiszpanii." },
                                    { word: "Primo", translation: "Kuzyn", example: "Mi primo juega al fútbol.", exampleTransl: "Mój kuzyn gra w piłkę nożną." },
                                    { word: "Prima", translation: "Kuzynka", example: "Mi prima estudia medicina.", exampleTransl: "Moja kuzynka studiuje medycynę." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Mama' po hiszpańsku?", options: ["Madre", "Padre", "Abuela"], correctAnswer: "Madre" },
                                    { question: "Co znaczy 'Hermano'?", options: ["Brat", "Siostra", "Wujek"], correctAnswer: "Brat" },
                                    { question: "Jak powiedzieć 'Babcia'?", options: ["Abuela", "Abuelo", "Tía"], correctAnswer: "Abuela" },
                                    { question: "Jak powiedzieć 'Mój tata pracuje w biurze'?", options: ["Mi padre trabaja en una oficina.", "Mi madre trabaja en una oficina.", "Mi abuelo trabaja en una oficina."], correctAnswer: "Mi padre trabaja en una oficina." },
                                    { question: "Jak zapytać 'Czy masz rodzeństwo?'?", options: ["¿Tienes hermanos?", "¿Cómo se llama tu hermano?", "¿Tienes padres?"], correctAnswer: "¿Tienes hermanos?" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Ciocia'?", options: ["Tía", "Tío", "Prima"], correctAnswer: "Tía" },
                                    { question: "Co znaczy 'Primo'?", options: ["Kuzyn", "Brat", "Siostrzeniec"], correctAnswer: "Kuzyn" },
                                    { question: "Jak powiedzieć 'Moja babcia bardzo dobrze gotuje'?", options: ["Mi abuela cocina muy bien.", "Mi abuelo cocina muy bien.", "Mi madre cocina muy bien."], correctAnswer: "Mi abuela cocina muy bien." },
                                    { question: "Jak powiedzieć 'Mój kuzyn gra w piłkę nożną'?", options: ["Mi primo juega al fútbol.", "Mi tío juega al fútbol.", "Mi hermano juega al fútbol."], correctAnswer: "Mi primo juega al fútbol." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Madre", back: "Matka", example: "Mi madre es médica.", exampleTransl: "Moja mama jest lekarką." },
                                    { front: "Abuela", back: "Babcia", example: "Mi abuela vive cerca.", exampleTransl: "Moja babcia mieszka blisko." },
                                    { front: "Primo", back: "Kuzyn", example: "Mi primo es ingeniero.", exampleTransl: "Mój kuzyn jest inżynierem." },
                                    { front: "Tía", back: "Ciocia", example: "Mi tía tiene un gato.", exampleTransl: "Moja ciocia ma kota." }
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        {
                          title:"A2 - Początkujący wyższy",
                          subItems:[
                            {
                              title: "Podstawowe czasowniki w codziennym życiu",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Comer", translation: "Jeść", example: "Yo como fruta todos los días.", exampleTransl: "Jem owoce codziennie." },
                                    { word: "Beber", translation: "Pić", example: "Ellos beben agua después de correr.", exampleTransl: "Oni piją wodę po bieganiu." },
                                    { word: "Leer", translation: "Czytać", example: "Me gusta leer libros.", exampleTransl: "Lubię czytać książki." },
                                    { word: "Escribir", translation: "Pisać", example: "Nosotros escribimos cartas.", exampleTransl: "Pisujemy listy." },
                                    { word: "Estudiar", translation: "Uczyć się", example: "Ellas estudian matemáticas.", exampleTransl: "One uczą się matematyki." },
                                    { word: "Trabajar", translation: "Pracować", example: "Mi padre trabaja en una oficina.", exampleTransl: "Mój tata pracuje w biurze." },
                                    { word: "Dormir", translation: "Spać", example: "¿Cuántas horas duermes al día?", exampleTransl: "Ile godzin śpisz dziennie?" },
                                    { word: "Correr", translation: "Biegać", example: "Me gusta correr en el parque.", exampleTransl: "Lubię biegać w parku." },
                                    { word: "Hablar", translation: "Rozmawiać", example: "Hablamos con nuestros amigos.", exampleTransl: "Rozmawiamy z naszymi przyjaciółmi." },
                                    { word: "Escuchar", translation: "Słuchać", example: "Escucho música por la noche.", exampleTransl: "Słucham muzyki wieczorem." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Pracować' po hiszpańsku?", options: ["Trabajar", "Estudiar", "Leer"], correctAnswer: "Trabajar" },
                                    { question: "Co znaczy 'Dormir'?", options: ["Spać", "Biegać", "Pisać"], correctAnswer: "Spać" },
                                    { question: "Jak powiedzieć 'Czytać'?", options: ["Leer", "Escribir", "Hablar"], correctAnswer: "Leer" },
                                    { question: "Jak zapytać 'Ile godzin śpisz dziennie?'?", options: ["¿Cuántas horas duermes al día?", "¿Qué horas trabajas cada día?", "¿Cuánto estudias al día?"], correctAnswer: "¿Cuántas horas duermes al día?" },
                                    { question: "Co znaczy 'Ellos beben agua después de correr'?", options: ["Oni piją wodę po bieganiu.", "Oni biegną po wodę.", "Oni piją wodę przed bieganiem."], correctAnswer: "Oni piją wodę po bieganiu." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Słuchać muzyki'?", options: ["Escuchar música", "Hablar música", "Escribir música"], correctAnswer: "Escuchar música" },
                                    { question: "Co znaczy 'Nosotros escribimos cartas'?", options: ["Pisujemy listy.", "Czytamy książki.", "Rozmawiamy z przyjaciółmi."], correctAnswer: "Pisujemy listy." },
                                    { question: "Uzupełnij: Me gusta ___ (biegać) en el parque.", options: ["correr", "dormir", "trabajar"], correctAnswer: "correr" },
                                    { question: "Co oznacza 'Mi padre trabaja en una oficina'?", options: ["Mój tata pracuje w biurze.", "Mój tata śpi w biurze.", "Mój tata czyta książki w biurze."], correctAnswer: "Mój tata pracuje w biurze." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Dormir", back: "Spać", example: "Dormimos ocho horas al día.", exampleTransl: "Śpimy osiem godzin dziennie." },
                                    { front: "Leer", back: "Czytać", example: "Leo un libro interesante.", exampleTransl: "Czytam interesującą książkę." },
                                    { front: "Trabajar", back: "Pracować", example: "Trabajan en una empresa grande.", exampleTransl: "Pracują w dużej firmie." },
                                    { front: "Beber", back: "Pić", example: "Bebo agua antes de dormir.", exampleTransl: "Piję wodę przed snem." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Podróże",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Viajar", translation: "Podróżować", example: "Nos gusta viajar por Europa.", exampleTransl: "Lubimy podróżować po Europie." },
                                    { word: "Maleta", translation: "Walizka", example: "Prepara tu maleta para el viaje.", exampleTransl: "Spakuj swoją walizkę na podróż." },
                                    { word: "Aeropuerto", translation: "Lotnisko", example: "Vamos al aeropuerto en taxi.", exampleTransl: "Jedziemy na lotnisko taksówką." },
                                    { word: "Billete", translation: "Bilet", example: "¿Dónde compraste el billete?", exampleTransl: "Gdzie kupiłeś bilet?" },
                                    { word: "Tren", translation: "Pociąg", example: "El tren sale a las seis.", exampleTransl: "Pociąg odjeżdża o szóstej." },
                                    { word: "Avión", translation: "Samolot", example: "Me gusta viajar en avión.", exampleTransl: "Lubię podróżować samolotem." },
                                    { word: "Hotel", translation: "Hotel", example: "Nos alojamos en un hotel céntrico.", exampleTransl: "Zatrzymujemy się w hotelu w centrum." },
                                    { word: "Mapa", translation: "Mapa", example: "Tengo una mapa de la ciudad.", exampleTransl: "Mam mapę miasta." },
                                    { word: "Pasaporte", translation: "Paszport", example: "¿Tienes tu pasaporte?", exampleTransl: "Masz swój paszport?" },
                                    { word: "Equipaje", translation: "Bagaż", example: "El equipaje está en el coche.", exampleTransl: "Bagaż jest w samochodzie." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Samolot'?", options: ["Avión", "Tren", "Billete"], correctAnswer: "Avión" },
                                    { question: "Co znaczy 'Maleta'?", options: ["Walizka", "Paszport", "Mapa"], correctAnswer: "Walizka" },
                                    { question: "Jak powiedzieć 'Paszport'?", options: ["Pasaporte", "Equipaje", "Aeropuerto"], correctAnswer: "Pasaporte" },
                                    { question: "Jak zapytać 'Gdzie kupiłeś bilet?'?", options: ["¿Dónde compraste el billete?", "¿Cuántos billetes tienes?", "¿Qué billete compraste?"], correctAnswer: "¿Dónde compraste el billete?" },
                                    { question: "Co znaczy 'Me gusta viajar por Europa'?", options: ["Lubię podróżować po Europie.", "Nie lubię podróżować po Europie.", "Lubię podróżować pociągiem."], correctAnswer: "Lubię podróżować po Europie." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Bagaż jest w samochodzie'?", options: ["El equipaje está en el coche.", "La maleta está en el coche.", "El billete está en el coche."], correctAnswer: "El equipaje está en el coche." },
                                    { question: "Co znaczy 'Aeropuerto'?", options: ["Lotnisko", "Samolot", "Mapa"], correctAnswer: "Lotnisko" },
                                    { question: "Jak zapytać 'Masz swój paszport?'?", options: ["¿Tienes tu pasaporte?", "¿Dónde está tu pasaporte?", "¿Qué pasaporte tienes?"], correctAnswer: "¿Tienes tu pasaporte?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Avión", back: "Samolot", example: "El avión llega a las ocho.", exampleTransl: "Samolot przylatuje o ósmej." },
                                    { front: "Hotel", back: "Hotel", example: "Reservamos una habitación en un hotel bonito.", exampleTransl: "Zarezerwowaliśmy pokój w ładnym hotelu." },
                                    { front: "Maleta", back: "Walizka", example: "Mi maleta es azul.", exampleTransl: "Moja walizka jest niebieska." },
                                    { front: "Mapa", back: "Mapa", example: "Tengo una mapa turística.", exampleTransl: "Mam mapę turystyczną." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Zakupy",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Tienda", translation: "Sklep", example: "Voy a la tienda para comprar pan.", exampleTransl: "Idę do sklepu, żeby kupić chleb." },
                                    { word: "Precio", translation: "Cena", example: "¿Cuál es el precio de esta chaqueta?", exampleTransl: "Jaka jest cena tej kurtki?" },
                                    { word: "Descuento", translation: "Zniżka", example: "Hay un descuento del 20% en zapatos.", exampleTransl: "Jest 20% zniżki na buty." },
                                    { word: "Comprar", translation: "Kupować", example: "Quiero comprar una camiseta.", exampleTransl: "Chcę kupić koszulkę." },
                                    { word: "Pagar", translation: "Płacić", example: "¿Dónde puedo pagar?", exampleTransl: "Gdzie mogę zapłacić?" },
                                    { word: "Dinero", translation: "Pieniądze", example: "¿Tienes suficiente dinero?", exampleTransl: "Masz wystarczająco pieniędzy?" },
                                    { word: "Tarjeta", translation: "Karta płatnicza", example: "¿Puedo pagar con tarjeta?", exampleTransl: "Czy mogę zapłacić kartą?" },
                                    { word: "Moneda", translation: "Moneta", example: "Solo tengo monedas pequeñas.", exampleTransl: "Mam tylko drobne monety." },
                                    { word: "Carrito", translation: "Wózek na zakupy", example: "Pon las frutas en el carrito.", exampleTransl: "Włóż owoce do wózka." },
                                    { word: "Bolsa", translation: "Torba", example: "¿Necesitas una bolsa?", exampleTransl: "Potrzebujesz torby?" }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Gdzie mogę zapłacić?'?", options: ["¿Dónde puedo pagar?", "¿Cuánto cuesta?", "¿Dónde está la tienda?"], correctAnswer: "¿Dónde puedo pagar?" },
                                    { question: "Co znaczy 'Comprar'?", options: ["Kupować", "Płacić", "Znajdować"], correctAnswer: "Kupować" },
                                    { question: "Jak powiedzieć 'Cena' po hiszpańsku?", options: ["Precio", "Descuento", "Dinero"], correctAnswer: "Precio" },
                                    { question: "Jak zapytać 'Czy mogę zapłacić kartą?'?", options: ["¿Puedo pagar con tarjeta?", "¿Dónde está mi tarjeta?", "¿Qué tarjeta tienes?"], correctAnswer: "¿Puedo pagar con tarjeta?" },
                                    { question: "Co znaczy 'Hay un descuento del 20% en zapatos'?", options: ["Jest 20% zniżki na buty.", "Jest 20% podwyżki na buty.", "Nie ma zniżek na buty."], correctAnswer: "Jest 20% zniżki na buty." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Mam tylko drobne monety'?", options: ["Solo tengo monedas pequeñas.", "Solo tengo una tarjeta pequeña.", "Solo tengo dinero pequeño."], correctAnswer: "Solo tengo monedas pequeñas." },
                                    { question: "Co znaczy 'Tienda'?", options: ["Sklep", "Torba", "Wózek"], correctAnswer: "Sklep" },
                                    { question: "Jak powiedzieć 'Potrzebujesz torby?'?", options: ["¿Necesitas una bolsa?", "¿Dónde está tu bolsa?", "¿Qué bolsa necesitas?"], correctAnswer: "¿Necesitas una bolsa?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Precio", back: "Cena", example: "El precio de esta chaqueta es alto.", exampleTransl: "Cena tej kurtki jest wysoka." },
                                    { front: "Descuento", back: "Zniżka", example: "Hay descuentos en el supermercado.", exampleTransl: "Są zniżki w supermarkecie." },
                                    { front: "Tarjeta", back: "Karta płatnicza", example: "Pagué con tarjeta de crédito.", exampleTransl: "Zapłaciłem kartą kredytową." },
                                    { front: "Bolsa", back: "Torba", example: "La bolsa es de plástico.", exampleTransl: "Torba jest plastikowa." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Restauracja",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Mesa", translation: "Stół", example: "¿Tiene una mesa para dos?", exampleTransl: "Czy macie stół dla dwóch osób?" },
                                    { word: "Menú", translation: "Menu", example: "¿Me trae el menú, por favor?", exampleTransl: "Czy możesz przynieść menu?" },
                                    { word: "Camarero", translation: "Kelner", example: "El camarero es muy amable.", exampleTransl: "Kelner jest bardzo miły." },
                                    { word: "Plato", translation: "Danie", example: "Este plato es delicioso.", exampleTransl: "To danie jest pyszne." },
                                    { word: "Bebida", translation: "Napój", example: "¿Qué bebidas tienen?", exampleTransl: "Jakie macie napoje?" },
                                    { word: "Agua", translation: "Woda", example: "Quiero un vaso de agua.", exampleTransl: "Chcę szklankę wody." },
                                    { word: "Cuenta", translation: "Rachunek", example: "¿Me trae la cuenta, por favor?", exampleTransl: "Czy możesz przynieść rachunek?" },
                                    { word: "Reservar", translation: "Rezerwować", example: "¿Puedo reservar una mesa para esta noche?", exampleTransl: "Czy mogę zarezerwować stolik na dziś wieczór?" },
                                    { word: "Postre", translation: "Deser", example: "El postre es mi parte favorita.", exampleTransl: "Deser to moja ulubiona część." },
                                    { word: "Comida", translation: "Jedzenie/posiłek", example: "La comida está lista.", exampleTransl: "Jedzenie jest gotowe." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Kelner'?", options: ["Camarero", "Mesa", "Menú"], correctAnswer: "Camarero" },
                                    { question: "Co znaczy 'Cuenta'?", options: ["Rachunek", "Menu", "Stół"], correctAnswer: "Rachunek" },
                                    { question: "Jak zapytać 'Czy macie stół dla dwóch osób?'?", options: ["¿Tiene una mesa para dos?", "¿Qué mesas tienen?", "¿Dónde está la mesa para dos?"], correctAnswer: "¿Tiene una mesa para dos?" },
                                    { question: "Co znaczy 'Postre'?", options: ["Deser", "Napój", "Danie"], correctAnswer: "Deser" },
                                    { question: "Jak powiedzieć 'Chcę szklankę wody'?", options: ["Quiero un vaso de agua.", "Pido un plato de agua.", "Traigo un vaso de agua."], correctAnswer: "Quiero un vaso de agua." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Czy możesz przynieść rachunek?'?", options: ["¿Me trae la cuenta, por favor?", "¿Dónde está la cuenta?", "¿Qué cuenta tiene?"], correctAnswer: "¿Me trae la cuenta, por favor?" },
                                    { question: "Co znaczy 'Menú'?", options: ["Menu", "Danie", "Deser"], correctAnswer: "Menu" },
                                    { question: "Jak powiedzieć 'Jakie macie napoje?'?", options: ["¿Qué bebidas tienen?", "¿Qué platos tienen?", "¿Qué camarero tiene bebidas?"], correctAnswer: "¿Qué bebidas tienen?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Mesa", back: "Stół", example: "Tenemos una mesa cerca de la ventana.", exampleTransl: "Mamy stół blisko okna." },
                                    { front: "Cuenta", back: "Rachunek", example: "La cuenta está en la mesa.", exampleTransl: "Rachunek jest na stole." },
                                    { front: "Postre", back: "Deser", example: "El postre es muy dulce.", exampleTransl: "Deser jest bardzo słodki." },
                                    { front: "Reservar", back: "Rezerwować", example: "Reservamos una mesa para seis personas.", exampleTransl: "Zarezerwowaliśmy stół dla sześciu osób." }
                                  ],
                                },
                              ],
                            },
                          ]
                        },
                        {
                          title: "B1 - Średniozaawansowany",
                          subItems:[
                            {
                              title: "Tworzenie zdań twierdzących i przeczących",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Yo soy", translation: "Ja jestem", example: "Yo soy estudiante.", exampleTransl: "Jestem studentem." },
                                    { word: "No soy", translation: "Nie jestem", example: "No soy profesor.", exampleTransl: "Nie jestem nauczycielem." },
                                    { word: "Tú tienes", translation: "Ty masz", example: "Tú tienes un perro.", exampleTransl: "Ty masz psa." },
                                    { word: "Él no tiene", translation: "On nie ma", example: "Él no tiene coche.", exampleTransl: "On nie ma samochodu." },
                                    { word: "Nosotros vamos", translation: "My idziemy", example: "Nosotros vamos al parque.", exampleTransl: "Idziemy do parku." },
                                    { word: "Ellos no van", translation: "Oni nie idą", example: "Ellos no van a la escuela.", exampleTransl: "Oni nie idą do szkoły." },
                                    { word: "Ella trabaja", translation: "Ona pracuje", example: "Ella trabaja en una oficina.", exampleTransl: "Ona pracuje w biurze." },
                                    { word: "No trabajamos", translation: "Nie pracujemy", example: "No trabajamos los domingos.", exampleTransl: "Nie pracujemy w niedziele." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Ja jestem studentem'?", options: ["Yo soy estudiante.", "Yo tengo estudiante.", "Yo no soy estudiante."], correctAnswer: "Yo soy estudiante." },
                                    { question: "Co znaczy 'No soy profesor'?", options: ["Nie jestem nauczycielem.", "Nie mam nauczyciela.", "Jestem nauczycielem."], correctAnswer: "Nie jestem nauczycielem." },
                                    { question: "Jak powiedzieć 'On nie ma samochodu'?", options: ["Él no tiene coche.", "Él tiene coche.", "Ellos no tienen coche."], correctAnswer: "Él no tiene coche." },
                                    { question: "Jak powiedzieć 'Idziemy do parku'?", options: ["Nosotros vamos al parque.", "Ellos van al parque.", "Yo voy al parque."], correctAnswer: "Nosotros vamos al parque." },
                                    { question: "Uzupełnij: Ellos ___ (nie idą) a la escuela.", options: ["no van", "no vamos", "no va"], correctAnswer: "no van" },
                                    { question: "Jak powiedzieć 'Ona pracuje w biurze'?", options: ["Ella trabaja en una oficina.", "Ella no trabaja en una oficina.", "Ella tiene una oficina."], correctAnswer: "Ella trabaja en una oficina." },
                                    { question: "Jak powiedzieć 'Nie pracujemy w niedziele'?", options: ["No trabajamos los domingos.", "Trabajamos los domingos.", "No tenemos trabajo los domingos."], correctAnswer: "No trabajamos los domingos." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'My idziemy do szkoły'?", options: ["Nosotros vamos a la escuela.", "Ellos van a la escuela.", "Yo voy a la escuela."], correctAnswer: "Nosotros vamos a la escuela." },
                                    { question: "Co znaczy 'No soy profesor'?", options: ["Nie jestem nauczycielem.", "Nie jestem studentem.", "Nie jestem lekarzem."], correctAnswer: "Nie jestem nauczycielem." },
                                    { question: "Uzupełnij: Tú ___ (nie masz) un coche.", options: ["no tienes", "no tiene", "no tienen"], correctAnswer: "no tienes" },
                                    { question: "Jak powiedzieć 'On nie idzie do parku'?", options: ["Él no va al parque.", "Ellos no van al parque.", "Ella no va al parque."], correctAnswer: "Él no va al parque." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Yo soy", back: "Ja jestem", example: "Yo soy estudiante de medicina.", exampleTransl: "Jestem studentem medycyny." },
                                    { front: "Él no tiene", back: "On nie ma", example: "Él no tiene tiempo para estudiar.", exampleTransl: "On nie ma czasu na naukę." },
                                    { front: "Nosotros vamos", back: "My idziemy", example: "Nosotros vamos al supermercado.", exampleTransl: "Idziemy do supermarketu." },
                                    { front: "No trabajamos", back: "Nie pracujemy", example: "No trabajamos el sábado.", exampleTransl: "Nie pracujemy w sobotę." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Tworzenie zdań pytających",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "¿Dónde?", translation: "Gdzie?", example: "¿Dónde vives?", exampleTransl: "Gdzie mieszkasz?" },
                                    { word: "¿Qué?", translation: "Co?", example: "¿Qué haces?", exampleTransl: "Co robisz?" },
                                    { word: "¿Cuándo?", translation: "Kiedy?", example: "¿Cuándo llegas?", exampleTransl: "Kiedy przyjeżdżasz?" },
                                    { word: "¿Por qué?", translation: "Dlaczego?", example: "¿Por qué estudias español?", exampleTransl: "Dlaczego uczysz się hiszpańskiego?" },
                                    { word: "¿Cómo?", translation: "Jak?", example: "¿Cómo estás?", exampleTransl: "Jak się masz?" },
                                    { word: "¿Quién?", translation: "Kto?", example: "¿Quién es él?", exampleTransl: "Kto to jest?" },
                                    { word: "¿Cuánto?", translation: "Ile?", example: "¿Cuánto cuesta?", exampleTransl: "Ile to kosztuje?" },
                                    { word: "¿Cuál?", translation: "Który?", example: "¿Cuál es tu favorito?", exampleTransl: "Który jest twoim ulubionym?" }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Gdzie mieszkasz?'?", options: ["¿Dónde vives?", "¿Cuándo vives?", "¿Qué vives?"], correctAnswer: "¿Dónde vives?" },
                                    { question: "Co znaczy '¿Por qué estudias español?'?", options: ["Dlaczego uczysz się hiszpańskiego?", "Kiedy uczysz się hiszpańskiego?", "Co robisz po hiszpańsku?"], correctAnswer: "Dlaczego uczysz się hiszpańskiego?" },
                                    { question: "Jak zapytać 'Ile to kosztuje?'?", options: ["¿Cuánto cuesta?", "¿Qué cuesta?", "¿Dónde cuesta?"], correctAnswer: "¿Cuánto cuesta?" },
                                    { question: "Jak powiedzieć 'Jak się masz?'?", options: ["¿Cómo estás?", "¿Qué haces?", "¿Quién eres?"], correctAnswer: "¿Cómo estás?" },
                                    { question: "Co znaczy '¿Quién es él?'?", options: ["Kto to jest?", "Gdzie jest on?", "Dlaczego to on?"], correctAnswer: "Kto to jest?" },
                                    { question: "Jak zapytać 'Który jest twoim ulubionym?'?", options: ["¿Cuál es tu favorito?", "¿Qué es tu favorito?", "¿Quién es tu favorito?"], correctAnswer: "¿Cuál es tu favorito?" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: ¿___ (Dlaczego) no comes carne?", options: ["Por qué", "Cómo", "Dónde"], correctAnswer: "Por qué" },
                                    { question: "Co znaczy '¿Cuándo llegas?'?", options: ["Kiedy przyjeżdżasz?", "Gdzie przyjeżdżasz?", "Dlaczego przyjeżdżasz?"], correctAnswer: "Kiedy przyjeżdżasz?" },
                                    { question: "Jak zapytać 'Co robisz?'?", options: ["¿Qué haces?", "¿Qué haces hoy?", "¿Cuánto haces?"], correctAnswer: "¿Qué haces?" },
                                    { question: "Jak powiedzieć 'Ile masz lat?'?", options: ["¿Cuántos años tienes?", "¿Cuánto tiempo tienes?", "¿Qué años tienes?"], correctAnswer: "¿Cuántos años tienes?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "¿Dónde?", back: "Gdzie?", example: "¿Dónde está la estación?", exampleTransl: "Gdzie jest dworzec?" },
                                    { front: "¿Qué?", back: "Co?", example: "¿Qué quieres hacer mañana?", exampleTransl: "Co chcesz robić jutro?" },
                                    { front: "¿Cuándo?", back: "Kiedy?", example: "¿Cuándo termina la clase?", exampleTransl: "Kiedy kończą się zajęcia?" },
                                    { front: "¿Quién?", back: "Kto?", example: "¿Quién llamó por teléfono?", exampleTransl: "Kto dzwonił przez telefon?" },
                                    { front: "¿Cuál?", back: "Który?", example: "¿Cuál prefieres?", exampleTransl: "Który wolisz?" }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Użycie czasu przeszłego Pretérito Imperfecto",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Yo hablaba", translation: "Ja mówiłem/am", example: "Yo hablaba con mis amigos todos los días.", exampleTransl: "Rozmawiałem/am z przyjaciółmi codziennie." },
                                    { word: "Tú vivías", translation: "Ty mieszkałeś/aś", example: "Tú vivías en Madrid cuando eras niño.", exampleTransl: "Mieszkałeś/aś w Madrycie, kiedy byłeś dzieckiem." },
                                    { word: "Él comía", translation: "On jadł", example: "Él comía pan todas las mañanas.", exampleTransl: "On jadł chleb każdego ranka." },
                                    { word: "Nosotros veíamos", translation: "My oglądaliśmy", example: "Nosotros veíamos películas los fines de semana.", exampleTransl: "Oglądaliśmy filmy w weekendy." },
                                    { word: "Ellos estudiaban", translation: "Oni się uczyli", example: "Ellos estudiaban juntos para los exámenes.", exampleTransl: "Oni uczyli się razem do egzaminów." },
                                    { word: "Yo trabajaba", translation: "Ja pracowałem/am", example: "Yo trabajaba en una oficina pequeña.", exampleTransl: "Pracowałem/am w małym biurze." },
                                    { word: "Tú escribías", translation: "Ty pisałeś/aś", example: "Tú escribías cartas largas.", exampleTransl: "Pisałeś/aś długie listy." },
                                    { word: "Nosotros jugábamos", translation: "My graliśmy", example: "Nosotros jugábamos al fútbol en el parque.", exampleTransl: "Graliśmy w piłkę nożną w parku." },
                                    { word: "Ellos leían", translation: "Oni czytali", example: "Ellos leían muchos libros.", exampleTransl: "Oni czytali dużo książek." },
                                    { word: "Ella vivía", translation: "Ona mieszkała", example: "Ella vivía en un pueblo pequeño.", exampleTransl: "Ona mieszkała w małej wiosce." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Ja mówiłem/am'?", options: ["Yo hablaba", "Yo hablé", "Yo estaba hablando"], correctAnswer: "Yo hablaba" },
                                    { question: "Co znaczy 'Nosotros veíamos películas los fines de semana'?", options: ["Oglądaliśmy filmy w weekendy.", "Oglądamy filmy w weekendy.", "Będziemy oglądać filmy w weekendy."], correctAnswer: "Oglądaliśmy filmy w weekendy." },
                                    { question: "Jak powiedzieć 'Ty mieszkałeś/aś w Madrycie'?", options: ["Tú vivías en Madrid.", "Tú viviste en Madrid.", "Tú vives en Madrid."], correctAnswer: "Tú vivías en Madrid." },
                                    { question: "Jak powiedzieć 'On jadł chleb każdego ranka'?", options: ["Él comía pan todas las mañanas.", "Él comió pan todas las mañanas.", "Él estaba comiendo pan todas las mañanas."], correctAnswer: "Él comía pan todas las mañanas." },
                                    { question: "Uzupełnij: Nosotros ___ (graliśmy) al fútbol en el parque.", options: ["jugábamos", "jugamos", "jugaste"], correctAnswer: "jugábamos" },
                                    { question: "Co znaczy 'Ellos leían muchos libros'?", options: ["Oni czytali dużo książek.", "Oni przeczytali dużo książek.", "Oni czytają dużo książek."], correctAnswer: "Oni czytali dużo książek." },
                                    { question: "Jak powiedzieć 'Ja pracowałem/am w małym biurze'?", options: ["Yo trabajaba en una oficina pequeña.", "Yo trabajé en una oficina pequeña.", "Yo trabajo en una oficina pequeña."], correctAnswer: "Yo trabajaba en una oficina pequeña." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: Ella ___ (mieszkała) en un pueblo pequeño.", options: ["vivía", "vivió", "vive"], correctAnswer: "vivía" },
                                    { question: "Jak powiedzieć 'Pisałeś/aś długie listy'?", options: ["Tú escribías cartas largas.", "Tú escribiste cartas largas.", "Tú escribes cartas largas."], correctAnswer: "Tú escribías cartas largas." },
                                    { question: "Co znaczy 'Nosotros jugábamos al fútbol en el parque'?", options: ["Graliśmy w piłkę nożną w parku.", "Gramy w piłkę nożną w parku.", "Zagraliśmy w piłkę nożną w parku."], correctAnswer: "Graliśmy w piłkę nożną w parku." },
                                    { question: "Jak powiedzieć 'Oni się uczyli razem do egzaminów'?", options: ["Ellos estudiaban juntos para los exámenes.", "Ellos estudian juntos para los exámenes.", "Ellos estudiaron juntos para los exámenes."], correctAnswer: "Ellos estudiaban juntos para los exámenes." },
                                    { question: "Uzupełnij: Yo ___ (czytałem/am) con mi hermana todas las noches.", options: ["leía", "leí", "leo"], correctAnswer: "leía" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Yo hablaba", back: "Ja mówiłem/am", example: "Yo hablaba mucho cuando era niño.", exampleTransl: "Dużo mówiłem/am, gdy byłem dzieckiem." },
                                    { front: "Ellos estudiaban", back: "Oni się uczyli", example: "Ellos estudiaban en la biblioteca.", exampleTransl: "Uczyli się w bibliotece." },
                                    { front: "Ella vivía", back: "Ona mieszkała", example: "Ella vivía cerca del parque.", exampleTransl: "Mieszkała blisko parku." },
                                    { front: "Nosotros jugábamos", back: "My graliśmy", example: "Nosotros jugábamos al tenis todos los días.", exampleTransl: "Graliśmy w tenisa codziennie." },
                                    { front: "Él comía", back: "On jadł", example: "Él comía muchas frutas.", exampleTransl: "On jadł dużo owoców." },
                                    { front: "Yo trabajaba", back: "Ja pracowałem/am", example: "Yo trabajaba en una cafetería.", exampleTransl: "Pracowałem/am w kawiarni." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Użycie czasu przyszłego Futuro Simple",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Yo hablaré", translation: "Ja będę mówić", example: "Mañana hablaré con mi jefe.", exampleTransl: "Jutro porozmawiam z moim szefem." },
                                    { word: "Tú vivirás", translation: "Ty będziesz mieszkać", example: "Tú vivirás en Madrid el próximo año.", exampleTransl: "Ty będziesz mieszkać w Madrycie w przyszłym roku." },
                                    { word: "Él comerá", translation: "On będzie jeść", example: "Él comerá una pizza esta noche.", exampleTransl: "On zje pizzę dziś wieczorem." },
                                    { word: "Nosotros iremos", translation: "My pójdziemy", example: "Nosotros iremos al cine el viernes.", exampleTransl: "My pójdziemy do kina w piątek." },
                                    { word: "Ellos trabajarán", translation: "Oni będą pracować", example: "Ellos trabajarán en el nuevo proyecto.", exampleTransl: "Oni będą pracować nad nowym projektem." },
                                    { word: "Yo estudiaré", translation: "Ja będę się uczyć", example: "Yo estudiaré para el examen mañana.", exampleTransl: "Będę się uczyć na egzamin jutro." },
                                    { word: "Tú escribirás", translation: "Ty będziesz pisać", example: "Tú escribirás una carta esta tarde.", exampleTransl: "Ty napiszesz list dziś po południu." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Ja będę mówić jutro'?", options: ["Yo hablaré mañana.", "Yo hablo mañana.", "Yo hablaba mañana."], correctAnswer: "Yo hablaré mañana." },
                                    { question: "Co znaczy 'Ellos trabajarán en el nuevo proyecto'?", options: ["Oni będą pracować nad nowym projektem.", "Oni pracują nad nowym projektem.", "Oni pracowali nad nowym projektem."], correctAnswer: "Oni będą pracować nad nowym projektem." },
                                    { question: "Jak powiedzieć 'My pójdziemy do kina w piątek'?", options: ["Nosotros iremos al cine el viernes.", "Nosotros vamos al cine el viernes.", "Nosotros íbamos al cine el viernes."], correctAnswer: "Nosotros iremos al cine el viernes." },
                                    { question: "Uzupełnij: Tú ___ (napiszesz) una carta esta tarde.", options: ["escribirás", "escribiste", "escribías"], correctAnswer: "escribirás" },
                                    { question: "Jak powiedzieć 'On zje pizzę dziś wieczorem'?", options: ["Él comerá una pizza esta noche.", "Él comía una pizza esta noche.", "Él comió una pizza esta noche."], correctAnswer: "Él comerá una pizza esta noche." },
                                    { question: "Uzupełnij: Yo ___ (będę się uczyć) para el examen mañana.", options: ["estudiaré", "estudié", "estudiaba"], correctAnswer: "estudiaré" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Będziesz mieszkać w Madrycie w przyszłym roku'?", options: ["Tú vivirás en Madrid el próximo año.", "Tú viviste en Madrid el próximo año.", "Tú vivías en Madrid el próximo año."], correctAnswer: "Tú vivirás en Madrid el próximo año." },
                                    { question: "Co znaczy 'Nosotros iremos al cine el viernes'?", options: ["My pójdziemy do kina w piątek.", "My chodziliśmy do kina w piątek.", "My chodzimy do kina w piątek."], correctAnswer: "My pójdziemy do kina w piątek." },
                                    { question: "Jak powiedzieć 'Oni będą pracować nad nowym projektem'?", options: ["Ellos trabajarán en el nuevo proyecto.", "Ellos trabajan en el nuevo proyecto.", "Ellos trabajaron en el nuevo proyecto."], correctAnswer: "Ellos trabajarán en el nuevo proyecto." },
                                    { question: "Uzupełnij: Yo ___ (będę mówić) con mi profesor mañana.", options: ["hablaré", "hablé", "hablaba"], correctAnswer: "hablaré" },
                                    { question: "Co znaczy 'Él comerá una pizza esta noche'?", options: ["On zje pizzę dziś wieczorem.", "On jadł pizzę dziś wieczorem.", "On je pizzę dziś wieczorem."], correctAnswer: "On zje pizzę dziś wieczorem." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Yo hablaré", back: "Ja będę mówić", example: "Yo hablaré con ellos mañana.", exampleTransl: "Będę z nimi rozmawiać jutro." },
                                    { front: "Tú vivirás", back: "Ty będziesz mieszkać", example: "Tú vivirás en una casa grande.", exampleTransl: "Ty będziesz mieszkać w dużym domu." },
                                    { front: "Nosotros iremos", back: "My pójdziemy", example: "Nosotros iremos al parque mañana.", exampleTransl: "Pójdziemy jutro do parku." },
                                    { front: "Ellos trabajarán", back: "Oni będą pracować", example: "Ellos trabajarán todo el fin de semana.", exampleTransl: "Oni będą pracować cały weekend." },
                                    { front: "Él comerá", back: "On będzie jeść", example: "Él comerá pasta mañana.", exampleTransl: "On zje makaron jutro." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Zdania warunkowe – Condicionales Tipo 1",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Si estudio, aprobaré", translation: "Jeśli będę się uczyć, zdam", example: "Si estudio mucho, aprobaré el examen.", exampleTransl: "Jeśli będę się dużo uczyć, zdam egzamin." },
                                    { word: "Si llueve, no iremos", translation: "Jeśli będzie padać, nie pójdziemy", example: "Si llueve mañana, no iremos al parque.", exampleTransl: "Jeśli jutro będzie padać, nie pójdziemy do parku." },
                                    { word: "Si tengo tiempo, te llamaré", translation: "Jeśli będę mieć czas, zadzwonię do ciebie", example: "Si tengo tiempo esta tarde, te llamaré.", exampleTransl: "Jeśli będę mieć czas dziś po południu, zadzwonię do ciebie." },
                                    { word: "Si trabajas, ganarás dinero", translation: "Jeśli będziesz pracować, zarobisz pieniądze", example: "Si trabajas duro, ganarás mucho dinero.", exampleTransl: "Jeśli będziesz ciężko pracować, zarobisz dużo pieniędzy." },
                                    { word: "Si hace sol, iremos a la playa", translation: "Jeśli będzie słońce, pójdziemy na plażę", example: "Si hace sol, iremos a la playa el sábado.", exampleTransl: "Jeśli będzie słońce, pójdziemy na plażę w sobotę." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Jeśli będę się uczyć, zdam egzamin'?", options: ["Si estudio, aprobaré el examen.", "Si estudio, apruebo el examen.", "Si estudias, aprobaré el examen."], correctAnswer: "Si estudio, aprobaré el examen." },
                                    { question: "Co znaczy 'Si llueve, no iremos al parque'?", options: ["Jeśli będzie padać, nie pójdziemy do parku.", "Jeśli będzie słońce, pójdziemy do parku.", "Nie pada, pójdziemy do parku."], correctAnswer: "Jeśli będzie padać, nie pójdziemy do parku." },
                                    { question: "Jak powiedzieć 'Jeśli będziesz pracować, zarobisz pieniądze'?", options: ["Si trabajas, ganarás dinero.", "Si trabajas, ganas dinero.", "Si trabajas, ganarás el dinero."], correctAnswer: "Si trabajas, ganarás dinero." },
                                    { question: "Uzupełnij: Si ___ (mieć) tiempo, te llamaré.", options: ["tengo", "tendré", "tienes"], correctAnswer: "tengo" },
                                    { question: "Jak powiedzieć 'Jeśli będzie słońce, pójdziemy na plażę'?", options: ["Si hace sol, iremos a la playa.", "Si hace sol, vamos a la playa.", "Si hará sol, iremos a la playa."], correctAnswer: "Si hace sol, iremos a la playa." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: Si estudio, ___ (zdam) el examen.", options: ["aprobaré", "aprobé", "apruebo"], correctAnswer: "aprobaré" },
                                    { question: "Jak powiedzieć 'Jeśli będę mieć czas, zadzwonię do ciebie'?", options: ["Si tengo tiempo, te llamaré.", "Si tendré tiempo, te llamo.", "Si tienes tiempo, te llamaré."], correctAnswer: "Si tengo tiempo, te llamaré." },
                                    { question: "Co znaczy 'Si hace sol, iremos a la playa el sábado'?", options: ["Jeśli będzie słońce, pójdziemy na plażę w sobotę.", "Jeśli będzie padać, pójdziemy na plażę w sobotę.", "Jeśli będzie słońce, pójdziemy na plażę jutro."], correctAnswer: "Jeśli będzie słońce, pójdziemy na plażę w sobotę." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Si estudio, aprobaré", back: "Jeśli będę się uczyć, zdam", example: "Si estudio mucho, aprobaré el examen.", exampleTransl: "Jeśli będę się dużo uczyć, zdam egzamin." },
                                    { front: "Si tengo tiempo, te llamaré", back: "Jeśli będę mieć czas, zadzwonię do ciebie", example: "Si tengo tiempo mañana, te llamaré.", exampleTransl: "Jeśli jutro będę mieć czas, zadzwonię do ciebie." },
                                    { front: "Si hace sol, iremos a la playa", back: "Jeśli będzie słońce, pójdziemy na plażę", example: "Si hace sol, iremos a la playa el sábado.", exampleTransl: "Jeśli będzie słońce, pójdziemy na plażę w sobotę." },
                                    { front: "Si trabajas, ganarás dinero", back: "Jeśli będziesz pracować, zarobisz pieniądze", example: "Si trabajas bien, ganarás más.", exampleTransl: "Jeśli będziesz dobrze pracować, zarobisz więcej." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Zdania warunkowe – Condicionales Tipo 2",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Si tuviera dinero, viajaría", translation: "Gdybym miał pieniądze, podróżowałbym", example: "Si tuviera más dinero, viajaría a Japón.", exampleTransl: "Gdybym miał więcej pieniędzy, podróżowałbym do Japonii." },
                                    { word: "Si fuera rico, compraría", translation: "Gdybym był bogaty, kupiłbym", example: "Si fuera rico, compraría una casa grande.", exampleTransl: "Gdybym był bogaty, kupiłbym duży dom." },
                                    { word: "Si estudiaras más, aprobarías", translation: "Gdybyś się więcej uczył, zdałbyś", example: "Si estudiaras más, aprobarías el examen.", exampleTransl: "Gdybyś się więcej uczył, zdałbyś egzamin." },
                                    { word: "Si tuviera tiempo, te ayudaría", translation: "Gdybym miał czas, pomógłbym ci", example: "Si tuviera más tiempo, te ayudaría con el trabajo.", exampleTransl: "Gdybym miał więcej czasu, pomógłbym ci z pracą." },
                                    { word: "Si hiciera buen tiempo, iríamos", translation: "Gdyby była dobra pogoda, poszlibyśmy", example: "Si hiciera buen tiempo, iríamos a la playa.", exampleTransl: "Gdyby była dobra pogoda, poszlibyśmy na plażę." },
                                    { word: "Si supieras la verdad, cambiarías de opinión", translation: "Gdybyś znał prawdę, zmieniłbyś zdanie", example: "Si supieras la verdad, cambiarías de opinión.", exampleTransl: "Gdybyś znał prawdę, zmieniłbyś zdanie." },
                                    { word: "Si ganáramos la lotería, dejaríamos de trabajar", translation: "Gdybyśmy wygrali na loterii, przestalibyśmy pracować", example: "Si ganáramos la lotería, dejaríamos de trabajar.", exampleTransl: "Gdybyśmy wygrali na loterii, przestalibyśmy pracować." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Gdybym miał więcej pieniędzy, podróżowałbym do Japonii'?", options: ["Si tuviera más dinero, viajaría a Japón.", "Si tengo más dinero, viajaré a Japón.", "Si tenía más dinero, viajaba a Japón."], correctAnswer: "Si tuviera más dinero, viajaría a Japón." },
                                    { question: "Co znaczy 'Si fuera rico, compraría una casa grande'?", options: ["Gdybym był bogaty, kupiłbym duży dom.", "Jeśli będę bogaty, kupię duży dom.", "Gdybym był bogaty, kupuję duży dom."], correctAnswer: "Gdybym był bogaty, kupiłbym duży dom." },
                                    { question: "Jak powiedzieć 'Gdybyś się więcej uczył, zdałbyś egzamin'?", options: ["Si estudiaras más, aprobarías el examen.", "Si estudias más, aprobarás el examen.", "Si estudiaste más, aprobaste el examen."], correctAnswer: "Si estudiaras más, aprobarías el examen." },
                                    { question: "Uzupełnij: Si ___ (mieć) czas, te ayudaría.", options: ["tuviera", "tuviera", "tuve"], correctAnswer: "tuviera" },
                                    { question: "Jak powiedzieć 'Gdyby była dobra pogoda, poszlibyśmy na plażę'?", options: ["Si hiciera buen tiempo, iríamos a la playa.", "Si hace buen tiempo, vamos a la playa.", "Si hacía buen tiempo, íbamos a la playa."], correctAnswer: "Si hiciera buen tiempo, iríamos a la playa." },
                                    { question: "Uzupełnij: Si ___ (znać) prawdę, cambiarías de opinión.", options: ["supieras", "supiste", "supieras"], correctAnswer: "supieras" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Gdybyśmy wygrali na loterii, przestalibyśmy pracować'?", options: ["Si ganáramos la lotería, dejaríamos de trabajar.", "Si ganamos la lotería, dejamos de trabajar.", "Si ganábamos la lotería, dejábamos de trabajar."], correctAnswer: "Si ganáramos la lotería, dejaríamos de trabajar." },
                                    { question: "Co znaczy 'Si supieras la verdad, cambiarías de opinión'?", options: ["Gdybyś znał prawdę, zmieniłbyś zdanie.", "Jeśli poznasz prawdę, zmienisz zdanie.", "Jeśli znałeś prawdę, zmieniłeś zdanie."], correctAnswer: "Gdybyś znał prawdę, zmieniłbyś zdanie." },
                                    { question: "Jak powiedzieć 'Gdybym miał czas, pomógłbym ci'?", options: ["Si tuviera tiempo, te ayudaría.", "Si tuve tiempo, te ayudé.", "Si tengo tiempo, te ayudaré."], correctAnswer: "Si tuviera tiempo, te ayudaría." },
                                    { question: "Uzupełnij: Si ganáramos la lotería, ___ (przestalibyśmy) de trabajar.", options: ["dejaríamos", "dejábamos", "dejamos"], correctAnswer: "dejaríamos" },
                                    { question: "Jak powiedzieć 'Gdybym był bogaty, kupiłbym nowy samochód'?", options: ["Si fuera rico, compraría un coche nuevo.", "Si soy rico, compraré un coche nuevo.", "Si fui rico, compré un coche nuevo."], correctAnswer: "Si fuera rico, compraría un coche nuevo." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Si tuviera dinero, viajaría", back: "Gdybym miał pieniądze, podróżowałbym", example: "Si tuviera dinero, viajaría a Italia.", exampleTransl: "Gdybym miał pieniądze, podróżowałbym do Włoch." },
                                    { front: "Si fuera rico, compraría", back: "Gdybym był bogaty, kupiłbym", example: "Si fuera rico, compraría un barco.", exampleTransl: "Gdybym był bogaty, kupiłbym statek." },
                                    { front: "Si estudiaras más, aprobarías", back: "Gdybyś się więcej uczył, zdałbyś", example: "Si estudiaras más, aprobarías todas las pruebas.", exampleTransl: "Gdybyś się więcej uczył, zdałbyś wszystkie testy." },
                                    { front: "Si tuviera tiempo, te ayudaría", back: "Gdybym miał czas, pomógłbym ci", example: "Si tuviera tiempo, te ayudaría a limpiar la casa.", exampleTransl: "Gdybym miał czas, pomógłbym ci posprzątać dom." },
                                    { front: "Si hiciera buen tiempo, iríamos", back: "Gdyby była dobra pogoda, poszlibyśmy", example: "Si hiciera buen tiempo, iríamos al parque.", exampleTransl: "Gdyby była dobra pogoda, poszlibyśmy do parku." }
                                  ],
                                },
                              ],
                            }                       
                          ]
                        },
                        {
                          title:"B2 - Średniozaawansowany wyższy",
                          subItems:[
                            {
                              title: "Mowa zależna – Estilo Indirecto",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Dijo que estaba ocupado", translation: "Powiedział, że jest zajęty", example: "Juan dijo que estaba ocupado.", exampleTransl: "Juan powiedział, że jest zajęty." },
                                    { word: "Preguntó si quería ir", translation: "Zapytał, czy chciałem iść", example: "Ella preguntó si quería ir al cine.", exampleTransl: "Ona zapytała, czy chciałem iść do kina." },
                                    { word: "Afirmó que sabía la respuesta", translation: "Stwierdził, że zna odpowiedź", example: "Él afirmó que sabía la respuesta.", exampleTransl: "On stwierdził, że zna odpowiedź." },
                                    { word: "Comentaron que no vendrían", translation: "Powiedzieli, że nie przyjdą", example: "Ellos comentaron que no vendrían a la fiesta.", exampleTransl: "Powiedzieli, że nie przyjdą na imprezę." },
                                    { word: "Respondió que no podía hacerlo", translation: "Odpowiedział, że nie może tego zrobić", example: "Respondió que no podía hacerlo ahora.", exampleTransl: "Odpowiedział, że nie może tego zrobić teraz." },
                                    { word: "Me dijeron que llegaría tarde", translation: "Powiedzieli mi, że się spóźnię", example: "Me dijeron que llegaría tarde al trabajo.", exampleTransl: "Powiedzieli mi, że się spóźnię do pracy." },
                                    { word: "Aseguraron que todo estaba bien", translation: "Zapewnili, że wszystko jest w porządku", example: "Aseguraron que todo estaba bien con el proyecto.", exampleTransl: "Zapewnili, że wszystko jest w porządku z projektem." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Powiedział, że jest zajęty'?", options: ["Dijo que estaba ocupado.", "Dice que está ocupado.", "Estaba ocupado."], correctAnswer: "Dijo que estaba ocupado." },
                                    { question: "Co znaczy 'Preguntó si quería ir al cine'?", options: ["Zapytał, czy chciałem iść do kina.", "Powiedział, że idzie do kina.", "Zapytał, dlaczego chciałem iść do kina."], correctAnswer: "Zapytał, czy chciałem iść do kina." },
                                    { question: "Jak powiedzieć 'Powiedzieli mi, że się spóźnię do pracy'?", options: ["Me dijeron que llegaría tarde al trabajo.", "Me dijeron que llegaré tarde al trabajo.", "Me dijeron que llego tarde al trabajo."], correctAnswer: "Me dijeron que llegaría tarde al trabajo." },
                                    { question: "Co znaczy 'Aseguraron que todo estaba bien'?", options: ["Zapewnili, że wszystko jest w porządku.", "Powiedzieli, że wszystko jest gotowe.", "Zapewnili, że wszystko jest złe."], correctAnswer: "Zapewnili, że wszystko jest w porządku." },
                                    { question: "Jak powiedzieć 'Odpowiedział, że nie może tego zrobić teraz'?", options: ["Respondió que no podía hacerlo ahora.", "Respondió que no puede hacerlo ahora.", "Respondió que no podría hacerlo ahora."], correctAnswer: "Respondió que no podía hacerlo ahora." },
                                    { question: "Uzupełnij: Juan ___ (powiedział), que llegaría tarde.", options: ["dijo", "dice", "decía"], correctAnswer: "dijo" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Zapewnili, że wszystko jest w porządku z projektem'?", options: ["Aseguraron que todo estaba bien con el proyecto.", "Aseguraron que todo estará bien con el proyecto.", "Aseguraron que todo está bien con el proyecto."], correctAnswer: "Aseguraron que todo estaba bien con el proyecto." },
                                    { question: "Co znaczy 'Dijo que estaba ocupado con trabajo'?", options: ["Powiedział, że jest zajęty pracą.", "Powiedział, że skończył pracę.", "Powiedział, że nie ma pracy."], correctAnswer: "Powiedział, że jest zajęty pracą." },
                                    { question: "Jak powiedzieć 'Zapytał, czy chcę przyjść'?", options: ["Preguntó si quería venir.", "Preguntó si quieres venir.", "Preguntó si querrías venir."], correctAnswer: "Preguntó si quería venir." },
                                    { question: "Uzupełnij: Ellos ___ (powiedzieli), que no vendrían a la fiesta.", options: ["comentaron", "dijeron", "afirmaron"], correctAnswer: "comentaron" },
                                    { question: "Jak powiedzieć 'Stwierdził, że zna odpowiedź'?", options: ["Afirmó que sabía la respuesta.", "Dijo que sabía la respuesta.", "Comentó que sabía la respuesta."], correctAnswer: "Afirmó que sabía la respuesta." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Dijo que estaba ocupado", back: "Powiedział, że jest zajęty", example: "Él dijo que estaba ocupado con trabajo.", exampleTransl: "Powiedział, że jest zajęty pracą." },
                                    { front: "Preguntó si quería ir", back: "Zapytał, czy chciałem iść", example: "Él preguntó si quería ir al museo.", exampleTransl: "Zapytał, czy chciałem iść do muzeum." },
                                    { front: "Comentaron que no vendrían", back: "Powiedzieli, że nie przyjdą", example: "Ellos comentaron que no vendrían por la lluvia.", exampleTransl: "Powiedzieli, że nie przyjdą z powodu deszczu." },
                                    { front: "Aseguraron que todo estaba bien", back: "Zapewnili, że wszystko jest w porządku", example: "Ellos aseguraron que todo estaba bien con el proyecto.", exampleTransl: "Zapewnili, że wszystko jest w porządku z projektem." },
                                    { front: "Me dijeron que llegaría tarde", back: "Powiedzieli mi, że się spóźnię", example: "Me dijeron que llegaría tarde al trabajo.", exampleTransl: "Powiedzieli mi, że się spóźnię do pracy." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Wyrażenia z subjuntivo – Expresiones con Subjuntivo",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Espero que vengas", translation: "Mam nadzieję, że przyjdziesz", example: "Espero que vengas a mi cumpleaños.", exampleTransl: "Mam nadzieję, że przyjdziesz na moje urodziny." },
                                    { word: "Es importante que estudies", translation: "Ważne jest, żebyś się uczył/a", example: "Es importante que estudies para el examen.", exampleTransl: "Ważne jest, żebyś się uczył/a na egzamin." },
                                    { word: "Quiero que me ayudes", translation: "Chcę, żebyś mi pomógł/a", example: "Quiero que me ayudes con el proyecto.", exampleTransl: "Chcę, żebyś mi pomógł/a z projektem." },
                                    { word: "Dudo que sea verdad", translation: "Wątpię, że to prawda", example: "Dudo que lo que dijo sea verdad.", exampleTransl: "Wątpię, że to, co powiedział, jest prawdą." },
                                    { word: "Es necesario que llegues temprano", translation: "Konieczne jest, żebyś przyszedł wcześniej", example: "Es necesario que llegues temprano mañana.", exampleTransl: "Konieczne jest, żebyś przyszedł wcześniej jutro." },
                                    { word: "No creo que tengan razón", translation: "Nie sądzę, żeby mieli rację", example: "No creo que tengan razón en esto.", exampleTransl: "Nie sądzę, żeby mieli rację w tej sprawie." },
                                    { word: "Es posible que llueva mañana", translation: "Możliwe, że jutro będzie padać", example: "Es posible que llueva mañana por la tarde.", exampleTransl: "Możliwe, że jutro po południu będzie padać." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Mam nadzieję, że przyjdziesz na moje urodziny'?", options: ["Espero que vengas a mi cumpleaños.", "Espero que vienes a mi cumpleaños.", "Espero que vengas en mi cumpleaños."], correctAnswer: "Espero que vengas a mi cumpleaños." },
                                    { question: "Co znaczy 'Es importante que estudies para el examen'?", options: ["Ważne jest, żebyś się uczył/a na egzamin.", "Ważne jest, że uczysz się na egzamin.", "Ważne jest, żebyś studiował/a egzamin."], correctAnswer: "Ważne jest, żebyś się uczył/a na egzamin." },
                                    { question: "Jak powiedzieć 'Chcę, żebyś mi pomógł/a z projektem'?", options: ["Quiero que me ayudes con el proyecto.", "Quiero que ayudas con el proyecto.", "Quiero que me ayudas con el proyecto."], correctAnswer: "Quiero que me ayudes con el proyecto." },
                                    { question: "Uzupełnij: Dudo que ___ (być) verdad.", options: ["sea", "es", "esté"], correctAnswer: "sea" },
                                    { question: "Jak powiedzieć 'Konieczne jest, żebyś przyszedł wcześniej'?", options: ["Es necesario que llegues temprano.", "Es necesario que llegas temprano.", "Es necesario que llegará temprano."], correctAnswer: "Es necesario que llegues temprano." },
                                    { question: "Jak powiedzieć 'Możliwe, że jutro będzie padać'?", options: ["Es posible que llueva mañana.", "Es posible que llueve mañana.", "Es posible que llovió mañana."], correctAnswer: "Es posible que llueva mañana." },
                                    { question: "Co znaczy 'No creo que tengan razón'?", options: ["Nie sądzę, żeby mieli rację.", "Nie wierzę, że to jest prawda.", "Nie sądzę, żeby to była prawda."], correctAnswer: "Nie sądzę, żeby mieli rację." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Mam nadzieję, że jutro przyniesiesz książkę'?", options: ["Espero que traigas el libro mañana.", "Espero que traes el libro mañana.", "Espero que trajiste el libro mañana."], correctAnswer: "Espero que traigas el libro mañana." },
                                    { question: "Co znaczy 'Quiero que me ayudes con el proyecto'?", options: ["Chcę, żebyś mi pomógł/a z projektem.", "Chcę pomóc z projektem.", "Chcę, żebyś pomógł z projektem."], correctAnswer: "Chcę, żebyś mi pomógł/a z projektem." },
                                    { question: "Uzupełnij: Es importante que ___ (uczyć się) mucho.", options: ["estudies", "estudias", "estudiar"], correctAnswer: "estudies" },
                                    { question: "Co znaczy 'Es posible que llueva mañana'?", options: ["Możliwe, że jutro będzie padać.", "Wierzę, że jutro będzie padać.", "Nie będzie padać jutro."], correctAnswer: "Możliwe, że jutro będzie padać." },
                                    { question: "Jak powiedzieć 'Nie sądzę, żeby mieli rację'?", options: ["No creo que tengan razón.", "No creo que tienen razón.", "No creo que tuvieron razón."], correctAnswer: "No creo que tengan razón." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Espero que vengas", back: "Mam nadzieję, że przyjdziesz", example: "Espero que vengas esta tarde.", exampleTransl: "Mam nadzieję, że przyjdziesz dziś po południu." },
                                    { front: "Es importante que estudies", back: "Ważne jest, żebyś się uczył/a", example: "Es importante que estudies cada día.", exampleTransl: "Ważne jest, żebyś się uczył/a codziennie." },
                                    { front: "Dudo que sea verdad", back: "Wątpię, że to prawda", example: "Dudo que lo que dice sea cierto.", exampleTransl: "Wątpię, że to, co mówi, jest prawdą." },
                                    { front: "Es necesario que llegues temprano", back: "Konieczne jest, żebyś przyszedł wcześniej", example: "Es necesario que llegues temprano para la reunión.", exampleTransl: "Konieczne jest, żebyś przyszedł wcześniej na spotkanie." },
                                    { front: "Es posible que llueva mañana", back: "Możliwe, że jutro będzie padać", example: "Es posible que llueva por la mañana.", exampleTransl: "Możliwe, że będzie padać rano." },
                                    { front: "No creo que tengan razón", back: "Nie sądzę, żeby mieli rację", example: "No creo que tengan razón sobre ese tema.", exampleTransl: "Nie sądzę, żeby mieli rację na ten temat." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Złożone wyrażenia przyimkowe – Expresiones Preposicionales",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "A pesar de", translation: "Pomimo", example: "A pesar de la lluvia, salimos a caminar.", exampleTransl: "Pomimo deszczu wyszliśmy na spacer." },
                                    { word: "En lugar de", translation: "Zamiast", example: "En lugar de estudiar, jugó videojuegos.", exampleTransl: "Zamiast się uczyć, grał w gry." },
                                    { word: "Por lo tanto", translation: "Dlatego", example: "No tengo dinero, por lo tanto, no puedo ir.", exampleTransl: "Nie mam pieniędzy, dlatego nie mogę iść." },
                                    { word: "Con respecto a", translation: "W odniesieniu do", example: "Con respecto a tu pregunta, no tengo respuesta.", exampleTransl: "W odniesieniu do twojego pytania, nie mam odpowiedzi." },
                                    { word: "De acuerdo con", translation: "Zgodnie z", example: "De acuerdo con las reglas, no puedes correr aquí.", exampleTransl: "Zgodnie z zasadami, nie możesz tutaj biegać." },
                                    { word: "En vez de", translation: "Zamiast", example: "En vez de salir, decidimos quedarnos en casa.", exampleTransl: "Zamiast wyjść, postanowiliśmy zostać w domu." },
                                    { word: "A causa de", translation: "Z powodu", example: "A causa del tráfico, llegamos tarde.", exampleTransl: "Z powodu korków, spóźniliśmy się." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Pomimo deszczu wyszliśmy na spacer'?", options: ["A pesar de la lluvia, salimos a caminar.", "En lugar de la lluvia, salimos a caminar.", "Por lo tanto, salimos a caminar."], correctAnswer: "A pesar de la lluvia, salimos a caminar." },
                                    { question: "Co znaczy 'En lugar de estudiar, jugó videojuegos'?", options: ["Zamiast się uczyć, grał w gry.", "Zamiast grać w gry, uczył się.", "Dlatego grał w gry."], correctAnswer: "Zamiast się uczyć, grał w gry." },
                                    { question: "Jak powiedzieć 'Zgodnie z zasadami, nie możesz tutaj biegać'?", options: ["De acuerdo con las reglas, no puedes correr aquí.", "A causa de las reglas, no puedes correr aquí.", "Con respecto a las reglas, no puedes correr aquí."], correctAnswer: "De acuerdo con las reglas, no puedes correr aquí." },
                                    { question: "Jak powiedzieć 'Dlatego nie mogę iść'?", options: ["Por lo tanto, no puedo ir.", "A pesar de, no puedo ir.", "En lugar de, no puedo ir."], correctAnswer: "Por lo tanto, no puedo ir." },
                                    { question: "Co znaczy 'En vez de salir, decidimos quedarnos en casa'?", options: ["Zamiast wyjść, postanowiliśmy zostać w domu.", "Z powodu wyjścia, zostaliśmy w domu.", "Pomimo wyjścia, zostaliśmy w domu."], correctAnswer: "Zamiast wyjść, postanowiliśmy zostać w domu." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Z powodu korków spóźniliśmy się'?", options: ["A causa del tráfico, llegamos tarde.", "Por lo tanto del tráfico, llegamos tarde.", "En lugar del tráfico, llegamos tarde."], correctAnswer: "A causa del tráfico, llegamos tarde." },
                                    { question: "Co znaczy 'Con respecto a tu pregunta, no tengo respuesta'?", options: ["W odniesieniu do twojego pytania, nie mam odpowiedzi.", "Z powodu twojego pytania, nie mam odpowiedzi.", "Pomimo twojego pytania, nie mam odpowiedzi."], correctAnswer: "W odniesieniu do twojego pytania, nie mam odpowiedzi." },
                                    { question: "Jak powiedzieć 'Pomimo deszczu, wyszliśmy na spacer'?", options: ["A pesar de la lluvia, salimos a caminar.", "Por lo tanto de la lluvia, salimos a caminar.", "En lugar de la lluvia, salimos a caminar."], correctAnswer: "A pesar de la lluvia, salimos a caminar." },
                                    { question: "Uzupełnij: En vez de ___ (wyjść), decidimos quedarnos en casa.", options: ["salir", "salimos", "saliendo"], correctAnswer: "salir" },
                                    { question: "Jak powiedzieć 'Dlatego nie mogę iść'?", options: ["Por lo tanto, no puedo ir.", "De acuerdo con, no puedo ir.", "A pesar de, no puedo ir."], correctAnswer: "Por lo tanto, no puedo ir." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "A pesar de", back: "Pomimo", example: "A pesar de sus problemas, siempre está feliz.", exampleTransl: "Pomimo swoich problemów, zawsze jest szczęśliwy." },
                                    { front: "En lugar de", back: "Zamiast", example: "En lugar de llorar, decidió luchar.", exampleTransl: "Zamiast płakać, postanowił walczyć." },
                                    { front: "Por lo tanto", back: "Dlatego", example: "Está cansado, por lo tanto, necesita descansar.", exampleTransl: "Jest zmęczony, dlatego musi odpocząć." },
                                    { front: "Con respecto a", back: "W odniesieniu do", example: "Con respecto a la reunión, ¿puedes venir?", exampleTransl: "W odniesieniu do spotkania, czy możesz przyjść?" },
                                    { front: "De acuerdo con", back: "Zgodnie z", example: "De acuerdo con las normas, es obligatorio usar casco.", exampleTransl: "Zgodnie z zasadami, noszenie kasku jest obowiązkowe." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Prowadzenie formalnej korespondencji – Correspondencia Formal",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Estimado/a", translation: "Szanowny/a", example: "Estimado señor Pérez,", exampleTransl: "Szanowny Panie Pérez," },
                                    { word: "Atentamente", translation: "Z poważaniem", example: "Le saluda atentamente,", exampleTransl: "Z poważaniem," },
                                    { word: "Por la presente", translation: "Niniejszym", example: "Por la presente le informamos...", exampleTransl: "Niniejszym informujemy Pana..." },
                                    { word: "Agradezco de antemano", translation: "Z góry dziękuję", example: "Agradezco de antemano su atención.", exampleTransl: "Z góry dziękuję za Pana uwagę." },
                                    { word: "Adjunto", translation: "W załączniku", example: "Adjunto encontrará los documentos solicitados.", exampleTransl: "W załączniku znajdzie Pan żądane dokumenty." },
                                    { word: "En respuesta a", translation: "W odpowiedzi na", example: "En respuesta a su correo...", exampleTransl: "W odpowiedzi na Pański e-mail..." },
                                    { word: "Con motivo de", translation: "Z powodu", example: "Con motivo de su consulta...", exampleTransl: "W związku z Pańskim zapytaniem..." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Z poważaniem' w formalnym liście?", options: ["Atentamente", "Estimado/a", "Adjunto"], correctAnswer: "Atentamente" },
                                    { question: "Co znaczy 'En respuesta a su correo'?", options: ["W odpowiedzi na Pański e-mail.", "W załączniku do Pańskiego e-maila.", "W odpowiedzi na Pańską uwagę."], correctAnswer: "W odpowiedzi na Pański e-mail." },
                                    { question: "Jak powiedzieć 'Z góry dziękuję za Pana uwagę'?", options: ["Agradezco de antemano su atención.", "Atentamente su atención.", "Con motivo de su atención."], correctAnswer: "Agradezco de antemano su atención." },
                                    { question: "Jak powiedzieć 'W załączniku znajdzie Pan żądane dokumenty'?", options: ["Adjunto encontrará los documentos solicitados.", "Atentamente encontrará los documentos solicitados.", "Por la presente encontrará los documentos solicitados."], correctAnswer: "Adjunto encontrará los documentos solicitados." },
                                    { question: "Co znaczy 'Estimado señor Pérez'?", options: ["Szanowny Panie Pérez.", "Z poważaniem Pan Pérez.", "W związku z Panem Pérez."], correctAnswer: "Szanowny Panie Pérez." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Niniejszym informujemy Pana o zmianach'?", options: ["Por la presente le informamos sobre los cambios.", "Adjunto le informamos sobre los cambios.", "Con motivo de le informamos sobre los cambios."], correctAnswer: "Por la presente le informamos sobre los cambios." },
                                    { question: "Co znaczy 'Agradezco de antemano su atención'?", options: ["Z góry dziękuję za Pana uwagę.", "Dziękuję za Pański załącznik.", "Proszę o uwagę z wyprzedzeniem."], correctAnswer: "Z góry dziękuję za Pana uwagę." },
                                    { question: "Jak powiedzieć 'W załączniku znajdą Państwo fakturę'?", options: ["Adjunto encontrará la factura.", "Por la presente encontrará la factura.", "Estimado encontrará la factura."], correctAnswer: "Adjunto encontrará la factura." },
                                    { question: "Jak powiedzieć 'Szanowna Pani Gómez'?", options: ["Estimada señora Gómez.", "Atentamente señora Gómez.", "Adjunta señora Gómez."], correctAnswer: "Estimada señora Gómez." },
                                    { question: "Co znaczy 'Con motivo de su consulta'?", options: ["W związku z Pańskim zapytaniem.", "W załączniku do Pańskiego zapytania.", "Z powodu Pańskiego załącznika."], correctAnswer: "W związku z Pańskim zapytaniem." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Estimado/a", back: "Szanowny/a", example: "Estimado cliente, le informamos que...", exampleTransl: "Szanowny Kliencie, informujemy Pana, że..." },
                                    { front: "Atentamente", back: "Z poważaniem", example: "Le saluda atentamente, Juan López.", exampleTransl: "Z poważaniem, Juan López." },
                                    { front: "Adjunto", back: "W załączniku", example: "Adjunto encontrará el contrato.", exampleTransl: "W załączniku znajdzie Pan umowę." },
                                    { front: "En respuesta a", back: "W odpowiedzi na", example: "En respuesta a su carta, queremos informarle que...", exampleTransl: "W odpowiedzi na Pański list chcemy poinformować, że..." },
                                    { front: "Agradezco de antemano", back: "Z góry dziękuję", example: "Agradezco de antemano su comprensión.", exampleTransl: "Z góry dziękuję za Pana zrozumienie." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Retoryka i argumentacja – Retórica y Argumentación",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "En primer lugar", translation: "Po pierwsze", example: "En primer lugar, necesitamos analizar los datos.", exampleTransl: "Po pierwsze, musimy przeanalizować dane." },
                                    { word: "Además", translation: "Ponadto", example: "Además, es importante considerar las consecuencias.", exampleTransl: "Ponadto, ważne jest uwzględnienie konsekwencji." },
                                    { word: "Por otro lado", translation: "Z drugiej strony", example: "Por otro lado, esta solución tiene desventajas.", exampleTransl: "Z drugiej strony, to rozwiązanie ma wady." },
                                    { word: "En conclusión", translation: "Podsumowując", example: "En conclusión, debemos actuar de inmediato.", exampleTransl: "Podsumowując, musimy działać natychmiast." },
                                    { word: "Por supuesto", translation: "Oczywiście", example: "Por supuesto, podemos considerar otras opciones.", exampleTransl: "Oczywiście, możemy rozważyć inne opcje." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Po pierwsze musimy przeanalizować dane'?", options: ["En primer lugar, necesitamos analizar los datos.", "En conclusión, necesitamos analizar los datos.", "Por otro lado, necesitamos analizar los datos."], correctAnswer: "En primer lugar, necesitamos analizar los datos." },
                                    { question: "Co znaczy 'Además, es importante considerar las consecuencias'?", options: ["Ponadto, ważne jest uwzględnienie konsekwencji.", "Z drugiej strony, ważne jest uwzględnienie konsekwencji.", "Podsumowując, ważne jest uwzględnienie konsekwencji."], correctAnswer: "Ponadto, ważne jest uwzględnienie konsekwencji." },
                                    { question: "Jak powiedzieć 'Z drugiej strony to rozwiązanie ma wady'?", options: ["Por otro lado, esta solución tiene desventajas.", "En conclusión, esta solución tiene desventajas.", "Por supuesto, esta solución tiene desventajas."], correctAnswer: "Por otro lado, esta solución tiene desventajas." },
                                    { question: "Co znaczy 'En conclusión, debemos actuar de inmediato'?", options: ["Podsumowując, musimy działać natychmiast.", "Z drugiej strony, musimy działać natychmiast.", "Ponadto, musimy działać natychmiast."], correctAnswer: "Podsumowując, musimy działać natychmiast." },
                                    { question: "Jak powiedzieć 'Oczywiście, możemy rozważyć inne opcje'?", options: ["Por supuesto, podemos considerar otras opciones.", "Además, podemos considerar otras opciones.", "Por otro lado, podemos considerar otras opciones."], correctAnswer: "Por supuesto, podemos considerar otras opciones." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Podsumowując, musimy działać natychmiast'?", options: ["En conclusión, debemos actuar de inmediato.", "Además, debemos actuar de inmediato.", "Por supuesto, debemos actuar de inmediato."], correctAnswer: "En conclusión, debemos actuar de inmediato." },
                                    { question: "Co znaczy 'Por otro lado, esta solución tiene desventajas'?", options: ["Z drugiej strony, to rozwiązanie ma wady.", "Podsumowując, to rozwiązanie ma wady.", "Ponadto, to rozwiązanie ma wady."], correctAnswer: "Z drugiej strony, to rozwiązanie ma wady." },
                                    { question: "Jak powiedzieć 'Oczywiście, możemy rozważyć inne opcje'?", options: ["Por supuesto, podemos considerar otras opciones.", "Además, podemos considerar otras opciones.", "Por otro lado, podemos considerar otras opciones."], correctAnswer: "Por supuesto, podemos considerar otras opciones." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "En primer lugar", back: "Po pierwsze", example: "En primer lugar, tenemos que revisar los datos.", exampleTransl: "Po pierwsze, musimy przejrzeć dane." },
                                    { front: "Además", back: "Ponadto", example: "Además, necesitamos analizar los costos.", exampleTransl: "Ponadto, musimy przeanalizować koszty." },
                                    { front: "En conclusión", back: "Podsumowując", example: "En conclusión, esta es la mejor opción.", exampleTransl: "Podsumowując, to jest najlepsza opcja." },
                                    { front: "Por supuesto", back: "Oczywiście", example: "Por supuesto, podemos discutir más detalles.", exampleTransl: "Oczywiście, możemy omówić więcej szczegółów." }
                                  ],
                                },
                              ],
                            }
                          ]
                        }
                      ],
                    },
                    {
                      language: "Włoski",
                      title: "Lekcje Włoskiego",
                      subItems: [
                        {
                          title: "A1 - Początkujący",
                          subItems: [
                            {
                              title: "Powitania, zwroty grzecznościowe",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Ciao", translation: "Cześć", example: "Ciao, come stai?", exampleTransl: "Cześć, jak się masz?" },
                                    { word: "Buongiorno", translation: "Dzień dobry", example: "Buongiorno, signore.", exampleTransl: "Dzień dobry, proszę pana." },
                                    { word: "Buonasera", translation: "Dobry wieczór", example: "Buonasera a tutti.", exampleTransl: "Dobry wieczór wszystkim." },
                                    { word: "Arrivederci", translation: "Do widzenia", example: "Arrivederci, a presto.", exampleTransl: "Do widzenia, do zobaczenia wkrótce." },
                                    { word: "Per favore", translation: "Proszę", example: "Un caffè, per favore.", exampleTransl: "Kawę, proszę." },
                                    { word: "Grazie", translation: "Dziękuję", example: "Grazie per il tuo aiuto.", exampleTransl: "Dziękuję za twoją pomoc." },
                                    { word: "Sì", translation: "Tak", example: "Sì, mi piacerebbe.", exampleTransl: "Tak, chciałbym." },
                                    { word: "No", translation: "Nie", example: "No, non ho bisogno.", exampleTransl: "Nie, nie potrzebuję." },
                                    { word: "Scusa", translation: "Przepraszam", example: "Scusa, dov'è il bagno?", exampleTransl: "Przepraszam, gdzie jest łazienka?" },
                                    { word: "Piacere", translation: "Miło mi", example: "Ciao, piacere di conoscerti.", exampleTransl: "Cześć, miło cię poznać." },
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Dziękuję' po włosku?", options: ["Grazie", "Per favore", "Ciao"], correctAnswer: "Grazie" },
                                    { question: "Co znaczy 'Arrivederci'?", options: ["Cześć", "Do widzenia", "Przepraszam"], correctAnswer: "Do widzenia" },
                                    { question: "Jak zapytasz o imię?", options: ["Come ti chiami?", "Come stai?", "Di dove sei?"], correctAnswer: "Come ti chiami?" },
                                    { question: "Jak powiedzieć 'Przepraszam' w prośbie o uwagę?", options: ["Scusa", "Grazie", "Per favore"], correctAnswer: "Scusa" },
                                    { question: "Co znaczy 'Sì'?", options: ["Tak", "Nie", "Może"], correctAnswer: "Tak" },
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Uzupełnij: ___, mi chiamo Luca.", options: ["Ciao", "Arrivederci", "Per favore"], correctAnswer: "Ciao" },
                                    { question: "Jak się przywitasz rano?", options: ["Buongiorno", "Buonasera", "Buonanotte"], correctAnswer: "Buongiorno" },
                                    { question: "Co powiesz, gdy kogoś poznasz?", options: ["Piacere", "A presto", "Arrivederci"], correctAnswer: "Piacere" },
                                    { question: "Jak powiedzieć 'Proszę' w prośbie?", options: ["Per favore", "Grazie", "Scusa"], correctAnswer: "Per favore" },
                                    { question: "Co znaczy 'No'?", options: ["Tak", "Nie", "Może"], correctAnswer: "Nie" },
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Buonanotte", back: "Dobranoc", example: "Buonanotte e sogni d'oro.", exampleTransl: "Dobranoc i kolorowych snów." },
                                    { front: "A presto", back: "Do zobaczenia wkrótce", example: "Ciao, a presto!", exampleTransl: "Cześć, do zobaczenia wkrótce!" },
                                    { front: "Mi dispiace", back: "Przykro mi", example: "Mi dispiace, non posso venire.", exampleTransl: "Przykro mi, nie mogę przyjść." },
                                    { front: "Prego", back: "Nie ma za co", example: "Grazie. - Prego.", exampleTransl: "Dziękuję. - Nie ma za co." },
                                    { front: "Per favore", back: "Proszę", example: "Un tavolo per due, per favore.", exampleTransl: "Stolik dla dwóch osób, proszę." },
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Podstawowe zwroty i wyrażenia",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Come stai?", translation: "Jak się masz?", example: "Ciao! Come stai?", exampleTransl: "Cześć! Jak się masz?" },
                                    { word: "Bene, grazie", translation: "Dobrze, dziękuję", example: "Sto bene, grazie. E tu?", exampleTransl: "Mam się dobrze, dziękuję. A ty?" },
                                    { word: "Mi chiamo...", translation: "Nazywam się...", example: "Mi chiamo Anna.", exampleTransl: "Nazywam się Anna." },
                                    { word: "Di dove sei?", translation: "Skąd jesteś?", example: "Di dove sei? - Sono di Varsavia.", exampleTransl: "Skąd jesteś? - Jestem z Warszawy." },
                                    { word: "Piacere di conoscerti", translation: "Miło cię poznać", example: "Ciao, piacere di conoscerti!", exampleTransl: "Cześć, miło cię poznać!" },
                                    { word: "Parli inglese?", translation: "Czy mówisz po angielsku?", example: "Parli inglese? - Sì, un po'.", exampleTransl: "Czy mówisz po angielsku? - Tak, trochę." },
                                    { word: "Non capisco", translation: "Nie rozumiem", example: "Scusa, non capisco.", exampleTransl: "Przepraszam, nie rozumiem." },
                                    { word: "Quanto costa?", translation: "Ile to kosztuje?", example: "Quanto costa questo libro?", exampleTransl: "Ile kosztuje ta książka?" },
                                    { word: "Dove si trova...?", translation: "Gdzie znajduje się...?", example: "Dove si trova la stazione?", exampleTransl: "Gdzie znajduje się stacja?" },
                                    { word: "Buona fortuna!", translation: "Powodzenia!", example: "Domani hai l'esame? Buona fortuna!", exampleTransl: "Masz jutro egzamin? Powodzenia!" }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Miło cię poznać'?", options: ["Piacere di conoscerti", "Come stai?", "Non capisco"], correctAnswer: "Piacere di conoscerti" },
                                    { question: "Co znaczy 'Dove si trova la stazione'?", options: ["Gdzie znajduje się stacja?", "Ile kosztuje książka?", "Gdzie jest łazienka?"], correctAnswer: "Gdzie znajduje się stacja?" },
                                    { question: "Jak zapytasz 'Czy mówisz po angielsku?'?", options: ["Parli inglese?", "Quanto costa?", "Come ti chiami?"], correctAnswer: "Parli inglese?" },
                                    { question: "Jak powiedzieć 'Nie rozumiem'?", options: ["Non capisco", "Non parlo", "Non costa"], correctAnswer: "Non capisco" },
                                    { question: "Co znaczy 'Buona fortuna'?", options: ["Powodzenia!", "Dzień dobry!", "Miłego dnia!"], correctAnswer: "Powodzenia!" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak zapytasz 'Ile to kosztuje?'?", options: ["Quanto costa?", "Dove si trova?", "Mi chiamo..."], correctAnswer: "Quanto costa?" },
                                    { question: "Co znaczy 'Di dove sei'?", options: ["Skąd jesteś?", "Jak się masz?", "Gdzie to jest?"], correctAnswer: "Skąd jesteś?" },
                                    { question: "Jak powiedzieć 'Mam się dobrze, dziękuję'?", options: ["Sto bene, grazie", "Sono bene, grazie", "Mi chiamo grazie"], correctAnswer: "Sto bene, grazie" },
                                    { question: "Co znaczy 'Non capisco'?", options: ["Nie rozumiem", "Nie wiem", "Nie mówię"], correctAnswer: "Nie rozumiem" },
                                    { question: "Jak powiedzieć 'Powodzenia!'?", options: ["Buona fortuna!", "Buongiorno!", "Per favore!"], correctAnswer: "Buona fortuna!" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Come stai?", back: "Jak się masz?", example: "Ciao! Come stai oggi?", exampleTransl: "Cześć! Jak się dzisiaj masz?" },
                                    { front: "Buona fortuna!", back: "Powodzenia!", example: "Buona fortuna con il tuo lavoro!", exampleTransl: "Powodzenia z twoją pracą!" },
                                    { front: "Dove si trova?", back: "Gdzie znajduje się...?", example: "Dove si trova la fermata dell'autobus?", exampleTransl: "Gdzie znajduje się przystanek autobusowy?" },
                                    { front: "Non capisco", back: "Nie rozumiem", example: "Scusa, non capisco l'italiano.", exampleTransl: "Przepraszam, nie rozumiem włoskiego." },
                                    { front: "Quanto costa?", back: "Ile to kosztuje?", example: "Scusa, quanto costa questo vestito?", exampleTransl: "Przepraszam, ile kosztuje ta sukienka?" }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Podstawowe pytania",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Come ti chiami?", translation: "Jak się nazywasz?", example: "Ciao! Come ti chiami?", exampleTransl: "Cześć! Jak się nazywasz?" },
                                    { word: "Quanti anni hai?", translation: "Ile masz lat?", example: "Quanti anni hai? - Ho venti anni.", exampleTransl: "Ile masz lat? - Mam dwadzieścia lat." },
                                    { word: "Di dove sei?", translation: "Skąd jesteś?", example: "Di dove sei? - Sono di Roma.", exampleTransl: "Skąd jesteś? - Jestem z Rzymu." },
                                    { word: "Che lavoro fai?", translation: "Czym się zajmujesz?", example: "Che lavoro fai? - Sono insegnante.", exampleTransl: "Czym się zajmujesz? - Jestem nauczycielem." },
                                    { word: "Cosa fai nel tempo libero?", translation: "Co robisz w wolnym czasie?", example: "Cosa fai nel tempo libero? - Leggo libri.", exampleTransl: "Co robisz w wolnym czasie? - Czytam książki." },
                                    { word: "Parli altre lingue?", translation: "Czy mówisz innymi językami?", example: "Parli altre lingue? - Sì, parlo inglese e spagnolo.", exampleTransl: "Czy mówisz innymi językami? - Tak, mówię po angielsku i hiszpańsku." },
                                    { word: "Hai fratelli o sorelle?", translation: "Masz rodzeństwo?", example: "Hai fratelli o sorelle? - Sì, ho due fratelli.", exampleTransl: "Masz rodzeństwo? - Tak, mam dwóch braci." },
                                    { word: "Dove abiti?", translation: "Gdzie mieszkasz?", example: "Dove abiti? - Abito a Milano.", exampleTransl: "Gdzie mieszkasz? - Mieszkam w Mediolanie." },
                                    { word: "Qual è il tuo numero di telefono?", translation: "Jaki jest twój numer telefonu?", example: "Qual è il tuo numero di telefono? - È 123-456-789.", exampleTransl: "Jaki jest twój numer telefonu? - To 123-456-789." },
                                    { word: "Qual è il tuo indirizzo?", translation: "Jaki jest twój adres?", example: "Qual è il tuo indirizzo? - Via Roma 10.", exampleTransl: "Jaki jest twój adres? - Via Roma 10." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak zapytasz 'Jak się nazywasz?'?", options: ["Come ti chiami?", "Di dove sei?", "Quanti anni hai?"], correctAnswer: "Come ti chiami?" },
                                    { question: "Co znaczy 'Hai fratelli o sorelle'?", options: ["Masz rodzeństwo?", "Ile masz lat?", "Czy mieszkasz w Rzymie?"], correctAnswer: "Masz rodzeństwo?" },
                                    { question: "Jak powiedzieć 'Gdzie mieszkasz?'?", options: ["Dove abiti?", "Che lavoro fai?", "Parli altre lingue?"], correctAnswer: "Dove abiti?" },
                                    { question: "Jak zapytać 'Czym się zajmujesz?'?", options: ["Che lavoro fai?", "Cosa fai nel tempo libero?", "Qual è il tuo indirizzo?"], correctAnswer: "Che lavoro fai?" },
                                    { question: "Co znaczy 'Parli altre lingue'?", options: ["Czy mówisz innymi językami?", "Gdzie mieszkasz?", "Jaki jest twój numer telefonu?"], correctAnswer: "Czy mówisz innymi językami?" }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak zapytać 'Jaki jest twój adres?'?", options: ["Qual è il tuo indirizzo?", "Qual è il tuo numero di telefono?", "Che lavoro fai?"], correctAnswer: "Qual è il tuo indirizzo?" },
                                    { question: "Co znaczy 'Quanti anni hai'?", options: ["Ile masz lat?", "Jak się masz?", "Masz rodzeństwo?"], correctAnswer: "Ile masz lat?" },
                                    { question: "Jak powiedzieć 'Masz rodzeństwo?'?", options: ["Hai fratelli o sorelle?", "Che lavoro fai?", "Cosa fai nel tempo libero?"], correctAnswer: "Hai fratelli o sorelle?" },
                                    { question: "Co znaczy 'Dove abiti?'?", options: ["Gdzie mieszkasz?", "Gdzie jest łazienka?", "Gdzie pracujesz?"], correctAnswer: "Gdzie mieszkasz?" },
                                    { question: "Jak powiedzieć 'Czy mówisz innymi językami?'?", options: ["Parli altre lingue?", "Che lavoro fai?", "Dove abiti?"], correctAnswer: "Parli altre lingue?" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Come ti chiami?", back: "Jak się nazywasz?", example: "Come ti chiami? Mi chiamo Anna.", exampleTransl: "Jak się nazywasz? Nazywam się Anna." },
                                    { front: "Quanti anni hai?", back: "Ile masz lat?", example: "Quanti anni hai? Ho venti anni.", exampleTransl: "Ile masz lat? Mam dwadzieścia lat." },
                                    { front: "Dove abiti?", back: "Gdzie mieszkasz?", example: "Dove abiti? Abito a Firenze.", exampleTransl: "Gdzie mieszkasz? Mieszkam we Florencji." },
                                    { front: "Che lavoro fai?", back: "Czym się zajmujesz?", example: "Che lavoro fai? Sono medico.", exampleTransl: "Czym się zajmujesz? Jestem lekarzem." },
                                    { front: "Parli altre lingue?", back: "Czy mówisz innymi językami?", example: "Parli altre lingue? Sì, parlo inglese.", exampleTransl: "Czy mówisz innymi językami? Tak, mówię po angielsku." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Liczby i cyfry",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Uno", translation: "Jeden", example: "Uno più uno fa due.", exampleTransl: "Jeden plus jeden to dwa." },
                                    { word: "Due", translation: "Dwa", example: "Ho due fratelli.", exampleTransl: "Mam dwóch braci." },
                                    { word: "Tre", translation: "Trzy", example: "Tre gatti giocano in giardino.", exampleTransl: "Trzy koty bawią się w ogrodzie." },
                                    { word: "Quattro", translation: "Cztery", example: "Ci sono quattro sedie nella stanza.", exampleTransl: "W pokoju są cztery krzesła." },
                                    { word: "Cinque", translation: "Pięć", example: "Ho cinque euro nel portafoglio.", exampleTransl: "Mam pięć euro w portfelu." },
                                    { word: "Sei", translation: "Sześć", example: "La lezione inizia alle sei.", exampleTransl: "Lekcja zaczyna się o szóstej." },
                                    { word: "Sette", translation: "Siedem", example: "Sette giorni formano una settimana.", exampleTransl: "Siedem dni tworzy tydzień." },
                                    { word: "Otto", translation: "Osiem", example: "La festa inizia alle otto.", exampleTransl: "Impreza zaczyna się o ósmej." },
                                    { word: "Nove", translation: "Dziewięć", example: "Ho nove amici italiani.", exampleTransl: "Mam dziewięciu włoskich przyjaciół." },
                                    { word: "Dieci", translation: "Dziesięć", example: "Ci sono dieci persone alla festa.", exampleTransl: "Na imprezie jest dziesięć osób." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Pięć' po włosku?", options: ["Cinque", "Quattro", "Sette"], correctAnswer: "Cinque" },
                                    { question: "Co znaczy 'Otto'?", options: ["Osiem", "Siedem", "Dziewięć"], correctAnswer: "Osiem" },
                                    { question: "Jak powiedzieć 'Dziesięć'?", options: ["Dieci", "Nove", "Sette"], correctAnswer: "Dieci" },
                                    { question: "Jak powiedzieć 'Trzy'?", options: ["Tre", "Due", "Uno"], correctAnswer: "Tre" },
                                    { question: "Co znaczy 'Sette giorni formano una settimana'?", options: ["Siedem dni tworzy tydzień.", "Siedem godzin to jeden dzień.", "Siedem kotów bawi się w ogrodzie."], correctAnswer: "Siedem dni tworzy tydzień." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Mam pięć euro w portfelu'?", options: ["Ho cinque euro nel portafoglio.", "Ho dieci euro nel portafoglio.", "Ho sette euro nel portafoglio."], correctAnswer: "Ho cinque euro nel portafoglio." },
                                    { question: "Co znaczy 'La festa inizia alle otto'?", options: ["Impreza zaczyna się o ósmej.", "Impreza kończy się o ósmej.", "Impreza zaczyna się o dziewiątej."], correctAnswer: "Impreza zaczyna się o ósmej." },
                                    { question: "Jak powiedzieć 'W pokoju są cztery krzesła'?", options: ["Ci sono quattro sedie nella stanza.", "Ci sono tre sedie nella stanza.", "Ci sono cinque sedie nella stanza."], correctAnswer: "Ci sono quattro sedie nella stanza." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Uno", back: "Jeden", example: "Uno più due fa tre.", exampleTransl: "Jeden plus dwa to trzy." },
                                    { front: "Due", back: "Dwa", example: "Ho due fratelli.", exampleTransl: "Mam dwóch braci." },
                                    { front: "Cinque", back: "Pięć", example: "Ho cinque libri.", exampleTransl: "Mam pięć książek." },
                                    { front: "Dieci", back: "Dziesięć", example: "Ci sono dieci persone alla festa.", exampleTransl: "Na imprezie jest dziesięć osób." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Dni tygodnia",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Lunedì", translation: "Poniedziałek", example: "Lunedì vado a scuola.", exampleTransl: "W poniedziałek idę do szkoły." },
                                    { word: "Martedì", translation: "Wtorek", example: "Martedì ho una riunione importante.", exampleTransl: "We wtorek mam ważne spotkanie." },
                                    { word: "Mercoledì", translation: "Środa", example: "Mercoledì andiamo al cinema.", exampleTransl: "W środę idziemy do kina." },
                                    { word: "Giovedì", translation: "Czwartek", example: "Giovedì ho una lezione di italiano.", exampleTransl: "W czwartek mam lekcję włoskiego." },
                                    { word: "Venerdì", translation: "Piątek", example: "Venerdì esco con gli amici.", exampleTransl: "W piątek wychodzę z przyjaciółmi." },
                                    { word: "Sabato", translation: "Sobota", example: "Sabato facciamo una festa.", exampleTransl: "W sobotę robimy imprezę." },
                                    { word: "Domenica", translation: "Niedziela", example: "Domenica riposiamo.", exampleTransl: "W niedzielę odpoczywamy." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Poniedziałek' po włosku?", options: ["Lunedì", "Martedì", "Sabato"], correctAnswer: "Lunedì" },
                                    { question: "Co znaczy 'Venerdì'?", options: ["Piątek", "Sobota", "Czwartek"], correctAnswer: "Piątek" },
                                    { question: "Jak powiedzieć 'W czwartek mam lekcję włoskiego'?", options: ["Giovedì ho una lezione di italiano.", "Martedì ho una lezione di italiano.", "Mercoledì ho una lezione di italiano."], correctAnswer: "Giovedì ho una lezione di italiano." },
                                    { question: "Co znaczy 'Domenica riposiamo'?", options: ["W niedzielę odpoczywamy.", "W sobotę odpoczywamy.", "W piątek odpoczywamy."], correctAnswer: "W niedzielę odpoczywamy." },
                                    { question: "Jak powiedzieć 'W środę idziemy do kina'?", options: ["Mercoledì andiamo al cinema.", "Martedì andiamo al cinema.", "Giovedì andiamo al cinema."], correctAnswer: "Mercoledì andiamo al cinema." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'W sobotę robimy imprezę'?", options: ["Sabato facciamo una festa.", "Domenica facciamo una festa.", "Venerdì facciamo una festa."], correctAnswer: "Sabato facciamo una festa." },
                                    { question: "Co znaczy 'Martedì ho una riunione importante'?", options: ["We wtorek mam ważne spotkanie.", "W środę mam ważne spotkanie.", "W poniedziałek mam ważne spotkanie."], correctAnswer: "We wtorek mam ważne spotkanie." },
                                    { question: "Jak powiedzieć 'W poniedziałek idę do szkoły'?", options: ["Lunedì vado a scuola.", "Martedì vado a scuola.", "Giovedì vado a scuola."], correctAnswer: "Lunedì vado a scuola." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Lunedì", back: "Poniedziałek", example: "Lunedì vado in ufficio.", exampleTransl: "W poniedziałek idę do biura." },
                                    { front: "Sabato", back: "Sobota", example: "Sabato facciamo un picnic.", exampleTransl: "W sobotę robimy piknik." },
                                    { front: "Domenica", back: "Niedziela", example: "Domenica visitiamo i nonni.", exampleTransl: "W niedzielę odwiedzamy dziadków." },
                                    { front: "Giovedì", back: "Czwartek", example: "Giovedì vado in palestra.", exampleTransl: "W czwartek idę na siłownię." }
                                  ],
                                },
                              ],
                            }            
                          ],
                        },
                        {
                          title:"A2 - Początkujący wyższy",
                          subItems:[
                            {
                              title: "Czas teraźniejszy – Presente Indicativo",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Parlare", translation: "Mówić", example: "Io parlo italiano.", exampleTransl: "Mówię po włosku." },
                                    { word: "Mangiare", translation: "Jeść", example: "Noi mangiamo una pizza.", exampleTransl: "Jemy pizzę." },
                                    { word: "Correre", translation: "Biegać", example: "Loro corrono al parco ogni mattina.", exampleTransl: "Oni biegają w parku każdego ranka." },
                                    { word: "Dormire", translation: "Spać", example: "Io dormo molto la domenica.", exampleTransl: "Śpię dużo w niedzielę." },
                                    { word: "Leggere", translation: "Czytać", example: "Lei legge un libro interessante.", exampleTransl: "Ona czyta interesującą książkę." },
                                    { word: "Scrivere", translation: "Pisać", example: "Tu scrivi una lettera.", exampleTransl: "Piszesz list." },
                                    { word: "Ascoltare", translation: "Słuchać", example: "Lui ascolta la musica classica.", exampleTransl: "On słucha muzyki klasycznej." },
                                    { word: "Giocare", translation: "Grać", example: "Noi giochiamo a calcio.", exampleTransl: "Gramy w piłkę nożną." },
                                    { word: "Studiare", translation: "Uczyć się", example: "Io studio l'italiano ogni giorno.", exampleTransl: "Uczę się włoskiego codziennie." },
                                    { word: "Amare", translation: "Kochać", example: "Lei ama il mare.", exampleTransl: "Ona kocha morze." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Piszę list'?", options: ["Io scrivo una lettera.", "Io parlo una lettera.", "Io leggo una lettera."], correctAnswer: "Io scrivo una lettera." },
                                    { question: "Co znaczy 'Lei legge un libro interessante'?", options: ["Ona czyta interesującą książkę.", "Ona pisze interesującą książkę.", "Ona słucha interesującej książki."], correctAnswer: "Ona czyta interesującą książkę." },
                                    { question: "Jak powiedzieć 'Śpię dużo w niedzielę'?", options: ["Io dormo molto la domenica.", "Io mangio molto la domenica.", "Io studio molto la domenica."], correctAnswer: "Io dormo molto la domenica." },
                                    { question: "Co znaczy 'Noi giochiamo a calcio'?", options: ["Gramy w piłkę nożną.", "Biegamy w parku.", "Słuchamy muzyki."], correctAnswer: "Gramy w piłkę nożną." },
                                    { question: "Jak powiedzieć 'On słucha muzyki klasycznej'?", options: ["Lui ascolta la musica classica.", "Lui scrive la musica classica.", "Lui legge la musica classica."], correctAnswer: "Lui ascolta la musica classica." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Uczysz się włoskiego codziennie'?", options: ["Tu studi l'italiano ogni giorno.", "Tu leggi l'italiano ogni giorno.", "Tu ascolti l'italiano ogni giorno."], correctAnswer: "Tu studi l'italiano ogni giorno." },
                                    { question: "Co znaczy 'Noi mangiamo una pizza'?", options: ["Jemy pizzę.", "Piszecie pizzę.", "Biegamy z pizzą."], correctAnswer: "Jemy pizzę." },
                                    { question: "Jak powiedzieć 'Ona kocha morze'?", options: ["Lei ama il mare.", "Lei scrive il mare.", "Lei parla il mare."], correctAnswer: "Lei ama il mare." },
                                    { question: "Jak powiedzieć 'Biegają w parku każdego ranka'?", options: ["Loro corrono al parco ogni mattina.", "Loro leggono al parco ogni mattina.", "Loro studiano al parco ogni mattina."], correctAnswer: "Loro corrono al parco ogni mattina." },
                                    { question: "Co znaczy 'Io parlo italiano'?", options: ["Mówię po włosku.", "Czytam po włosku.", "Piszę po włosku."], correctAnswer: "Mówię po włosku." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Parlare", back: "Mówić", example: "Parlo con i miei amici.", exampleTransl: "Rozmawiam z moimi przyjaciółmi." },
                                    { front: "Mangiare", back: "Jeść", example: "Mangio una mela ogni giorno.", exampleTransl: "Jem jabłko codziennie." },
                                    { front: "Correre", back: "Biegać", example: "Corro al parco ogni mattina.", exampleTransl: "Biegam w parku każdego ranka." },
                                    { front: "Leggere", back: "Czytać", example: "Lei legge il giornale ogni mattina.", exampleTransl: "Ona czyta gazetę każdego ranka." },
                                    { front: "Dormire", back: "Spać", example: "Dormo otto ore ogni notte.", exampleTransl: "Śpię osiem godzin każdej nocy." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czas przyszły – Futuro Semplice",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Andare", translation: "Pójść / pojechać", example: "Domani andrò al lavoro.", exampleTransl: "Jutro pójdę do pracy." },
                                    { word: "Mangiare", translation: "Zjeść", example: "Stasera mangerò una pizza.", exampleTransl: "Dziś wieczorem zjem pizzę." },
                                    { word: "Partire", translation: "Wyjechać", example: "Partiremo per Roma la prossima settimana.", exampleTransl: "Wyjedziemy do Rzymu w przyszłym tygodniu." },
                                    { word: "Avere", translation: "Mieć", example: "Avrò una macchina nuova.", exampleTransl: "Będę miał nowy samochód." },
                                    { word: "Essere", translation: "Być", example: "Sarà una bella giornata.", exampleTransl: "To będzie piękny dzień." },
                                    { word: "Fare", translation: "Robić", example: "Farò una passeggiata nel parco.", exampleTransl: "Zrobię spacer w parku." },
                                    { word: "Studiare", translation: "Uczyć się", example: "Studierò per l'esame domani.", exampleTransl: "Będę się uczyć na egzamin jutro." },
                                    { word: "Scrivere", translation: "Napisać", example: "Scriverò un'email importante.", exampleTransl: "Napiszę ważny e-mail." },
                                    { word: "Giocare", translation: "Grać", example: "Giocherò a calcio con i miei amici.", exampleTransl: "Zagram w piłkę nożną z przyjaciółmi." },
                                    { word: "Visitare", translation: "Odwiedzić", example: "Visiteremo il museo sabato.", exampleTransl: "Odwiedzimy muzeum w sobotę." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Jutro pójdę do pracy'?", options: ["Domani andrò al lavoro.", "Domani vado al lavoro.", "Domani sono al lavoro."], correctAnswer: "Domani andrò al lavoro." },
                                    { question: "Co znaczy 'Partiremo per Roma la prossima settimana'?", options: ["Wyjedziemy do Rzymu w przyszłym tygodniu.", "Będziemy w Rzymie w przyszłym tygodniu.", "Wyjeżdżamy do Rzymu w przyszłym tygodniu."], correctAnswer: "Wyjedziemy do Rzymu w przyszłym tygodniu." },
                                    { question: "Jak powiedzieć 'To będzie piękny dzień'?", options: ["Sarà una bella giornata.", "Farà una bella giornata.", "Sarà una giornata interessante."], correctAnswer: "Sarà una bella giornata." },
                                    { question: "Co znaczy 'Giocherò a calcio con i miei amici'?", options: ["Zagram w piłkę nożną z przyjaciółmi.", "Zagram na gitarze z przyjaciółmi.", "Będę oglądał mecz z przyjaciółmi."], correctAnswer: "Zagram w piłkę nożną z przyjaciółmi." },
                                    { question: "Jak powiedzieć 'Napiszę ważny e-mail'?", options: ["Scriverò un'email importante.", "Farò un'email importante.", "Leggerò un'email importante."], correctAnswer: "Scriverò un'email importante." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Będę się uczyć na egzamin jutro'?", options: ["Studierò per l'esame domani.", "Studio per l'esame domani.", "Studierò l'esame domani."], correctAnswer: "Studierò per l'esame domani." },
                                    { question: "Co znaczy 'Farò una passeggiata nel parco'?", options: ["Zrobię spacer w parku.", "Pójdę do parku.", "Zrobię piknik w parku."], correctAnswer: "Zrobię spacer w parku." },
                                    { question: "Jak powiedzieć 'Odwiedzimy muzeum w sobotę'?", options: ["Visiteremo il museo sabato.", "Visitiamo il museo sabato.", "Visiteremo il museo domenica."], correctAnswer: "Visiteremo il museo sabato." },
                                    { question: "Co znaczy 'Avrò una macchina nuova'?", options: ["Będę miał nowy samochód.", "Mam nowy samochód.", "Będę kupował nowy samochód."], correctAnswer: "Będę miał nowy samochód." },
                                    { question: "Jak powiedzieć 'Dziś wieczorem zjem pizzę'?", options: ["Stasera mangerò una pizza.", "Stasera mangio una pizza.", "Stasera mangerò al ristorante."], correctAnswer: "Stasera mangerò una pizza." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Andare", back: "Pójść / pojechać", example: "Domani andrò al mercato.", exampleTransl: "Jutro pójdę na targ." },
                                    { front: "Mangiare", back: "Zjeść", example: "Mangerò un panino a pranzo.", exampleTransl: "Zjem kanapkę na lunch." },
                                    { front: "Visitare", back: "Odwiedzić", example: "Visiterò la mia famiglia domenica.", exampleTransl: "Odwiedzę swoją rodzinę w niedzielę." },
                                    { front: "Studiare", back: "Uczyć się", example: "Studierò matematica oggi.", exampleTransl: "Będę się uczyć matematyki dzisiaj." },
                                    { front: "Giocare", back: "Grać", example: "Giocherò a tennis con mia sorella.", exampleTransl: "Zagram w tenisa z moją siostrą." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Przymiotniki opisujące ludzi",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Allegro", translation: "Wesoły", example: "Lui è molto allegro.", exampleTransl: "On jest bardzo wesoły." },
                                    { word: "Triste", translation: "Smutny", example: "Lei è triste oggi.", exampleTransl: "Ona jest dziś smutna." },
                                    { word: "Gentile", translation: "Miły", example: "Il mio insegnante è molto gentile.", exampleTransl: "Mój nauczyciel jest bardzo miły." },
                                    { word: "Cattivo", translation: "Zły", example: "Quel bambino è un po' cattivo.", exampleTransl: "Tamto dziecko jest trochę złe." },
                                    { word: "Intelligente", translation: "Inteligentny", example: "Lei è una ragazza molto intelligente.", exampleTransl: "Ona jest bardzo inteligentną dziewczyną." },
                                    { word: "Pigro", translation: "Leniwy", example: "Oggi mi sento pigro.", exampleTransl: "Dziś czuję się leniwy." },
                                    { word: "Amichevole", translation: "Przyjacielski", example: "Il nuovo collega è molto amichevole.", exampleTransl: "Nowy kolega jest bardzo przyjacielski." },
                                    { word: "Timido", translation: "Nieśmiały", example: "Mio fratello è timido con gli sconosciuti.", exampleTransl: "Mój brat jest nieśmiały wobec nieznajomych." },
                                    { word: "Forte", translation: "Silny", example: "Questo atleta è molto forte.", exampleTransl: "Ten sportowiec jest bardzo silny." },
                                    { word: "Onesto", translation: "Szczery", example: "Mi piace che tu sia onesto.", exampleTransl: "Podoba mi się, że jesteś szczery." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'On jest bardzo wesoły'?", options: ["Lui è molto allegro.", "Lui è molto forte.", "Lui è molto timido."], correctAnswer: "Lui è molto allegro." },
                                    { question: "Co znaczy 'Lei è triste oggi'?", options: ["Ona jest dziś smutna.", "Ona jest dziś wesoła.", "Ona jest dziś leniwa."], correctAnswer: "Ona jest dziś smutna." },
                                    { question: "Jak powiedzieć 'Tamto dziecko jest trochę złe'?", options: ["Quel bambino è un po' cattivo.", "Quel bambino è un po' forte.", "Quel bambino è un po' timido."], correctAnswer: "Quel bambino è un po' cattivo." },
                                    { question: "Co znaczy 'Il mio insegnante è molto gentile'?", options: ["Mój nauczyciel jest bardzo miły.", "Mój nauczyciel jest bardzo zły.", "Mój nauczyciel jest bardzo inteligentny."], correctAnswer: "Mój nauczyciel jest bardzo miły." },
                                    { question: "Jak powiedzieć 'Nowy kolega jest bardzo przyjacielski'?", options: ["Il nuovo collega è molto amichevole.", "Il nuovo collega è molto onesto.", "Il nuovo collega è molto pigro."], correctAnswer: "Il nuovo collega è molto amichevole." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Mój brat jest nieśmiały wobec nieznajomych'?", options: ["Mio fratello è timido con gli sconosciuti.", "Mio fratello è gentile con gli sconosciuti.", "Mio fratello è cattivo con gli sconosciuti."], correctAnswer: "Mio fratello è timido con gli sconosciuti." },
                                    { question: "Co znaczy 'Questo atleta è molto forte'?", options: ["Ten sportowiec jest bardzo silny.", "Ten sportowiec jest bardzo leniwy.", "Ten sportowiec jest bardzo szczery."], correctAnswer: "Ten sportowiec jest bardzo silny." },
                                    { question: "Jak powiedzieć 'Podoba mi się, że jesteś szczery'?", options: ["Mi piace che tu sia onesto.", "Mi piace che tu sia gentile.", "Mi piace che tu sia timido."], correctAnswer: "Mi piace che tu sia onesto." },
                                    { question: "Co znaczy 'Oggi mi sento pigro'?", options: ["Dziś czuję się leniwy.", "Dziś czuję się silny.", "Dziś czuję się smutny."], correctAnswer: "Dziś czuję się leniwy." },
                                    { question: "Jak powiedzieć 'Ona jest bardzo inteligentną dziewczyną'?", options: ["Lei è una ragazza molto intelligente.", "Lei è una ragazza molto forte.", "Lei è una ragazza molto allegra."], correctAnswer: "Lei è una ragazza molto intelligente." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Allegro", back: "Wesoły", example: "Il bambino è molto allegro.", exampleTransl: "Dziecko jest bardzo wesołe." },
                                    { front: "Gentile", back: "Miły", example: "La cameriera è molto gentile.", exampleTransl: "Kelnerka jest bardzo miła." },
                                    { front: "Timido", back: "Nieśmiały", example: "Sono timido quando parlo con nuove persone.", exampleTransl: "Jestem nieśmiały, kiedy rozmawiam z nowymi ludźmi." },
                                    { front: "Onesto", back: "Szczery", example: "Lei è sempre onesta con me.", exampleTransl: "Ona jest zawsze szczera wobec mnie." },
                                    { front: "Pigro", back: "Leniwy", example: "Il mio gatto è pigro tutto il giorno.", exampleTransl: "Mój kot jest leniwy przez cały dzień." }
                                  ],
                                },
                              ],
                            }
                          ]
                        },
                        {
                          title:"B1 - Średniozaawansowany",
                          subItems:[
                            {
                              title: "Tryb przypuszczający - Condizionale Presente",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Vorrei", translation: "Chciałbym/Chciałabym", example: "Vorrei un caffè, per favore.", exampleTransl: "Chciałbym kawę, proszę." },
                                    { word: "Potresti", translation: "Mógłbyś/Mogłabyś", example: "Potresti aiutarmi con questa domanda?", exampleTransl: "Mógłbyś mi pomóc z tym pytaniem?" },
                                    { word: "Dovrei", translation: "Powinienem/Powinnam", example: "Dovrei studiare di più.", exampleTransl: "Powinienem więcej się uczyć." },
                                    { word: "Faresti", translation: "Zrobiłbyś/Zrobiłabyś", example: "Faresti qualcosa per me?", exampleTransl: "Zrobiłbyś coś dla mnie?" },
                                    { word: "Sarebbe", translation: "Byłoby", example: "Sarebbe fantastico andare in Italia.", exampleTransl: "Byłoby fantastycznie pojechać do Włoch." },
                                    { word: "Avrei", translation: "Miałbym/Miałabym", example: "Avrei bisogno di più tempo.", exampleTransl: "Potrzebowałbym więcej czasu." },
                                    { word: "Piacerebbe", translation: "Podobałoby się", example: "Mi piacerebbe vedere il mare.", exampleTransl: "Podobałoby mi się zobaczyć morze." },
                                    { word: "Andresti", translation: "Poszedłbyś/Pojechałbyś", example: "Andresti a Roma con me?", exampleTransl: "Pojechałbyś do Rzymu ze mną?" },
                                    { word: "Vedrei", translation: "Zobaczyłbym/Zobaczyłabym", example: "Vedrei volentieri quel film.", exampleTransl: "Zobaczyłbym chętnie ten film." },
                                    { word: "Mangerei", translation: "Zjadłbym/Zjadłabym", example: "Mangerei una pizza ora.", exampleTransl: "Zjadłbym teraz pizzę." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Chciałbym kawę, proszę'?", options: ["Vorrei un caffè, per favore.", "Faresti un caffè, per favore.", "Potresti un caffè, per favore."], correctAnswer: "Vorrei un caffè, per favore." },
                                    { question: "Co znaczy 'Dovrei studiare di più'?", options: ["Powinienem więcej się uczyć.", "Chciałbym się więcej uczyć.", "Podobałoby mi się więcej uczyć."], correctAnswer: "Powinienem więcej się uczyć." },
                                    { question: "Jak powiedzieć 'Pojechałbyś do Rzymu ze mną'?", options: ["Andresti a Roma con me?", "Vorresti a Roma con me?", "Avresti a Roma con me?"], correctAnswer: "Andresti a Roma con me?" },
                                    { question: "Co znaczy 'Sarebbe fantastico andare in Italia'?", options: ["Byłoby fantastycznie pojechać do Włoch.", "Podobałoby mi się pojechać do Włoch.", "Chciałbym pojechać do Włoch."], correctAnswer: "Byłoby fantastycznie pojechać do Włoch." },
                                    { question: "Jak powiedzieć 'Zjadłbym teraz pizzę'?", options: ["Mangerei una pizza ora.", "Vorrei una pizza ora.", "Faresti una pizza ora."], correctAnswer: "Mangerei una pizza ora." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Potrzebowałbym więcej czasu'?", options: ["Avrei bisogno di più tempo.", "Vorrei bisogno di più tempo.", "Faresti bisogno di più tempo."], correctAnswer: "Avrei bisogno di più tempo." },
                                    { question: "Co znaczy 'Mi piacerebbe vedere il mare'?", options: ["Podobałoby mi się zobaczyć morze.", "Byłoby miło zobaczyć morze.", "Chciałbym zobaczyć morze."], correctAnswer: "Podobałoby mi się zobaczyć morze." },
                                    { question: "Jak powiedzieć 'Zobaczyłbym chętnie ten film'?", options: ["Vedrei volentieri quel film.", "Andresti volentieri quel film.", "Faresti volentieri quel film."], correctAnswer: "Vedrei volentieri quel film." },
                                    { question: "Co znaczy 'Faresti qualcosa per me'?", options: ["Zrobiłbyś coś dla mnie?", "Mógłbyś coś dla mnie zrobić?", "Zrobiłbyś coś ze mną?"], correctAnswer: "Zrobiłbyś coś dla mnie?" },
                                    { question: "Jak powiedzieć 'Byłoby fantastycznie pojechać do Włoch'?", options: ["Sarebbe fantastico andare in Italia.", "Avrebbe fantastico andare in Italia.", "Vorrebbe fantastico andare in Italia."], correctAnswer: "Sarebbe fantastico andare in Italia." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Vorrei", back: "Chciałbym/Chciałabym", example: "Vorrei un bicchiere d'acqua.", exampleTransl: "Chciałbym szklankę wody." },
                                    { front: "Potresti", back: "Mógłbyś/Mogłabyś", example: "Potresti aprire la finestra?", exampleTransl: "Mógłbyś otworzyć okno?" },
                                    { front: "Sarebbe", back: "Byłoby", example: "Sarebbe bello rivederti.", exampleTransl: "Byłoby miło cię znowu zobaczyć." },
                                    { front: "Avrei", back: "Miałbym/Miałabym", example: "Avrei bisogno di aiuto.", exampleTransl: "Potrzebowałbym pomocy." },
                                    { front: "Piacerebbe", back: "Podobałoby się", example: "Mi piacerebbe andare in vacanza.", exampleTransl: "Podobałoby mi się pojechać na wakacje." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Czas przeszły złożony - Passato Prossimo",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Ho mangiato", translation: "Zjadłem/Zjadłam", example: "Ieri ho mangiato una pizza.", exampleTransl: "Wczoraj zjadłem pizzę." },
                                    { word: "Sono andato/a", translation: "Poszedłem/Poszłam", example: "Sono andato al lavoro stamattina.", exampleTransl: "Poszedłem do pracy dziś rano." },
                                    { word: "Abbiamo visto", translation: "Zobaczyliśmy", example: "Abbiamo visto un bel film ieri sera.", exampleTransl: "Zobaczyliśmy piękny film wczoraj wieczorem." },
                                    { word: "Hai parlato", translation: "Rozmawiałeś/Rozmawiałaś", example: "Hai parlato con il tuo amico?", exampleTransl: "Rozmawiałeś ze swoim przyjacielem?" },
                                    { word: "Hanno comprato", translation: "Kupili", example: "Hanno comprato una casa nuova.", exampleTransl: "Kupili nowy dom." },
                                    { word: "È arrivato/a", translation: "Przybył/Przybyła", example: "È arrivata tardi ieri.", exampleTransl: "Przybyła wczoraj późno." },
                                    { word: "Abbiamo studiato", translation: "Uczyliśmy się", example: "Abbiamo studiato tutta la notte.", exampleTransl: "Uczyliśmy się całą noc." },
                                    { word: "Ho letto", translation: "Przeczytałem/Przeczytałam", example: "Ho letto un libro interessante.", exampleTransl: "Przeczytałem interesującą książkę." },
                                    { word: "Sono stato/a", translation: "Byłem/Byłam", example: "Sono stato in Italia l'anno scorso.", exampleTransl: "Byłem we Włoszech w zeszłym roku." },
                                    { word: "Hai capito", translation: "Zrozumiałeś/Zrozumiałaś", example: "Hai capito la lezione?", exampleTransl: "Zrozumiałeś lekcję?" }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Zjadłem pizzę wczoraj'?", options: ["Ho mangiato una pizza ieri.", "Ho visto una pizza ieri.", "Ho comprato una pizza ieri."], correctAnswer: "Ho mangiato una pizza ieri." },
                                    { question: "Co znaczy 'Abbiamo visto un bel film ieri sera'?", options: ["Zobaczyliśmy piękny film wczoraj wieczorem.", "Kupiliśmy piękny film wczoraj wieczorem.", "Byliśmy w kinie wczoraj wieczorem."], correctAnswer: "Zobaczyliśmy piękny film wczoraj wieczorem." },
                                    { question: "Jak powiedzieć 'Przybyła późno wczoraj'?", options: ["È arrivata tardi ieri.", "Ha comprato tardi ieri.", "Abbiamo parlato tardi ieri."], correctAnswer: "È arrivata tardi ieri." },
                                    { question: "Co znaczy 'Hai capito la lezione'?", options: ["Zrozumiałeś lekcję?", "Uczyłeś się lekcji?", "Zrozumiałeś pytanie?"], correctAnswer: "Zrozumiałeś lekcję?" },
                                    { question: "Jak powiedzieć 'Uczyliśmy się całą noc'?", options: ["Abbiamo studiato tutta la notte.", "Abbiamo capito tutta la notte.", "Abbiamo parlato tutta la notte."], correctAnswer: "Abbiamo studiato tutta la notte." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Poszedłem do pracy dziś rano'?", options: ["Sono andato al lavoro stamattina.", "Ho mangiato al lavoro stamattina.", "Sono stato al lavoro stamattina."], correctAnswer: "Sono andato al lavoro stamattina." },
                                    { question: "Co znaczy 'Ho letto un libro interessante'?", options: ["Przeczytałem interesującą książkę.", "Kupiłem interesującą książkę.", "Zobaczyłem interesującą książkę."], correctAnswer: "Przeczytałem interesującą książkę." },
                                    { question: "Jak powiedzieć 'Byłem we Włoszech w zeszłym roku'?", options: ["Sono stato in Italia l'anno scorso.", "Sono andato in Italia l'anno scorso.", "Abbiamo visto in Italia l'anno scorso."], correctAnswer: "Sono stato in Italia l'anno scorso." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Ho mangiato", back: "Zjadłem/Zjadłam", example: "Ieri ho mangiato della pasta.", exampleTransl: "Wczoraj zjadłem makaron." },
                                    { front: "Sono andato/a", back: "Poszedłem/Poszłam", example: "Sono andato al mercato stamattina.", exampleTransl: "Poszedłem na targ dziś rano." },
                                    { front: "Abbiamo visto", back: "Zobaczyliśmy", example: "Abbiamo visto la torre famosa.", exampleTransl: "Zobaczyliśmy słynną wieżę." },
                                    { front: "Hai parlato", back: "Rozmawiałeś/Rozmawiałaś", example: "Hai parlato con il tuo professore?", exampleTransl: "Rozmawiałeś ze swoim nauczycielem?" },
                                    { front: "Hanno comprato", back: "Kupili", example: "Hanno comprato una nuova macchina.", exampleTransl: "Kupili nowy samochód." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Zaawansowane przyimki - Con, Per, Tra/Fra",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Con", translation: "Z", example: "Vado al cinema con i miei amici.", exampleTransl: "Idę do kina z moimi przyjaciółmi." },
                                    { word: "Per", translation: "Dla, przez", example: "Questo regalo è per te.", exampleTransl: "Ten prezent jest dla ciebie." },
                                    { word: "Tra", translation: "Pomiędzy, za (czas)", example: "La casa è tra il supermercato e la scuola.", exampleTransl: "Dom jest pomiędzy supermarketem a szkołą." },
                                    { word: "Fra", translation: "Pomiędzy, za (czas)", example: "Partiremo fra tre giorni.", exampleTransl: "Wyjedziemy za trzy dni." },
                                    { word: "Con pazienza", translation: "Z cierpliwością", example: "Lui fa tutto con pazienza.", exampleTransl: "On robi wszystko z cierpliwością." },
                                    { word: "Per amore", translation: "Z miłości", example: "Ha cambiato città per amore.", exampleTransl: "Zmienił miasto z miłości." },
                                    { word: "Tra di noi", translation: "Pomiędzy nami", example: "C'è un segreto tra di noi.", exampleTransl: "Jest sekret pomiędzy nami." },
                                    { word: "Fra amici", translation: "Między przyjaciółmi", example: "Fra amici si può parlare di tutto.", exampleTransl: "Między przyjaciółmi można rozmawiać o wszystkim." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Idę do kina z moimi przyjaciółmi'?", options: ["Vado al cinema con i miei amici.", "Vado al cinema per i miei amici.", "Vado al cinema tra i miei amici."], correctAnswer: "Vado al cinema con i miei amici." },
                                    { question: "Co znaczy 'Partiremo fra tre giorni'?", options: ["Wyjedziemy za trzy dni.", "Wyjedziemy w trzy dni.", "Wyjedziemy pomiędzy trzy dniami."], correctAnswer: "Wyjedziemy za trzy dni." },
                                    { question: "Jak powiedzieć 'Ten prezent jest dla ciebie'?", options: ["Questo regalo è per te.", "Questo regalo è con te.", "Questo regalo è tra te."], correctAnswer: "Questo regalo è per te." },
                                    { question: "Co znaczy 'C'è un segreto tra di noi'?", options: ["Jest sekret pomiędzy nami.", "Jest prezent dla nas.", "Jest sekret za trzy dni."], correctAnswer: "Jest sekret pomiędzy nami." },
                                    { question: "Jak powiedzieć 'Między przyjaciółmi można rozmawiać o wszystkim'?", options: ["Fra amici si può parlare di tutto.", "Con amici si può parlare di tutto.", "Per amici si può parlare di tutto."], correctAnswer: "Fra amici si può parlare di tutto." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Zmienił miasto z miłości'?", options: ["Ha cambiato città per amore.", "Ha cambiato città con amore.", "Ha cambiato città tra amore."], correctAnswer: "Ha cambiato città per amore." },
                                    { question: "Co znaczy 'Lui fa tutto con pazienza'?", options: ["On robi wszystko z cierpliwością.", "On robi wszystko z miłością.", "On robi wszystko dla cierpliwości."], correctAnswer: "On robi wszystko z cierpliwością." },
                                    { question: "Jak powiedzieć 'Dom jest pomiędzy supermarketem a szkołą'?", options: ["La casa è tra il supermercato e la scuola.", "La casa è con il supermercato e la scuola.", "La casa è per il supermercato e la scuola."], correctAnswer: "La casa è tra il supermercato e la scuola." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Con", back: "Z", example: "Mangio con la mia famiglia.", exampleTransl: "Jem z moją rodziną." },
                                    { front: "Per", back: "Dla, przez", example: "Lavoro per la mia famiglia.", exampleTransl: "Pracuję dla mojej rodziny." },
                                    { front: "Tra", back: "Pomiędzy", example: "Ci vediamo tra un'ora.", exampleTransl: "Widzimy się za godzinę." },
                                    { front: "Fra amici", back: "Między przyjaciółmi", example: "Fra amici si ride molto.", exampleTransl: "Między przyjaciółmi śmieje się dużo." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Idiomy - Avere i Essere",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Avere fame", translation: "Być głodnym", example: "Ho fame, voglio mangiare qualcosa.", exampleTransl: "Jestem głodny, chcę coś zjeść." },
                                    { word: "Avere sonno", translation: "Być śpiącym", example: "Hai sonno? Sembra che tu sia stanco.", exampleTransl: "Jesteś śpiący? Wygląda na to, że jesteś zmęczony." },
                                    { word: "Essere felice", translation: "Być szczęśliwym", example: "Siamo felici di vederti.", exampleTransl: "Jesteśmy szczęśliwi, że cię widzimy." },
                                    { word: "Avere fretta", translation: "Śpieszyć się", example: "Sono in ritardo, ho fretta!", exampleTransl: "Jestem spóźniony, śpieszę się!" },
                                    { word: "Essere di buon umore", translation: "Być w dobrym humorze", example: "Oggi lui è di buon umore.", exampleTransl: "Dziś jest w dobrym humorze." },
                                    { word: "Avere paura", translation: "Bać się", example: "Ho paura dei ragni.", exampleTransl: "Boję się pająków." },
                                    { word: "Essere arrabbiato", translation: "Być złym", example: "Lui è arrabbiato per il traffico.", exampleTransl: "On jest zły z powodu korków." },
                                    { word: "Avere bisogno", translation: "Potrzebować", example: "Abbiamo bisogno di una pausa.", exampleTransl: "Potrzebujemy przerwy." },
                                    { word: "Avere ragione", translation: "Mieć rację", example: "Tu hai ragione, è stata la mia colpa.", exampleTransl: "Masz rację, to była moja wina." },
                                    { word: "Essere stanco", translation: "Być zmęczonym", example: "Sono stanco dopo una lunga giornata.", exampleTransl: "Jestem zmęczony po długim dniu." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Jestem głodny, chcę coś zjeść'?", options: ["Ho fame, voglio mangiare qualcosa.", "Sono felice, voglio mangiare qualcosa.", "Ho paura, voglio mangiare qualcosa."], correctAnswer: "Ho fame, voglio mangiare qualcosa." },
                                    { question: "Co znaczy 'Hai sonno? Sembra che tu sia stanco'?", options: ["Jesteś śpiący? Wygląda na to, że jesteś zmęczony.", "Jesteś głodny? Wygląda na to, że jesteś śpiący.", "Jesteś zmęczony? Wygląda na to, że jesteś zły."], correctAnswer: "Jesteś śpiący? Wygląda na to, że jesteś zmęczony." },
                                    { question: "Jak powiedzieć 'On jest zły z powodu korków'?", options: ["Lui è arrabbiato per il traffico.", "Lui ha bisogno di traffico.", "Lui è di buon umore per il traffico."], correctAnswer: "Lui è arrabbiato per il traffico." },
                                    { question: "Co znaczy 'Abbiamo bisogno di una pausa'?", options: ["Potrzebujemy przerwy.", "Mamy przerwę.", "Śpimy podczas przerwy."], correctAnswer: "Potrzebujemy przerwy." },
                                    { question: "Jak powiedzieć 'Masz rację, to była moja wina'?", options: ["Tu hai ragione, è stata la mia colpa.", "Tu sei arrabbiato, è stata la mia colpa.", "Tu hai bisogno, è stata la mia colpa."], correctAnswer: "Tu hai ragione, è stata la moja colpa." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Dziś jest w dobrym humorze'?", options: ["Oggi lui è di buon umore.", "Oggi lui è arrabbiato.", "Oggi lui ha fretta."], correctAnswer: "Oggi lui è di buon umore." },
                                    { question: "Co znaczy 'Sono stanco dopo una lunga giornata'?", options: ["Jestem zmęczony po długim dniu.", "Jestem szczęśliwy po długim dniu.", "Jestem w dobrym humorze po długim dniu."], correctAnswer: "Jestem zmęczony po długim dniu." },
                                    { question: "Jak powiedzieć 'Boję się pająków'?", options: ["Ho paura dei ragni.", "Sono arrabbiato con i ragni.", "Sono felice dei ragni."], correctAnswer: "Ho paura dei ragni." },
                                    { question: "Jak powiedzieć 'Śpieszę się'?", options: ["Ho fretta!", "Sono felice!", "Ho fame!"], correctAnswer: "Ho fretta!" },
                                    { question: "Co znaczy 'Lui è arrabbiato per il traffico'?", options: ["On jest zły z powodu korków.", "On jest zmęczony z powodu korków.", "On jest głodny z powodu korków."], correctAnswer: "On jest zły z powodu korków." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Avere fame", back: "Być głodnym", example: "Dopo scuola ho fame.", exampleTransl: "Po szkole jestem głodny." },
                                    { front: "Essere felice", back: "Być szczęśliwym", example: "Sono felice di essere qui.", exampleTransl: "Jestem szczęśliwy, że tu jestem." },
                                    { front: "Avere paura", back: "Bać się", example: "Lui ha paura del buio.", exampleTransl: "On boi się ciemności." },
                                    { front: "Essere stanco", back: "Być zmęczonym", example: "Siamo stanchi dopo la lezione.", exampleTransl: "Jesteśmy zmęczeni po lekcji." },
                                    { front: "Avere bisogno", back: "Potrzebować", example: "Ho bisogno di aiuto.", exampleTransl: "Potrzebuję pomocy." }
                                  ],
                                },
                              ],
                            }
                          ]
                        },
                        {
                          title:"B2 - Średniozaawansowany wyższy",
                          subItems:[
                            {
                              title: "Konstrukcje hipotetyczne - Tryb warunkowy (Condizionale Composto)",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Avrei voluto", translation: "Chciałbym był", example: "Avrei voluto studiare di più.", exampleTransl: "Chciałbym był więcej się uczyć." },
                                    { word: "Saresti andato/a", translation: "Poszedłbyś/Poszłabyś", example: "Saresti andato al mare se avessi avuto tempo.", exampleTransl: "Poszedłbyś nad morze, gdybyś miał czas." },
                                    { word: "Avremmo comprato", translation: "Kupilibyśmy", example: "Avremmo comprato quella macchina se avessimo avuto più soldi.", exampleTransl: "Kupilibyśmy ten samochód, gdybyśmy mieli więcej pieniędzy." },
                                    { word: "Avrebbero finito", translation: "Skończyliby", example: "Avrebbero finito prima, se avessero lavorato di più.", exampleTransl: "Skończyliby wcześniej, gdyby pracowali więcej." },
                                    { word: "Sarebbe stato/a", translation: "Byłby/Byłaby", example: "Sarebbe stata una bella giornata, se non avesse piovuto.", exampleTransl: "To byłby piękny dzień, gdyby nie padało." },
                                    { word: "Avrei fatto", translation: "Zrobiłbym", example: "Avrei fatto tutto per aiutarti.", exampleTransl: "Zrobiłbym wszystko, aby ci pomóc." },
                                    { word: "Saresti rimasto/a", translation: "Zostałbyś/Zostałabyś", example: "Saresti rimasta più a lungo, se non avessi avuto impegni.", exampleTransl: "Zostałabyś dłużej, gdybyś nie miała zobowiązań." },
                                    { word: "Avremmo parlato", translation: "Porozmawialibyśmy", example: "Avremmo parlato con il direttore, se fosse stato disponibile.", exampleTransl: "Porozmawialibyśmy z dyrektorem, gdyby był dostępny." },
                                    { word: "Sarebbero venuti", translation: "Przyszliby", example: "Sarebbero venuti alla festa, se fossero stati invitati.", exampleTransl: "Przyszliby na imprezę, gdyby zostali zaproszeni." },
                                    { word: "Avrebbe cambiato", translation: "Zmieniłby", example: "Avrebbe cambiato lavoro, se avesse avuto un'offerta migliore.", exampleTransl: "Zmieniłby pracę, gdyby miał lepszą ofertę." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Zrobiłbym wszystko, aby ci pomóc'?", options: ["Avrei fatto tutto per aiutarti.", "Avrei voluto tutto per aiutarti.", "Sarei stato tutto per aiutarti."], correctAnswer: "Avrei fatto tutto per aiutarti." },
                                    { question: "Co znaczy 'Saresti andato al mare se avessi avuto tempo'?", options: ["Poszedłbyś nad morze, gdybyś miał czas.", "Pojechałbyś w góry, gdybyś miał czas.", "Poszedłbyś do szkoły, gdybyś miał czas."], correctAnswer: "Poszedłbyś nad morze, gdybyś miał czas." },
                                    { question: "Jak powiedzieć 'Porozmawialibyśmy z dyrektorem, gdyby był dostępny'?", options: ["Avremmo parlato con il direttore, se fosse stato disponibile.", "Avremmo visto il direttore, se fosse stato disponibile.", "Sarebbe parlato con il direttore, se fosse stato disponibile."], correctAnswer: "Avremmo parlato con il direttore, se fosse stato disponibile." },
                                    { question: "Co znaczy 'Sarebbero venuti alla festa, se fossero stati invitati'?", options: ["Przyszliby na imprezę, gdyby zostali zaproszeni.", "Przybyliby na czas, gdyby zostali zaproszeni.", "Zjedliby wszystko na imprezie, gdyby zostali zaproszeni."], correctAnswer: "Przyszliby na imprezę, gdyby zostali zaproszeni." },
                                    { question: "Jak powiedzieć 'Zmieniłby pracę, gdyby miał lepszą ofertę'?", options: ["Avrebbe cambiato lavoro, se avesse avuto un'offerta migliore.", "Avrebbe visto lavoro, se avesse avuto un'offerta migliore.", "Avrebbe studiato lavoro, se avesse avuto un'offerta migliore."], correctAnswer: "Avrebbe cambiato lavoro, se avesse avuto un'offerta migliore." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Kupilibyśmy ten samochód, gdybyśmy mieli więcej pieniędzy'?", options: ["Avremmo comprato quella macchina se avessimo avuto più soldi.", "Avremmo visto quella macchina se avessimo avuto più soldi.", "Avremmo cambiato quella macchina se avessimo avuto więcej pieniędzy."], correctAnswer: "Avremmo comprato quella macchina se avessimo avuto więcej pieniędzy." },
                                    { question: "Co znaczy 'Sarebbe stata una bella giornata, se non avesse piovuto'?", options: ["To byłby piękny dzień, gdyby nie padało.", "To była piękna noc, gdyby nie padało.", "To byłby piękny dzień, gdyby padało."], correctAnswer: "To byłby piękny dzień, gdyby nie padało." },
                                    { question: "Jak powiedzieć 'Zostałabyś dłużej, gdybyś nie miała zobowiązań'?", options: ["Saresti rimasta più a lungo, se non avessi avuto impegni.", "Saresti stata più a lungo, se non avessi avuto impegni.", "Saresti voluta più a lungo, se non avessi avuto impegni."], correctAnswer: "Saresti rimasta più a lungo, se non avessi avuto impegni." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Avrei voluto", back: "Chciałbym był", example: "Avrei voluto avere più tempo.", exampleTransl: "Chciałbym był mieć więcej czasu." },
                                    { front: "Saresti andato/a", back: "Poszedłbyś/Poszłabyś", example: "Saresti andato al ristorante, se avessi saputo.", exampleTransl: "Poszedłbyś do restauracji, gdybyś wiedział." },
                                    { front: "Avremmo parlato", back: "Porozmawialibyśmy", example: "Avremmo parlato con gli ospiti, se fossimo arrivati prima.", exampleTransl: "Porozmawialibyśmy z gośćmi, gdybyśmy przybyli wcześniej." },
                                    { front: "Avrebbe cambiato", back: "Zmieniłby", example: "Avrebbe cambiato opinione, se avesse avuto altre informacje.", exampleTransl: "Zmieniłby zdanie, gdyby miał inne informacje." },
                                    { front: "Sarebbero venuti", back: "Przyszliby", example: "Sarebbero venuti presto, se fossero stati avvisati.", exampleTransl: "Przyszliby wcześnie, gdyby zostali poinformowani." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Subjuntivo - Wyrażenia wątpliwości i emocji",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Dubito che", translation: "Wątpię, że", example: "Dubito che lui sappia la verità.", exampleTransl: "Wątpię, że on zna prawdę." },
                                    { word: "Temo che", translation: "Obawiam się, że", example: "Temo che non possano venire.", exampleTransl: "Obawiam się, że nie mogą przyjść." },
                                    { word: "È possibile che", translation: "Możliwe, że", example: "È possibile che arrivi tardi.", exampleTransl: "Możliwe, że przyjdzie późno." },
                                    { word: "Spero che", translation: "Mam nadzieję, że", example: "Spero che tu venga alla festa.", exampleTransl: "Mam nadzieję, że przyjdziesz na imprezę." },
                                    { word: "Non penso che", translation: "Nie sądzę, że", example: "Non penso che sia una buona idea.", exampleTransl: "Nie sądzę, że to dobry pomysł." },
                                    { word: "Mi piace che", translation: "Podoba mi się, że", example: "Mi piace che lui sia così gentile.", exampleTransl: "Podoba mi się, że on jest taki miły." },
                                    { word: "È strano che", translation: "Dziwne, że", example: "È strano che non risponda al telefono.", exampleTransl: "Dziwne, że nie odbiera telefonu." },
                                    { word: "È necessario che", translation: "Konieczne, aby", example: "È necessario che tu studi di più.", exampleTransl: "Konieczne, abyś więcej się uczył." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Wątpię, że on zna prawdę'?", options: ["Dubito che lui sappia la verità.", "Penso che lui sappia la verità.", "Mi piace che lui sappia la verità."], correctAnswer: "Dubito che lui sappia la verità." },
                                    { question: "Co znaczy 'Temo che non possano venire'?", options: ["Obawiam się, że nie mogą przyjść.", "Mam nadzieję, że mogą przyjść.", "Obawiam się, że mogą przyjść."], correctAnswer: "Obawiam się, że nie mogą przyjść." },
                                    { question: "Jak powiedzieć 'Możliwe, że przyjdzie późno'?", options: ["È possibile che arrivi tardi.", "È strano che arrivi tardi.", "Spero che arrivi tardi."], correctAnswer: "È possibile che arrivi tardi." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Mam nadzieję, że przyjdziesz na imprezę'?", options: ["Spero che tu venga alla festa.", "Dubito che tu venga alla festa.", "Non penso che tu venga alla festa."], correctAnswer: "Spero che tu venga alla festa." },
                                    { question: "Co znaczy 'È strano che non risponda al telefono'?", options: ["Dziwne, że nie odbiera telefonu.", "Konieczne, aby odbierał telefon.", "Podoba mi się, że odbiera telefon."], correctAnswer: "Dziwne, że nie odbiera telefonu." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Dubito che", back: "Wątpię, że", example: "Dubito che sia vero.", exampleTransl: "Wątpię, że to prawda." },
                                    { front: "Spero che", back: "Mam nadzieję, że", example: "Spero che il tempo sia bello.", exampleTransl: "Mam nadzieję, że pogoda będzie ładna." },
                                    { front: "È necessario che", back: "Konieczne, aby", example: "È necessario che tu finisca il lavoro oggi.", exampleTransl: "Konieczne, abyś skończył pracę dziś." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Formalna korespondencja - Wyrażenia grzecznościowe",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Egregio/a", translation: "Szanowny/a", example: "Egregio Signor Rossi,", exampleTransl: "Szanowny Panie Rossi," },
                                    { word: "Spettabile", translation: "Szanowny/Szanowna (dla firm)", example: "Spettabile Ditta Bianchi,", exampleTransl: "Szanowna Firma Bianchi," },
                                    { word: "Con riferimento a", translation: "W nawiązaniu do", example: "Con riferimento alla Sua richiesta...", exampleTransl: "W nawiązaniu do Pańskiego zapytania..." },
                                    { word: "In attesa di", translation: "W oczekiwaniu na", example: "In attesa di un Suo cortese riscontro...", exampleTransl: "W oczekiwaniu na Pańską uprzejmą odpowiedź..." },
                                    { word: "Le porgo cordiali saluti", translation: "Przesyłam serdeczne pozdrowienia", example: "Le porgo cordiali saluti,", exampleTransl: "Przesyłam serdeczne pozdrowienia," },
                                    { word: "Distinti saluti", translation: "Z wyrazami szacunku", example: "Distinti saluti,", exampleTransl: "Z wyrazami szacunku," },
                                    { word: "Con la presente", translation: "Niniejszym", example: "Con la presente vorrei...", exampleTransl: "Niniejszym chciałbym..." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Szanowny Panie Rossi'?", options: ["Egregio Signor Rossi,", "Spettabile Signor Rossi,", "Distinti Signor Rossi,"], correctAnswer: "Egregio Signor Rossi," },
                                    { question: "Co znaczy 'Le porgo cordiali saluti'?", options: ["Przesyłam serdeczne pozdrowienia.", "W oczekiwaniu na Pańską odpowiedź.", "Niniejszym chciałbym."], correctAnswer: "Przesyłam serdeczne pozdrowienia." },
                                    { question: "Jak powiedzieć 'W nawiązaniu do Pańskiego zapytania'?", options: ["Con riferimento alla Sua richiesta,", "In attesa di un Suo cortese riscontro,", "Con la presente vorrei."], correctAnswer: "Con riferimento alla Sua richiesta," }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Z wyrazami szacunku'?", options: ["Distinti saluti,", "Egregio saluti,", "Cordiali saluti,"], correctAnswer: "Distinti saluti," },
                                    { question: "Co znaczy 'Con la presente vorrei'?", options: ["Niniejszym chciałbym", "Przesyłam pozdrowienia", "W oczekiwaniu na odpowiedź"], correctAnswer: "Niniejszym chciałbym" }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Egregio/a", back: "Szanowny/a", example: "Egregio Signor Bianchi,", exampleTransl: "Szanowny Panie Bianchi," },
                                    { front: "Distinti saluti", back: "Z wyrazami szacunku", example: "Distinti saluti, Mario Rossi.", exampleTransl: "Z wyrazami szacunku, Mario Rossi." },
                                    { front: "In attesa di", back: "W oczekiwaniu na", example: "In attesa di una Sua risposta.", exampleTransl: "W oczekiwaniu na Pańską odpowiedź." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Zaawansowane idiomy",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Avere le mani bucate", translation: "Być rozrzutnym", example: "Luca ha le mani bucate, spende tutto il suo stipendio.", exampleTransl: "Luca jest rozrzutny, wydaje całą swoją pensję." },
                                    { word: "Essere al verde", translation: "Być spłukanym", example: "Dopo le vacanze sono al verde.", exampleTransl: "Po wakacjach jestem spłukany." },
                                    { word: "Fare orecchie da mercante", translation: "Udawać, że się nie słyszy", example: "Gli ho chiesto aiuto, ma ha fatto orecchie da mercante.", exampleTransl: "Poprosiłem go o pomoc, ale udawał, że nie słyszy." },
                                    { word: "Essere in gamba", translation: "Być kompetentnym", example: "Maria è davvero in gamba nel suo lavoro.", exampleTransl: "Maria jest naprawdę kompetentna w swojej pracy." },
                                    { word: "Andare a gonfie vele", translation: "Iść świetnie", example: "La mia attività sta andando a gonfie vele.", exampleTransl: "Mój biznes idzie świetnie." },
                                    { word: "Avere un diavolo per capello", translation: "Być bardzo zdenerwowanym", example: "Dopo quella discussione, aveva un diavolo per capello.", exampleTransl: "Po tej kłótni był bardzo zdenerwowany." },
                                    { word: "Mettere la mano sul fuoco", translation: "Być czegoś pewnym", example: "Metterei la mano sul fuoco che lui dice la verità.", exampleTransl: "Dałbym sobie rękę uciąć, że on mówi prawdę." },
                                    { word: "Essere una testa calda", translation: "Być impulsywnym", example: "Gianni è una testa calda, reagisce sempre senza pensare.", exampleTransl: "Gianni jest impulsywny, zawsze reaguje bez zastanowienia." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Luca jest rozrzutny, wydaje całą swoją pensję'?", options: ["Luca ha le mani bucate.", "Luca è al verde.", "Luca ha un diavolo per capello."], correctAnswer: "Luca ha le mani bucate." },
                                    { question: "Co znaczy 'Essere in gamba'?", options: ["Być kompetentnym.", "Być rozrzutnym.", "Być zdenerwowanym."], correctAnswer: "Być kompetentnym." },
                                    { question: "Jak powiedzieć 'Udawać, że się nie słyszy'?", options: ["Fare orecchie da mercante.", "Mettere la mano sul fuoco.", "Essere al verde."], correctAnswer: "Fare orecchie da mercante." },
                                    { question: "Co znaczy 'Essere al verde'?", options: ["Być spłukanym.", "Być kompetentnym.", "Być impulsywnym."], correctAnswer: "Być spłukanym." },
                                    { question: "Jak powiedzieć 'Być czegoś pewnym'?", options: ["Mettere la mano sul fuoco.", "Avere le mani bucate.", "Andare a gonfie vele."], correctAnswer: "Mettere la mano sul fuoco." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Po wakacjach jestem spłukany'?", options: ["Dopo le vacanze sono al verde.", "Dopo le vacanze ho le mani bucate.", "Dopo le vacanze ho fatto orecchie da mercante."], correctAnswer: "Dopo le vacanze sono al verde." },
                                    { question: "Co znaczy 'Andare a gonfie vele'?", options: ["Iść świetnie.", "Być impulsywnym.", "Być zdenerwowanym."], correctAnswer: "Iść świetnie." },
                                    { question: "Jak powiedzieć 'Maria jest naprawdę kompetentna w swojej pracy'?", options: ["Maria è davvero in gamba nel suo lavoro.", "Maria ha le mani bucate nel suo lavoro.", "Maria è una testa calda nel suo lavoro."], correctAnswer: "Maria è davvero in gamba nel suo lavoro." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Essere al verde", back: "Być spłukanym", example: "Sono al verde dopo aver pagato le bollette.", exampleTransl: "Jestem spłukany po zapłaceniu rachunków." },
                                    { front: "Avere le mani bucate", back: "Być rozrzutnym", example: "Non risparmia mai, ha le mani bucate.", exampleTransl: "Nigdy nie oszczędza, jest rozrzutny." },
                                    { front: "Essere in gamba", back: "Być kompetentnym", example: "Il nuovo collega è davvero in gamba.", exampleTransl: "Nowy kolega jest naprawdę kompetentny." },
                                    { front: "Mettere la mano sul fuoco", back: "Być czegoś pewnym", example: "Metterei la mano sul fuoco che ha ragione.", exampleTransl: "Dałbym sobie rękę uciąć, że ma rację." }
                                  ],
                                },
                              ],
                            },
                            {
                              title: "Retoryka i argumentacja w języku włoskim",
                              isCompleted: false,
                              started: false,
                              currentStage: 1,
                              stages: [
                                {
                                  stage: 1,
                                  type: "Słownictwo",
                                  content: [
                                    { word: "Secondo me", translation: "Według mnie", example: "Secondo me, questa soluzione è la migliore.", exampleTransl: "Według mnie to rozwiązanie jest najlepsze." },
                                    { word: "Innanzitutto", translation: "Przede wszystkim", example: "Innanzitutto, dobbiamo considerare i costi.", exampleTransl: "Przede wszystkim musimy rozważyć koszty." },
                                    { word: "Per quanto riguarda", translation: "Jeśli chodzi o", example: "Per quanto riguarda il progetto, è quasi finito.", exampleTransl: "Jeśli chodzi o projekt, jest prawie skończony." },
                                    { word: "Nonostante ciò", translation: "Mimo to", example: "Nonostante ciò, abbiamo deciso di continuare.", exampleTransl: "Mimo to postanowiliśmy kontynuować." },
                                    { word: "In conclusione", translation: "Podsumowując", example: "In conclusione, questa è una buona scelta.", exampleTransl: "Podsumowując, to dobry wybór." }
                                  ],
                                },
                                {
                                  stage: 2,
                                  type: "Ćwiczenie",
                                  content: [
                                    { question: "Jak powiedzieć 'Według mnie to rozwiązanie jest najlepsze'?", options: ["Secondo me, questa soluzione è la migliore.", "Innanzitutto, questa soluzione è la migliore.", "Nonostante ciò, questa soluzione è la migliore."], correctAnswer: "Secondo me, questa soluzione è la migliore." },
                                    { question: "Co znaczy 'Per quanto riguarda il progetto, è quasi finito'?", options: ["Jeśli chodzi o projekt, jest prawie skończony.", "Podsumowując projekt, jest prawie skończony.", "Mimo to projekt jest prawie skończony."], correctAnswer: "Jeśli chodzi o projekt, jest prawie skończony." }
                                  ],
                                },
                                {
                                  stage: 3,
                                  type: "Quiz",
                                  content: [
                                    { question: "Jak powiedzieć 'Przede wszystkim musimy rozważyć koszty'?", options: ["Innanzitutto, dobbiamo considerare i costi.", "Nonostante ciò, dobbiamo considerare i costi.", "In conclusione, dobbiamo considerare i costi."], correctAnswer: "Innanzitutto, dobbiamo considerare i costi." },
                                    { question: "Co znaczy 'In conclusione, questa è una buona scelta'?", options: ["Podsumowując, to dobry wybór.", "Przede wszystkim to dobry wybór.", "Mimo to, to dobry wybór."], correctAnswer: "Podsumowując, to dobry wybór." }
                                  ],
                                },
                                {
                                  stage: 4,
                                  type: "Fiszki",
                                  content: [
                                    { front: "Secondo me", back: "Według mnie", example: "Secondo me, la tua idea è interessante.", exampleTransl: "Według mnie twoja idea jest interesująca." },
                                    { front: "Innanzitutto", back: "Przede wszystkim", example: "Innanzitutto, grazie per l'invito.", exampleTransl: "Przede wszystkim dziękuję za zaproszenie." },
                                    { front: "In conclusione", back: "Podsumowując", example: "In conclusione, è stata una buona discussione.", exampleTransl: "Podsumowując, to była dobra dyskusja." }
                                  ],
                                },
                              ],
                            }
                          ]
                        }
                      ],
                    },
                  ]
            }

            await setDoc(userDocRef, initialData);
            console.log("Zainicjalizowane dane dla nowego użytkownika");
        }else{
            console.log("Użytkownik ma już dane w Firestore");
        }
    }catch(error){
        console.error("Błąd podczas wczytywania danych do Firestore ", error);
    }
}