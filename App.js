import React, { Component, useEffect, useState, Button  } from 'react';
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
import Cart from './components/cart.js';



const Stack = createNativeStackNavigator();

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
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />

      <Stack.Screen 
       name="BookPreview" 
       component={BookPreview} 
       options={
         { title: 'Book Preview' },
         {headerLeft: null} 
       }
      />

      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
       name="Welcome" 
       component={Welcome} 
       options={
         { title: 'Welcome' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
       name="Settings" 
       component={Settings} 
       options={
         { title: 'Settings' },
         {headerLeft: null} 
       }
      />
      <Stack.Screen 
        name="Store" 
          component={Store} 
          options={
            { title: 'Store' },
            {headerLeft: null} 
         }
      /*
       name="Store" 
       component={Store} 
       options= {({ navigation }) => ({
        title: "Book Store", 
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate("Cart")}
              title="Cart"
              color="#fff"
            />
          )})}*/
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

