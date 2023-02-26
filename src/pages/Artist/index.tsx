import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import WorkInProgress from '../../components/WorkInProgress';
import {getArtist} from '../../services/spotify';
import styles from './Artist.module.scss';

const Artist = () => {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getArtist(params.id);
    }
  }, [])

  return (
    <div className={styles.artist_page}>
      <WorkInProgress />
    </div>
  );
}

export default Artist;
