import styles from './styles.module.scss';
import type {Track} from '~/models/track';
import {formatTime} from '~/helpers/format';

interface ITrackItemProps {
  track: Track
  index: number
}

const TrackItem = (props: ITrackItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.index}>
        {props.index}
      </div>

      <div className={styles.artist_info}>
        <img src={props.track.imageUrl} alt="" className={styles.image} />
        <div className={styles.name}>
          {props.track.name}
        </div>
      </div>

      <div className={styles.track_duration}>
        {formatTime(props.track.duration)}
      </div>
    </div>
  )
}

export default TrackItem;
