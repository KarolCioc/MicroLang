import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NoLessonsScreen from './noLessonsScreen';
import LessonsList from './lessonsList';
import LessonProgress from './lessonProgress';

const LessonStack = createStackNavigator();

export default function LessonStackNavigator({lessons, refreshKey, refreshLessons}) {
    return (
        <LessonStack.Navigator screenOptions={{headerShown: false}}>
          {lessons.length > 0 ? (
            <>
            <LessonStack.Screen name="LessonsList" >{() => <LessonsList refreshKey={refreshKey} />}</LessonStack.Screen>
            <LessonStack.Screen name="LessonProgress">{() => <LessonProgress refreshLessons={refreshLessons} />}</LessonStack.Screen>
            </>
          ) : (
            <LessonStack.Screen name="NoLessons" component={NoLessonsScreen}/>
          )}
        </LessonStack.Navigator>
      );
}
