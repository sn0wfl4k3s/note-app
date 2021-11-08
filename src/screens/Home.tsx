import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Box, Input, PresenceTransition, ScrollView, Stack, Text } from 'native-base'
import { RefreshControl } from 'react-native'
import { themes } from '../styles/globals'
import { Dimensions } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'
import CardNote from '../components/CardNote'
import AuthContext from '../contexts/Auth'
import ApiContext from '../contexts/Api'
import CardNoteLoad from '../components/CardNoteLoad'
import AppView from '../components/AppView'

const Home: React.FC = () => {
  const { user } = useContext(AuthContext)
  const { height } = Dimensions.get('window')
  const { isLoading, notes, loadNotes } = useContext(ApiContext)
  const [search, setSearch] = useState<string>('')
  const loading = [...Array(4).keys()].map(i => <CardNoteLoad key={`l-${i}`} />)
  const memoizedNotes = useMemo(() => {
    if (search.length === 0)
      return notes
    const lowcaseSearch = search.toLowerCase()
    return notes.filter(n =>
      n.title.toLowerCase().includes(lowcaseSearch) ||
      n.description.toLowerCase().includes(lowcaseSearch))
  }, [notes, search])


  useEffect(() => { loadNotes() }, [])

  return (
    <AppView header={
      <>
        <PresenceTransition visible={true} initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 400 } }}>
          <Text fontSize={20} color={'white'}>Hi {user.name},</Text>
        </PresenceTransition>
        <PresenceTransition visible={!isLoading} initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 800 } }}>
          <Text fontSize={15} color={'white'}>Your notes are available.</Text>
        </PresenceTransition>
      </>
    }>
      <Box shadow={'7'} rounded={'full'} pl={4} marginX={19} bg={'white'} mt={-4}>
        <Input key={'search'} placeholder='Search' borderColor={'transparent'}
          value={search} onChange={e => setSearch(e.nativeEvent.text)} fontFamily={'Poppins-Light'}
          InputLeftElement={<Icon name='search' size={20} />} fontSize={19}
          _focus={{ borderColor: 'transparent' }} />
      </Box>
      <RefreshControl colors={[themes[5]]} refreshing={false} onRefresh={() => loadNotes()}>
        <ScrollView>
          <Stack space={2} paddingX={4} paddingY={2}>
            {isLoading && loading}
            {!isLoading && memoizedNotes.map(n => <CardNote key={n.id} note={n} />)}
            {!isLoading && memoizedNotes.length === 0 &&
              <Box pl={4} minH={Math.floor(height * .3)}>
                <Text fontFamily={'Poppins-Light'}>None note found.</Text>
              </Box>}
          </Stack>
        </ScrollView>
      </RefreshControl>
    </AppView>
  )
}

export default Home