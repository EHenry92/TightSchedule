import React, {Component} from 'react';
import firebase from 'firebase';
import firebaseData from '../secrets';
import {Text, View} from 'react-native';
// import Router from './Router';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp(firebaseData);
  }
  render () {
    return (
        <View>
          <Text>Tight Schedule</Text>
        </View>
    )
  }

}

export default App;
