import React from "react"
import { Box, Skeleton } from "native-base"

const CardNoteLoad: React.FC = () => {
  return (
    <Box m={1} p={2} shadow={'1'} rounded={'xl'} bg={'white'}>
      <Skeleton my={1} style={{ height: 20 }} rounded={'full'} w={'90%'} />
      <Skeleton my={1} style={{ height: 40 }} rounded={'full'} w={'full'} />
      <Box my={1} flexDir={'row-reverse'}>
        <Skeleton style={{ height: 12 }} rounded={'full'} w={'22%'} />
      </Box>
    </Box>
  )
}

export default CardNoteLoad