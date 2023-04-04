import styles from './styles.module.scss';

const LoadingSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.grid}>
        {[...Array(6).keys()].map((key) => (
          <div key={key} className={styles.card} />
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton;
