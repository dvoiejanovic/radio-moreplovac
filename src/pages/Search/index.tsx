
import {useState} from 'react';
import Card from '~/components/Card';
import CardGrid from '~/components/CardGrid';
import {getSearchResults} from '~/services/spotify';
import styles from './styles.module.scss';

import type {ISearchResults} from '~/models/search-results';

const Search = () => {
  const [searchResults, setSearchResults] = useState<ISearchResults>();
  const performSearch = async(event: React.FormEvent<HTMLInputElement>) => {
    const results = await getSearchResults(event.currentTarget.value);
    setSearchResults(results);
  }

  return (
    <div className={styles.search}>
      <input className={styles.search_input} type="text" onInput={performSearch} />
      {searchResults &&
        <>
          <CardGrid>
            {
              searchResults.albums.items.map((album) => (
                <Card
                  key={album.id}
                  title={album.name}
                  description="album"
                  imageUrl={album.images[0]?.url}
                  link={`album/${album.id}`}
                  borderStyle="round"
                />
              ))
            }
          </CardGrid>

          <CardGrid>
            {
              searchResults.artists.items.map((artist) => (
                <Card
                  key={artist.id}
                  title={artist.name}
                  description="artist"
                  imageUrl={artist.images[0]?.url}
                  link={`../artist/${artist.id}`}
                  borderStyle="round"
                />
              ))
            }
          </CardGrid>
        </>
      }
    </div>
  );
};

export default Search;
