import React from 'react';
import { View, TextInput, Button, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
 // Define colors for background color selection
// Define colors for background color selection
const backgroundColors = {
    black: '#090C08',
    purple: '#474056',
    grey: '#8A95A5',
    green: '#B9C6AE',
  };
export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '', 
            color: ''
         };
      }
    render(){
   
        return (
            <View style={styles.container}>
                 <ImageBackground  source={require('../assets/background-image.png')} resizeMode="cover" style={styles.image}>
                 <Text style={styles.title}>Chat App</Text>
          <View style={styles.startWrapper}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Your Name"
            />
            <View style={styles.colorWrapper}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colors}>
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.black },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.black })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.purple },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.purple })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.grey },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.grey })
                  }
                />
                <TouchableOpacity
                  style={[
                    styles.color,
                    { backgroundColor: backgroundColors.green },
                  ]}
                  onPress={() =>
                    this.setState({ color: backgroundColors.green })
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                  color: this.state.color,
                })
              }
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    resizeMode: 'cover',
    paddingVertical: '6%',
  },

  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingVertical: '15%',
  },

  startWrapper: {
    backgroundColor: 'white',
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '6%',
  },

  input: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 50,
    height: 60,
    width: '88%',
    borderColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 5,
    padding: '5%',
  },

  colorWrapper: {
    width: '88%',
    justifyContent: 'center',
  },

  colorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },

  colors: {
    flexDirection: 'row',
  },

  color: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 25,
  },

  button: {
    height: 60,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757083',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});