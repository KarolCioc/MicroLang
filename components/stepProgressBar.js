import React from 'react';
import { View, Dimensions } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
const window = Dimensions.get("window");

const labels = ["Słownictwo", "Ćwiczenie", "Quiz", "Fiszki"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeFinishedColor: '#000000',
  stepIndicatorFinishedColor: '#000000',
  stepIndicatorLabelFinishedColor: '#FFFFFF',
  separatorFinishedColor: '#000000',
  stepIndicatorCurrentColor: '#FFFFFF',
  stepIndicatorLabelCurrentColor: '#1F2937',
  stepStrokeCurrentColor: '#1F2937',
  stepStrokeUnFinishedColor: '#C5C5C5',
  stepIndicatorUnFinishedColor: '#FFFFFF',
  stepIndicatorLabelUnFinishedColor: '#FFFFFF',
  separatorUnFinishedColor: '#C5C5C5',
  labelColor: '#FFFFFF',
  currentStepLabelColor: '#1F2937',
  labelSize: 10,
  stepIndicatorLabelFontSize: 10,
  currentStepIndicatorLabelFontSize: 12,
};



export default function StepProgressBar({currentStage}) {
  return (
    <View style={{width:'100%', paddingHorizontal:10}}>
      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentStage-1}
        labels={labels}
        stepCount={4}
      />
    </View>
  );
}
