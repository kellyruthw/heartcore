import styles from './video.module.scss';
const VideoDiv = ({ poster="", ref, src }) => {
    return (
        <video
            ref={ref}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={poster}
        >
            <source src={src} type="video/mp4" />
        </video>
    )
}

export default VideoDiv;