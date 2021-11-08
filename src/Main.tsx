import 'react-native-gesture-handler'
import React from 'react'
import Routes from './routes/index'
import { AuthProvider } from './contexts/Auth'
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from './contexts/Theme'
import { extendTheme, INativebaseConfig, NativeBaseProvider } from 'native-base'
import { useFonts } from 'expo-font'
import { themes } from './styles/globals'
import { ApiProvider } from './contexts/Api'

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Poppins-Light': require('../assets/fonts/Poppins/Poppins-Light.ttf'),
  })

  const theme = extendTheme({
    colors: {
      brand: {
        100: themes[3],
        200: themes[5],
      }
    }
  })

  const config: INativebaseConfig = {
    strictMode: 'off',
    dependencies: {
      'linear-gradient': require('expo-linear-gradient').LinearGradient,
    }
  }

  if (!fontsLoaded)
    return null

  return (
    <AuthProvider>
      <ApiProvider>
        <ThemeProvider>
          <NativeBaseProvider theme={theme} config={config}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </NativeBaseProvider>
        </ThemeProvider>
      </ApiProvider>
    </AuthProvider >
  )
}

export default Main