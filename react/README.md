
# React hooks에 대한 장점을 설명해주세요.

1. 코드가 간결해진다. 
2. 원래 class 컴포넌트를 만들때 <code>‘바인딩되지 않는 this문제’</code>가 많이 발생했었다. 이때 bind 함수를 많이 사용했었다.
3. HOC hell에서 벗어날 수 있다.

# SEO 최적화 방법에 대해서 설명해주세요.

1. 키워드 연구 (Keyword Research):

먼저 타겟 키워드를 연구하고 관련 검색어를 식별합니다. 이러한 키워드를 사용자가 검색할 때 웹 페이지가 나타날 수 있도록 콘텐츠에 포함하세요.

2. 메타 데이터 최적화:

각 페이지의 <head> 부분에는 타이틀(<title>)과 메타 설명(<meta name="description">)을 최적화해야 한다.
Next.js에서는 <code>next/head</code> 모듈을 사용하여 페이지별로 메타 데이터를 설정할 수 있습니다.

3. Open Graph 사용

Open Graph는 페이스북에서 개발한 메타 데이터 프로토콜로, 웹 페이지를 소셜 미디어 플랫폼에서 더 잘 표시하고 공유할 수 있도록 도와준다. 
"og" 태그는 주로 페이스북, Twitter, LinkedIn 등의 소셜 미디어 플랫폼에서 공유될 때 페이지의 미리보기 정보를 정의하는 데 사용된다.

일반적으로 "og" 태그는 다음과 같은 메타 데이터를 포함할 수 있다.

- og:title: 페이지의 제목
- og:description: 페이지에 대한 간단한 설명
- og:image: 페이지와 관련된 이미지 URL
- og:url: 페이지의 URL
- og:type: 페이지의 유형 (웹사이트, 기사, 제품 등)
- og:locale: 페이지의 언어 및 지역 설정

4. 속도 최적화:

웹 페이지 로딩 속도를 최적화하고 빠르게 로드되도록 한다. 이미지 최적화, 브라우저 캐싱, 코드 분할 등을 사용할 수 있다.

5. XML, RSS 사용 

Next.js에서 XML 사이트맵을 생성하여 검색 엔진이 사이트의 페이지를 쉽게 색인화할 수 있도록 한다. rss도 사용한다. 


# 브라우저는 JSX 파일을 읽을 수 있나요?

리액트에서 사용하는 JSX 코드 형식은 브라우저에서 읽을 수 없다. JS의 확장 문법인 JSX는 브라우저에서 실행하기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 JS 형태의 코드로 변환되는 과정이 존재한다. 다만, 개발자의 입장에서 HTML처럼 작성할 수 있어 편하다는 장점에서 이를 사용한다.

# JSX 문법의 특징과 준수사항을 몇 개 알려준다면?

- 컴포넌트에 여러 요소가 있다면 반드시 부모 요소 하나가 감싸는 형태여야 한다.

```tsx
function App() {
	return (
		<div>
        		<h1></h1>
        		<h2></h2>
        	</div>
	)
}
```

이렇게 감싸는 이유는, 리액트가 사용하는 Virtual DOM 방식에서는 컴포넌트 변화를 감지할 때 효율적으로 비교하고자 컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙이 있기 때문이다.

- JSX 내부의 자바스크립트 표현식 내에서 if문을 사용할 수 없어서, 조건 연산자(삼항 연산자)를 사용합니다.
- undefined를 렌더링하지 않아야 한다. 다만 JSX 내부에서의 렌더링은 에러가 나지 않는다.
- 스타일을 지정할 때 카멜 표기법으로 작성해야 한다. ex) className, backgroundColor

# React의 useState는 동기 함수인데 마치 비동기 함수처럼 동작합니다. 그 이유는 무엇인가요?
1. 먼저 useState가 비동기 함수처럼 동작한다는 것은 <code>useState</code>의 결과값이 바로 다음 코드에 반영이 안된다는 것을 의미한다.  좀 더 풀어쓰면 <code>useState</code>는 블로킹되지 않는다. 
2. 그렇다면 <code>await</code> 키워드를 통해서 비동기 함수를 선언해 블로킹 시킬 수 있을까? -> 할 수 없다. 
   실제로 useState의 type declaration의 출력 type을 확인해보면 Promise가 없다. 
   즉, 동기함수이므로 await 키워드를 사용할 수 없다. 
   적황히 말하면 쓸 수는 없지만 의도된 동작은 하지 않는다. 
