import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native'
import Comments from './Comments';
import HomeScreen from './HomeScreen';


export default function Home() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown:false
    }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="Comments" component={Comments}
        options={{
          headerShown:true,
          headerTintColor:'#fff',
          headerBackgroundContainerStyle:{
          backgroundColor:'#000'
          }
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})