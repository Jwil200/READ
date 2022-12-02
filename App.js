import * as React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Welcome from './components/afterSignup';
import BookPreview from './components/bookPreview';
import Settings from './components/settings';
import Store from './components/store';
import BookStorePreview from './components/bookStorePreview';
import Cart from './components/cart';
import FilterModal from './components/filterModal';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Store"
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
       }}
      />
      <Stack.Screen 
        name="Cart" 
        component={Cart} 
        options={{
            title: 'Your Cart',
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
