import { createStackNavigator } from "@react-navigation/stack";
import Login from "./AuthScreens/Login";
import Register from "./AuthScreens/Register";
import Main from "./MainScreens/Main";
import {Feather} from '@expo/vector-icons';
import Comments from "./MainScreens/Comments";
import Welcome from "./AuthScreens/Welcome";
export type RootStackParamList = {
  Welcome:undefined;
  Main: undefined;
  Login:undefined;
  Register:undefined;
  Comments:{
    userRef:string
  }
};
export default function AuthScreens() {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Group>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Comments" component={Comments}
        options={{
          headerTintColor:'#fff',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomColor:"#555"
          },
          headerBackTitleVisible: false,
          headerShown:true,
          headerRight: ()=>(
            <Feather name="info" color={'#fff'} size={20}/>
          ),
        }}
      />
      </Stack.Group>
      <Stack.Group>
      <Stack.Screen name="Welcome" component={Welcome}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

