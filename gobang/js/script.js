//再来一局
var another = document.getElementById("another");
another.onclick = function(){
	history.go(0);
}

//一人娱乐
var oneself = document.getElementById("one-oneself");
oneself.onclick = function(){

	chess.onclick = function(e){		//e代表了onclick事件
		if(over){
			return;
		}
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x/30);
		var j = Math.floor(y/30);
		if(chessBoard[i][j] == 0){
			oneStep(i,j,me);   //画棋子
			if(me){
				chessBoard[i][j] = 1;		//黑棋为1
			}else{
				chessBoard[i][j] = 2;		//白棋为2
			}
			
			for(var k = 0; k<count; k++){	//遍历所有的赢法
				//然后判断一下，假如[i][j]这个位置，第k种赢法是true，且是黑子
				if(wins[i][j][k] && chessBoard[i][j] == 1){
					myWin[k]++;
					computerWin[k] = 6;		//[i][j]这个位置有黑子，那么白子就不可能赢了，可以设置为一个异常的值，因为computerWin[k]的值最多为5，异常的值就不会进行加分
					if(myWin[k] == 5){
						window.alert("黑棋赢咯！");
						over = true;
					}
				}else if(wins[i][j][k] && chessBoard[i][j] == 2){	//假如[i][j]这个位置，第k种赢法是true，且是白子
					computerWin[k]++;
					myWin[k] = 6;		//[i][j]这个位置有黑子，那么白子就不可能赢了，可以设置为一个异常的值，因为computerWin[k]的值最多为5，异常的值就不会进行加分
					if(computerWin[k] == 5){
						window.alert("白棋赢咯！");
						over = true;
					}
				}

			}
			if(!over){
				me = !me;    //画完棋子，me取反
				//yourself();
			}
		}
	}

	var yourself = function(){

	}
}

//人人对战
var peopleWithPeople = document.getElementById("people-people");
peopleWithPeople.onclick = function(){

}

//人机对战
var peopleWithComputer = document.getElementById("people-computer");
peopleWithComputer.onclick = function(){
	
	chess.onclick = function(e){		//e代表了onclick事件
		if(over){
			//alert("1");
			return;
		}
		if(!me){
			//alert("2");
			return;
		}
		var x = e.offsetX;
		var y = e.offsetY;
		var i = Math.floor(x/30);
		var j = Math.floor(y/30);
		if(chessBoard[i][j] == 0){
			oneStep(i,j,me);   //画棋子
			//if(me){
				chessBoard[i][j] = 1;		//黑棋为1
			//}else{
			//	chessBoard[i][j] = 2;		//白棋为2
			//}
			
			for(var k = 0; k<count; k++){	//遍历所有的赢法
				//然后判断一下，假如[i][j]这个位置，第k种赢法是true，即有子
				if(wins[i][j][k]){
					myWin[k]++;
					computerWin[k] = 6;		//[i][j]这个位置有黑子，那么白子就不可能赢了，可以设置为一个异常的值，因为computerWin[k]的值最多为5，异常的值就不会进行加分
					if(myWin[k] == 5){
						window.alert("你赢咯！");
						over = true;
					}
				}

			}
			if(!over){
				me = !me;    //画完棋子，me取反
				computerAI();
			}
		}
	}

	var computerAI = function(){
		var myScore = [];
		var computerScore = [];
		var max = 0;		//保存最高分
		var u = 0, v = 0;	//保存最高分点的坐标
		//初始化得分
		for(var i=0; i<15; i++){
			myScore[i] = [];
			computerScore[i] = [];
			for(var j=0; j<15; j++){
				myScore[i][j] = 0;
				computerScore[i][j] = 0;
			}
		}
		//初始化结束后遍历整个棋盘
		for(var i=0; i<15; i++){
			for(var j=0; j<15; j++){
				if(chessBoard[i][j] == 0){
					//等于0说明是一个空闲的点，可以进行计算
					for(var k=0; k<count; k++){	//遍历所有的赢法
						if(wins[i][j][k]){
							//如果第k种赢法是true，说明这个点是有价值的
							//这时需要进行加分,如果[i][j]点出现在了多种赢法上面，分数会进行累加
							//拦截情况
							if(myWin[k] == 1){		//第k种赢法黑棋已经实现1颗子
								myScore[i][j] += 200;  //加上一个分数，如200分
							}else if(myWin[k] == 2){		//第k种赢法黑棋已经实现2颗子，价值更大
								myScore[i][j] += 400;  //加上一个分数，如400分
							}else if(myWin[k] == 3){
								myScore[i][j] += 2000;
							}else if(myWin[k] == 4){
								myScore[i][j] += 10000;		//再下一步棋，黑棋就赢了，所以需要一个绝对高的分数
							}

							//计算机本身的情况
							if(computerWin[k] == 1){		//第k种赢法白棋已经实现1颗子
								computerScore[i][j] += 220;  //加上一个分数，如220分
							}else if(myWin[k] == 2){		//第k种赢法白棋已经实现2颗子，价值更大
								computerScore[i][j] += 420;  //加上一个分数，如420分
							}else if(myWin[k] == 3){
								computerScore[i][j] += 2100;
							}else if(myWin[k] == 4){
								computerScore[i][j] += 20000;	//再下一步棋，白棋就赢了，所以需要一个绝对高的分数
							}
						}
					}
					//我的最高分点
					if(myScore[i][j] > max){
						//就将这个点记录下来
						max = myScore[i][j];
						u = i;
						v = j;
					}else if(myScore[i][j] = max){
						if(computerScore[i][j] > computerScore[u][v]){
							//这时认为ij这个点还是要比uv好
							u = i;
							v = j;
						}
					}
					//计算机的最高分点
					if(computerScore[i][j] > max){
						//就将这个点记录下来
						max = computerScore[i][j];
						u = i;
						v = j;
					}else if(computerScore[i][j] = max){
						if(myScore[i][j] > myScore[u][v]){
							//这时认为ij这个点还是要比uv好
							u = i;
							v = j;
						}
					}
				}
			}
		}
		oneStep(u,v,false);
		chessBoard[u][v] = 2;	//表示计算机在这里落了一个子
		//更新赢法的统计数组
		for(var k = 0; k<count; k++){	//遍历所有的赢法
			//然后判断一下，假如[u][v]这个位置，第k种赢法是true，即有子
			if(wins[u][v][k]){
				computerWin[k]++;
				myWin[k] = 6;		//[u][v]这个位置有黑子，那么白子就不可能赢了，可以设置为一个异常的值，因为computerWin[k]的值最多为5，异常的值就不会进行加分
				if(computerWin[k] == 5){
					window.alert("计算机赢咯！");
					over = true;
				}
			}

		}
		if(!over){		//棋局还没有结束
			me = !me;    //画完棋子，me取反
		}
	}
}


