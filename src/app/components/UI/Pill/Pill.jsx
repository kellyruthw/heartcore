import styles from './pill.module.scss';

const Pill = ({ label, color }) => {
    return (
        <li className={`${styles.pill} ${styles[color]}`}>{label}</li>
    );
};
export default Pill;