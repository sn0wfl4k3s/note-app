import React from 'react'
import { Box, Text } from 'native-base'
import { Dimensions, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { linearColors } from '../styles/globals'


type Props = { title: string }

const AuthView: React.FC<Props> = ({ title, children }) => {
    const { height } = Dimensions.get('window')
    const percent = Platform.OS === 'web' ? .9 : .3
    const linearHeight = Math.round(percent * height)
    return (
        <Box flex={1} >
            <Box style={{ height: linearHeight, flex: 1 }}>
                <LinearGradient colors={linearColors} style={{ flex: 1,
                    height: "100%", borderBottomLeftRadius: 26, borderBottomRightRadius: 26
                }} start={{ x: .3, y: 0 }}>
                    <Text fontSize={38} color={'white'} fontFamily={'Poppins-Light'} pl={3} mb={3}
                        style={{ paddingTop: Math.floor(linearHeight * .4) }}>
                        {title}
                    </Text>
                </LinearGradient>
            </Box>
            <Box style={{ marginTop: -25, paddingHorizontal: 20, }} backgroundColor={'transparent'} >
                <Box shadow={'2'} flex={1} bg={'white'} w={'full'} rounded={12} padding={8} mb={3} >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}


export default AuthView