3. useState는 비동기 함수가 아니라 useState 함수의 호출이 비동기적으로 이루어진다. -> 동기/비동기, 블로킹/논블로킹 참고

### 왜 이러한 현상이 발생하는 가? 
이는 리액트의 리렌더링 원리가 가상돔을 통해 비동기적으로 작동하기 때문이다. 여기서 가상돔이란 실제 돔을 추상화하여 메모리에 유지하는 자료구조이다. 

리액트에서는 state나 props가 변경되면 컴포넌트가 리렌더링된다.
컴포넌트가 리렌더링되면 렌더링 함수가 호출되고, 이때 리액트는 새로운 가상 돔을 생성하여 이전 가상돔과 비교하여 변경된 부분만 실제 돔에 반영한다.
이 과정을 reconciliation(조정)이라고 한다.
리액트의 fiber 아키텍쳐는 reconciliation을 진행할 때 render phase(페이즈)와 commit phase(페이즈)의 두 단계로 나누어 진행한다.
render phase는 가상돔 트리를 순회하면서 변경된 부분을 찾는 과정이고, commit phase는 실제 돔에 변경 사항을 반영하는 과정이다.
실제 돔에 업데이트하는 과정이 만약 동기적으로 진행된다면, 메인 스레드가 차단되거나 응답 지연이 발생해서 렌더링 과정이 지연된다. 이는 UX를 저해하는 요소가 될 수 있다.

### 결론
setState 함수는 동기 함수이지만
setState 함수 호출은 비동기적으로 일어난다.
그래서 상태의 업데이트 결과가 즉각적으로 바로 다음 코드 라인에 반영되지 않는다.

리렌더링이 발생해야 업데이트된 상태 값이 가상돔 트리에 반영된다.

따라서 callBack 함수로 따로 인자값으로 지정하거나 async await를 쓸 수도 없으니 useEffect를 써야한다. 

# 제어 컴포넌트 (controlled component) & 비제어 컴포넌트 (uncontrolled component)

1. 제어 컴포넌트
   제어 컴포넌트는 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트합니다. React에서는 변경할 수 있는 state가 일반적으로 컴포넌트의 state 속성에 유지되며 setState()에 의해 업데이트됩니다.
   이러한 방식으로 React에 의해 값이 제어되는 입력 폼 엘리먼트를 “제어 컴포넌트 (controlled component)“라고 합니다.

ex)

```typescript
export default function App() {
  const [input, setInput] = useState('');
  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <input onChange={onChange} />
    </div>
  );
}
```

보다시피 사용자의 입력을 받는 컴포넌트에 event 객체를 이용해 setState()로 값을 저장하는 방식을 제어 컴포넌트 방식이라 할 수 있다. -> React에 의해 값이 제어되므로 제어 컴포넌트

2. 비제어 컴포펀트
   우리는 바닐라 자바스크립트를 사용할 때 폼을 제출할때 (submit button)을 클릭할 때 요소 내부의 값을 얻어왔다. 비제어 컴포넌트 또한 이와 유사한 방식으로 사용된다.
   비제어 컴포넌트 방식을 사용할 땐, 제어 컴포넌트 방식에서 사용한 setState()를 쓰지 않고 ref를 사용해서 값을 얻는다.

ex)

```typescript
export default function App() {
  const inputRef = useRef(); // ref 사용
  const onClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div className="App">
      <input ref={inputRef} />
      <button type="submit" onClick={onClick}>
        전송
      </button>
    </div>
  );
}
```

제어 컴포넌트의 경우 사용자가 입력을 하는 액션을 취할때마다 리렌더링을 발생시키는 반면, 비제어 컴포넌트는 사용자가 직접 트리거 하기 전까지는 리렌더링을 발생시키지도 않고 값을 동기화 시키지도 않는다.

### 왜 ref는 리렌더링을 발생시키지 않을까?

useRef() 는 heap영역에 저장되는 일반적인 자바스크립트 객체이다.
매번 렌더링할 때 동일한 객체를 제공한다. heap에 저장되어 있기 때문에 어플리케이션이 종료되거나 가비지 컬렉팅될 때 까지, 참조할때마다 같은 메모리 값을 가진다고 할 수 있다.
값이 변경되어도 리렌더링이 되지 않는다. 같은 메모리 주소를 갖고있기 때문에 자바스크립트의 === 연산이 항상 true 를 반환한다. 즉 변경사항을 감지할 수 없어서 리렌더링을 하지 않는다는 뜻이다.

