import {useEffect, useState} from "react";
import {getUserTopArtists, ITopArtist} from "../../services/spotify";
import styles from './Home.module.scss';

const Home = () => {

  const [topArtists, setTopArtists] = useState<ITopArtist[]>([]);

  useEffect(() => {
    const fetchTopArtists = async() => {
      const topArtists = await getUserTopArtists();
      setTopArtists(topArtists);
    }
    fetchTopArtists();
  }, [])

  return (
    <main className={styles.home}>
      {topArtists.map((artist) =>
        <div key={artist.id}>
          {artist.name}
        </div>)
      }
    </main>
  )
}

export default Home;
