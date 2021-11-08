import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { SignUpForm, signUpValidationSchema } from '../models/signUpForm';
import { Box, Button, Input, Text, Stack, Center } from 'native-base';
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { errorColor } from '../styles/globals';
import AuthContext from '../contexts/Auth';
import AuthView from '../components/AuthView';

const SignUp: React.FC = () => {
  const { signUp } = useContext(AuthContext);
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpError, setSigninError] = useState<string | null>(null);
  const { errors, touched, values, isValid, handleSubmit, setFieldValue, setFieldTouched }
    = useFormik<SignUpForm>({
      validateOnMount: true,
      validationSchema: signUpValidationSchema,
      initialValues: { name: '', lastname: '', email: '', password: '', passwordConfirmation: '' },
      onSubmit: async (values) => {
        setIsLoading(true);
        try {
          await signUp(values);
          setIsModalVisible(true);
        } catch (error) {
          if (error.status && error.detail && error.status === 500) {
            setSigninError(error.detail);
            setTimeout(() => setSigninError(null), 25000);
          }
        }
        setIsLoading(false);
      }
    });
  const handleChange = async (field: keyof SignUpForm, value: any): Promise<void> => {
    await Promise.all([setFieldValue(field, value), setFieldTouched(field, true, false)]);
  };
  return (
    <Box>
      <KeyboardAwareScrollView>
        <AuthView title='Create Account'>
          <Stack space={4} mt={2} alignItems={'center'}>
            <Box w={'full'}>
              <Input size='xl' value={values.name} placeholder='Name' textContentType='namePrefix'
                keyboardType='default' _focus={{ borderColor: 'brand.100' }}
                InputLeftElement={<Icon name='person' size={20} color='black' />} isDisabled={isLoading}
                variant='underlined' onChangeText={t => handleChange('name', t)}
                borderBottomColor={(errors.name && touched.name) ? errorColor : null} />
              {errors.name && touched.name && <Text color={errorColor}> {errors.name}</Text>}
            </Box>
            <Box w={'full'}>
              <Input size='xl' value={values.lastname} placeholder='Lastname' textContentType='nameSuffix'
                keyboardType='default' _focus={{ borderColor: 'brand.100' }}
                InputLeftElement={<Icon name='people' size={20} color='black' />} isDisabled={isLoading}
                variant='underlined' onChangeText={t => handleChange('lastname', t)}
                borderBottomColor={(errors.lastname && touched.lastname) ? errorColor : null} />
              {errors.lastname && touched.lastname && <Text color={errorColor}> {errors.lastname}</Text>}
            </Box>
            <Box w={'full'}>
              <Input size='xl' value={values.email} placeholder='Email' textContentType='emailAddress'
                keyboardType='email-address' _focus={{ borderColor: 'brand.100' }}
                InputLeftElement={<Icon name='email' size={20} color='black' />} isDisabled={isLoading}
                variant='underlined' onChangeText={t => handleChange('email', t)}
                borderBottomColor={(errors.email && touched.email) ? errorColor : null} />
              {errors.email && touched.email && <Text color={errorColor}> {errors.email}</Text>}
            </Box>
            <Box w={'full'}>
              <Input size='xl' value={values.password} placeholder='Password' textContentType='password'
                keyboardType='default' _focus={{ borderColor: 'brand.100' }} secureTextEntry={true}
                InputLeftElement={<Icon name='lock' size={20} color='black' />} isDisabled={isLoading}
                variant='underlined' onChangeText={t => handleChange('password', t)}
                borderBottomColor={(errors.password && touched.password) ? errorColor : null} />
              {errors.password && touched.password && <Text color={errorColor}> {errors.password}</Text>}
            </Box>
            <Box w={'full'}>
              <Input size='xl' value={values.passwordConfirmation} placeholder='Password Confirmation'
                textContentType='password' keyboardType='default' _focus={{ borderColor: 'brand.100' }}
                InputLeftElement={<Icon name='lock' size={20} color='black' />} isDisabled={isLoading}
                variant='underlined' onChangeText={t => handleChange('passwordConfirmation', t)} secureTextEntry={true}
                borderBottomColor={(errors.passwordConfirmation && touched.passwordConfirmation) ? errorColor : null} />
              {errors.passwordConfirmation && touched.passwordConfirmation && <Text color={errorColor}> {errors.passwordConfirmation}</Text>}
            </Box>
            <Center>
              <Button onPress={() => handleSubmit()} variant={'solid'} bg={'brand.100'} w={120}
                rounded={'full'} shadow={isLoading ? '0' : '4'} isDisabled={isLoading} isLoading={isLoading}
                leftIcon={<Icon name='person-add' color='white' size={20} />} > Create </Button>
            </Center>
          </Stack>
        </AuthView>
      </KeyboardAwareScrollView>
    </Box>
  )
};

export default SignUp;