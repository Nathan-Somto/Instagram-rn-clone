import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './app/screens/AuthScreens'
export default function App() {
  return (
    <NavigationContainer >
      <StackNavigator/>
    </NavigationContainer>
  );
}

