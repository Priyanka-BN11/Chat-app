import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Chat extends React.Component {
  componentDidMount() {
    // Set the name property to be included in the navigation bar
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    // Set the color property as background color for the chat screen
    let color = this.props.route.params.color;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
        }}
      >
        <Text>This is the Chat screen!</Text>
      </View>
    );
  }
}