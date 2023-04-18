import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
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
import TabBar from './components/TabBar';
import VoiceTest from './pages/voiceTest';
import Onboarding from './pages/onboarding';
import UserProfile from './pages/userProfile';
import Settings from './pages/settings/settings';
import AccountSettings from './pages/settings/accountSettings';
import NotificationSettings from './pages/settings/notificationSettings';
import PurchaseHistory from './pages/settings/purchaseHistory';
import About from './pages/settings/about';
import ResultPage from './pages/resultPage';
import PDFTest from './pages/pdfTest.js'
import AnimationTest from './pages/animationTest.js'

import PDFTest from './pages/pdfTest'

LogBox.ignoreLogs(['new NativeEventEmitter']);

const Stack = createNativeStackNavigator();



function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Tabbar"
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
        name="AnimaitonTest"
        component={AnimationTest}
        options={{
          title: 'AnimationTest',
          headerLeft: null,
        }}
      />
      <Stack.Screen 
        name="PDFTest" 
        component={PDFTest} 
        options={{
            title: 'PDFTest',
            headerShown:false
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
          //headerBackTitle:'Dashboard'
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
       name="Tabbar" 
       component={TabBar} 
       options= {({ navigation, route }) => ({
        headerTitle: () => (
          <Image style={{ width:100, height: 65, resizeMode:'contain', position:'relative'}} source={require("./assets/read-logo.png")} />
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
          //headerBackTitle:'Back'
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
        name="ResultPage"
        component={ResultPage}
        options={{  title: 'Result' }}
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
<<<<<<< HEAD
=======
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
>>>>>>> 178d88c (Fixed up voice, pdf view, and connection to the book preview)
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
