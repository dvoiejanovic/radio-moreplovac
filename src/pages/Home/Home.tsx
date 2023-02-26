import {useEffect, useState} from "react";
import Card from "../../components/Card/Card";
import CardGrid from "../../components/CardGrid/CardGrid";
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
    <div className={styles.home}>
      <CardGrid>
        {
          topArtists.map((artist) => (
            <Card
              key={artist.id}
              title={artist.name}
              description="artist"
              imageUrl={artist.images[0].url}
              link={`artist/${artist.id}`}
            />
          ))
        }
      </CardGrid>
    </div>
  )
}

export default Home;
