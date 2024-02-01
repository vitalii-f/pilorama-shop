import React from 'react'
import { DescriptionList, ListItem, Text, Title } from './GameDescription.styled'

const GameDescription = () => {
  return (
    <DescriptionList>
        <ListItem>
            <Title>Developer</Title>
            <Text>Rockstar</Text>
        </ListItem>
        <ListItem>
            <Title>release date</Title>
            <Text>Nov. 10, 2020</Text>
        </ListItem>
        <ListItem>
            <Title>tags</Title>
            <Text>Action</Text>
        </ListItem>
    </DescriptionList>
  )
}

export default GameDescription