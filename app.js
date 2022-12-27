const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width=800;
canvas.height=800;

// fillRect : 직사각형을 만든다
// ctx.fillRect(50,50,100,200);

// rect : 사각형 형태로 선을 긋는다.
ctx.rect(50,50,100,100);
ctx.rect(150,150,100,100);
ctx.rect(250,250,100,100);
// .fill : 색을 채운다. 기본값은 black
ctx.fill();

// beginPath : JS 는 기본적으로 시작점인 위에서 아래로 코드를 읽어서 실행하는데, 
// 이 메서드를 호출하는 것으로 새 시작점을 만드는 것이 가능하다.
// * 이 부분이 없다면 이하 fillStyle 이 사각형 전체에 지정될 것.
ctx.beginPath();
ctx.rect(350,350,100,100);
// .fillStyle : .fill() 에서 사용할 색상을 변경할 수 있다.
ctx.fillStyle = "red";
ctx.fill();