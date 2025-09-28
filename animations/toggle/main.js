import lottie from "lottie-web";
import animationData from "./data.json";
import "./style.css";

document.title = "Toggle";
const container = document.querySelector(".lottie");
const animation = lottie.loadAnimation({
  container: container,
  animationData: animationData,
  renderer: "svg",
  loop: false,
  autoplay: false,
});

console.log(animation);
const button = container.querySelector("#thumb");

let state = "off";
button.onclick = () => {
  switch (state) {
    case "off":
      animation.goToAndPlay("on"); // true = force the segment to play from first frame of segment
      state = "on";
      break;
    case "on":
      animation.goToAndPlay("off"); // true = force the segment to play from first frame of segment
      state = "off";
      break;
  }
};
