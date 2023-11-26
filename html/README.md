# HTML attribute랑 property의 차이점을 설명해주세요.

Attributes는 HTML 요소의 추가적인 정보를 전달하고 이름="값" 이렇게 쌍으로 온다. 예를들어 <div class="my class"></div> 를 보면 div 태그가 class라는 값이 "my class"인 attribute를 가지고 있다.
Property는 attribute에 대한 HTML DOM트리 안에서의 표현이다. 같은 예시에서 attribute는 값이 "myclass"이고 이름이 className인 property를 가진다.
둘의 차이는 Attribute는 HTML 텍스트 문서에 있는 것이고, property는 HTML DOM 트리에 있는 것이다. attribute는 변하지 않고, property는 변할 수 있다. 가령 사용자가 체크박스를 체크하면 property의 값은 변하는 것이다. (DOM안에 존재하고 동적이기 때문에)

# withCredentials에 대해서 설명해주세요.

<code>XMLHttpRequest</code>나 <code>Fetch API</code>를 사용하여 웹 페이지와 서버 간에 데이터를 주고받을 때 사용되는 옵션 중 하나입니다.

<code>`withCredentials`</code> 옵션이 <code>`true`</code>로 설정된 경우:

- 쿠키 및 HTTP 인증 헤더와 같은 인증 관련 정보가 요청에 포함됩니다.
- 브라우저는 요청을 보낼 때 현재 도메인과 요청을 받는 도메인 간에 쿠키 및 인증 정보를 공유합니다.

<code>`withCredentials`</code> 옵션이 <code>`false`</code>로 설정된 경우:

- 쿠키 및 인증 정보는 요청과 관련이 없으며, 요청은 인증되지 않은 상태로 전송됩니다.

<code>`withCredentials`</code> 옵션은 주로 다음과 같은 상황에서 사용됩니다:

1. <code>인증이 필요한 API 요청</code>: 웹 페이지가 서버에서 인증된 세션을 사용해야 하는 경우, <code>`withCredentials`</code>를 <code>`true`</code>로 설정하여 브라우저가 세션 관련 쿠키 및 헤더를 요청에 포함하도록 할 수 있습니다. 이를 통해 사용자 인증 정보를 서버로 전달할 수 있습니다.
2. <code>크로스 도메인 요청</code>: 주로 동일 출처 정책(same-origin policy)에 따라 다른 출처(origin)의 API에 대한 요청을 보낼 때 사용됩니다. 다른 출천의 서버로 요청을 보낼 때, <code>`withCredentials`</code>를 <code>`true`</code>로 설정하면 브라우저는 쿠키와 같은 인증 정보를 공유하므로, 해당 서버에서 인증 및 권한을 확인할 수 있습니다.

# 웹 프로토콜이란?

웹 프로토콜은 웹에서 쓰이는 통신규약입니다. 통신규약이라는 것은 쉽게 설명하면, 통신을 할때 내가 이렇게 할게 너는 이렇게 해줘라고 약속하는 것입니다.

예시)  protocol://computer_name:port/document_name?parameters

- protocol : 문서에 접근하기 위해 사용하는 프로토콜 이름
- computer_name : 문서가 있는 컴퓨터(서버)의 도메인 이름
- port : 서버가 어떤 포트 숫자를 바라보고 있는지 (선택)
- document_name : 서버 컴퓨터에 있는 특정 문서의 이름
- parameters: 페이지에 넘기는 변수 (선택)

웹과 관련된 프로토콜로는 HTTP, IP/MAC/ARP, TCP/UDP, DNS 등이 있다.

# 시멘틱 마크업이란?

시멘틱은 "의미론적인"의 뜻, 마크업(Markup)이란 HTML 태그로 문서를 작성하는 것.
따라서, 시맨틱 마크업이란 의미를 잘 전달하도록 문서를 작성하는 것.

### 예시
- 헤더/푸터에 header와 footer 사용
- 메인 컨텐츠에 main과 section 사용
- 독립적인 컨텐츠에 article 사용
- 최상위 제목으로 h1 사용
- 순서가 없는 목록으로 ul과 li 사용
- 내비게이션에 nav 사용

### 특징
- 검색엔진이 시맨틱 태그를 중요한 키워드로 간주하기 때문에 검색엔진 최적화(SEO)에 유리하다.
- 웹 접근성 측면에서, 시각장애가 있는 사용자로 하여금 그 의미를 훨씬 잘 파악할 수 있다.
- 단순한 div, span으로 둘러싸인 요소들보다 코드를 볼 때 가독성이 좋다.

# HTML 렌더링 도중 JavaScript가 실행되면 렌더링이 멈추는 이유가 뭔가요?

