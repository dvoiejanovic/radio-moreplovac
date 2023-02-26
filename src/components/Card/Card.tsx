
import styles from "./Card.module.scss";

interface ICardProps {
  imageUrl: string
  title: string
  description: string
}

export const Card = ({imageUrl, title, description}: ICardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.image_wrapper}>
        <img src={imageUrl} alt="" className={styles.image}/>
      </div>
      <div className={styles.text_section}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.description}>
          {description}
        </div>
      </div>
    </div>
  )
}

export default Card;
