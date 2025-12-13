import styles from './testimonial.module.scss';
const Testimonial = ({ quote, name, company, textColorClass }) => {
    return (
        <div className={`${styles.testimonial} ${styles[textColorClass]}`}>
            <p className={styles.quote}>{quote}</p>
            <div className={styles.clientInfo}>
                <p className={styles.name}>{name}</p>
                <p className={styles.company}>{company}</p>
            </div>
        </div>
    );
}
export default Testimonial;