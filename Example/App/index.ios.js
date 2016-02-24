/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View, 
  TouchableOpacity
} from 'react-native';

var BTClient = require('react-native-braintree');

class Example extends Component {
  makePayment(){
    fetch("http://localhost:3000/get_token")
      .then(function(response){
        return response.json()
      }).then(function(json){
        var { clientToken } = json;
        BTClient.setup(clientToken);
        BTClient.showPaymentViewController(function(err, nonce) {
          //payment succeeded, pass nonce to server
          console.log(err, nonce);
        });    
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.makePayment} >
          <Text style={styles.button}>
            Here's My Money!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    color: "white", 
    backgroundColor: "green",
  },
});

AppRegistry.registerComponent('Example', () => Example);
