import { ITextProps, IToastProps } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'
import { StyleSheet } from 'react-native'

export const themes = {
    1: '#009',
    2: '#00b',
    3: '#10e',
    4: '#50f',
    5: '#70f',
    6: '#90f',
}

export const successToast: Partial<IToastProps> = { bg: 'green.600', color: 'white', rounded: 'full', px:1 }
export const errorToast: Partial<IToastProps> = { bg: 'red.600', color: 'white', rounded: 'full', px:1 }

export const headerFont: Partial<ITextProps> = { fontFamily: 'Poppins-Light', fontSize: 27, color: 'white' }
export const linearColors = [themes[3], themes[2], themes[5]]
export const errorColor: ColorType = 'red.500'

export const global = StyleSheet.create({
    view: {
        flex: 1
    },
    input: {
        height: 64,
        width: '100%',
        flex: 1,
        marginTop: 20,
    },
    button: {
        marginTop: 20,
        height: 45,
        justifyContent: 'center',
        borderRadius: 18
    },
    bold: {
        fontWeight: 'bold'
    }
})