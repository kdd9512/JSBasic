const fillMode = document.getElementById("fill_mod"); // 캔버스 전체를 채우기
const resetMode = document.getElementById("reset_mod"); // 캔버스 전체를 초기화
const eraseMode = document.getElementById("erase_mod"); // 지우개 기능
const fileInput = document.getElementById("file"); // 파일을 업로드하여 캔버스 전체에 출력.
const textInput = document.getElementById("text"); // 텍스트를 삽입.
const saveBtn = document.getElementById("save"); // 생성한 이미지를 저장한다.

const fntForm = document.getElementById("font_form");
const fntSize = document.getElementById("fntSize");
const fntType = document.getElementById("fntType");
const fntWeight = document.getElementById("fntWeight");


const color = document.getElementById("color");
// forEach 를 이용하여 같은 이름 class 전부에 event-listener 를 넣어주기 위해 요소의 정보를 Array 로 만든다.
const colorOption = Array.from(
  document.getElementsByClassName("color-option")
);
const lineWidth = document.getElementById("line_width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


canvas.width = 800;
canvas.height = 800;

// ctx.moveTo(50, 50); // 시작점을 가로,세로(px) 만큼 움직인다. 이 상태로는 단순히 시작점만 지정한 것이므로 그냥 아무것도 표시되지 않을 것.
// ctx.lineTo(150, 50); // 시작 지점(가로, 세로 px)에서부터 선을 긋는다
// ctx.lineTo(150, 150); // * 선을 그은 다음 커서는 시작점을 기준으로 생성된 선 끝에 위치하게 된다.
// ctx.lineTo(50, 150);
// ctx.lineTo(50, 50);
// ctx.stroke(); // 선을 긋는 명령을 저장한다.
// ctx.fill();

// fillRect : 직사각형을 만든다
// ctx.fillRect(50,50,100,200);

// rect : 사각형 형태로 선을 긋는다.
// ctx.rect(50,50,100,100);
// ctx.rect(150,150,100,100);
// ctx.rect(250,250,100,100);
// // .fill : 색을 채운다. 기본값은 black
// ctx.fill();

// // beginPath : JS 는 기본적으로 시작점인 위에서 아래로 코드를 읽어서 실행하는데, 
// // 이 메서드를 호출하는 것으로 새 시작점을 만드는 것이 가능하다.
// // * 이 부분이 없다면 이하 fillStyle 이 사각형 전체에 지정될 것.
// ctx.beginPath();
// ctx.rect(350,350,100,100);
// // .fillStyle : .fill() 에서 사용할 색상을 변경할 수 있다.
// ctx.fillStyle = "red";
// ctx.fill();


// 화면에 사람 모양을 출력하는 예제.
// ctx.fillRect(210 - 40, 200 - 30, 15, 100);
// ctx.fillRect(350 - 40, 200 - 30, 15, 100);
// ctx.fillRect(260 - 40, 200 - 30, 60, 200);

// 원을 그릴 때 사용하는 .arc()
// * 이 메서드는 원을 시계 3시방향에서부터 반시계방향으로 그린다.
// 0, 2 * Math.PI -> 원이 시작되는 angle, 원이 끝나는 angle
// ctx.arc(250, 150, 20, 0, 2 * Math.PI);
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = "white";
// ctx.arc(260 + 10, 80, 8, 0, 2 * Math.PI);
// ctx.arc(220 + 10, 80, 8, 0, 2 * Math.PI);
// ctx.fill();

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"; // 선의 끝 모양을 결정한다. 여기서는 둥글게 설정.
let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath(); // 시작점을 새로 지정해주지 않으면 선굵기 변경시 기존에 그었던 선도 같이 업데이트 되어버린다.
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(event) {
  isPainting = true;
}

function cancelPainting(event) {
  isPainting = false;
}

function lineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function colorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function changeColorTemplate(event) {
  // console.dir(event.target) : 이벤트가 발생한 요소의 dataset 을 본다.
  ctx.strokeStyle = event.target.dataset.color;
  ctx.fillStyle = event.target.dataset.color;
  color.value = event.target.dataset.color;
}

function onFillMode() {
  if (isFilling) {
    isFilling = false;
    fillMode.innerText = "Fill"
  } else {
    isFilling = true;
    fillMode.innerText = "Draw"
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function onResetMode() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function onEraseMode() {
  ctx.strokeStyle = "white";
  isFilling = false;
  fillMode.innerText = "Fill";
}
// 이미지를 캔버스 크기에 맞춰서 draw
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    fileInput.value = null; // file 값 초기화. 새 이미지를 추가하면 그 이미지가 덮어씌워질 수 있도록.
  }
}
// 캔버스를 더블클릭하면 클릭한 곳에 텍스트를 출력한다.
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save(); // 현재 상태를 저장한다. 이게 없으면 이하에서 lineWidth 강제설정한 값이 그대로 남아버림.
    ctx.lineWidth = 1;
    // ctx.font = "60px serif";
    ctx.fillText(text, event.offsetX, event.offsetX);
    ctx.restore();
  }
}
// 캔버스에서 만든 이미지를 이하의 .download 에 설정한 이름과 확장자를 갖는 파일로 저장한다.
function onSaveClick(event) {
  const url = canvas.toDataURL(); // 해당 데이터의 URL값
  const a = document.createElement("a"); // a태그 생성.
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}
// 폰트 변경
// 20230116 추가.
// 사용자의 input 은 믿을 수 없으므로 select 형태로 재작성 하여 
// 해당 value 값들을 조합 & ctx.font 의 값을 변형하도록 변경 예정.
function onChangeFont(event) {
  const fsize = fntSize.value;
  const ftype = fntType.value;
  const fweight = fntWeight.value;
  ctx.save();
  ctx.font = `${fweight} ${fsize}px ${ftype}`;
  console.log(ctx.font);
  ctx.restore();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

fntForm.addEventListener("change", onChangeFont);
canvas.addEventListener("dblclick", onDoubleClick);

canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", lineWidthChange);
color.addEventListener("change", colorChange);
colorOption.forEach((color) => color.addEventListener("click", changeColorTemplate));

fillMode.addEventListener("click", onFillMode);
resetMode.addEventListener("click", onResetMode);
eraseMode.addEventListener("click", onEraseMode);

fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);