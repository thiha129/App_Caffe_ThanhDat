import {
    faHome,
    faHeart,
    faCommentAlt,
    faBars,
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  import { BottomTabBarProps,createBottomTabNavigator } from '@react-navigation/bottom-tabs';

  import React from 'react';
  import BubbleTabBar, {
    IBubbleTabConfig,
    IIconRenderer,
  } from 'react-native-bubble-tabbar';
  import LoginScreen from './LoginScreen';
  import RegisterScreen from './RegisterScreen';
  import HomeScreen from './HomeScreen';
import DetailProduct from './DetailsProductScreen';
  const tabs: IBubbleTabConfig[] = [
    {
      activeColor: '#cc0066',
      activeBackgroundColor: '#f76a8c',
      activeIcon: faHome,
    },
    {
      activeColor: '#ff6f5e',
      activeBackgroundColor: '#f8dc88',
      activeIcon: faHeart,
    },
    {
      activeColor: '#1eb2a6',
      activeBackgroundColor: '#ccf0e1',
      activeIcon: faCommentAlt,
    },
    {
      activeColor: '#4d80e4',
      activeBackgroundColor: '#9aceff',
      activeIcon: faBars,
      name: 'Last',
    },
  ];
  
  const fontAwesomeIconRenderer = ({ icon, color }: IIconRenderer) =>
    <FontAwesomeIcon
      icon={icon}
      color={color}
      size={18}
    />;
  
  const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state, descriptors, navigation,
  }) => {
    return (
      <BubbleTabBar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
        tabs={tabs}
        iconRenderer={fontAwesomeIconRenderer}
      />
    );
  };
  
  const Tab = createBottomTabNavigator();
  
  const MainNavigator: React.FC = () => {
    return (
      <Tab.Navigator
        tabBar={({ state, descriptors, navigation }) =>
          <CustomTabBar
            state={state}
            descriptors={descriptors}
            navigation={navigation}
          />
        }
      >
        <Tab.Screen name="One" component={LoginScreen} />
        <Tab.Screen name="Two" component={RegisterScreen} />
        <Tab.Screen name="Three" component={HomeScreen} />
        <Tab.Screen name="Four" component={DetailProduct} />

      </Tab.Navigator>
    );
  };
  export default MainNavigator;