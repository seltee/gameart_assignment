export function injectFont(family: string, weight: string, srcUrl: string) {
  const fontFace = `
    @font-face {
      font-display: swap;
      font-family: '${family}';
      font-style: normal;
      font-weight: ${weight};
      src: url('${srcUrl}');
    }
  `;

  const style = document.createElement("style");
  style.textContent = fontFace;
  document.head.appendChild(style);
}
