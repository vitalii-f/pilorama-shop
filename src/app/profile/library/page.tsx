import GameKey from '@/components/profile/library/GameKey';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
              src={game.games!.icon_img}
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
