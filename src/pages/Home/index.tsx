import {useEffect, useState} from "react";
import Card from "~/components/Card";
import CardGrid from "~/components/CardGrid";
import {formatTimeOfDay} from "~/helpers/format";
import {IArtist} from "~/models/artist";
import {getUserTopArtists, getUserTopTracks} from "~/services/spotify";
import styles from './styles.module.scss';

const Home = () => {
  const [topArtists, setTopArtists] = useState<IArtist[]>([]);
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const timeOfDay = formatTimeOfDay();


  useEffect(() => {
    const fetchTopArtists = async() => {
      const topArtists = await getUserTopArtists();
      setTopArtists(topArtists);
    }
    const fetchTopTracks = async() => {
      const topTracks = await getUserTopTracks();
      setTopTracks(topTracks);
    }

    fetchTopArtists();
    fetchTopTracks();
  }, []);

  return (
    <div className={styles.home}>
      <h2 className={styles.greeting}>
        Good {timeOfDay}
      </h2>

      <h3 className={styles.section_title}>
        Your favorite artists
      </h3>
      <CardGrid>
        {
          topArtists.map((artist) => (
            <Card
              key={artist.id}
              badge={artist.topGenre}
              title={artist.name}
              description="artist"
              imageUrl={artist.imageUrl}
              link={`artist/${artist.id}`}
              borderStyle="round"
            />
          ))
        }
      </CardGrid>

      <h3 className={styles.section_title}>
        Your favorite tracks
      </h3>
      <CardGrid>
        {
          topTracks.map((track) => (
            <Card
              key={track.id}
              title={track.name}
              description="track"
              imageUrl={track.imageUrl}
              link={`track/${track.id}`}
              borderStyle="round"
            />
          ))
        }
      </CardGrid>
    </div>
  )
}

export default Home;
