import * as React from 'react';
import { Text, View, StyleSheet, Button, SafeAreaView , Image, TextInput, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function AlbumItem({title, onPress, backgroundColor}) {
  return (
    <TouchableOpacity style = {styles.item} onPress={onPress}>
    <Text style={[styles.title, styles.color]}>{title}</Text>
    </TouchableOpacity>
  )
}

function HomeScreen({navigation}) {
  const[selectId, setSelectId]=React.useState(null);
  const[refresh, setRefresh]=React.useState(0);

  const[isLoading, setLoading] = React.useState(true);
  const [list, setData] = React.useState([]);

  const getAlbums = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/albums");
      const json = await response.json();
      setData(json);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

React.useEffect(()=>{getAlbums()}, [])

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.about}>Sarah Sami - 101334588</Text>

    { isLoading ?  <ActivityIndicator /> : (
    <FlatList
        data={list}
        renderItem={({item}) => {
          const backgroundColor = item.id === selectId ? "#29465B" : "#555555";
          const color = item.id === selectId? "white" : "black";
          return (
            <AlbumItem title={item.title}
             onPress = {()=>navigation.navigate("Details", {item})}
             backgroundColor = {{backgroundColor}}
             textColor = {{color}}
               />
            )
        }}
        keyExtractor={item => item.id.toString()}
        extraData={refresh}
      />)}

    </SafeAreaView>
  );
}

function DetailsScreen({route}) {
  const {item} = route.params;
  // console.log(item);
  const [user, setUser] = React.useState(null);

  const getUser = async () => {
    // console.log(item.userId);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/" + item.userId);
      const json = await response.json();
      setUser(json);
    } catch(err) {
      console.error(err);
    }
  }

  React.useEffect(()=>{getUser()}, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.details}>    
        <Text style={styles.about}>Album Details</Text>
        <Text>------------------</Text>
        <Text style={styles.title}>ID: {item.id}</Text>
        <Text style={styles.title}>Title: {item.title}</Text>
        {user && <Text style={styles.title}>Username: {user.username}</Text>}
      </View>

    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#E6E6FA',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
  },
  color: {
    color: 'black',
  }, 
  about: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
  }, 
  details: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingRight: 20,
    paddingLeft: 20,
  }
});





