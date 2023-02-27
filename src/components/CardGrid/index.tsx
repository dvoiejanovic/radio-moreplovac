import {ReactNode} from 'react';
import styles from './styles.module.scss';

interface ICardGridProps {
  children: ReactNode
}

const CardGrid = (props: ICardGridProps) => {
  return <div className={styles.grid}>
    {props.children}
  </div>
}

export default CardGrid;
