import Lottie from "lottie-react"
import homeLottie from "../assets/animations/home.json"

const HomeAnimation = () => {
  return (
    <Lottie
      animationData={homeLottie}
      className="w-3/ max-h-full"
      loop
    />
  )
}

export default HomeAnimation