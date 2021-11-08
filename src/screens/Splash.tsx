import React from "react"
import { linearColors } from "../styles/globals"
import { LinearGradient } from "expo-linear-gradient"
import { Center, PresenceTransition, Text, View } from "native-base"


const Splash: React.FC = () => {
    return (
        <View>
            <LinearGradient colors={linearColors} style={{ height: '100%' }}>
                <Center h={'full'}>
                    <PresenceTransition
                        visible={true}
                        initial={{ opacity: 0, translateY: 5 }}
                        animate={{ opacity: 1, translateY: 0, transition: { duration: 400 } }}>
                        <Text fontSize={25} color={'white'} fontFamily={'Poppins-Light'}>My Notes</Text>
                    </PresenceTransition>
                </Center>
            </LinearGradient>
        </View>
    )
}


export default Splash