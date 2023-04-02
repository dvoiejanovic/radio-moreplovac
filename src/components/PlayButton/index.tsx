import {useState} from 'react';
import {AiFillCaretRight, AiFillPauseCircle, AiFillPlayCircle, AiOutlinePause} from 'react-icons/ai';
import styles from './styles.module.scss';

type TPlayingMode = 'playing' | 'paused';

const PlayButton = () => {
  const [mode, setMode] = useState<TPlayingMode>('paused');

  const toggle = () => {
    if (mode == 'paused') {
      setMode('playing');
    } else {
      setMode('paused');
    }
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggle}
    >
      {mode === 'paused' ?
        <AiFillPlayCircle className={styles.icon} /> :
        <AiFillPauseCircle className={styles.icon} />
      }
    </button>
  )
}

export default PlayButton;
