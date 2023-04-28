import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import GoodJobAnimation from '../components/goodJobAnimation';
import TryAgainAnimation from '../components/tryAgainAnimation';
import PerfectScoreAnimation from '../components/perfectScoreAnimation';

const MyComponent = () => {
    
      return (
        <View>
            <PerfectScoreAnimation visible={true} />
            <PerfectScoreAnimation visible={false} />
        </View>
      );
};


export default MyComponent;
