import {AiTwotoneTool} from 'react-icons/ai';
import styles from './styles.module.scss';

const WorkInProgress = () => {
  return (
    <div className={styles.container}>
      <AiTwotoneTool className={styles.icon} />
      This page is work in progress.
    </div>
  )
}

export default WorkInProgress;
