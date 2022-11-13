import React from 'react';
import { Button, StyleSheet, Text, View,FlatList } from 'react-native';
const firebase = require('firebase');
require('firebase/firestore');
class App extends React.Component {
  constructor(){
    super()
    this.state = {
    lists: [],
    uid:0,
    loggedInText: 'Please wait, you are getting logged in',

  };
  if (!firebase.apps.length){
    firebase.initializeApp(
  {
    apiKey: "AIzaSyBYASrEUrk2rWtmNKNCZAfnvPEK5o0Kahw",
          authDomain: "test-c46a4.firebaseapp.com",
          projectId: "test-c46a4",
          storageBucket: "test-c46a4.appspot.com",
          messagingSenderId: "787632016364",
          appId: "1:787632016364:web:f1cf13b424d510d131cec9",
          measurementId: "G-NCKMNQV3ES" }

    );
    }

    this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
    firebase.firestore().collection('shoppinglists').doc('list1');}

    componentDidMount() {
    this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
    this.unsubscribe = this.referenceShoppingLists.onSnapshot(this.onCollectionUpdate)
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
      const lists = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        var data = doc.data();
        lists.push({
          name: data.name,
          items: data.items.toString(),
        });
      });
      this.setState({
        lists,
      });
    };
    
    addList() { 
      // add a new list to the collection
      this.referenceShoppingLists.add({
        name: 'TestList',
        items: ['eggs', 'pasta', 'veggies'],
        uid: this.state.uid,
      });
  }

  render() {
    
    return (
      <View style={styles.container}>

        <Text style={styles.text}>All Shopping lists</Text>
        <FlatList
            data={this.state.lists}
            renderItem={({ item }) => 
              <Text style={styles.item}>{item.name}: {item.items}</Text>}
          />

        <Button 
          onPress={() => {
            this.addList();
          }}
          title = "Add something"
        />
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

export default App;