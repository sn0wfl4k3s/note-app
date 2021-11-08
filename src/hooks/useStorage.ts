import * as SecureStore from "expo-secure-store"
import { Platform } from "react-native"


const useStorage = () => {
    return {
        setItemAsync: (key: string, value: string): Promise<void> => {
            return new Promise(async (resolve) => {
                if (Platform.OS === 'web') {
                    localStorage.setItem(key, value)
                    resolve()
                } else {
                    await SecureStore.setItemAsync(key, value)
                    resolve()
                }
            })
        },
        getItemAsync: (key: string): Promise<string | null> => {
            return new Promise(async (resolve) => {
                if (Platform.OS === 'web') {
                    const value = localStorage.getItem(key)
                    resolve(value)
                } else {
                    const value = await SecureStore.getItemAsync(key)
                    resolve(value)
                }
            })
        },
        removeItemAsync: (key: string): Promise<void> => {
            return new Promise(async (resolve) => {
                if (Platform.OS === 'web') {
                    localStorage.removeItem(key)
                    resolve()
                } else {
                    await SecureStore.deleteItemAsync(key)
                    resolve()
                }
            })
        },
    }
}

export default useStorage