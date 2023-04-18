import * as React from 'react';
import {Image} from 'react-native';
import {Icon} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

import Login from './pages/login';
import Checkout from './pages/checkout';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import Welcome from './components/afterSignup';
import BookPreview from './pages/bookPreview';
import Store from './pages/store';
import BookStorePreview from './pages/bookStorePreview';
import Cart from './pages/cart';
import FilterModal from './components/filterModal';
import TabBar from './components/TabBar';
import VoiceTest from './pages/voiceTest';
import Onboarding from './pages/onboarding';
import UserProfile from './pages/userProfile';
import Settings from './pages/settings/settings';
import AccountSettings from './pages/settings/accountSettings';
import NotificationSettings from './pages/settings/notificationSettings';
import PurchaseHistory from './pages/settings/purchaseHistory';
import About from './pages/settings/about';


import PDFTest from './pages/pdfTest'

LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();

const getFilterVisibility = navigation => { //Visibility toggle for filter depending on current tab.
  let isDashboard = (typeof(navigation.getState().routes[1]) === 'undefined' || typeof(navigation.getState().routes[1].state) === 'undefined' || typeof(navigation.getState().routes[1].state.history[1]) === 'undefined');  let currPage = isDashboard ? null : navigation.getState().routes[1].state.history[1].key;
  return isDashboard ? isDashboard : !(currPage.includes('Cart') || currPage.includes('Settings'));
}


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
        name="UserProfile"
        component={UserProfile}
        options={{  title: 'User Profile' }}
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
          <Image style={{ width:100, height: 65, resizeMode:'contain', position:'relative'}} source={require("./assets/read-logo.png")} />
        ),
        headerLeft: null, 
        headerRight: () => (
          getFilterVisibility(navigation) ? 
          <Icon
              style={{ paddingRight: 10}}
              name='filter-alt'
              color='#fff'
              onPress={() => navigation.navigate('FilterModal')} 
          />
          :
          null
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
       options= {{
        title: "Book Store"
       }}

      />
      <Stack.Screen 
       name="BookStorePreview" 
       component={BookStorePreview} 
       options={{
          title: 'Book Preview',
          headerBackTitle:'Back'
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
        name="Book View" 
        component={VoiceTest} 
        options={
          { title: 'Voice' },
          { headerLeft: null } 
        }
      />
      <Stack.Screen 
       name="Checkout" 
       component={Checkout} 
       options= {{
        title: "Checkout",
        headerBackTitle: "Cart"
       }}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={{  title: 'Account Settings' }}
      />
      <Stack.Screen
        name="PurchaseHistory"
        component={PurchaseHistory}
        options={{  title: 'Purchase History' }}
      />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
        options={{  title: 'Notifications' }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{  title: 'About' }}
      />
      <Stack.Screen 
        name="Onboarding" 
        component={Onboarding} 
        options={{
            title: 'Onboarding',
            headerShown:false
        }}
      />
      {/* <Stack.Screen 
        name="Stats" 
        component={Stats} 
        options={{
            title: 'Stats',
            headerShown:false
        }}
      /> */}
      <Stack.Screen 
        name="PDFTest" 
        component={PDFTest} 
        options={{
            title: 'PDFTest',
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
