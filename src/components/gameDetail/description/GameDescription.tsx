import {
  DescriptionList,
  ListItem,
  Text,
  Title,
} from './GameDescription.styled';
import { Tables } from '@/types/supabase';

interface GameDescriptionProps extends Omit<Tables<'games'>, 'developers' | 'publishers'> {
  developers: Tables<'developers'>
  publishers: Tables<'publishers'>
}

const GameDescription = ({ gameData }: { gameData: GameDescriptionProps }) => {
const releaseDate = new Date(gameData.release_date)

  return (
    <DescriptionList>
      <ListItem>
        <Title>Developer</Title>
        <Text>{gameData.developers.name}</Text>
      </ListItem>
      <ListItem>
        <Title>Publisher</Title>
        <Text>{gameData.publishers.name}</Text>
      </ListItem>
      <ListItem>
        <Title>release date</Title>
        <Text>{releaseDate.toLocaleDateString()}</Text>
      </ListItem>
      <ListItem>
        <Title>tags</Title>
        <Text>{gameData.genres_array}</Text>
      </ListItem>
    </DescriptionList>
  );
};

export default GameDescription;
