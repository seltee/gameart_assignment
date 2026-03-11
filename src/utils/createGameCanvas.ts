export function createGameCanvas(target: HTMLElement, sizePrcnt: number) {
  const canvas = document.createElement("canvas");
  target.appendChild(canvas);
  canvas.style.setProperty("width", `${sizePrcnt}%`);
  canvas.style.setProperty("height", `${sizePrcnt}vh`);
  canvas.style.setProperty("position", `absolute`);
  canvas.style.setProperty("left", `0`);
  canvas.style.setProperty("top", `0`);
  return canvas;
}
