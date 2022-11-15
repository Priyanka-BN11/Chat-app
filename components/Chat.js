import React from "react";

import { GiftedChat, Bubble,InputToolbar } from "react-native-gifted-chat";
import 'react-native-gesture-handler';
import {
  View,
  Platform, StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';

// importing firebase
const firebase = require('firebase');
require('firebase/firestore');



export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        avatar: '',
        name: '',
      },
      isConnected: false,
    };
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

  }
  //getMessages should be added before componentdidmount
  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  componentDidMount() {
     // Set the name property to be included in the navigation bar
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    this.getMessages();
    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log('online');
      } else {
        console.log('offline');
      }
    });
    // this.setState({
        
    //   messages: [
    //     {
    //       // _id: 2,
    //       // text: `${name} has entered the chat`,
    //       // createdAt: new Date(),
    //       // system: true,
    //     },
    //   ],
      
    // });
    this.referenceChatMessages = firebase.firestore().collection('messages');
    this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    this.setState({
      uid: user.uid,
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
    });
    this.unsubscribe = this.referenceChatMessages
    .orderBy('createdAt', 'desc')
    .onSnapshot(this.onCollectionUpdate);
});
  }

  componentWillUnmount() {
    if (this.isConnected) {
    this.unsubscribe();
    this.authUnsubscribe();
  }
}

 //Appends new message to previous
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }),
    () => {
      this.addMessage();
      this.saveMessages();
    }
    );
  }
  async saveMessages(){
    try{
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    }
    catch(error){
      console.log(error.message);
    }
  }
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  addMessage = () => {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
    });
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
            },
          }}
        />
      );
    }
    renderInputToolbar(props) {
      if (this.state.isConnected == false) {
      } else {
        return(
          <InputToolbar
          {...props}
          />
        );
      }
    }
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      //get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || '',
        },
      });
    });
    this.setState({
      messages,
    }) ;
  };

  render() {
    
    let color = this.props.route.params.color;
    return (
      <View style={{ flex: 1 ,
     
      backgroundColor: color,}} >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
           
            avatar: 'https://placeimg.com/130/130/any',
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