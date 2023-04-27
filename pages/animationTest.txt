import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import GoodJobAnimation from '../components/goodJobAnimation';
import TryAgainAnimation from '../components/tryAgainAnimation';

const MyComponent = () => {
    
      return (
        <View>
            <TryAgainAnimation visible={true} />
            <TryAgainAnimation visible={false} />
        </View>
      );
};


export default MyComponent;
