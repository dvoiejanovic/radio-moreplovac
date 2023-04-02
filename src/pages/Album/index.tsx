import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getAlbum} from '~/services/spotify';
import styles from './styles.module.scss';
import type {Album as AlbumModel} from '~/models/album';

export const Album = () => {
  const params = useParams();
  const [album, setAlbum] = useState<AlbumModel>();

  useEffect(() => {
    if (params.id) {
      const fetchAlbum = async() => {
       const album = await getAlbum(params.id as string)
       setAlbum(album);
      }

      fetchAlbum();
    }
  }, []);

  return (
    <div className={styles.album}>
      {album?.name}
    </div>
  )
}

export default Album;
