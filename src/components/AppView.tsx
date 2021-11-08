import React, {  } from 'react'
import { View } from 'native-base'
import { themes } from '../styles/globals'
import { LinearGradient } from 'expo-linear-gradient'
import { Dimensions } from 'react-native'

type Props = { header: JSX.Element }

const AppView: React.FC<Props> = ({ children, header }) => {
  const { height } = Dimensions.get('window')
  const headerHeight = Math.floor(height * .2)

  return (
    <View flex={1}>
      <LinearGradient colors={[themes[3], themes[5]]} style={{
        height: headerHeight,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: headerHeight * .34,
        paddingLeft: 25
      }}>
        { header }
      </LinearGradient>
      {children}
    </View>
  )
}

export default AppView