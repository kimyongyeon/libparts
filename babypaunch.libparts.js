/*
* javascript libs for share
* 만든이: 정대규
* 일시: 2015.10.24
* 버전: 0.1
* lisence: MIT(공짜)
*/

/*
* validate 설정시 예기치 못한 에러가 발생하면
* try ~ catch를 사용해도 소용없음.
*/
window.onerror = function(e){
	alert(e);
}

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

	/*
	* validate parameter 설명
	******************************
	* param1: jquery object
	******************************
	* param2: options
	* required: 필수여부(true/false/undefined)
	* trim: 공백제거(true/false/undefined/all)
	* init: 초기화(true/false/undefined)
	* rule: 패턴 비교(string/array/regexp)
	* alert: 알림메세지(true/false/undefined)
	* minLength: 최소자릿수, 알림필요
	* maxLength: 최대자릿수, 자동substring
	* minValue: 최소값, 자동 최소값, 알림필요
	* maxValue: 최대값, 자동 최대값, 알림필요
	* message: 출력 문자
	******************************
	* param3: 언어설정(ko/en)
	*/
	, validate: function($obj, opts, lang){
		var cfg = {
			lang: "ko" //언어설정
			, regexp: { //정규식
				en: /[^a-z]/g
				, EN: /[^A-Z]/g
				, En: /[^a-zA-Z]/g
				, num: /[^0-9]/g
				, ko: /[^ㄱ-ㅎㅏ-ㅣ가-힣\x20]/g
			} //end: , regexp: {
			, msg: { //알림 메세지
				ko: { 
					exception: "예외가 발생하였습니다."
					, selector: " 객체가 존재하지 않습니다."
					, unexpect: " 요구되는 값이 입력되지 않았습니다."
					, required: "필수 값을 입력해주세요."
					, en: "소문자를 입력해주세요."
					, EN: "대문자를 입력해주세요."
					, En: "대소문자를 입력해주세요."
					, num: "숫자를 입력해주세요."
					, ko: "한글을 입력해주세요."
					, regexp: "정규식에 알맞은 값을 입력해주세요."
					, minLength: function(length){
						return "최소 " + length + "자를 입력하세요.";
					}
					, maxLength: function(length){
						return "최대 " + length + "자를 입력할 수 있습니다.";
					}
					, minValue: function(value){
						return "최소 " + value + "값을 입력하세요.";
					}
					, maxValue: function(value){
						return "최대 " + value + "값을 입력할 수 있습니다.";
					}
				} //end: ko: {
			} //end: , msg: {
			, trim: true
			, required: false
			, alert: true
			, reset: false
			, replace: false
			, minLength: null
			, maxLength: null
			, minValue: null
			, maxValue: null
			, check: function(results, $this, $var){
				var _msg = this.msg[this.lang];

				if($var === "required"){
					if(this[$var]){
						if(this.reset){ //reset이 true면
							$this.val("");
						}
						if(this.alert){ //alert가 true면
							alert(_msg[$var]);
						}
						$this.focus(); //focus를 위치시킴.
						results.push({$obj: $this, msg: _msg[$var], code: $var});
					}
				}else if($var === "minLength"){
					if(this[$var] !== null){
						if($this.val().length < this[$var]){ //길이가 minLength보다 짧으면
							if(this.alert){ //alert가 true면
								alert(_msg[$var](this[$var]));
							}
							$this.focus(); //focus를 위치시킴.
							results.push({$obj: $this, msg: _msg[$var](this[$var]), code: $var});
						}
					}
				}else if($var === "maxLength"){
					if(this[$var] !== null){
						if($this.val().length > this[$var]){ //길이가 maxLength보다 길면
							if(this.alert){ //alert가 true면
								alert(_msg[$var](this[$var]));
							}
							$this.focus(); //focus를 위치시킴.
							results.push({$obj: $this, msg: _msg[$var](this[$var]), code: $var});
						}
					}
				}else if($var === "minValue"){
					if(this[$var] !== null){
						var _val = $this.val() * 1;
						if(!isNaN(_val)){
							if(_val < this[$var]){ //크기가 minValue보다 작으면
								$this.val(this[$var]); //최소값으로 초기화
								if(this.alert){ //alert가 true면
									alert(_msg[$var](this[$var]));
								}
								$this.focus(); //focus를 위치시킴.
								results.push({$obj: $this, msg: _msg[$var](this[$var]), code: $var});
							}
						}
					}
				}else if($var === "maxValue"){
					if(this[$var] !== null){
						var _val = $this.val() * 1;
						if(!isNaN(_val)){
							if(_val > this[$var]){ //크기가 maxValue보다 크면
								$this.val(this[$var]); //최대값으로 초기화
								if(this.alert){ //alert가 true면
									alert(_msg[$var](this[$var]));
								}
								$this.focus(); //focus를 위치시킴.
								results.push({$obj: $this, msg: _msg[$var](this[$var]), code: $var});
							}
						}
					}
				}
			} //end: , check: function($this, $var){
		}; //end: var cfg = {
		$.extend(true, cfg, opts);
		//console.log(JSON.stringify(cfg));

		try{
			var _msg = cfg.msg[cfg.lang];
			var $var = "";

			if($obj.length === 0){ //참조객체가 없으면
				$var = "selector";
				alert(_msg[$var]); //무조건 알림
				return {msg: _msg[$var], code: $var};
			}else{ //참조객체가 1개 이상이면
				var results = [];

				$obj.each(function(idx){
					var $this = $(this);
					var $val = $this.val();

					if(cfg.trim){ //trim 설정이 true면
						$this.val($val.trim()); //앞뒤 공백 제거
					}
					$val = $this.val();

					if($val.length === 0){ //길이가 0이면
						cfg.check(results, $this, "required");
					}else{ //길이가 0이 아니면
						cfg.check(results, $this, "minLength"); //최소길이 체크
						cfg.check(results, $this, "maxLength"); //최대길이 체크
						cfg.check(results, $this, "minValue"); //최소값 체크
						cfg.check(results, $this, "maxValue"); //최대값 체크

						switch($.type(opts.rule)){ //입력받은 rule의 type 비교
							case "string": //문자열이면
								$var = opts.rule;
								if(cfg.regexp[$var].test($val)){
									if(cfg.reset){ //reset이 true면
										$this.val("");
									}
									if(cfg.alert){ //alert가 true면
										alert(_msg[$var]);
									}
									$this.focus(); //focus를 위치시킴.
									results.push({$obj: $this, msg: _msg[$var], code: $var});
								}
							break;
							case "regexp": //정규식이면
								$var = "regexp";
								if(opts.rule.test($val)){
									if(cfg.reset){ //reset이 true면
										$this.val("");
									}
									if(cfg.alert){ //alert가 true면
										alert(_msg[$var]);
									}
									$this.focus(); //focus를 위치시킴.
									results.push({$obj: $this, msg: _msg[$var], code: $var});
								}
							break;
							default: //기타면
								rule = false;
								$var = "unexpect";
								if(cfg.reset){ //reset이 true면
									$this.val("");
								}
								if(cfg.alert){ //alert가 true면
									alert(_msg[$var]);
								}
								$this.focus(); //focus를 위치시킴.
								results.push({$obj: $this, msg: _msg[$var], code: $var});
							break;
						} //end: switch($.type(opts.rule)){
					} //end: }else{
				}); //end: $obj.each(function(idx){

				return results;
			} //end: }else{
		}catch(e){
			alert(e);
			return {msg: _msg.exception, code: "exception"};
		}
	} //end: , validate: function($obj, opts, lang){
}; //end: var L = {
