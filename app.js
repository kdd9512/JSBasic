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

function onMove(event){
  if(isPainting) {
    ctx.lineTo(event.offsetX,event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath(); // 시작점을 새로 지정해주지 않으면 선굵기 변경시 기존에 그었던 선도 같이 업데이트 되어버린다.
  ctx.moveTo(event.offsetX,event.offsetY);
}

function onMouseDown(event) {
  isPainting = true;
}

function cancelPainting(event) {
  isPainting = false;
}

function lineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", lineWidthChange);
