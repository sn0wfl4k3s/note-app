import React, { useState } from "react"
import { User } from '../models/user'
import { SignInRequest } from '../models/signInRequest'
import { Credentials } from '../models/credentials'
import { SignUpForm } from '../models/signUpForm'
import useStorage from "../hooks/useStorage"
import jwt_decode from 'jwt-decode'
import useApi from "../hooks/useApi"

function useAuth(): IAuthentication {
    const storage = useStorage()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isContextLoading, setIsContextLoading] = useState<boolean>(true)
    const { accessTokenName, axios, host, refreshTokenName } = useApi()

    const getUserByToken = (token: string): User => {
        const decoded = jwt_decode(token) as any
        return {
            id: decoded['nameid'],
            name: decoded['unique_name'],
            lastname: decoded['family_name'],
            email: decoded['email'],
            role: decoded['role'],
        }
    }

    const [user, setUser] = React.useState<User | null>(null)

    React.useEffect(() => {
        storage
            .getItemAsync(accessTokenName)
            .then(token => {
                if (token)
                    setUser(getUserByToken(token))
            })
            .finally(() => setIsContextLoading(false))
    }, [])

    return {
        user,
        isLoading,
        isContextLoading,
        signIn: async (email: string, password: string): Promise<void> => {
            try {
                setIsLoading(true)
                const body: SignInRequest = { email, accessKey: password, grantType: 'password' }
                const response = await axios.post(`${host}/api/Account/Login`, body)
                const credentials = response.data as Credentials
                await storage.setItemAsync(accessTokenName, credentials.accessToken)
                await storage.setItemAsync(refreshTokenName, credentials.refreshToken)
                setTimeout(() => setUser(getUserByToken(response.data.accessToken)), 500)
            } catch (error) {
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        signOut: async (): Promise<void> => {
            try {
                setIsLoading(true)
                await storage.removeItemAsync(accessTokenName)
                await storage.removeItemAsync(refreshTokenName)
                setTimeout(() => setUser(null), 500)
            } catch (error) {
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        signUp: async (data: SignUpForm): Promise<boolean> => {
            try {
                setIsLoading(true)
                const response = await axios.post(`${host}/api/Account/Register`, data)
                return response.status === 201
            } catch (error) {
                throw error
            } finally {
                setIsLoading(false)
            }
        }
    }
}

interface IAuthentication {
    user: User | null
    isLoading: boolean
    isContextLoading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
    signUp: (data: SignUpForm) => Promise<boolean>
}

const AuthContext = React.createContext<IAuthentication>({} as IAuthentication)

export const AuthProvider: React.FC = ({ children }) => {
    const auth = useAuth()
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext