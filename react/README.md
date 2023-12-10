# React hooks에 대한 장점을 설명해주세요.

1. 코드가 간결해진다. 
2. 원래 class 컴포넌트를 만들때 <code>‘바인딩되지 않는 this문제’</code>가 많이 발생했었다. 이때 bind 함수를 많이 사용했었다.
<details>
  <summary>바인딩되지 않는 this 예제</summary>
<code>바인딩되지 않는 this 문제</code>는 주로 클래스 컴포넌트에서 이벤트 핸들러 함수를 다룰 때 발생할 수 있다.

```typescript
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    // 이벤트 핸들러 함수에 대한 수동 바인딩
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      count: 0
    };
  }

  handleClick() {
    // 이벤트 핸들러 함수에서 this를 사용
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        {/* 이벤트 핸들러 함수를 전달할 때 주의가 필요 */}
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default MyComponent;
```

의 코드에서 <code>handleClick</code> 메서드를 호출하는 부분에서는 <code>this</code>가 올바르게 참조되기 위해 수동으로 바인딩을 해주어야 한다. 
그렇지 않으면 <code>this.setState</code>에서 <code>this는 <code>undefined</code>가 되어 오류가 발생할 것이다.

</details>

3. HOC hell에서 벗어날 수 있다.

<details>
  <summary>Hoc Hell 예제</summary>

```typescript
import React from 'react';

// Higher Order Component 1
const withLogging = (WrappedComponent) => {
  class WithLogging extends React.Component {
    componentDidMount() {
      console.log('Component is mounted');
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithLogging;
};

// Higher Order Component 2
const withAuthentication = (WrappedComponent) => {
  class WithAuthentication extends React.Component {
    render() {
      if (this.props.isAuthenticated) {
        return <WrappedComponent {...this.props} />;
      } else {
        return <p>Please log in to view this component.</p>;
      }
    }
  }

  return WithAuthentication;
};

// Original Component
class MyComponent extends React.Component {
  render() {
    return <div>My Component</div>;
  }
}

// HOC hell: 중첩된 고차 컴포넌트
const EnhancedComponent = withAuthentication(withLogging(MyComponent));

// 사용 예시
const App = () => {
  return <EnhancedComponent isAuthenticated={true} />;
};
```

</details>

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

<img src="https://i0.wp.com/hanamon.kr/wp-content/uploads/2021/01/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8.png?w=1280&ssl=1" width="300" />

컴포넌트(Component)란 프로그래밍에 있어 재사용이 가능한 각각의 독립된 모듈을 뜻한다.

그림에서 확인 할 수 있듯이 컴포넌트 기반 프로그래밍을 하면 마치 레고 블록처럼 이미 만들어진 컴포넌들을 조합하여 화면을 구성할 수 있다.

웹 컴포넌트는 이러한 컴포넌트 기반 프로그래밍을 웹에서도 적용할 수 있도록 W3C에서 새로 정한 규격이다. 웹 표준을 기반으로 구축되었으며, 최신 부라우저 및 모든 JavaScript 라이브러리, 프레임워크에서도 사용할 수 있다. 따라서 웹 컴포넌트를 이용하여 코드를 작성하면 Vue.js 나 React.js 와 같은 라이브러리, 프레임워크에 의존하지 않고 상호 운용이 가능하게끔 작성할 수 있다.

### 웹 컴포넌트의 규격

- Shadow DOM : DOM과 스타일을 캡슐화하여 메인으로부터 독립적으로 스크립트와 스타일을 처리할 수 있도록 한다.
- Custom Elements : HTML에 새로운 HTML/DOM 요소를 정의할 수 있는 JavaScript API.
- ES Modules : 이전 규격이었던 HTML Import를 대체하여 나온 규격이며, 자바스크립트로 구현하는 모듈 시스템.

