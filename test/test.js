import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/home';
import { AccordionList } from '../components/accordionList';
import LessonList from '../components/lessonsList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartedLessonsCard from '../components/startedLessonsCard';
import LessonCard from '../components/lessonCard';
import SignUp from '../components/signUp';
import Login from '../components/login';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithCredential } from 'firebase/auth';
import Summary from '../components/summary';
import Settings from '../components/settings';
import * as Notifications from 'expo-notifications';
import { doc, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    LongPressGestureHandler: View,
    NativeViewGestureHandler: View,
    RectButton: View,
    BaseButton: View,
    BorderlessButton: View,
    FlatList: View,
    RawButton: View,
    TouchableHighlight: View,
    TouchableOpacity: View,
    TouchableWithoutFeedback: View,
    ScrollView: View,
  };
});
jest.mock('expo-notifications', () => ({
  cancelAllScheduledNotificationsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  GoogleAuthProvider: {
    credential: jest.fn(() => 'mockCredential'),
  },
  signInWithCredential: jest.fn().mockResolvedValue({
    user: { uid: 'iakHWucm5oWXrkZ9T2b7TfJKMP12', email: 'kodzirasek@gmail.com' },
  }),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ uid: 'test-user', email: 'test@example.com' });
    return jest.fn();
  }),
  signOut: jest.fn(),
}));
jest.mock('@react-native-google-signin/google-signin', () => {
  return {
    GoogleSignin: {
      configure: jest.fn(),
      hasPlayServices: jest.fn().mockResolvedValue(true),
      signIn: jest.fn().mockResolvedValue({
        idToken: 'test-id-token',
      }),
      signOut: jest.fn().mockResolvedValue(null),
    },
    statusCodes: {
      SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
      IN_PROGRESS: 'IN_PROGRESS',
      PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
    },
  };
});
jest.mock('../hooks/useAuth'); 
jest.mock('../config/firebase', () => ({
  db: {},
}));
jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true]),
}));
jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('expo-speech', () => ({
  speak: jest.fn(),
}));
jest.mock('@expo/vector-icons', () => ({
  FontAwesome: 'FontAwesome',
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(() => ({ fakeDocRef: true })), 
  getDoc: jest.fn().mockResolvedValue({
    exists: jest.fn(() => true),
    data: jest.fn(() => ({ lessons: [], dailyGoal: 20, learningTime: {} })),
  }),
  setDoc: jest.fn(),
}));
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(() => ({
      navigate: jest.fn(),
      addListener: jest.fn(),
    })),
  };
});

const mockHandleStartLesson = jest.fn();
const mockLessons = [
  {
    language: 'Hiszpański',
    title: 'Lekcje Hiszpańskiego',
    subItems: [
      {
        title: 'A1 - Początkujący',
        subItems: [
          {
            title: 'Powitania i przedstawianie się',
            isCompleted: false,
            started: true,
            currentStage: 1,
            stages:[1,2,3],
          },
        ],
      },
      {
        title: 'A2 - Podstawowy',
        subItems: [
          {
            title: 'Liczby',
            isCompleted: false,
            started: false,
            currentStage: 1,
            stages:[1,2,3],
          },
        ],
      },
    ],
  },
];

const mockLesson = {
  language: 'Hiszpański',
  title: 'Lekcje Hiszpańskiego',
  subItems: [
    {
      title: 'A1 - Początkujący',
      subItems: [
        {
          title: 'Powitania i przedstawianie się',
          isCompleted: false,
          started: true,
          currentStage: 1,
          stages: [1, 2, 3],
        },
      ],
    },
  ],
};

