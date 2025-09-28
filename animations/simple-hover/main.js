import lottie from "lottie-web";
import animationData from "./data.json";
import "./style.css";
document.title = "Simple Hover";
const container = document.querySelector(".lottie");
const animation = lottie.loadAnimation({
  container: container,
  animationData: animationData,
  renderer: "svg",
  loop: false,
  autoplay: false,
});

const button = container.querySelector("#button");
button.onpointerdown = () => {
  animation.playSegments([0, 13], true); // true = force the segment to play from first frame of segment
}

container.onpointerup = () => {
  animation.playSegments([13, 39], false); // false = don't force the segment to play from the start
}