var chessBoard = [];		//用来存储落下的棋子
var me = true;
var over = false;		//表示棋局有没有结束

var wins = [];		//赢法数组

//赢法的统计数组
var myWin = [];		//我方(黑子)赢
var computerWin = [];		//计算机(白子)赢


//初始化每个棋子位置一开始都为0，代表没有落子，为空
//作用：防止后面点击的棋子将之前的棋子覆盖
for(var i=0; i<15; i++){
	chessBoard[i] = [];
	for(var j=0; j<15; j++){
		chessBoard[i][j] = 0;
	}
}

for(var i = 0; i<15; i++){
	wins[i] = [];
	for(var j=0; j<15; j++){
		wins[i][j] = [];		//出现了一个三维数组
	}
}

var count = 0;		//代表赢法种类的索引，初始化为0
//填充赢法数组
//所有横线的赢法
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		//wins[0][0][0] = true
		//wins[0][1][0] = true
		//wins[0][2][0] = true
		//wins[0][3][0] = true
		//wins[0][4][0] = true

		//wins[0][1][1] = true
		//wins[0][2][1] = true
		//wins[0][3][1] = true
		//wins[0][4][1] = true
		//wins[0][5][1] = true
		for(var k=0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}

//所有竖线的赢法
for(var i=0; i<15; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}

//所有斜线的赢法
for(var i=0; i<11; i++){
	for(var j=0; j<11; j++){
		for(var k=0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}

//所有反斜线的赢法
for(var i=0; i<11; i++){
	for(var j=14; j>3; j--){
		for(var k=0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}

console.log(count);

for(var i = 0; i<count; i++){		//myWin的维度就是赢法的种类count
	myWin[i] = 0;
	computerWin[i] = 0;
}


var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#bfbfbf";		//给线加上颜色

var logo = new Image();
logo.src = "img/bg.jpeg";
//图片加载需要时间，需要一个回调函数
logo.onload = function(){
	context.drawImage(logo, 0, 0, 450, 450);	//图片，图片的左边距、上边距、宽、高
	drawChessBoard();		//画完图片再画棋盘，就不会使图片挡住棋盘的线条
}

var drawChessBoard = function(){

	/*context.moveTo(0,0);
	context.lineTo(450,450);		//对角线
	context.stroke();		//真正的画线,描边*/

	//通过for循环画出棋盘
	for(var i=0; i<15; i++){
		//横线
		context.moveTo(15 + i*30, 15);
		context.lineTo(15 + i*30,435);
		context.stroke();	
		//纵线
		context.moveTo(15, 15 + i*30);
		context.lineTo(435, 15 + i*30);	
		context.stroke();		
	}
}

var oneStep = function(i, j, me){
	//棋子的绘制
	//画圆
	context.beginPath();
	context.arc(15 + i*30, 15 + j*30, 13, 0, 2*Math.PI);		//可以用来画扇形，这里用来画圆：圆心坐标x,y；圆的半径；扇形的起始弧度和终止弧度

	context.closePath();
	var gradient = context.createRadialGradient(15 + i*30 + 2, 15 + j*30 - 2, 13, 15 + i*30, 15 + j*30, 0);		//返回一个渐变对象,渐变开始的圆，渐变结束的圆
	if(me){
		gradient.addColorStop(0,"#0a0a0a");		//渐变开始颜色
		gradient.addColorStop(1,"#636766");		//渐变结束颜色
	}else{
		gradient.addColorStop(0,"#d1d1d1");
		gradient.addColorStop(1,"#f9f9f9");
	}
	
	context.fillStyle = gradient;		//填充的颜色
	context.fill();		//填充作用
}