렌더링 엔진은 HTML 한 줄 씩 순차적으로 파싱하며 DOM을 생성해 나가다가 <script> 태그를 만나면 파싱을 중지한다. JS 코드를 파싱하기 위해 JS 엔진에 제어권을 넘기게 되는데, 파싱이 끝나면 다시 렌더링 엔진에 제어권을 넘겨 중단된 부분부터 HTML 파싱을 재개하며 DOM 트리를 생성한다.
- 이러한 원리 때문에 스크립트 소스는 body 태그 끝에 두는 것을 권장한다. ⇒ 스크립트 먼저 파싱 되면 레이아웃이 제대로 구성되지 않은 상태로 뷰를 제공할 수 있기 때문에 UX를 떨어지는 결과를 초래한다.
- 자바스크립트 파싱과 실행은 브라우저 엔진이 아닌 자바스크립트 엔진에서 처리한다.

# 프로그레시브 렌더링(Progressive Rendering)이 무엇인가?

프로그레시브 렌더링은 컨텐츠를 가능한 빨리 표시하기 위해 성능을 향상시키는 기술이다. 인터넷 속도가 느리거나 불안정한 모바일 환경이 아직 많이 남아있기 때문에 이럴 때 유용하게 사용한다. 대표적으로 레이지 로딩이 있다. 이미지를 한 번에 로드하는 것이 아니라, 자바스크립트를 통해 사용자가 표시하려는 부분만 스크롤 시에 이미지를 로드하는 것이다.

# Aria 속성에 대해서 알려주세요

접근가능한 리치 인터넷 어플리케이션(Accessible Rich Internet Applications, ARIA)은 장애를 가진 사용자가 웹 콘텐츠와 웹 어플리케이션(특히 JavaScript를 사용하여 개발한 경우)에 더 쉽게 접근할 수 있는 방법을 정의하는 여러 특성을 말한다.

ARIA는 HTML을 보충해, 일반적으로 보조 기술이 알 수 없는 상호작용 및 흔히 쓰이는 어플리케이션 위젯에 필요한 정보를 제공한다.

참고로 Aria로 제공되는 많은 기능들이 HTML에서 태그로 이미 제공되므로 웬만한 상황에서는 태그를 활용하는 것이 좋다.

ex)
```html
<div
  id="percent-loaded"
  role="progressbar"
  aria-valuenow="75"
  aria-valuemin="0"
  aria-valuemax="100"></div>
```

<details>
  <summary>다양한 속성값 알아보기</summary>

role="application"

:동일요소x,div요소와같이 그룹역할을하는 요소로 대체

role="banner"

:비슷한 의미로 <header>사용가능 -> <header role="banner"> 로 사용시 1페이지에서 1개만 사용하기를 권장

role="navigation"

:<nav>와 동일

role="main"

:<main>과 동일 ->1페이지 내에 1개만 사용가능하다. 본문의 주요 컨텐츠 영역

role="aside"

:<aside>와 동일, 주요컨텐츠와 연관이 적은 의미를 가진 영역

role="form"

:<form>와 동일, 서버에 전송될 수 있는 콘텐츠, 폼관련 요소 모임

role="search"

:검색 역할을 담당하는 서식영역, <div>또는 <form>에 사용권장.

role="contentinfo"

:<footer>와 비슷, <footer role="contentinfo">로 사용시 한 페이지에 한개요소만 사용하길 권장.

role="button"

:p, span, div에서도 버튼컨트롤로 사용된다는 것을 스크린리더에 인식시킬 수 있다.

가능하면 button role보다 기본 html의 <button>, <input type="button">, <input type="submit">을 사용해야 한다. 기본html요소들은 추가 사용자 정의 없이 키보드 포커스를 지원한다.

role ="tablist"

:탭메뉴 등의 리스트임을 사용자에게 전달한다.

role="tab"

:보조기기가 탭으로 인식.

role="tabpanel"

:보조기기가 탭 패널로 인식

role="presentation", role="none"

:semantic의미를 요소와 그 자식요소로부터 제거하기 위해서 사용한다. 시각적으로 게시하는 용도의 요소에 적용. none은 최근에 나온 속성값으로 presentation과 같은역할을 한다. 호환성문제가 있을 수 있으니까 두개 다 기입해 주는것이 좋음.

role="group"

:라디오 버튼과 같이 여러개의 옵션 중 한가지를 선택 할 때, name속성값에 같은 값을 넣어줘서 그룹화 하더라도 스크린리더 사용자는 시각적으로 볼수있는 사용자와 달리 묶여있는 그룹이라는 것을 인식하기 어렵다. 이러한경우 role="group"를 부여하여 같은 그룹이라는 것을 인식시킨다.

확장되어 있는 상태의 탭 패널

aria-expanded로 현재 탭 패널이 펼쳐짐(활성화)상태 라는 것을전달. (false=접힌상태)

<div role="tabpanel" aria-expanded="true">
input에 입력된 값이 유효한지 판단하기 위한 것

<input type="text" aria-invalid="true">
true는 오류가 발생한 상태라는 것을 전달.

선택된 상태의 토글버튼: pressed를 이용하여 해당 요소를 토글버튼으로 정의하여 준다. true는 누른상태, false는 누르지않은 상태, mixed는 부분적으로 눌린상태이다.

<button aria-pressed="true">
true는 현재 버튼이 눌림상태라는 것을 전달한다.
  
</details>
