import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import WorkInProgress from '../../components/WorkInProgress';
import {formatNumber} from '../../helpers/format';
import {getArtist, IArtist} from '../../services/spotify';
import styles from './Artist.module.scss';

const Artist = () => {
  const params = useParams();
  const [artist, setArtist] = useState<IArtist>();

  useEffect(() => {
    if (params.id) {
      const fetchArtist = async() => {
        const artist = await getArtist(params.id as string);
        setArtist(artist);
      }
      fetchArtist();
    }
  }, [])

  return (
    <div className={styles.artist_page}>
      <div className={styles.cover}>
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
      <WorkInProgress />
    </div>
  );
}

export default Artist;
