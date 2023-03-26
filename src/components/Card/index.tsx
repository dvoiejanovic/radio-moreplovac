
import {Link} from 'react-router-dom';
import styles from './styles.module.scss';

interface ICardProps {
  badge?: string
  borderStyle: 'round' | 'square'
  description: string
  imageUrl?: string
  link: string
  title: string
}

export const Card = ({
  badge,
  description,
  borderStyle,
  imageUrl,
  link,
  title
}: ICardProps) => {
  return (
    <Link to={link} relative="path">
      <div className={styles.card}>
        <div className={styles.image_wrapper}>
          <img src={imageUrl} alt="" className={`${styles.image} ${styles[borderStyle]}`}/>
        </div>
        <div className={styles.text_section}>
          <div className={styles.title}>
            {title}
          </div>
          <div className={styles.footer}>
            <div className={styles.description}>
              {description}
            </div>
            {badge &&
              <div className={styles.badge}>
                {badge}
              </div>
            }
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card;
