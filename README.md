# libparts
<p>javascirpt libs for share(MIT license)</p>
<p>contact: babypaunch@gmail.com</p>
<p>sample: index.html</p>

# 1. window static functions
<table>
	<tr>
		<th>#</th>
		<th>title</th>
		<th>description</th>
	</tr>
	<tr>
		<td>1.1.</td>
		<td>onerror()</td>
		<td>기본적으로 onerror 함수는 모든 객체에서 사용가능하지만, 이처럼 window에만 걸어놓아 도자바스크립트 개발시  예상하지 못하는 에러를 잡아내기 좋다. 선언만 해두면 별도로 호출하지 않아도 자바스크립에서 에러가 발생하면 alert을 출력한다.</td>
	</tr>
	<tr>
		<td>1.2.</td>
		<td>delay()</td>
		<td>일반적으로 동일한 동작을 반복했을 경우, 마지막으로 입력된 이벤트가 끝나면 지정된 시간 이후에 callback 함수 부분의 로직을 처리하기 좋다.</td>
	</tr>
	<tr>
		<td>1.3.</td>
		<td>pad()</td>
		<td>문자열을 대상으로 입력된 길이만큼 자릿수를 채워서 반환한다.</td>
	</tr>
</table>

# 2. L libraries
<table>
	<tr>
		<th>#</th>
		<th>title</th>
		<th>description</th>
	</tr>
	<tr>
		<td>2.1.</td>
		<td>datefy()</td>
		<td>
			unix의 timestamp와 같은 long형의 정보를 날짜형식으로 변경해서 보여준다.<br/>
			첫번째 파라미터는 문자열/숫자를 대입할 수 있다. 이 값을 대입해보기위해서는 new Date().getTime()을 입력해보면 된다.<br/>
			두번째 파라미터는 format을 문자열로 입력해주면 된다. 특히 각 문자열을 다음과 같은 의미를 가진다.<br/>
			<table>
				<tr>
					<th colspan="3">소문자</th>
					<th colspan="3">대문자</th>
				</tr>
				<tr>
					<th>format</th>
					<th>value</th>
					<th>description</th>
					<th>format</th>
					<th>value</th>
					<th>description</th>
				</tr>
				<tr>
					<td>yyyy</td>
					<td>0000~9999</td>
					<td>4자리 년도</td>
					<td>YY</td>
					<td>00~99</td>
					<td>뒤 2자리 년도</td>
				</tr>
				<tr>
					<td>mm</td>
					<td>01~12</td>
					<td>2자리 월</td>
					<td>MM</td>
					<td>9월/Sep</td>
					<td>언어별 월</td>
				</tr>
				<tr>
					<td>dd</td>
					<td>01~31</td>
					<td>2자리 일</td>
					<td>WW</td>
					<td>일/Sun</td>
					<td>언어별 요일</td>
				</tr>
				<tr>
					<td>hh</td>
					<td>00~23</td>
					<td>2자리 24시간</td>
					<td>HH</td>
					<td>00~12</td>
					<td>2자리 12시간</td>
				</tr>
				<tr>
					<td>mi</td>
					<td>00~59</td>
					<td>2자리 분</td>
					<td>NN</td>
					<td>오전/오후, AM/PM</td>
					<td>언어별 오전오후</td>
				</tr>
				<tr>
					<td>ss</td>
					<td>00~59</td>
					<td>2자리 초</td>
				</tr>
				<tr>
					<td>ms</td>
					<td>0000~9999</td>
					<td>4자리 밀리초</td>
				</tr>
			</table>
			이 표에 포함되지 않은 문자는 모두 구분자로 사용할 수 있다. 일반적으로 -(dash), /(slash), .(dot), ,(comma), _(underline) 등이 있겠다.<br/>
			마지막 세번째 파라미터는 언어를 지정한다. 값은 기본으로 영어(en)으로 지정되어 있으며, 한글로 하고자하면 'ko'를 지정해주면 된다.
		</td>
	</tr>
	<tr>
		<td>2.2.</td>
		<td>validate()</td>
		<td></td>
	</tr>
	<tr>
		<td>2.3.</td>
		<td>jsonize()</td>
		<td>map 구조의 문자열을 입력하면 json으로 변경해서 반환한다.</td>
	</tr>
</table>

# 3. loadmap
<table>
	<tr>
		<th>#</th>
		<th>title</th>
		<th>description</th>
	</tr>
	<tr>
		<td>1</td>
		<td>jsonize</td>
		<td>
		<del>1. map string to json</del><br/>
		2. serialized string to json<br/>
		3. form to json
		</td>
	</tr>
	<tr>
		<td>2</td>
		<td>watch</td>
		<td>listen value change with any type</td>
	</tr>
	<tr>
		<td>3</td>
		<td>submit(ajax & submit delegator)</td>
		<td>
		1. dynamic form submit<br/>
		2. add parameters(json/form)<br/>
		3. set method(post/get)<br/>
		4. async(true/false)<br/>
		5. add functions to parameters(success/fail/always)<br/>
		6. loading bar
		</td>
	</tr>
</table>