//OPISANE
/*
describe('Komponent Home i AccordionList', () =>{
  it('Renderowanie listy rozwijalnej \n Wywołanie funkcji handleStartLesson po rozpoczęciu lekcji za pomocą przycisku', async () => {
    const { getByText, getByTestId } = render(
      <AccordionList
        title="Lekcje Hiszpańskiego"
        items={mockLessons[0].subItems}
        startLesson={mockHandleStartLesson}
      />
    );
  
    expect(getByText('Lekcje Hiszpańskiego')).toBeTruthy();
    fireEvent.press(getByText('Lekcje Hiszpańskiego'));
    expect(getByText('A1 - Początkujący')).toBeTruthy();
    fireEvent.press(getByText('A1 - Początkujący'));
    expect(getByTestId('start-lesson-Powitania i przedstawianie się')).toBeTruthy();
    fireEvent.press(getByTestId('start-lesson-Powitania i przedstawianie się'));
    expect(mockHandleStartLesson).toHaveBeenCalledWith({
      title: 'Powitania i przedstawianie się',
      isCompleted: false,
      started: false,
      currentStage: 1,
    });
  
  });

  it('Poprawne działanie funkcji do filtrowania elementów na podstawie pola started', () => {
    const { getByText, queryByText, debug } = render(
      <AccordionList
        title="Lekcje Hiszpańskiego"
        items={[
          {
            title: 'A2 - Średniozaawansowany',
            subItems: [
              {
                title: "Powitania i przedstawianie się",
                isCompleted: false,
                started: true,
                currentStage: 1,
                stages: [
                  {
                    stage: 1,
                    type: "Słownictwo",
                    content: [
                      { word: "Hello", translation: "Cześć", example: "Hello, how are you?", exampleTransl: "Cześć, jak się masz?" },
                    ]
                  },
                ]
              }
            ],
          },
          {
            title: 'A1 - Początkujący',
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
                    ]
                  },
                ]
              }
            ],
          },
        ]}
        startLesson={mockHandleStartLesson}
      />
    );
    fireEvent.press(getByText('Lekcje Hiszpańskiego'));
    expect(queryByText('A2 - Średniozaawansowany')).toBeNull();
    expect(queryByText('A1 - Początkujący')).toBeTruthy();
    debug();
  
  });

    test('Renderowanie podstawowych elementów komponentu Home', () => {
        const { getByText, getByTestId } = render(
        <NavigationContainer>
          <Home refreshLessons={jest.fn()} />
        </NavigationContainer>);
      
        expect(getByText('Dzień dobry!')).toBeTruthy();
        expect(getByText('Gotowy na dzisiejszą lekcję?')).toBeTruthy();
      
        expect(getByText(/Twój dzienny cel nauki/i)).toBeTruthy();
      
        expect(getByText('Hiszpański')).toBeTruthy();
        expect(getByText('Angielski')).toBeTruthy();
        expect(getByText('Włoski')).toBeTruthy();
        expect(getByText('Naucz się języka')).toBeTruthy();
        expect(getByTestId('flag-es')).toBeTruthy();
        expect(getByTestId('flag-it')).toBeTruthy();
        expect(getByTestId('flag-en')).toBeTruthy();
        const spanishButton = getByText('Hiszpański');
        const englishButton = getByText('Angielski');
        expect(spanishButton.props.style.color).toBe('#FF5252');
        fireEvent.press(englishButton);
        expect(englishButton.props.style.color).toBe('#6680FD');
  
      });
})*/

