import Lottie from "lottie-react"
import presentationLottie from "../assets/animations/presentation.json"

const PresentationAnimation = () => {
  return (
    <Lottie
      animationData={presentationLottie}
      className="h-full"
      loop
    />
  )
}

export default PresentationAnimation