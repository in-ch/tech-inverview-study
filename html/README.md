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