//OPISANE
/*
describe('LessonList i StartedLessonsCard Komponent', () => {
  let mockNavigation;

  beforeEach(async () => {
    await AsyncStorage.setItem('lessons', JSON.stringify(mockLessons));

    const useNavigation = require('@react-navigation/native').useNavigation;
    mockNavigation = jest.fn();
    useNavigation.mockReturnValue({
      navigate: mockNavigation,
    });
  });

  it('Poprawne renderowanie rozpoczętych lekcji', async () => {
    const { queryByText, getByText, debug } = render(
      <NavigationContainer>
        <LessonList refreshKey={0} />
      </NavigationContainer>
    );

    await waitFor(() => expect(getByText('Rozpoczęte lekcje')).toBeTruthy());
    await waitFor(() => expect(getByText('A1 - Początkujący')).toBeTruthy());
    await waitFor(() => expect(getByText('Powitania i przedstawianie się')).toBeTruthy());
    expect(getByText('Etap: 1/3')).toBeTruthy();
    
    await waitFor(() => expect(queryByText('A2 - Podstawy')).toBeNull());
    debug();
  });

  it('Poprawne nawigowanie do Home poprzez naciśnięcie przycisku', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <LessonList refreshKey={0} />
      </NavigationContainer>
    );

    const homeButton = getByText('Przejdź do wyboru lekcji');
    expect(homeButton).toBeTruthy();
    fireEvent.press(homeButton);
    expect(mockNavigation).toHaveBeenCalledWith('Home');
  });

  it('Poprawne rozpoczęcie sesji nauki', async () => {
    const mockNavigate = jest.fn();

    const { getByTestId } = render(
      <NavigationContainer>
        <StartedLessonsCard navigation={{navigate: mockNavigate}} lesson={mockLesson} />
      </NavigationContainer>
    );
  
    const lessonButton = getByTestId('start-lesson-btn');
    fireEvent.press(lessonButton);
  
    expect(mockNavigate).toHaveBeenCalledWith('LessonProgress', {
      lessonData: {
        ...mockLesson.subItems[0].subItems[0],
        language: mockLesson.language,
        lvlTitle: mockLesson.subItems[0].title,
      },
    });
  });
  
  it('Poprawne dodanie czasu rozpoczęcia lekcji do Async Storage', async () => {
    const mockNavigate = jest.fn();
    const { getByTestId } = render(
      <NavigationContainer>
        <StartedLessonsCard navigation={{navigate: mockNavigate}} lesson={mockLesson} />
      </NavigationContainer>
    );
  
    const lessonButton = getByTestId('start-lesson-btn');
    fireEvent.press(lessonButton);
  
    await waitFor(() => expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'lessonStart',
      expect.any(String)
    ));
  
    const timestamp = await AsyncStorage.getItem('lessonStart');
    expect(timestamp).not.toBeNull();
  }); 
});*/

//OPISANE
/*
describe('Komponent LessonCard', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(async () => {
    await AsyncStorage.setItem('lessons', JSON.stringify([]));
  });

  it('Poprawne renderowanie danych lekcji', async () => {
    const mockLessonData = {
      language: 'Hiszpański',
      title: 'Powitania i przedstawianie się',
      currentStage: 1,
      stages: [
        {
          stage: 1,
          type: 'Słownictwo',
          content: [
            {
              word: 'Hola',
              translation: 'Cześć',
              example: 'Hola, ¿cómo te llamas?',
              exampleTransl: 'Cześć, jak się nazywasz?',
            },
            {
              word: 'Adiós',
              translation: 'Do widzenia',
              example: 'Adiós, hasta luego.',
              exampleTransl: 'Do widzenia, do zobaczenia później.',
            },
          ],
        },
      ],
    };

    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <LessonCard lessonData={mockLessonData} refreshLessons={jest.fn()} />
      </NavigationContainer>
    );


    expect(getByText('Hola')).toBeTruthy();
    fireEvent.press(getByTestId('right-btn'));
    await waitFor(() => {
      expect(getByText('Adiós')).toBeTruthy();
    });
  });

  it('Poprawne działanie funkcji handleAnswer,wyświetlanie informacji o ukończeniu etapów,\nprzechodzenie do następnego etapu lekcji oraz zakończenie lekcji', async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('@react-navigation/native'), 'useNavigation').mockReturnValue({
      navigate: mockNavigate,
      addListener: jest.fn((event, callback) => {
        if (event === 'blur') {
          callback();
        }
        return jest.fn();
      }),
      canGoBack: jest.fn(() => true),
      popToTop: jest.fn(),
    });
  
    const singleQuestionLesson = {
      language: 'Hiszpański',
      title: 'Powitania i przedstawianie się',
      currentStage: 1,
      stages: [
        { stage: 1, type: 'Słownictwo', content: [
          { word: "Hola", translation: "Cześć", example: "Hola, ¿cómo te llamas?", exampleTransl: "Cześć, jak się nazywasz?" },
        ] },
        {
          stage: 2,
          type: 'Ćwiczenie',
          content: [
            {
              question: "Jak powiedzieć 'Dziękuję' po hiszpańsku?",
              options: ['Gracias', 'Por favor', 'Hola'],
              correctAnswer: 'Gracias',
            },
          ],
        },
        {
          stage: 3,
          type: 'Quiz',
          content: [
            {
              question: "Uzupełnij: ___, me llamo Carlos.", 
              options: ["Hola", "Adiós", "Por favor"], 
              correctAnswer: "Hola" ,
            },
          ],
        },
        {
          stage: 4,
          type: 'Fiszki',
          content: [
            {
                front: "Buenas noches", 
                back: "Dobranoc", 
                example: "Buenas noches, que descanses.", 
                exampleTransl: "Dobranoc, odpocznij dobrze." ,
            },
          ],
        },
      ],
    };
  
    const { getByText, getByTestId, queryByText, debug } = render(
      <NavigationContainer>
        <LessonCard lessonData={singleQuestionLesson} />
      </NavigationContainer>
    );
    
    fireEvent.press(getByTestId('goNext-btn'));
    expect(queryByText('Brawo! Ukończyłeś ćwiczenie')).toBeNull();
    fireEvent.press(getByText('Gracias'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText('Brawo! Ukończyłeś ćwiczenie')).toBeTruthy();
    fireEvent.press(getByTestId('goNext-btn'));
    fireEvent.press(getByText('1. Hola'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getByText('Brawo! Ukończyłeś quiz')).toBeTruthy();
    fireEvent.press(getByTestId('goNext-btn'));
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    fireEvent.press(getByTestId('flip-flashcard'));
    fireEvent.press(getByTestId('remember-btn'));
    fireEvent.press(getByTestId('end-btn'));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('LessonsList');
    });
  });  
});*/

