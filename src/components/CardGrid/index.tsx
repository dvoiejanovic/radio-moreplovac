import styles from './styles.module.scss';
import type {ReactNode} from 'react';

interface ICardGridProps {
  children: ReactNode
}

const CardGrid = (props: ICardGridProps) => {
  return <div className={styles.grid}>
    {props.children}
  </div>
}

export default CardGrid;
