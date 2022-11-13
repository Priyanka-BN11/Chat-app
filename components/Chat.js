import React from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import {
  View,
  Text,
  Button,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

// importing firebase
const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBYASrEUrk2rWtmNKNCZAfnvPEK5o0Kahw",
  authDomain: "test-c46a4.firebaseapp.com",
  projectId: "test-c46a4",
  storageBucket: "test-c46a4.appspot.com",
  messagingSenderId: "787632016364",
  appId: "1:787632016364:web:f1cf13b424d510d131cec9",
  measurementId: "G-NCKMNQV3ES"
};
 // Initialize Firebase
 if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      
    };
  }
  
  componentDidMount() {
     // Set the name property to be included in the navigation bar
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
    this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
    this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)

    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hello ${name}, Good Day`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: `${name} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

 //Appends new message to previous
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  onCollectionUpdate = (querySnapshot) => {
    const lists = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      //get the QueryDocumentSnapshot's data
      var data = doc.data();
      lists.push({
        name: data.name,
        items: data.items.toString(),
      });
    });
    this.setState({
      lists,
    }) ;
  };
  //Allows bubble customization   
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: 'white',
          },
          right: {
            backgroundColor: 'green'
          }
        }}
      />
    );
  }

  render() {
    

    return (
      <View style={{ flex: 1 }}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,     
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});