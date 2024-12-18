import './style.css'
import { toPng, toBlob } from "html-to-image";

document.querySelector('#app').innerHTML = `
  <textarea id="htmlInput" placeholder="在此輸入 HTML 內容" rows="10" cols="50">
    <h1>歡迎使用 html-to-image！</h1>
    <p>這是預設的 HTML 內容。</p>
  </textarea>
  <div id="capture" class="capture-area">
  </div>
  <button id="downloadBtn">下載圖片</button>
  <button id="downloadBtn2">下載圖片 blob</button>
`
const htmlInput = document.getElementById('htmlInput');
const capture = document.getElementById('capture');
const downloadBtn = document.getElementById('downloadBtn');
const downloadBtn2 = document.getElementById('downloadBtn2');
capture.innerHTML = htmlInput.value;
// 監聽 textarea 的輸入事件，並即時更新 capture 區域的內容
htmlInput.addEventListener('input', () => {
  capture.innerHTML = htmlInput.value;
});

// 監聽下載按鈕的點擊事件
downloadBtn.addEventListener('click', () => {
  if (capture === null) {
    return;
  }
  console.log(capture)

  toPng(capture, { cacheBust: true, fetchRequestInit: {mode:'no-cors'} })
    .then((dataUrl) => {
      const link = document.createElement('a');
      link.download = 'html-image.png';
      link.href = dataUrl;
      link.click();
    })
    .catch((error) => {
      console.error('轉換失敗:', error);
    });
});

downloadBtn2.addEventListener('click', () => {
  if (capture === null) {
    return;
  }
  console.log(capture)

  toBlob(capture, { cacheBust: true, fetchRequestInit: {mode:'no-cors'} })
    .then((dataUrl) => {
      if (window.saveAs) {
        window.saveAs(blob, 'my-node.png');
        } else {
        FileSaver.saveAs(blob, 'my-node.png');
      }
    })
    .catch((error) => {
      console.error('轉換失敗:', error);
    });
});