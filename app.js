const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=800;
canvas.height=800;

ctx.moveTo(50, 50); // 시작점을 가로,세로(px) 만큼 움직인다. 이 상태로는 단순히 시작점만 지정한 것이므로 그냥 아무것도 표시되지 않을 것.
ctx.lineTo(150, 50); // 시작 지점(가로, 세로 px)에서부터 선을 긋는다
ctx.lineTo(150, 150); // * 선을 그은 다음 커서는 시작점을 기준으로 생성된 선 끝에 위치하게 된다.
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.stroke(); // 선을 긋는 명령을 저장한다.
ctx.fill();

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