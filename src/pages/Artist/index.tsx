import {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import Card from '~/components/Card';
import CardGrid from '~/components/CardGrid';
import GradientCover from '~/components/GradientCover';
import {formatNumber} from '~/helpers/format';
import {getArtist, getArtistAlbums} from '~/services/spotify';
import styles from './styles.module.scss';
import type {IAlbum} from '~/models/album';
import type {IArtist} from '~/models/artist';

const Artist = () => {
  const params = useParams();
  const [artist, setArtist] = useState<IArtist>();
  const [albums, setAlbums] = useState<IAlbum[]>();
  const { pathname } = useLocation();

  useEffect(() => {
    if (params.id) {
      const fetchArtist = async() => {
        const artist = await getArtist(params.id as string);
        setArtist(artist);
      }
      const fetchArtistAlbums = async() => {
        const artistAlbums = await getArtistAlbums(params.id as string);
        setAlbums(artistAlbums);
      }

      fetchArtist();
      fetchArtistAlbums();
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.artist_page}>
      <div className={styles.cover}>
        {artist?.image &&
          <GradientCover image={artist?.image} />
        }
        <img className={styles.avatar} src={artist?.images[0].url} alt="" />
        <div className={styles.info}>
          <div className={styles.name}>
            {artist?.name}
          </div>
          <div className={styles.follower_count}>
            {formatNumber(artist?.followers.total as number)} followers
          </div>
        </div>
      </div>



      <div>
        <div className={styles.discography_header}>
          <h3 className={styles.section_title}>Discography</h3>
          <div className={styles.show_all}>
            Show all
          </div>
        </div>
        <CardGrid>
          {albums && albums.map((album: IAlbum) => (
            <Card
              key={album.id}
              imageUrl={album.images[0].url}
              title={album.name}
              description={`${album.release_date}`}
              link=""
              borderStyle="square"
            />
          ))}
        </CardGrid>
      </div>
    </div>
  );
}

export default Artist;
