import { createStackNavigator } from "@react-navigation/stack";
import Login from "./AuthScreens/Login";
import Register from "./AuthScreens/Register";
import Main from "./MainScreens/Main";
import {Feather} from '@expo/vector-icons';
import Comments from "./MainScreens/Comments";
import Welcome from "./AuthScreens/Welcome";
import useAuth,{authValue} from '../hooks/useAuth';
export type RootStackParamList = {
  Welcome:undefined;
  Main: undefined;
  Login:undefined;
  Register:undefined;
  Comments:{
    id:string
  }
};
export default function Screens() {
  const Stack = createStackNavigator<RootStackParamList>();
  const {user} = useAuth() as authValue;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
     
    >{
      user?(
      <Stack.Group screenOptions={{animationTypeForReplace:'pop',}}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Comments" component={Comments}/>
      </Stack.Group>
      ):(
      <Stack.Group>
      <Stack.Screen name="Welcome" component={Welcome}/>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      </Stack.Group>
      )
      }
    </Stack.Navigator>
  );
}

