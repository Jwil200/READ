// App.js
import * as React from 'react';
import { Button, View , Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Store from './pages/store';
import Settings from './pages/settings';
import Welcome from './pages/afterSignup';
import BookPreview from './pages/bookPreview';
import BookStorePreview from './pages/bookStorePreview';
import Cart from './pages/cart.js';
import FilterModal from './components/filterModal';
import TabBar from './components/TabBar';
import Onboarding from './pages/onboarding';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          title: 'Login',
          headerLeft: null, 
        }}
      />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options= {({ navigation }) => ({
        title: "Dashboard", 
          headerRight: () => (
            <Icon
                style={{ paddingRight: 10}}
                name='filter-alt'
                color='#fff' 
            />
          )})}
      />
      <Stack.Screen 
       name="Welcome" 
       component={Welcome} 
       options={{
          title: 'Welcome to READ!' ,
          headerLeft: null
       }}
      />
      <Stack.Screen 
       name="BookPreview" 
       component={BookPreview} 
       options={{
          title: 'Book Preview',
          headerBackTitle:'Dashboard'
       }}
      />
      <Stack.Screen
       name="Tabbar" 
       component={TabBar} 
       options={{
        headerTitle: () => (
          <Image style={{ width:150, height: 150, resizeMode:'contain', position:'relative'}} source={require("./assets/read-logo.png")} />
        ),
        headerLeft: null
       }}
       />
      <Stack.Screen 
       name="Settings" 
       component={Settings} 
       options={{
          title: 'Settings' ,
         headerLeft: null 
       }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen 
        name="FilterModal"
        component={FilterModal}
        options={{
          title: null,
         headerLeft: null
         }}  />
      </Stack.Group>
      <Stack.Screen 
       name="Store" 
       component={Store} 
       options= {({ navigation, route }) => ({
        title: "Book Store", 
          headerRight: () => (
            <View style={{ flexDirection:"row", padding: 10}}>
            <Icon
                style={{ paddingRight: 10}}
                name='filter-alt'
                color='#fff' 
                onPress={() => navigation.navigate("FilterModal")}
            />
            <Icon
              name='shopping-cart'
              onPress={() => navigation.navigate("Cart")}
              color='#fff' />
            </View>
          )})}
      />
      <Stack.Screen 
       name="BookStorePreview" 
       component={BookStorePreview} 
       options={{
          title: 'Book Preview',
          headerBackTitle:'Back',
       }}
      />
      <Stack.Screen 
        name="Cart" 
        component={Cart} 
        options={{
            title: 'Your Cart',
        }}
      />
      <Stack.Screen 
        name="Onboarding" 
        component={Onboarding} 
        options={{
            title: 'Onboarding',
            headerShown:false
        }}
      />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyStack />

    </NavigationContainer>
  );
}
