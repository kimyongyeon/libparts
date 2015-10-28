/*
* javascript libs for share
* 만든이: 정대규
* 일시: 2015.10.24
* 버전: 0.1
* lisence: MIT(공짜)
*/

/*
* delay() 용도: 여러번 실행을 하더라도 정해진 시간 후에 마지막 callback이 한번만 실행됨
* ex)
$("#text").keypress(function(){
delay(function(){
		alert($("#text").eq(0).val());
	}, 2000);
});
*/
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	}
})(); //end: var delay = (function(){

String.prototype.pad = function(length){
	for(var i = 0, str = ""; i < length; i++){
		str += this;
	}
	return str;
} //end: String.prototype.pad = function(length){

var L = {
	/*
	* datefy()의 parameter 설명
	* 1. date: unix timestamp 형태로 날짜 정보를 가지는 값, 문자열/숫자를 넘길 수 있음.
	* 2. format: 문자열의 날짜 포맷 조합, 구분자는 아래 키워드를 제외한 어떤 문자열이든 가능함
	* yyyy(년), mm(월), dd(일), hh(24시), mi(분), ss(초), ms(밀리초)
	* YY(뒤2자리년), MM(9월/Sep), WW(일/Sun), NN(오전/오후,AM/PM), HH(12시)
	* 3. language: 언어셋 문자열(비설정시 영어, 설정시(ko/en))
	* ex1)
	console.log(L.datefy(new Date().getTime(), "yyyy.mm.dd"));
	* ex2)
	console.log(L.datefy(1445562073583, "yyyy/mm/dd"));
	* ex3)
	console.log(L.datefy("1445562073583", "yyyy-mm-dd"));
	*/

	datefy: function(date, format, language){
		Number.prototype.lPad0 = function(length){
			return "0".pad(length - this.toString().length) + this;
		} //end: Number.prototype.lPad0 = function(length){

		var language = language === undefined ? "en" : language;

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

		var date = new Date(typeof(date) === "number" ? date : Number(date)); //unix timestamp

		return format.replace(/(yyyy|YY|mm|MM|dd|WW|hh|NN|HH|mi|ss|ms)/gi, function(pattern){
			switch(pattern){
				case "yyyy":
					return date.getFullYear();
				case "YY":
					return (date.getFullYear() % 1000).lPad0(2);
				case "mm":
					return (date.getMonth() + 1).lPad0(2);
				case "MM":
					return local[language].months[date.getMonth()];
				case "WW":
					return local[language].weeks[date.getDay()];
				case "dd":
					return date.getDate().lPad0(2);
				case "hh":
					return date.getHours().lPad0(2);
				case "NN":
					return local[language].noons[date.getHours() < 12 ? 0 : 1];
				case "HH":
					return ((hour = date.getHours() % 12) ? hour : 12).lPad0(2);
				case "mi":
					return date.getMinutes().lPad0(2);
				case "ss":
					return date.getSeconds().lPad0(2);
				case "ms":
					return date.getMilliseconds().lPad0(4);
			} //end: switch(pattern){
		}); //end: return format.replace(/(yyyy|YY|mm|MM|dd|WW|hh|NN|HH|mi|ss|ms)/gi, function(pattern){
	} //end: datefy: function(date, format, language){
}; //end: var L = {
