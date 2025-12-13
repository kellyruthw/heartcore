import Link from "next/link";
import styles from './button.module.scss';

const Button = ({color, href="", buttonValue, onClick}) => {
    return (
        <Link href={href} className={`${styles[color]} ${styles.button}`} onClick={onClick}>{buttonValue}</Link>
    );
}
export default Button;