// App.js
import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Store from './pages/store';
import Settings from './pages/settings';
import Welcome from './pages/afterSignup';
import BookPreview from './pages/bookPreview';
import BookStorePreview from './pages/bookStorePreview';
import Cart from './pages/cart.js';
import Checkout from './pages/checkout';
import TabBar from './components/TabBar';
import UserProfile from './components/userProfile';

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
       options= {{
        title: "Dashboard"
       }}
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
       options= {({ navigation, route }) => ({
        headerTitle: () => (
          <Image style={{ width:150, height: 150, resizeMode:'contain', position:'relative'}} source={require("./assets/read-logo.png")} />
        ),
        headerLeft: null, 
        headerRight: () => (
          <View style={{flexDirection:'row'}} >
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Image
              style={{width: 30, height: 30, marginRight: 10, borderRadius: 75}}
              source={{ uri: 'https://picsum.photos/200' }}
            />
          </TouchableOpacity>
          </View>
        )})}
       />
      <Stack.Screen 
       name="Settings" 
       component={Settings} 
       options={{
          title: 'Settings' ,
         headerLeft: null
       }}
      />
      <Stack.Screen 
        name="UserProfile"
        component={UserProfile}
        options={{
          title: null,
          headerBackTitle: 'Back'
          }}  
        />
      <Stack.Screen 
       name="Store" 
       component={Store} 
       options= {{
        title: "Book Store"
       }}
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
       name="Checkout" 
       component={Checkout} 
       options= {{
        title: "Checkout",
        headerBackTitle: "Cart"
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
