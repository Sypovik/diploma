import { StyleSheet, SafeAreaView} from 'react-native';
import MainStack from './navigate';

export default function App() {
  return (

    <SafeAreaView style={styles.AndroidSafeArea}>
      <MainStack/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
  }
});
