'use client'
import Button from "../UI/Button/Button";
import VideoDiv from "../UI/Video/VideoDiv";
import styles from './videoCta.module.scss';
import { useModal } from "../UI/Modal/ModalProvider";

const VideoCta = () => {
    const { openModal, hideModal } = useModal();
    return (
        <section className={styles.videoCta}>
            <div className={styles.row}>
                <div className={styles.copy}>
                    <h2>Let’s craft something people remember</h2>
                    <div className={styles.buttonContainer}>
                        <Button
                            color="outline"
                            buttonValue="Start a Conversation"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }} />
                    </div>
                </div>
            </div>

            <div className={styles.videoContainer}>
                <div className={styles.overlay}></div>
                <VideoDiv
                    src="/videos/colorfulwaves.mp4"
                />
            </div>
        </section>
    );
};
export default VideoCta;