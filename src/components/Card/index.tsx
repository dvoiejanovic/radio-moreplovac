
import {Link} from "react-router-dom";
import styles from "./styles.module.scss";

interface ICardProps {
  imageUrl: string
  title: string
  description: string
  link: string
}

export const Card = ({imageUrl, title, description, link}: ICardProps) => {
  return (
    <Link to={link} relative="path">
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
    </Link>
  )
}

export default Card;
