import {useEffect, useState} from 'react';
import Card from '~/components/Card';
import CardGrid from '~/components/CardGrid';
import LoadingSkeleton from '~/components/LoadingSkeleton';
import {formatTimeOfDay} from '~/helpers/format';
import {getUserTopArtists, getUserTopTracks} from '~/services/spotify';
import styles from './styles.module.scss';

import type {IArtist} from '~/interfaces/artist';
import type {Track} from '~/models/track';

const Home = () => {
  const [topArtists, setTopArtists] = useState<IArtist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const timeOfDay = formatTimeOfDay();


  useEffect(() => {
    const fetchTopArtists = async() => {
      setLoading(true);
      const topArtists = await getUserTopArtists();
      setTopArtists(topArtists);
    }
    const fetchTopTracks = async() => {
      const topTracks = await getUserTopTracks();
      setTopTracks(topTracks);
      setLoading(false);
    }

    fetchTopArtists();
    fetchTopTracks();
  }, []);

  return (
    <div className={styles.home}>
      {loading ? <LoadingSkeleton /> :
      <>
        <h2 className={styles.greeting}>
          Good {timeOfDay}
        </h2>

        <h3 className={styles.section_title}>
            Your favorite artists
        </h3>

        <CardGrid>
          {topArtists.map((artist) => (
            <Card
              key={artist.id}
              badge={artist.topGenre}
              title={artist.name}
              description="artist"
              imageUrl={artist.imageUrl}
              link={`artist/${artist.id}`}
              borderStyle="round" />
          ))}
          </CardGrid>

          <h3 className={styles.section_title}>
            Your favorite tracks
          </h3>

          <CardGrid>
            {topTracks.map((track) => (
              <Card
                key={track.id}
                title={track.name}
                description="track"
                imageUrl={track.imageUrl}
                link={`track/${track.id}`}
                borderStyle="round" />
            ))}
          </CardGrid>
        </>
      }
    </div>
  )
}

export default Home;
