//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/MainComponent'

//import { StyleSheet, Text, View } from 'react-native';
/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
*/

export default class App extends React.Component {
  render() {
  return (
    <Main />
  );
  }
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/