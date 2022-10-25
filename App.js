import React, { Component, useEffect, useState  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Welcome from './components/afterSignup';
import BookPreview from './components/bookPreview';
import Settings from './components/settings';


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

