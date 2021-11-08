import React, { useContext, useEffect } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core'
import { AppStackParamList } from '../routes/app.routes'
import { StackNavigationProp } from '@react-navigation/stack'
import { Text, PresenceTransition, HStack, Box, Stack, Input, useToast, Center, Button, TextArea } from 'native-base'
import { errorColor, errorToast, headerFont, successToast } from '../styles/globals'
import { NoteForm, noteFormValidationSchema } from '../models/noteForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { useFormik } from 'formik'
import { Note } from '../models/note'
import AppView from '../components/AppView'
import ApiContext from '../contexts/Api'

const Post: React.FC = () => {
  const { show } = useToast()
  const { isLoading, createNote, updateNote } = useContext(ApiContext)
  const { params } = useRoute<RouteProp<AppStackParamList, 'Post'>>()
  const { goBack } = useNavigation<StackNavigationProp<AppStackParamList>>()
  const { errors, touched, values, isValid, handleSubmit, setFieldValue, setFieldTouched, resetForm }
    = useFormik<NoteForm>({
      validateOnMount: true,
      validationSchema: noteFormValidationSchema,
      initialValues: { title: '', description: '' },
      onSubmit: async (note) => {
        if (isValid) {
          try {
            if (params) {
              const note: Note = { ...params, ...values } 
              await updateNote(params.id, note)
            } else {
              await createNote(note)
            }
            show({ description: `note sucessfull ${params ? 'updated' : 'created'}.`, ...successToast })
            resetForm()
            goBack()
          } catch (error) {
            if (error.status && error.detail && error.status === 500) {
              show({ description: error.message, ...errorToast })
            }
          }
        }
      }
    })
  const handleChange = async (field: keyof NoteForm, value: string) => {
    await Promise.all([setFieldValue(field, value), setFieldTouched(field, true, false)])
  }

  useEffect(() => {
    if (params) {
      handleChange('title', params?.title)
      handleChange('description', params?.description)
    }
  }, [params])

  return (
    <AppView header={
      <>
        <PresenceTransition visible={true}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 700 } }}>
          <HStack space={2} mt={2}>
            <Icon name='note' size={29} color={'white'} />
            <Text {...headerFont}> {params ? 'Edit' : 'Create'} Note </Text>
          </HStack>
        </PresenceTransition>
      </>
    }>
      <KeyboardAwareScrollView>
        <Box p={4}>
          <Box bg={'white'} rounded={'xl'} shadow={4} p={4}>
            <Stack space={8} mt={2}>
              <Box w={'full'}>
                <Input key={'title'} size={'xl'} value={values.title} placeholder='Title'
                  keyboardType='default' _focus={{ borderColor: 'brand.100' }} isDisabled={isLoading}
                  variant='underlined' onChangeText={v => handleChange('title', v)}
                  borderBottomColor={(errors.title && touched.title) ? errorColor : null} />
                {errors.title && touched.title && <Text color={errorColor}> {errors.title}</Text>}
              </Box>
              <Box w={'full'}>
                <TextArea key={'description'} size={'xl'} value={values.description} placeholder='Description'
                  keyboardType='default' _focus={{ borderColor: 'brand.100' }} isDisabled={isLoading}
                  variant='underlined' onChangeText={v => handleChange('description', v)}
                  borderBottomColor={(errors.description && touched.description) ? errorColor : null} />
                {errors.description && touched.description && <Text color={errorColor}> {errors.description}</Text>}
              </Box>
              <Center>
                <Button onPress={() => handleSubmit()} variant={'solid'} bg={'brand.100'} w={'60%'}
                  rounded={'full'} shadow={isLoading ? '0' : '4'} isDisabled={!isValid || isLoading} isLoading={isLoading}
                  leftIcon={<Icon name='save' color='white' size={20} />} > Save </Button>
              </Center>
            </Stack>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </AppView>
  )
}


export default Post