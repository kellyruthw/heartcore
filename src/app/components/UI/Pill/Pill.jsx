import styles from './pill.module.scss';

const Pill = ({ label, color }) => {
    return (
        <span className={`${styles.pill} ${styles[color]}`}>{label}</span>
    );
};
export default Pill;