import Lottie from "lottie-react";

const LottieImage = ({ animationData }) => {
    return (
        <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
        />
    )
}

export default LottieImage;