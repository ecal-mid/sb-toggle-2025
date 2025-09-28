import lottie from "lottie-web";
import { createAnimationApi } from "lottie-api";
import animationData from "./data.json";
import "./style.css";

document.title = "Text";
const container = document.querySelector(".lottie");
const animation = lottie.loadAnimation({
  container: container,
  animationData: animationData,
  renderer: "svg",
  loop: false,
  autoplay: false,
});

// const animationAPI = api.createAnimationApi(animation);

const button = container.querySelector(".button");

button.onpointerdown = () => {
  animation.goToAndPlay("press");
};

button.onpointerup = () => {
  animation.goToAndPlay("release");
};