const slabShape = document.getElementById("slabShape");
const slabStroke = document.getElementById("slabStroke");
const flowLines = document.getElementById("flowLines");
const topRoll = document.getElementById("topRoll");
const bottomRoll = document.getElementById("bottomRoll");
const restart = document.getElementById("restart");

let animationId = null;
let startTime = null;

const centerY = 290;
const halfW0 = 115;
const halfW1 = 70;

function slabPath(elapsed) {
  const pulse = Math.sin(elapsed * 0.008) * 2.5;

  const xStart = 185;
  const xBiteStart = 390;
  const xBiteCenter = 545;
  const xBiteEnd = 690;
  const xEnd = 925;

  const topW0 = centerY - halfW0;
  const bottomW0 = centerY + halfW0;

  const topW1 = centerY - halfW1 + pulse;
  const bottomW1 = centerY + halfW1 - pulse;

  return `
    M ${xStart} ${topW0}
    L ${xBiteStart} ${topW0}

    C ${xBiteStart + 55} ${topW0},
      ${xBiteCenter - 70} ${topW1},
      ${xBiteCenter} ${topW1}

    L ${xEnd} ${topW1}
    L ${xEnd} ${bottomW1}
    L ${xBiteCenter} ${bottomW1}

    C ${xBiteCenter - 70} ${bottomW1},
      ${xBiteStart + 55} ${bottomW0},
      ${xBiteStart} ${bottomW0}

    L ${xStart} ${bottomW0}
    Z
  `;
}

function animate(timestamp) {
  if (!startTime) startTime = timestamp;

  const elapsed = timestamp - startTime;

  const path = slabPath(elapsed);
  slabShape.setAttribute("d", path);
  slabStroke.setAttribute("d", path);

  const flowOffset = (elapsed * 0.18) % 160;
  flowLines.setAttribute("transform", `translate(${flowOffset}, 0)`);

  topRoll.setAttribute("transform", `rotate(${elapsed * 0.12} 545 205)`);
  bottomRoll.setAttribute("transform", `rotate(${-elapsed * 0.12} 545 375)`);

  animationId = requestAnimationFrame(animate);
}

function startAnimation() {
  cancelAnimationFrame(animationId);
  startTime = null;
  animationId = requestAnimationFrame(animate);
}

restart.addEventListener("click", startAnimation);
startAnimation();