//OPISANE
/*
describe("Komponent SignUp", () => {
  it('Poprawne renderowanie komponentu', async () => {
    const { getByPlaceholderText, getByText, debug } = render(
      <SignUp navigation={{ navigate: jest.fn() }}/>
    );

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Hasło')).toBeTruthy();
    expect(getByText('Zarejestruj')).toBeTruthy();
    expect(getByText('Zaloguj się')).toBeTruthy();
    expect(getByText('Posiadasz konto?')).toBeTruthy();
    expect(getByText('Zarejestruj się za pomocą email')).toBeTruthy();
  });

  it('Nie obsługuje rejestracji, jeśli jedno z pól jest puste', async () => {
    const { getByPlaceholderText, getByTestId, debug } = render(<SignUp navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Hasło'), 'password123');
    fireEvent.press(getByTestId('signUp-btn'));
    
    debug()
    expect(createUserWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('Umożliwia wprowadzanie danych do pól tekstowych i rejestracje użytkownika', async () =>{
    const { getByPlaceholderText,getByTestId, debug } = render(
      <SignUp navigation={{ navigate: jest.fn() }}/>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Hasło');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
    fireEvent.press(getByTestId('signUp-btn'));
    
    debug()
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });

  it('Nawiguje na ekran logowania po naciśnięciu Zaloguj się', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(
      <SignUp navigation={{ navigate: mockNavigate }} />
    );
  
    fireEvent.press(getByText('Zaloguj się'));
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
})*/

//OPISANE
/*
describe('Komponent Login', () => {
  it('Poprawne renderowanie elementów', () => {
    const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate: jest.fn() }} />);

    expect(getByText('Micro')).toBeTruthy();
    expect(getByText('Lang')).toBeTruthy();
    expect(getByText('Zaloguj się za pomocą email')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Hasło')).toBeTruthy();
    expect(getByText('Zaloguj')).toBeTruthy();
    expect(getByText('Zaloguj się z Google')).toBeTruthy();
  });

  it('Nie obsługuje logowania, jeśli jedno z pól jest puste', async () => {
    const { getByPlaceholderText, getByTestId, debug } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Hasło'), 'password123');
    fireEvent.press(getByTestId('login-btn'));
    
    debug()
    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('Poprawnie obsługuje logowanie za pomocą e-mail i hasła', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});

    const { getByPlaceholderText, getByTestId, debug } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Hasło'), 'password123');
    fireEvent.press(getByTestId('login-btn'));
    debug();

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@example.com', 'password123');
    });
  });

  it('Poprawnie nawiguje do ekranu rejestracji', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<Login navigation={{ navigate: mockNavigate }} />);
    fireEvent.press(getByText('Zarejestruj się'));
    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });

  it('Poprawnie obsługuje logowanie za pomocą Google', async () => {
    const { getByText } = render(<Login navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('Zaloguj się z Google'));
  
    await waitFor(() => {
      expect(GoogleSignin.hasPlayServices).toHaveBeenCalled();
      expect(GoogleSignin.signIn).toHaveBeenCalled();
      expect(signInWithCredential).toHaveBeenCalledWith(expect.anything(), 'mockCredential');
    });
  });
});*/

