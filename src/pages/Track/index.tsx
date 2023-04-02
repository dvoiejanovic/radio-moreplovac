import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {getArtist, getTrack} from '~/services/spotify';
import styles from './styles.module.scss';
import {formatYear} from '~/helpers/date';

import type {IArtist} from '~/interfaces/artist';
import type {Track as TrackModel} from '~/models/track';
import {formatTime} from '~/helpers/format';
import PlayButton from '~/components/PlayButton';
import GradientCover from '~/components/GradientCover';

const Track = () => {
  const params = useParams();
  const [track, setTrack] = useState<TrackModel>();
  const [artist, setArtist] = useState<IArtist>();

  useEffect(() => {
    if (params.id) {
      const fetchTrack = async() => {
        const track = await getTrack(params.id as string);
        setTrack(track);
        if (track.mainArtist) {
          await fetchArtist(track.mainArtist.id)
        }
      }

      const fetchArtist = async(id: string) => {
        const artist = await getArtist(id);
        setArtist(artist);
      }

      fetchTrack();
    }
  }, [])

  return (
    <div className={styles.track}>
      <div className={styles.cover}>
        {track?.imageUrl &&
          <GradientCover image={track?.image} />
        }
        <img src={track?.imageUrl} className={styles.image} />

        <div className={styles.info}>
          <div className={styles.type}>
            {track?.type}
          </div>

          <div className={styles.title}>
            {track?.name}
          </div>

          <div className={styles.artist_info}>
            <img src={artist?.image.url} className={styles.artist_avatar} />
            <div className={styles.artist_name}>
              {artist?.name} •
            </div>
            <div>
              {formatYear(track?.releaseYear)} •
            </div>
            <div>
              {formatTime(track?.duration)}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.play_container}>
        <PlayButton />
      </div>

      <Link to={`/artist/${artist?.id}`}>
        <div
          className={styles.artist_bar}
        >
          <div className={styles.artist_bar_info}>
            <img src={artist?.image.url} className={styles.artist_bar_avatar} />
            <div>
              <div className={styles.type}>
                {artist?.type}
              </div>
              <div className={styles.arits_name}>
                {artist?.name}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Track;
