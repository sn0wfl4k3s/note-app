import React, { useContext, useRef, useState } from 'react'
import { useFormik } from "formik"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { signInValidation, SignInForm } from '../models/signInForm'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '../routes/auth.routes'
import { Box, Button, Input, Text, Stack, Center, Divider } from 'native-base'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { errorColor } from '../styles/globals'
import AuthContext from '../contexts/Auth'
import AuthView from '../components/AuthView'

const SignIn: React.FC = () => {
  const passRef = useRef<any>(null);
  const { signIn, isLoading } = useContext(AuthContext)
  const { navigate } = useNavigation<StackNavigationProp<AuthStackParamList>>()
  const [signinError, setSigninError] = useState<string | null>(null)

  const { errors, touched, values, isValid, handleSubmit, setFieldValue, setFieldTouched }
    = useFormik<SignInForm>({
      validateOnMount: true,
      validationSchema: signInValidation,
      initialValues: { email: '', password: '' },
      onSubmit: values => {
        if (isValid) {
          signIn(values.email, values.password)
            .catch(error => {
              if (error.status && error.detail && error.status === 500) {
                setSigninError(error.detail)
                setTimeout(() => setSigninError(null), 15000)
              } else {
                const msg = JSON.stringify(error)
                setSigninError(msg)
              }
            })
        }
      }
    })
  const handleChange = async (field: keyof SignInForm, value: any): Promise<void> => {
    await Promise.all([setFieldValue(field, value), setFieldTouched(field, true, false)])
  }
  return (
    <Box flex={1} safeArea>
      <KeyboardAwareScrollView>
        <AuthView title='Welcome'>
          <Text color={'gray.600'} fontSize={26} fontFamily={'Poppins-Light'}>SignIn</Text>
          <Stack space={4} mt={2} alignItems={'center'}>
            <Box w={'full'}>
              <Input size='xl' value={values.email} placeholder='Email' key={'email'}
                keyboardType='email-address' _focus={{ borderColor: 'brand.100' }}
                InputLeftElement={<Icon name='email' size={20} color='black' />} isDisabled={isLoading}
                variant='underlined' onChangeText={t => handleChange('email', t)} 
                borderBottomColor={(errors.email && touched.email) ? errorColor : null} 
                onSubmitEditing={() => passRef.current.focus()}/>
              {errors.email && touched.email && <Text color={errorColor}> {errors.email}</Text>}
            </Box>
            <Box w={'full'}>
              <Input size='xl' value={values.password} placeholder='Password' secureTextEntry={true}
                keyboardType='default' _focus={{ borderColor: 'brand.100' }} key={'password'}
                InputLeftElement={<Icon name='lock' size={20} color='black' />} isDisabled={isLoading}
                variant='underlined' onChangeText={t => handleChange('password', t)} ref={passRef}
                borderBottomColor={(errors.password && touched.password) ? errorColor : null} 
                onSubmitEditing={() => handleSubmit()}/>
              {errors.password && touched.password && <Text color={errorColor}> {errors.password}</Text>}
            </Box>
            <Center>
              <Button onPress={() => handleSubmit()} variant={'solid'} bg={'brand.100'} w={120}
                rounded={'full'} shadow={isLoading ? '0' : '4'} isDisabled={isLoading} isLoading={isLoading}
                leftIcon={<Icon name='login' size={20} color='white' />} > Log In </Button>
            </Center>
            {signinError && <Text color={errorColor}> {signinError}</Text>}
            <Divider />
            <Text color={'gray.800'} onPress={() => navigate('SignUp')}>
              Not yet a member? Signup <Text color={'blue.800'}>here</Text>.
            </Text>
          </Stack>
        </AuthView>
      </KeyboardAwareScrollView>
    </Box>
  )
}

export default SignIn