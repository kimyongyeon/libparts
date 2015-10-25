/*
* javascript libs for share
* 만든이: 정대규
* 일시: 2015.10.24
* 버전: 0.1
* lisence: MIT(공짜)
*/

/*
* delay() 사용법
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

Object.prototype.type = function(){
	var result = 0;
	var prototypes = [Array, Boolean, Function, Number, Object, String];
	var uniques = [1, 2, 4, 8, 16, 32];
	var type = {"17": "array", "18": "boolean", "20": "function", "24": "number", "16": "object", "48": "string"}

	for(var i = 0; i < prototypes.length; i++){
		if(this instanceof prototypes[i]){
			result += uniques[i];
		}
	}
	return type[result];
} //end: Object.prototype.type = function(){

/*
* param1: 문자열의 날짜 포맷 조합, 구분자는 아래 키워드를 제외한 어떤 문자열이든 가능함.
* yyyy(년), mm(월), dd(일), hh(24시), mi(분), ss(초), ms(밀리초)
* YY(뒤2자리년), MM(9월/Sep), WW(일/Sun), NN(오전/오후,AM/PM), HH(12시)
* param2: 언어셋 문자열(비설정시 영어, 설정시(ko/en))
* ex1) var now = new Date().getTime();
* ex1) var print = now.datefy("yyyy.mm.dd");
* ex1) console.log(print); //2015.10.23
* ex2) var now = 1445562073583;
* ex2) var print = now.datefy("yyyy/mm/dd");
* ex2) console.log(print); //2015/10/23
* ex3) var print = (1445562073583).datefy("yyyy-mm-dd");
* ex3) console.log(print); //2015-10-23
*/
Object.prototype.datefy = function(f, lang){
	if(!this.valueOf()){
		return "";
	}

	String.prototype.pad = function(l){
		var s = "", i = 0;
		while(i++ < l){
			s += this;
		}
		return s;
	} //end: String.prototype.pad = function(l){

	Object.prototype.lPad0 = function(l){
		return this.type() === "string" ? "0".pad(l - this.length) + this : this.toString().lPad0(l);
	} //end: Object.prototype.lPad0 = function(l){

	var d = new Date(this.type() === "number" ? this : Number(this)); //unix timestamp
	var lang = lang === undefined ? "en" : lang;
	var local = {
		en: {
			weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
			, months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			, noons: ["AM", "PM"]
		}
		, ko: {
			weeks: ["일", "월", "화", "수", "목", "금", "토"]
			, months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
			, noons: ["오전", "오후"]
		}
	}; //end: var local = {

	return f.replace(/(yyyy|YY|mm|MM|dd|WW|hh|NN|HH|mi|ss|ms)/gi, function(pattern){
		switch(pattern){
			case "yyyy":
				return d.getFullYear();
			case "YY":
				return (d.getFullYear() % 1000).lPad0(2);
			case "mm":
				return (d.getMonth() + 1).lPad0(2);
			case "MM":
				return local[lang].months[d.getMonth()];
			case "WW":
				return local[lang].weeks[d.getDay()];
			case "dd":
				return d.getDate().lPad0(2);
			case "hh":
				return d.getHours().lPad0(2);
			case "NN":
				return local[lang].noons[d.getHours() < 12 ? 0 : 1];
			case "HH":
				return ((h = d.getHours() % 12) ? h : 12).lPad0(2);
			case "mi":
				return d.getMinutes().lPad0(2);
			case "ss":
				return d.getSeconds().lPad0(2);
			case "ms":
				return d.getMilliseconds().lPad0(4);
		} //end: switch(pattern){
	}); //end: return f.replace(/(yyyy|YY|mm|MM|dd|WW|hh|NN|HH|mi|ss|ms)/gi, function(pattern){
} //end: Object.prototype.datefy = function(f, lang){
