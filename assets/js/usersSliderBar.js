const sliderLeftBtn = document.querySelector(".sliderLeftBtn");
const sliderRightBtn = document.querySelector(".sliderRightBtn");
const sliderBox = document.querySelector(".useresDesignWrapper");
const useresWrapper = document.querySelector(".useresWrapper");

const handleSliderLeft = (e) => {
  let minusValue = 0;
  const timer = setInterval(() => {
    useresWrapper.scrollLeft -= 20;
    minusValue += 10;
    console.log(minusValue);
    if (minusValue === 300) {
      clearInterval(timer);
      minusValue = 0;
    }
  }, 20);
};

const handleSliderRight = (e) => {
  let plusValue = 0;
  const timer = setInterval(() => {
    useresWrapper.scrollLeft += 20;
    plusValue += 10;
    console.log(plusValue);
    if (plusValue === 300) {
      clearInterval(timer);
      plusValue = 0;
    }
  }, 20);
};

const init = () => {
  if (sliderLeftBtn) sliderLeftBtn.addEventListener("click", handleSliderLeft);
  if (sliderRightBtn)
    sliderRightBtn.addEventListener("click", handleSliderRight);
};
init();
