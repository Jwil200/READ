import { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from '../pages/dashboard';
import Store from '../pages/store';
import Settings from '../pages/settings/settings';
import Cart from '../pages/cart';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const [badgeNumber, setBadgeNumber] = useState(0);

  useEffect(() => {
    const currentUid = auth().currentUser.uid;
    const unsubscribe = firestore()
      .collection('Users/' + currentUid + '/Cart')
      .onSnapshot(querySnapshot => {
        setBadgeNumber(querySnapshot.size);
      });
    return () => unsubscribe();
  }, []);

  const badgeStyle = {
    tabBarBadge: badgeNumber - 1,
    tabBarBadgeStyle: {backgroundColor: 'yellow'}
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#AD40AF'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="Home2"
        component={Dashboard}
        options={({route}) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#00579d',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Store"
        component={Store}
        options={{
          animation:'slide_from_bottom',
          tabBarStyle: {
            backgroundColor: '#66bc8b',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          ...((badgeNumber === 0) ? {} : badgeStyle),
          animation:'fade',
          tabBarStyle: {
            backgroundColor: '#f29716',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="cart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          animation:'fade',
          tabBarStyle: {
            backgroundColor: '#fbdf5e',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />  
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if( routeName == 'Dashboard' ) {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;