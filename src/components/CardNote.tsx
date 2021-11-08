import React, { useContext, useState } from 'react'
import { Note } from '../models/note'
import { Box, Text, Flex, Menu, Pressable, HStack, Center, IconButton, PresenceTransition } from 'native-base'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import ApiContext from '../contexts/Api'
import { AppStackParamList } from '../routes/app.routes'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type Props = { note: Note }

const CardNote: React.FC<Props> = ({ note }) => {
  const { deleteNote, isLoading } = useContext(ApiContext)
  const { setParams, navigate, setOptions, replace,  } = useNavigation<StackNavigationProp<AppStackParamList>>()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const date = new Date(note.created)
  return (
    <Pressable onLongPress={() => { setIsMenuOpen(!isMenuOpen) }} m={1}>
      {({ isHovered, isPressed }) => {
        return (
          <Box rounded={'xl'} shadow={'2'} p={2} bg={isPressed || isHovered ? 'gray.100' : 'white'}
            style={{ transform: [{ scale: isPressed || isHovered ? 0.96 : 1 }] }}>
            <PresenceTransition
              visible={isMenuOpen}
              exit={{ opacity: 0, translateY: 10 }}
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0, transition: { duration: 500 } }}>
              <HStack space={2} flexDir={'row-reverse'} paddingX={4} >
                <IconButton bg={'red.700'} rounded={'xl'} onPress={() => setIsMenuOpen(false)} >
                  <Icon size={27} name={'close'} color={'white'} />
                </IconButton>
                <IconButton bg={'green.600'} rounded={'xl'} onPress={() => {
                  navigate('Post', note)
                }}>
                  <Icon size={27} name={'edit'} color={'white'} />
                </IconButton>
                <IconButton bg={'red.600'} rounded={'xl'} onPress={() => deleteNote(note.id)}>
                  <Icon size={27} name={'delete'} color={'white'} />
                </IconButton>
              </HStack>
            </PresenceTransition>
            <Flex direction='row' w={'full'} flex={1}>
              <Box w={'93%'}>
                <Text fontSize={19} fontWeight={'bold'}>{note.title}</Text>
              </Box>
              <Icon name='more-vert' size={29} onPress={() => setIsMenuOpen(!isMenuOpen)} />
            </Flex>
            <Text fontSize={15}>{note.description}</Text>
            <Box flexDir={'row-reverse'}>
              <Text fontSize={12}>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</Text>
            </Box>
          </Box>
        )
      }}
    </Pressable>
  )
}

export default CardNote