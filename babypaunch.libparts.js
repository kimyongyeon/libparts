/*
* javascript libs for share
* 만든이: 정대규
* 일시: 2015.10.24
* 버전: 0.1
* lisence: MIT(공짜)
*/

/*
* 일정 시간 이후에 callback을 실행시킨다.
* 단순 setTimeout과 다르게, 여러번 실행을 하더라도 마지막 callback만 실행되는 것이다.
* ex) $("#text").keypress(function(){
* ex)     delay(function(){
* ex)         alert($("#text").eq(0).val());
* ex)     }, 2000);
* ex) });
*/
var delay = (function(){
	var t = 0;
	return function(callback, ms){
		clearTimeout(t);
		t = setTimeout(callback, ms);
	}
})(); //end: var delay = (function(){