| 기능                                   | 제어 컴포넌트 | 비제어 컴포넌트 |
| -------------------------------------- | ------------- | --------------- |
| 일회성 정보 검색 (예: 제출)            | O             | O               |
| 제출 시 값 검증                        | O             | O               |
| 실시간으로 필드값의 유효성 검사        | O             | X               |
| 조건부로 제출 버튼 비활성화 (disabled) | O             | X               |
| 실시간으로 입력 형식 적용하기          | O             | X               |
| 동적 입력                              | O             | X               |

# ReactNode vs JSX.Element vs ReactElement 
<code>ReactNode</code>는 <code>ReactElement</code>를 비롯하여 대부분의 자바스크립트 데이터 타입을 아우르는 범용적인 타입이다. 따라서 어떤 props을 받을 건데, 구체적으로 어떤 타입이 올지 알 수 없거나, 어떠한 타입도 모두 받고 싶다면 <code>ReactNode</code>로 지정해주는 것이 좋다.

```jsx
type ReactNode =
  | ReactElement
  | string
  | number
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined

type ReactFragment = Iterable<ReactNode>
```

예제) 
```jsx
type BlogProps = {
  profile: React.ReactNode
  introduction: JSX.Element
}

const Blog = ({ profile, introduction }: BlogProps) => {
  return (
    <div>
      {profile}
      {introduction}
    </div>
  )
}

export default Blog

const App = () => {
  return (
    <Blog
      profile={'howdy-mj'}
      introduction={'howdy-mj'} // TS2322: Type 'string' is not assignable to type 'Element'.
    />
  )
}

export default App
```

여기서 profile에는 string을 선언할 수 있지만, introduction은 string이기 때문에 Element 타입에 선언할 수 없다는 에러가 뜬다.

여기서 ReactNode에는 ReactElement만 있다. (JSX.element 가 없다.) 
둘다 <code>React.createElement()</code>의 리턴값인데 무슨 차이점이 있을까 

### React.createElement() 
```jsx
const HowdyMj = () => {
  return <div>howdy-mj</div>
}
```
위와 같이 JSX로 작성된 코드를 자바스크립트로 변환하면 아래와 같이 변한다.
```jsx
const HowdyMj = () => {
  return React.createElement('div', null, 'howdy-mj')
}
```

### ReactElement
<code>ReactElement</code>는 ReactElementType.js에서 flow로 정의되어 있어 쉽게 볼 수 있다.

```jsx
export type ReactElement = {|
  $$typeof: any,
  type: any,
  key: any,
  ref: any,
  props: any,
  // ReactFiber
  _owner: any,

  // __DEV__
  _store: { validated: boolean, ... },
  _self: React$Element<any>,
  _shadowChildren: any,
  _source: Source,
}
```

위에서 이미 본 익숙한 형태의 타입을 볼 수 있다.

```jsx
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> =
    | string
    | JSXElementConstructor<any>
> {
  type: T
  props: P
  key: Key | null
}

type JSXElementConstructor<P> =
  | ((props: P) => ReactElement<any, any> | null)
  | (new (props: P) => Component<any, any>)

type ComponentType<P = {}> = ComponentClass<P> | FunctionComponent<P>

type Key = string | number
따라서 type이 받는 T 제너릭은 해당 HTML 태그의 타입을 받고, props는 그 외의 컴포넌트가 갖고 있는 속성을 받는다.
```

### JSX.Element
<code>JSX.Element</code>는 ReactElement의 타입과 props를 모두 any로 받아 확장한 인터페이스다. 따라서 더 범용적으로 사용할 수 있다.

```jsx
// Global
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}

// React Elements
declare namespace React {
  // ... 생략
}
```
또한 React 관련 타입은 모두 React의 namespace에서 선언되었는데, JSX는 global namespace로 선언되어 있다. 따라서 React 내에서 JSX를 import하지 않아도 바로 사용이 가능하다.

### 정리 
1) ReactNode:

