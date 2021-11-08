import React from "react"
import Home from "../screens/Home"
import Settings from "../screens/Settings"
import More from "../screens/More"
import Post from "../screens/Post"

import { MaterialIcons as Icon } from '@expo/vector-icons'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { View, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { themes } from "../styles/globals"
import { Note } from "../models/note"

export type AppStackParamList = {
  Main: undefined
  Home: undefined
  More: undefined
  Post: Note
  Settings: undefined
}

const AppStack = createStackNavigator<AppStackParamList>()
const AppBottomTabStack = createBottomTabNavigator<AppStackParamList>()

const AppBottomTabRoutes: React.FC = () => (
  <AppBottomTabStack.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    tabBarActiveTintColor: themes[5],
    tabBarIcon: ({ color, size, focused }) => {
      if (route.name === 'Post') {
        return (
          <View style={{ transform: [{ scale: focused ? .9 : 1 }] }}>
            <LinearGradient colors={[themes[3], themes[5]]} style={styles.iconTabRound}>
              <Icon name="add" size={size} color='white' />
            </LinearGradient>
          </View>
        )
      }
      const icons = { Home: 'dashboard', Settings: 'settings' }
      return <Icon name={icons[route.name]} size={size} color={color} />
    },
  })} >
    <AppBottomTabStack.Screen name="Home" component={Home} />
    <AppBottomTabStack.Screen name="Post" component={Post} />
    <AppBottomTabStack.Screen name="Settings" component={Settings} />
  </AppBottomTabStack.Navigator>
)

const AppRoutes: React.FC = () => (
  <AppStack.Navigator initialRouteName="Main">
    <AppStack.Screen name="Main" component={AppBottomTabRoutes} options={{ headerShown: false }} />
    <AppStack.Screen name="More" component={More} />
  </AppStack.Navigator>
)

const styles = StyleSheet.create({
  iconTabRound: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
})

export default AppRoutes