출처: [https://hanamon.kr/컴포넌트-component란/](https://hanamon.kr/%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-component%EB%9E%80/)

# 컴포넌트 IoC 패턴이란 
API를 사용하는 이에게 내부적으로 어떻게 동작할지에 대한 권한을 부여하는 매커니즘
한마디로 컴포넌트를 사용하는 개발자에게 컴포넌트의 제어권을 넘겨주는 행위 
늘어나는 요구사항에 유연하게 대처하기 위해 "컴포넌트를 어떻게 사용할까"의 역할을 컴포넌트가 아닌 사용하는 개발자에게 넘겨주는 행위

### 언제 사용할까?
- 여러가지 경우에 사용될 수 있는 재사용 가능한 컴포넌트를 만들고 싶다.
- 사용하기 쉽고 편리한 API를 제공하는 컴포넌트를 만들고 싶다.
- UI와 기능면에서 확장성 있는 컴포넌트를 만들고 싶다.

### 일반적인 컴포넌트 패턴은 무슨 문제가 발생할까?
- 컴포넌트가 책임감이 막중한 컴포넌트가 된다.
- 컴포넌트의 유지보수가 어려워진다.
- 복잡한 API를 가진 컴포넌트가 된다. (사용하기 힘들다…)
- 구현 난이도가 올라간다.
- 구현의 범위가 모호해진다. (여기까지 추가될지도 모른다…)

### 종류 
- compound component pattern
- Control Props Pattern
- Custom Hook Pattern
- Props Getters Pattern

# forwardRef에 대해서 설명해주세요.
함수형 컴포넌트에서 하위 component에 props로 ref를 drilling할 때 하위 컴포넌트가 일반 함수형 컴포넌트로 정의할 경우 ref가 제대로 동작 안하는 버그가 발생한다. 

이는 React의 기본 원리인 <code>unidirectional data flow</code>와 관련이 있다. <code>unidirectional data flow</code>란 데이터 및 콜백 함수는 상위 컴포넌트에서 하위 컴포넌트로 전달되야 하는 것을 말한다.

이럴 때는 <code>forwardRef</code>를 사용해야 한다.

```tsx
const FancyButton = React.forwardRef((props, ref) => (  <button ref={ref} className="FancyButton">    {props.children}
  </button>));

// 이제 DOM 버튼으로 ref를 직접 받을 수 있다.
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

또한 ref값을 조절해야 하는 일이 생긴다면 <code>useImperativeHandle</code>을 사용할 수 있다.
```
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

# React에서 SOLID 원칙을 적용할 수 있나요?
- S: SRP, 단일 책임 원칙: 한 클래스는 하나의 책임만 가져야 한다.
- O: OCP, 개방 폐쇄 원칙: 소프트웨어 요소는 확장에는 열려 있으나 변경에는 닫혀 있어야 한다.
- L: LSP, 리스코프 치환 원칙: 프로그램의 객체는 프로그램의 정확성을 깨뜨리지 않으면서 하위 타입의 인스턴스로 바꿀 수 있어야 한다.
- I: ISP, 인터페이스 분리 원칙: 특정 클라이언트를 위한 인터페이스 여러 개가 범용 인터페이스 하나보다 낫다.
- D: DIP, 의존관계 역전 원칙: 프로그래머는 추상화에 의존해야지, 구체화에 의존하면 안된다. 의존성 주입은 이 원칙을 따르는 방법 중 하나이다. 

>  일단 리액트는 객체지향언어가 아니기 때문에 위의 개념을 곧이곧대로 받아드리기는 어렵다. (애초에 자바스크립트에서는 클래스라고 생각하는 것은 프로토타입 시스템을 사용하여 시뮬레이션된 클래스 유사체일 뿐이다. 인터페이스도 존재 x ) → 그래도 SOLID와 같은 소프트웨어 설계 원칙은 언어에 구애받지 않고 추상화 수준이 높다. 

### 단일 책임 원칙 (SRP)
큰 모듈을 작은 모듈로 나누는 것, 작은 모델이 테스팅하기에도 더 쉽다. 그리고 컴포넌트 간의 의존성을 낮출 수 있으며 코드 파악도 쉬워진다. 

<details>
- bad: 컴포넌트가 너무 많은 역할을 수행하고 있다. 

```typescript
const ActiveUsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch("/some-api");
      const data = await response.json();
      setUsers(data);
    };

    loadUsers();
  }, []);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  return (
    <ul>
      {users
        .filter((user) => !user.isBanned && user.lastActivityAt >= weekAgo)
        .map((user) => (
          <li key={user.id}>
            <img src={user.avatarUrl} />
            <p>{user.fullName}</p>
            <small>{user.role}</small>
          </li>
        ))}
    </ul>
  );
};
```

- Good : 로직을 독립적으로 사용할 수 있도록 한다.

```typescript
const useActiveUsers = () => {
  const { users } = useUsers();

  const activeUsers = useMemo(() => {
    return getOnlyActive(users);
  }, [users]);

  return { activeUsers };
};

const ActiveUsersList = () => {
  const { activeUsers } = useActiveUsers();

  return (
    <ul>
      {activeUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
```

</details>

### 개방-폐쇄 원칙 (OCP)
원본 소스 코드를 변경하지 않고 확장할 수 있는 방식으로 컴포넌트를 구조화하도록 한다. 

### 리스코프 치환 원칙 (LSP)
React 팀에서는 상속을 쓰는 것을 권고하지 않는다.
단, typescript에서는 쓸 수 있는데 만약 S가 T의 하위 타입이라면, T 타입의 객체는 S 타입의 객체로 대체될 수 있다.
ㄴ 부모 클래스와 자식 클래스는 잘못된 결과 없이 서로 교환하여 사용될 수 있도록 한다.

### 인터페이스 분리 원칙 (ISP)
React에서 컴포넌트는 사용하지 않는 props에 의존해서는 안된다.
ㄴ 시스템의 컴포넌트 간 의존성을 최소화해 컴포넌트의 결합도를 낮추고, 재사용성을 높일 수 있다. 

<details>
- bad: 만약 여기에 Thumbnail을 쓰는 LiveStream이라는 컴포넌트가 새로 추가된다면 호환이 안된다.

```typescript
type Video = {
  title: string;
  duration: number;
  coverUrl: string;
};

type Props = {
  items: Array<Video>;
};

type Props = {
  video: Video;
};

const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <Thumbnail key={item.title} video={item} />
      ))}
    </ul>
  );
};


const Thumbnail = ({ video }: Props) => {
  return <img src={video.coverUrl} />;
};
```

- Good: 필요한 props에만 의존하도록 Thumbnail 컴포넌트를 리팩터링해야 한다.

```typescript
type Props = {
  coverUrl: string;
};

const Thumbnail = ({ coverUrl }: Props) => {
  return <img src={coverUrl} />;
};

type Props = {
  items: Array<Video | LiveStream>;
};

const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => {
        if ("coverUrl" in item) {
          // 여긴 video입니다.
          return <Thumbnail coverUrl={item.coverUrl} />;
        } else {
          // 여긴 live stream입니다.
          return <Thumbnail coverUrl={item.previewUrl} />;
        }
      })}
    </ul>
  );
};
```

</details>

### 의존관계 역전 원칙(DIP)
구체화가 아닌 추상화에 의존해야 한다. 
즉, 한 컴포넌트가 다른 컴포넌트에 직접적으로 의존해서는 안되며, 둘 다 공통된 추상화에 의존해야 한다. 
ㄴ 서로 다른 컴포넌트 간의 결합을 최소화하는 것을 목표로 한다. 

<details>

- bad

```typescript
import api from "~/common/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await api.login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
};
```

- Good: 

```typescript
import api from "~/common/api";

const ConnectedLoginForm = () => {
  const handleSubmit = async (email, password) => {
    await api.login(email, password);
  };

  return <LoginForm onSubmit={handleSubmit} />;
};


type Props = {
  onSubmit: (email: string, password: string) => Promise<void>;
};

const LoginForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
};
```

이렇게 함으로써 LoginForm 컴포넌트는 더 이상 api 모듈에 의존하지 않게 된다.
api에 크리덴셜을 제출하는 로직은 onSubmit 콜백을 통해 추상화되었으며 이제 이 로직의 구체적인 구현을 제공하는 것은 상위 컴포넌트의 책임이 된다. 
여기서 LoginForm은 말 그대로 ux만 담당할 수 있게 되고, api 호출은 그 상위 컴포넌트의 책임이 된다. 

</details>

# headless design pattern 

리액트 UI 컨트롤이 더 정교해짐에 따라 복잡한 로직이 시각적 표현과 얽히게 될 수 있다. 이로 인해 컴포넌트의 동작을 추론하기 어렵고, 테스트하기도 어려워지며, 다른 모양이 필요한 유사한 컴포넌트를 구축해야 할 수도 있다. 
<code>헤드리스 컴포넌트</code>는 모든 비시각적인 로직과 상태 관리를 추출하여 컴포넌트의 두뇌를 UI에서 분리하는 디자인 패턴이다. 

헤드리스 컴포넌트는 리액트 디자인 패턴으로 일반적으로 리액트 훅으로 구현되며, 컴포넌트가 특정 UI를 규정하지 않고, 로직과 상태 관리만을 전적으로 책임지는 컴포넌트이다. 이는 작업의 '두뇌'를 제공하지만 '겉모습'은 구현하는 개발자에게 맡기는 패턴이다. -> 특정 시각적 표현을 강요하지 않고 기능성을 제공한다. 

일반적으로 컴포넌트는 UI를 가지고 있고 사용자와의 상호작용, 화면 렌더링 등을 담당한다. 그러나 헤드리스 컴포넌트 디자인 패턴에서는 UI를 가지지 않고, 데이터 처리와 관련된 부분만을 담당하는 로직 컴포넌트를 따로 분리한다. 이로써 컴포넌트는 더욱 재사용성이 높아지며, 특히 여러 플랫폼에서 동일한 비즈니스 로직을 공유하고자 할 때 효과적이다.

> 아무리 비교해봤는데,, headless design pattern과 ioc 패턴과 비슷한 것 같다.
  결국 둘다 UI와 비지니스 로직을 분리하는 것에 집중한다. 
  ioc는 말그대로 비지니스 로직을 직접 사용하는 개발자에게 위임하는 것을 말하고, 헤드리스 컴포넌트는 ui랑 비지니스 로직을 분리하는 의미한다. 결국 둘다 혼용해서 쓰는 것이고 위의 적은 다양한 패턴들이 존재하는 것이다.

# 리액트에서 제시하는 9가지 권장 사항 

<details>
  <summary>1. 반복문에서 요소의 키를 선택할 때는 (배열 인덱스가 아닌) 동일한 항목에 대해 항상 동일한 값을 갖는 식별자를 사용해야 한다.</summary>

- 리액트는 렌더링 전반에 걸쳐 리스트 요소를 추적하기 위해 키를 사용한다. 요소가 추가, 삭제 또는 순서가 변경되면 인덱스 키는 리액트가 잘못 추적하게 만들어 버그를 유발할 수 있다.

```tsx
// 🛑 잘못된 코드
return (
  <ul>
    {items.map((item, index) => (
      <li key={index}>…</li>
    ))}
  </ul>
);

// 🟢 올바른 코드, item.id가 안정적인 고유한 식별자라고 가정했을 때
return (
  <ul>
    {items.map((item, index) => (
      <li key={item.id}>…</li>
    ))}
  </ul>
);
```

</details>

<details>
  <summary>2. 컴포넌트를 정의할 때는 다른 컴포넌트나 함수 안에 중첩되지 않도록 하고 파일/모듈의 최상위 레벨에 정의해야 한다.</summary>

때로는 다른 컴포넌트 안에 컴포넌트를 정의하는 것이 편리해 보일 수 있다. 하지만 이렇게 하면 렌더링할 때마다 컴포넌트가 재선언되어 성능이 저하될 수 있다.

```tsx
// 🛑 잘못된 코드
function ParentComponent() {
  // ...
  function ChildComponent() {…}

  return <div><ChildComponent /></div>;
}

// 🟢 올바른 코드
function ChildComponent() {…}

function ParentComponent() {
  return <div><ChildComponent /></div>;
}
```

</details>

<details>
  <summary>3. 상태에 무엇을 저장할지 결정할 때는 필요한 것을 계산하는 데 사용할 수 있는 최소한의 정보를 저장해라</summary>

이렇게 해야 버그 발생 없이 상태를 쉽게 업데이트할 수 있다. 
서로 다른 상태 항목이 서로 맞지 않거나 일관성이 떨어지는 것을 방지할 수 있다.

```tsx
// 🛑 잘못된 코드
const [allItems, setAllItems] = useState([]);
const [urgentItems, setUrgentItems] = useState([]);

function handleSomeEvent(newItems) {
  setAllItems(newItems);
  setUrgentItems(newItems.filter((item) => item.priority === "urgent"));
}

// 🟢 올바른 코드
const [allItems, setAllItems] = useState([]);
const urgentItems = allItems.filter((item) => item.priority === "urgent");

function handleSomeEvent(newItems) {
  setAllItems(newItems);
}
```

</details>

<details>
  <summary>4. useMemo, useCallback 혹은 memo를 사용하여 캐싱할지 여부를 고려한다면 성능 문제가 발견될 때까지 캐싱을 미뤄야 한다.</summary>

항상 메모하는 것이 큰 단점은 아니지만, 사소한 단점은 코드의 가독성이 떨어진다.

```tsx
// 🛑 잘못된 코드
const [allItems, setAllItems] = useState([]);
const urgentItems = useMemo(
  () => (allItems.filter((item) => item.status === "urgent"), [allItems])
);

// 🟢 올바른 코드 (성능 문제가 발견되기 전까지)
const [allItems, setAllItems] = useState([]);
const urgentItems = allItems.filter((item) => item.priority === "urgent");
```

</details>

<details>
  <summary>5. 공통된 코드를 함수로 추출할 때, 다른 훅을 호출하는 경우에만 훅으로 이름을 지정해야 한다.</summary>

함수 컴포넌트가 다른 훅을 호출하는 경우, 그 함수도 훅이어야 리액트의 훅 동작에 대한 제한을 적용할 수 있다.
함수가 다른 훅을 호출하지 않는다면 이러한 제한을 적용할 이유가 없다. 함수는 조건부 내부를 포함해 어드에서나 호출할 수 있기 때문에 훅이 아닐 때 더욱 다양하게 활용될 수 있다.

- 제한 사항 
1. 최상위에서만 호출: 훅은 항상 함수 컴포넌트 또는 다른 커스텀 훅 내에서 최상위 수준에서만 호출해야 하고 반복문같은 곳 안에 못 넣는다.
2. 함수 컴포넌트 또는 다른 훅 내에서만 사용되어야 합니다. 
    참고로 React의 함수 컴포넌트에서는 항상 JSX 또는 null을 반환해야 한다.

```tsx
// 🛑 잘못된 코드
function useDateColumnConfig() {
  // 훅 제한이 적용됩니다
  return {
    dataType: "date",
    formatter: prettyFormatDate,
    editorComponent: DateEditor,
  };
}

// 🟢 올바른 코드
function getDateColumnConfig() {
  // 어디에서나 호출할 수 있습니다
  return {
    dataType: "date",
    formatter: prettyFormatDate,
    editorComponent: DateEditor,
  };
}

function useNameColumnConfig() {
  // useTranslation 훅을 호출하기 때문에 훅이어야 합니다
  const { t } = useTranslation();
  return {
    dataType: "string",
    title: t("columns.name"),
  };
}
```

</details>

<details>
  <summary>6. 프로퍼티 변경에 따라 상태를 조정해야 하는 경우 effect가 아닌 컴포넌트 함수에 (렌더링 중에) 직접 상태를 설정해야 한다.</summary>

```tsx
// 🛑 잘못된 코드
function List({ items }) {
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    setSelection(null);
  }, [items]);
  //...
}

// 🟢 올바른 코드
function List({ items }) {
  const [prevItems, setPrevItems] = useState(items);
  const [selection, setSelection] = useState(null);

  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  //...
}
```
</details>

<details>
  <summary>7. 데이터를 페칭해야 하는 경우, useEffect보다 라이브러리를 사용하는 것이 좋다.</summary>

useEffect로 데이터를 페칭할 경우 미세한 버그가 발생할 수 있고 이를 해결하기 위해서는 많은 양의 보일러 플레이트가 필요하다. 

```tsx
// 🛑 잘못된 코드
const [items, setItems] = useState();
useEffect(() => {
  api.loadItems().then((newItems) => setItems(newItems));
}, []);

// 🟢 올바른 코드 (하나의 라이브러리 사용 예시)
import { useQuery } from "@tanstack/react-query";

const { data: items } = useQuery(["items"], () => api.loadItems());
```

</details>

<details>
  <summary>8. 이벤트 발생에 대한 응답으로 어떠한 액션을 취해야 하는 경우, useEffect가 아닌 이벤트 핸들러에 코드를 작성해라.</summary>

```tsx
const [savedData, setSavedData] = useState(null);
const [validationErrors, setValidationErrors] = useState(null);

// 🛑 잘못된 코드
useEffect(() => {
  if (savedData) {
    setValidationErrors(null);
  }
}, [savedData]);

function saveData() {
  const response = await api.save(data);
  setSavedData(response.data);
}

// 🟢 올바른 코드
async function saveData() {
  const response = await api.save(data);
  setSavedData(response.data);
  setValidationErrors(null);
}
```

</details>

# useLayoutEffect 

### useEffect와의 차이점
layout 이후, paint 이전 시점에 useLayoutEffect가 실행하게 된다. 

여기서 layout이란 브라우저가 html, css, js를 다운 받은 후 dom과 cssom을 그리게 된 후 → 레이아웃을 그리며 rendertree를 만들게 된다. 그 후 paint를 실행하게 되는데 useLayoutEffect는 그 시점 전에 실행되게 된다. 

다만, 렌더링 도중 useLayoutEffect를 만나 동기적으로 이 작업이 끝난 후에 렌더링이 다시 재개되기 때문에 성능에 악영향을 미칠 수가 있어 조심히 사용해야 한다.

### 사용 예제 
```tsx
import React, { useState, useLayoutEffect } from 'react';

const LayoutEffectExample = () => {
  const [width, setWidth] = useState(0);

  // useLayoutEffect는 렌더링 직후에 호출되므로 화면에 반영된 레이아웃을 가져올 수 있음.
  useLayoutEffect(() => {
    // 화면에 반영된 요소의 너비를 가져와 상태 업데이트
    const newWidth = document.getElementById('example-element').offsetWidth;
    setWidth(newWidth);
  }, []); // 의존성 배열이 빈 배열이므로 한 번만 실행

  return (
    <div>
      <p id="example-element">This is an example element.</p>
      <p>The width of the element is: {width}px</p>
    </div>
  );
};

export default LayoutEffectExample;
```