<code>ReactNode</code>은 React 구성 요소(컴포넌트)의 자식 요소(또는 자식 요소의 배열)를 나타내는 타입입니다.
주로 함수 컴포넌트나 클래스 컴포넌트에서 컴포넌트의 자식을 표현할 때 사용
<code>ReactNode</code>은 JSX에서 {...} 중괄호로 둘러싸인 자식 엘리먼트의 배열을 포함할 수 있으며, 이 배열은 컴포넌트 내에서 렌더링된다. 

2) JSX.Element:

<code>JSX.Element</code>는 React 구성 요소가 반환하는 React 엘리먼트(React 컴포넌트의 인스턴스)를 나타난다.
주로 React 컴포넌트 내에서 UI 엘리먼트를 생성하고 반환하는 데 사용된다. 
<code>JSX.Element</code>는 컴포넌트에서 반환된 JSX 코드 블록을 나타낸다.

3) ReactElement:

<code>ReactElement</code>는 React 엘리먼트의 타입과 속성(props)을 나타내는 객체
주로 React 엘리먼트를 프로그래밍 방식으로 생성하고 조작할 때 사용
<code>React.createElement()</code> 함수를 사용하여 <code>ReactElement</code>를 생성할 수 있다.

```jsx
const element = React.createElement('div', { className: 'my-class' }, 'Hello, World!');
```

# 서버 컴포넌트 
서버 컴포넌트를 사용하면 서버에서 렌더링 및 선택적으로 캐시할 수 있는 UI를 작성할 수 있다. 
Next.js에서는 렌더링 작업을 부분별로 분할하여 <code>스트리밍</code> 및 <code>부분 렌더링</code>을 가능하게 하며 총 3개의 렌더링 방법이 있다. -> 추후 서버 렌더링 전략에 대해서 정리 예정 

### 서버 렌더링의 장점 
1. 데이터 가져오기: 서버 구성 요소를 사용하면 데이터 가져오기를 데이터 소스에 가깝게 서버로 이동할 수 있다. 
   이를 통해 렌더링에 필요한 데이터를 가져오는데 걸리는 시간과 클라이언트가 요청해야 하는 양을 줄여 성능을 향상시킬 수 있다.
2. 보안: 토큰 및 API 키와 같은 중요한 데이터 및 로직을 클라이언트에 노출할 위험 없이 서버에 보관할 수 있다.
3. 캐싱(Cashing): 서버에서 렌더링을 수행함으로써 결과를 캐싱하여 이후 요청 및 사용자 간에 재사용할 수 있다. -> 각 요청에 수행되는 렌더링 및 데이터 가져오기 작업의 양을 줄여 성능을 향상시키고 비용을 절감할 수 있다.
4. 번들 크기: 서버 구성 요소를 사용하면 이전에 서버의 클라이언트 자바스크립트 번들 크기에 영향을 주었던 큰 의존성을 유지할 수 있다. 이는 클라이언트가 서버 구성 요소용 자바스크립트를 다운로드, 구문 분석 및 실행할 필요가 없기 때문에 인터넷 속도가 느리거나 덜 강력한 장치를 사용장게 유용하다.
5. 초기 페이지 로드 및 FCP(First Contentful Paint): 서버에서 HTML을 생성하여 사용자가 페이지를 렌더링하는 데 필요한 자바스크립트를 다운로드, 구문 분석 및 싱핼할 때까지 기다리지 않고 페이지를 바로 볼 수 있다.
6. 검색 엔진 최적화 및 소셜 네트워크 공유성: 렌더링된 HTML은 검색 엔진 봇이 페이지를 인덱싱하고 소셜 네트워크 봇이 페이지에 대한 소셜 카드 미리보기를 생성하는 데 사용할 수 있다.
7. 스트리밍: 서버 컴포넌트를 사용하면 렌더링 작업을 청크로 나누어 준비가 되면 클라이언트에 스트리밍할 수 있다. 이렇게 하면 전체 페이지가 서버에서 렌더링될 때까지 기다릴 필요없이 페이지의 일부를 더 일찍 볼 수 있다. 

### 어떻게 서버 컴포넌트는 렌더링되는 가? 
서버에서 Next.js는 React의 API를 사용하여 렌더링을 조정한다.
렌더링 작업은 <code>개별 경로 세그먼트</code>와 <code>Suspense Boundaries</code>에 의해 <code>chunks</code>로 나뉘어 진다. 

