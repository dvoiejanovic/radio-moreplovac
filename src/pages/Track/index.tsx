import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import styles from './styles.module.scss';
import PlayButton from '~/components/PlayButton';
import TrackItem from '~/components/TrackItem';
import {formatYear} from '~/helpers/date';
import {formatTime} from '~/helpers/format';
import {getArtist, getArtistTopTracks, getTrack} from '~/services/spotify';

import type {IArtist} from '~/interfaces/artist';
import type {Track as TrackModel} from '~/models/track';

const Track = () => {
  const params = useParams();
  const [track, setTrack] = useState<TrackModel>();
  const [artist, setArtist] = useState<IArtist>();
  const [popularTracks, setPopularTracks] = useState<TrackModel[]>();

  useEffect(() => {
    if (params.id) {
      const fetchTrack = async() => {
        const track = await getTrack(params.id as string);
        setTrack(track);
        if (track.mainArtist) {
          await fetchArtist(track.mainArtist.id);
          await fetchArtistTopTracks(track.mainArtist.id);
        }
      }

      const fetchArtist = async(id: string) => {
        const artist = await getArtist(id);
        setArtist(artist);
      }

      const fetchArtistTopTracks = async(id: string) => {
        const topTracks = await getArtistTopTracks(id);
        setPopularTracks(topTracks);
      }

      fetchTrack();
    }
  }, [params.id])

  return (
    <div className={styles.track}>
      <div className={styles.cover}>
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
              <div className={styles.artist_name}>
                {artist?.name}
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className={styles.subheading}>
        Popular tracks by
      </div>

      <div className={styles.artist_name}>
        {artist?.name}
      </div>
      <div className={styles.tracks_container}>
        {popularTracks?.map((track, index) => (
          <Link key={track.id} to={`/track/${track.id}`}>
            <TrackItem index={index + 1} track={track} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Track;
