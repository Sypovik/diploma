import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Voice from 'react-native-voice';


export default function App() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('');
  const startListening = () => {
    setIsListening(true);
    Voice.start('en-US');
  };
  const stopListening = () => {
    setIsListening(false);
    Voice.stop();
  };
  Voice.onSpeechResults = (e) => {
    setNote(e.value[0]); // Capture the recognized speech
    stopListening();
  };
  return (
    <View>
      {isListening ? (
        <Text>Listening...</Text>
      ) : (
        <>
          <Text>{note}</Text>
          <TouchableOpacity onPress={startListening}>
            <Text>Start Listening</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