각 <code>chunks</code>는 두 단계로 렌더링된다. 

<code>React</code>는 서버 컴포넌트를 <code>RSC Payload(React Server Component Payload)</code>라는 특수한 데이터 형식으로 만든다. 
<code>Next.js</code>는 <code>RSC Payload</code> 및 <code>Client Component Javascript</code> 명령을 사용하여 서버에서 HTML을 렌더링한다. 

그런 다음 클라이언트에서 이걸 받아서 <code>HTML</code>은 경로의 빠른 (상호작용 안되는) 미리보기를 사용되며, 초기 페이지 로드로 사용된다. 
<code>RSC Payload</code>는 <code>Client</code>와 <code>Server Component</code> tree를 재조정하며, DOM을 업데이트한다. 
<code>Javascript instructions</code>는 Client component에 수화(hydration)되며 이제 어플리케이션을 상호작용될 수 있게 한다. 

### RSC(React Server Component Payload)란 먼가요??
<code>RSC Payload</code>는 렌더링된 <code>React Server Components tree</code>의 컴펙트한 <code>binary representation</code>이다. 
<code>Client</code>에서 <code>React</code>가 브라우저 DOM을 업데이트하는 데 사용된다.  
- 다음과 같은 내용을 포함하고 있다. 
1. <code>Server Components</code>의 렌더링된 결과
2. <code>Client Components</code>의 렌더링될 위치 및 Javascript file의 참조 
3. <code>Server Components</code>에서 <code>Client Components</code>로 전달될 Props들 


# SSR의 동작 순서를 알려주세요.
1. 서버에서 특정 페이지에 대한 모든 데이터를 가져온다.
2. 서버는 페이지의 HTML를 렌더링한다.
3. 해당 페이지의 HTML, CSS, JS를 클라이언트로 전송한다.
4. 생성된 HTML,CSS를 이용하여 정적인 화면(인터페이스)을 사용자에게 보여준다.
5. React는 정적인 사용자 인터페이스에 Hydrate하여 Javascript를 내려주어 상호작용할 수 있게 만든다. 

![스크린샷 2023-10-30 오후 10 56 37](https://github.com/in-ch/tech-inverview-study/assets/49556566/d9d41a4c-38d0-4762-9ffe-b35c834ec30a)

이 단계는 순차적이며 블로킹적이다. (완료해야지만 다음 단계가 수행된다.) 

서버는 모든 데이터를 가져온 후에만 페이지에 대한 HTML를 렌더링할 수 있고, 클라이언트에서 리액트는 페이지의 모든 구성 요소에 대한 코드를 다운로드한 후에만 UI에 hydrate를 할 수 있다.

# 컴포넌트란?

<img src="https://github.com/bumsly/tech-inverview-study/assets/65000254/739d81b9-104f-47f2-8a99-39958a3cdaf8" width="300" />

컴포넌트(Component)란 프로그래밍에 있어 재사용이 가능한 각각의 독립된 모듈을 뜻한다.

그림에서 확인 할 수 있듯이 컴포넌트 기반 프로그래밍을 하면 마치 레고 블록처럼 이미 만들어진 컴포넌들을 조합하여 화면을 구성할 수 있다.

웹 컴포넌트는 이러한 컴포넌트 기반 프로그래밍을 웹에서도 적용할 수 있도록 W3C에서 새로 정한 규격이다. 웹 표준을 기반으로 구축되었으며, 최신 부라우저 및 모든 JavaScript 라이브러리, 프레임워크에서도 사용할 수 있다. 따라서 웹 컴포넌트를 이용하여 코드를 작성하면 Vue.js 나 React.js 와 같은 라이브러리, 프레임워크에 의존하지 않고 상호 운용이 가능하게끔 작성할 수 있다.

### **웹 컴포넌트의 규격**

- Shadow DOM : DOM과 스타일을 캡슐화하여 메인으로부터 독립적으로 스크립트와 스타일을 처리할 수 있도록 한다.
- Custom Elements : HTML에 새로운 HTML/DOM 요소를 정의할 수 있는 JavaScript API.
- ES Modules : 이전 규격이었던 HTML Import를 대체하여 나온 규격이며, 자바스크립트로 구현하는 모듈 시스템.

출처: [https://hanamon.kr/컴포넌트-component란/](https://hanamon.kr/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-component%EB%9E%80/)
