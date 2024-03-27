import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Image, TouchableHighlight} from 'react-native';

export default function App() {
  const handelTextPress = () => {
    console.log('hello!')
  }

  const handelButtonPress = () => {
    Alert.alert('hello!', '1 2', [
      {
        text: 'yes',
        onPress: () => console.log('yes')
      },
      {
        text: 'no',
        onPress: () => console.log('no')
      },
      {
        text: 'cancel',
        onPress: () => console.log('cancel')
      }
    ])
  }

  const handelButtonPress2 = () => {
    Alert.prompt('hello!', '1 2', text => console.log(text))
    console.log("asdasd")
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text} onPress={handelTextPress}>Hello! {'\n'} 1 2</Text>
      <Button title="Click me" onPress={handelButtonPress} />
      <Button title="кнопка 2" onPress={handelButtonPress2} />
      <Image source={require('./assets/favicon.png')} />
      <TouchableHighlight onPress={handelButtonPress2}> 
        <Image 
        blurRadius={0}
        source={{
          width: 50,
          height: 50,
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        />
      </TouchableHighlight>
     

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    border: '1px solid red',
    color: 'red',
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'blue',
  }
});
