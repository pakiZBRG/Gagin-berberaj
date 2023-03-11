import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather'

import { Book, Home, Notifications, Profile } from '../screens'
import { Scissors } from '../utils/importSVGs'

const Tab = createBottomTabNavigator();

const options = { headerShown: false }

const CustomTabBarButton = ({ focused, color, size, name }) => {
  let icon;
  if (name === 'Termini') {
    icon = <Scissors height={size} width={size} fill={color} />
  } else if (name === 'Profil') {
    icon = <Feather name='user' size={size} color={color} />
  } else if (name === 'Notifikacije') {
    icon = <Ionicons name='ios-notifications-outline' size={size} color={color} />
  }

  return (
    <View style={{ alignItems: 'center' }}>
      {icon}
      <Text style={{ fontFamily: focused ? 'MontserratMedium' : 'Montserrat', fontSize: 11, color }}>{name}</Text>
    </View>
  )
}

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName='Termini'
    screenOptions={() => ({
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: "#0088E0",
      tabBarInactiveTintColor: "black"
    })}
  >
    <Tab.Screen
      name='Notifikacije'
      component={Notifications}
      options={{
        headerShown: false,
        tabBarIcon: props => <CustomTabBarButton {...props} name='Notifikacije' />
      }}
    />
    <Tab.Screen
      name='Termini'
      component={Home}
      options={{
        headerShown: false,
        tabBarIcon: props => <CustomTabBarButton {...props} name='Termini' />
      }}
    />
    <Tab.Screen
      name='Profil'
      component={Profile}
      options={{
        headerShown: false,
        tabBarIcon: props => <CustomTabBarButton {...props} name='Profil' />
      }}
    />
  </Tab.Navigator>
)

const AppStack = ({ Stack }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={TabNavigator} options={options} />
      <Stack.Screen name="Book" component={Book} options={options} />
    </Stack.Navigator>
  )
}

const styles = {
  tabBar: {
    position: 'absolute',
    bottom: 7,
    left: 25,
    right: 25,
    height: 60,
    borderRadius: 10,
    elevation: 0,
    borderTopWidth: 0,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: 'black',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2
  }
}

export default AppStack