import GameKey from '@/components/profile/library/GameKey';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import {
  GameContent,
  GameLabel,
  GameList,
  GameTitle,
  Library,
  LibraryGame,
} from './Library.styled';

const LibraryPage = async () => {
  const supabase = createClient();

  const { data: userData } = await supabase.auth.getUser();

  const { data: libraryData } = await supabase
    .from('user_library')
    .select('*, games(*)')
    .eq('user_id', userData.user!.id);

  if (!libraryData) return <h2>Your library is empty.</h2>;

  return (
    <Library>
      <h2>Library</h2>
      <GameList>
        {libraryData.map((game) => (
          <LibraryGame key={game.id}>
            <Image
              src={game.games!.icon}
              alt={game.games!.name}
              width={100}
              height={100}
              priority
            />
            <GameContent>
              <GameTitle>{game.games!.name}</GameTitle>
              <GameLabel>
                KEY:
                <GameKey value={game.game_key} />
              </GameLabel>
            </GameContent>
          </LibraryGame>
        ))}
      </GameList>
    </Library>
  );
};

export default LibraryPage;
