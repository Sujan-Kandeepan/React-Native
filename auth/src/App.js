import React, { Component } from 'react';
import { View } from 'react-native';

import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    const firebase = require('firebase'); // eslint-disable-line global-require
    require('firebase/auth'); // eslint-disable-line global-require

    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: ''
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    const firebase = require('firebase'); // eslint-disable-line global-require
    require('firebase/auth'); // eslint-disable-line global-require

    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
      );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        <View style={{ height: 45 }}>
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

export default App;
