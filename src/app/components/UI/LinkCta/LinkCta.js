import Link from "next/link";
import styles from './linkCta.module.scss';
import iconCta from '/public/svgs/icon-arrow-diagonal-right.svg';
import Image from "next/image";

const LinkCta = ({ href, value, onClick, target="" }) => {
    return (
        <Link href={href} className={styles.linkCta} onClick={onClick} target={target}>
            {value}
            <Image src={iconCta} alt="Arrow Icon" />
        </Link>
    );
}
export default LinkCta;