//OPISANE
/*
describe('Komponent summary', () =>{
  it('Poprawnie renderuje wszystkie główne elementy interfejsu', () => {
    const { getByText } = render(
    <NavigationContainer>
      <Summary />
    </NavigationContainer>);
  
    expect(getByText('Podsumowanie')).toBeTruthy();
    expect(getByText('Tygodniowy czas nauki')).toBeTruthy();
    expect(getByText('Postęp w językach')).toBeTruthy();
  });

  it('Poprawnie odczytuje dane czasu nauki z AsyncStorage, oblicza średni czas nauki,\nnajdłuższą sesję nauki oraz postęp w językach', async () => {
    const mockLearningTime = JSON.stringify({
      '2025-01-20': 5,
      '2025-01-21': 14,
    });

    const mockLessons = JSON.stringify([
      {
        language: 'Hiszpański',
        subItems: [
          {
            title: 'Lekcje',
            subItems: [
              { title: 'Lekcja 1', isCompleted: true },
              { title: 'Lekcja 2', isCompleted: false },
            ],
          },
        ],
      },
    ]);
  
    AsyncStorage.getItem = jest.fn()
    .mockImplementationOnce(() => Promise.resolve(mockLearningTime))
    .mockImplementationOnce(() => Promise.resolve(mockLessons));
  
    const { getByText,debug } = render(
      <NavigationContainer>
        <Summary />
      </NavigationContainer>
    );
  
    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('learningTime'));
    await waitFor(() => expect(AsyncStorage.getItem).toHaveBeenCalledWith('lessons'));
    debug();
    expect(getByText('Średni czas nauki: 3 min')).toBeTruthy();
  });
})*/



describe('Komponent Settings', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: { uid: 'iakHWucm5oWXrkZ9T2b7TfJKMP12', email: 'kodzirasek@gmail.com' },
    });

    jest.clearAllMocks();
  });

  it('Poprawnie renderuje wszystkie główne elementy interfejsu', () => {
    const { getByText, getByTestId } = render(<Settings />);
  
  expect(getByText('Ustawienia')).toBeTruthy();
  expect(getByText(/Dzienny cel: \d+ minut/)).toBeTruthy();
  expect(getByText('Wyloguj')).toBeTruthy();
  expect(getByTestId('daily-goal')).toBeTruthy();
  expect(getByTestId('notification-switch')).toBeTruthy();
  });

  it('Poprawnie włącza i wyłącza powiadomienia', async () => {
    const { getByTestId } = render(<Settings />);
    const notificationSwitch = getByTestId('notification-switch');
  
    fireEvent(notificationSwitch, 'onValueChange', true);
  
    await waitFor(() => {
      expect(Notifications.scheduleNotificationAsync).toHaveBeenCalled();
    });
    await waitFor(() => expect(notificationSwitch.props.value).toBe(true));
  
    fireEvent(notificationSwitch, 'onValueChange', false);
  
    await waitFor(() => {
      expect(Notifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalled();
    });
    await waitFor(() => expect(notificationSwitch.props.value).toBe(false));
  });

  it('Aktualizuje dailyGoal w AsyncStorage i Firestore po przesunięciu suwaka', async () => {
    const { getByTestId } = render(<Settings />);

    const slider = getByTestId('daily-goal');

    fireEvent(slider, 'onValueChange', 30);
    fireEvent(slider, 'onSlidingComplete', 30);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('dailyGoal', '30');
      expect(doc).toHaveBeenCalledWith(expect.anything(), 'Users', 'iakHWucm5oWXrkZ9T2b7TfJKMP12');
      expect(setDoc).toHaveBeenCalledWith(
        { fakeDocRef: true },
        { dailyGoal: 30 },
        { merge: true },
      );
    });
  });

  it('Poprawnie wylogowuje użytkownika', () =>{
    const { getByTestId, debug } = render(<Settings />);

    debug();
    fireEvent.press(getByTestId('logOut-btn'));
    expect(signOut).toHaveBeenCalled();
    
  })
})