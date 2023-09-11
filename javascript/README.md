# 화살표 함수에 this 객체가 없으므로써 예상 가능한 오류에 대해서 설명해주세요.

DOM 이벤트 핸들러로 사용 시

DOM 요소의 이벤트 핸들러로 화살표 함수를 사용하면 ‘this’가 예상과 다른 값을 가질 수 있다.

일반적인 함수로 정의한 경우 this는 이벤트가 발생한 DOM 요소를 가리킨다. 하지만 화살표 함수를 사용하면 주변 스코프의 this를 가져오므로 예상과 다른 결과가 나타날 수 있다.

```jsx
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log(this); // window 객체를 가리킴, 예상과 다름
});
```

생성자 함수로 사용시

화살표 함수는 생성자 함수로 사용될 수 없다. 생성자 함수는 <code>새로운 객체를 생성하고 this를 해당 객체로 바인딩하는 역할</code>을 한다. 화살표 함수에서는 <code>this</code>를 자체적으로 가지지 않기 때문에 이러한 용도로 사용할 수 없다.

<code>
const Person = (name) => {
  this.name = name; // 에러 발생
};
const person = new Person("John");
</code>

객체 메소드로 사용시 오류 발생

화살표 함수를 객체의 메소드로 사용할 때, 메소드 내에서 <code>this</code>는 해당 객체가 아닌 주변 스코프의 <code>this</code>를 가르킨다. 이로 인해 메소드 내에서 객체의 속성에 접근하거나 수정할 때 문제가 발생한다.

```jsx
const obj = {
  value: 42,
  getValue: () => {
    console.log(this.value); // undefined
  },
};
```

그럼에도 왜 화살표 함수가 react hooks에서 자주 쓰일까?
화살표 함수는 코드를 좀 더 간결하게 만들어준다. 하지만 간결해진 대신 컴포넌트에서 라이프사이클을 활용하지 못한다는 단점이 있다. 이런 종류의 컴포넌트는 stateless <code>함수형 컴포넌트(functional component)</code>라 불린다. → 중괄호도 생략가능해서 간결하다.

# 화살표 함수랑 다른 일반 함수의 차이점은?

# 얕은 복사 vs 깊은 복사에 대해서 설명해주세요.

# 동등 연산자(==)와 일치 연산자의 차이점(===)을 설명해주세요.

동등 연산자(==)는 두 값을 비교할때 형변환을 수행한다. 즉, 두 값의 데이터 타입이 달라도 자동으로 형변환 수행 후 비교한다.
일치 연산자(===)는 두 값이 데이터 타입과 값이 모두 같은지 비교하기 때문에 형변환은 일어나지 않는다.
따라서, 동등 연산자를 사용할때는 형변환까지 고려하고 사용해야 나중에 예기치 못할 오류를 예방할 수 있다.

# 왜 호이스팅이 일어나고 호이스팅이 일어남으로써 발생 가능한 오류는?

# 제너레이터에 대해서 설명해주세요.

제너레이터는 이터레이터를 어떻게 하면 쉽게 구현할지를 염두에 두며 추가되었다. 

일반 함수는 하나의 값만 리턴할 수 있다. 하지만 제너레이터를 사용하게 되면 여러 개의 값을 리턴할 수 있다. function 뒤에 *를 붙여서 사용 가능하다. 함수 안에서 yield를 통해서 여러 개의 값을 필요에 따라 하나씩 리턴할 수 있다. 

next() 메소드를 통해서 실행 순서를 제어할 수 있다. (가장 가까운 `yield <value>`문을 만날 때까지 실행)

next()는 항상 두 프로퍼티를 가진 객체를 반환한다. 

- done: true 혹은 false
- value: 산출 값

일반적으로 값을 할당하게 되면 (let generator = generateSequence())코드가 실행되지 않고 실행을 처리하는 제너레이터 객체를 리턴한다. 

### <code>`function* f(…)`</code>가 맞나요 아니면 <code>`function *f(…)`</code>가 맞나요?

둘 다 맞습니다.

그런데 `*`는 제너레이터 `함수`를 나타내므로 대개는 첫 번째 문법이 선호됩니다. `*`는 종류를 나타내는 것이지 이름을 나타내는 것이 아니기 때문입니다. 그러므로 `*`는 `function`에 붙이도록 하자.

### `next()` 메서드를 보면서 짐작하셨듯이, 제너레이터는 [이터러블](https://ko.javascript.info/iterable) 이다.

따라서 `for..of` 반복문을 사용해 값을 얻을 수 있다. 

```jsx
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 2가 출력됨
}
```

그런데 주의할 점은 여기서 value를 리턴하게 했는데 for..of 이터레이션이 done: true일 때 마지막 value를 무시하기 때문에 1,2만 출력된다. 

만약에 다 리턴하고 싶다면 yield를 리턴해야 한다. 

보통은 다음과 같이 된다. 

```jsx
function* fetchSequentially(urls) {
  for (const url of urls) {
    const response = yield fetch(url);
    const data = yield response.json();
    console.log(data);
  }
}

const urls = ['url1', 'url2', 'url3'];
const generator = fetchSequentially(urls);

function runGenerator() {
  const { value, done } = generator.next();
  if (!done) {
    value.then((result) => {
      const { value, done } = generator.next(result);
      if (!done) {
        value.then((result) => {
          runGenerator(); // 재귀 호출을 통해 계속 실행
        });
      }
    });
  }
}

runGenerator();
```

여기서 return 값을 따로 명시해 주지 않았으므로 마지막에는 done:true, value: undefined가 된다. 

여기서 보듯이 generator는 api url를 여러번 호출하게 될 때 유용하게 쓰일 수 있다. 

### 제너레이터 컴포지션

제너레이터 컴포지션(generator composition)은 제너레이터 안에 제너레이터를 '임베딩(embedding, composing)'할 수 있게 해주는 제너레이터의 특별 기능 (제너레이터를 다른 제너레이터에 끼워 넣을 수 있다.

```jsx
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

이 코드가 

```jsx
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
```

이런 식으로 바뀐다.

# 실행 컨텍스트에 대해서 설명해주세요.

# 이벤트 버블링에 대해서 설명해주시고 방지하는 방법에 대해서 알려주세요. 

# this와 연관지어서 bind에 대해서 설명해주세요.

# 데이터 바인딩에 대해서 설명해주세요.

바인딩이란 화면상에 보여지는 데이터(View)와 브라우저 메모리에 있는 데이터(MOdel)을 묶어서(Binding) 서로 간의 데이터를 동기화하는 것이다. 예를 들어, HTML에서 서버 혹은 스크립트 상에서 받아온 데이터를 화면상에 그려주고 있다고 가정했을 때, 해당 값이 변경 될 경우 다시 HTML 상에서 데이터(값)를 변경된 값에 따라 맞춰주는 동작을 '데이터 바인딩'이라고 한다. 데이터 바인딩의 종류는 두가지가 있다.
첫번째는 Javascript(Model)에서 HTML(View)로 한 방향으로만 데이터를 동기화하는 단방향 바인딩이다. 이는 부모 컴포넌트에서 자식 컴포넌트로만 데이터가 전달되는 구조로, SPA Framework는 대표적으로 리액트가 그 예시이다.
두번째는 Javascript와 HTML 사이에 View Model이 존재하여 하나로 묶여 둘 중 하나만 변경되어도 함께 변경되는 양방향 바인딩이다. 또한 부모 컴포넌트에서 자식 컴포넌트로는 Props를 통해 데이터를 전달하고, 자식 컴포넌트에서 부모 컴포넌트로는 Emit Event를 통해서 데이터를 전달하는 구조이다. 대표적으로 Vue.js와 Angular가 있다.

# React hooks에 대한 장점을 설명해주세요.

# iterable 객체에 대해서 설명해주세요.

- <code>for .. of</code>을 사용할 수 있는 객체를 `iterable` 객체라고 한다. 

```tsx
let range = {
  from: 1,
  to: 5
};

range[Symbol.iterator] = function() {

  return {
    current: this.from,
    last: this.to,

    next() {
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```
- <code>range</code>를 이터러블로 만들려면(for..of가 동작하도록 하려면) 객체에 <code>Symbol.iterator</code>(특수 내장 심볼)라는 메서드를 추가해 아래와 같은 일이 벌어지도록 해야한다.
- 이터러블 객체의 핵심은 <code>관심사의 분리(Separation of concern, SoC)</code>에 있다.

- <code>range</code>엔 메서드 <code>next()</code>가 없다.
대신 range[Symbol.iterator]()를 호출해서 만든 ‘이터레이터’ 객체와 이 객체의 메서드 next()에서 반복에 사용될 값을 만들어낸다.

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

# 자바스크립트의 메모리 관리에 대해 아는 대로 설명해주세요(*) 

자바스크립트의 메모리 관리는 런타임 환경에서 변수, 객체, 함수 등의 데이터를 할당하고 해제하는 프로세스를 관리하는 중요한 부분입니다.
자바스크립트는 동적 타입 언어로, 개발자가 명시적으로 메모리 할당 및 해제를 관리하지 않아도 됩니다. 대신 가비지 컬렉터가 더 이상 사용하지 않는 객체나 데이터를 자동으로 감지하고 해제합니다.
가비지 컬렉션이 수집을 못하게 되는 상황을 조심할 필요가 있습니다. 예를 들어 `순환 참조`라는 것이 있습니다. 

```tsx
function createObjects() {
  let objA = {};
  let objB = {};

  // objA와 objB가 서로를 참조
  objA.refToB = objB;
  objB.refToA = objA;

  // 함수 종료 후, objA와 objB에 대한 참조가 사라짐
}

createObjects();
```

<code>createObjects</code> 함수는 두 개의 빈 객체 <code>objA</code>와 <code>objB</code>를 만들고 서로를 참조하도록 설정합니다. 
 함수가 종료된 후에는 함수 내부에서 생성된 objA와 objB에 대한 외부 참조가 없기 때문에, 이 두 객체는 논리적으로 사용되지 않지만, 순환 참조로 인해 가비지 컬렉터가 이들을 수집하지 못하게 되기 때문에 저러한 형식의 코드 작성은 피해야 합니다. -> 메모리 누수가 발생합니다. 

# 메모리 누수를 위해 해야할 것들을 알려주세요.

- 사용하지 않는 객체에 대한 참조(reference)를 명시적으로 제거.
- 이벤트 리스너 등 자원 해제를 제대로 처리.
- 큰 데이터나 불필요한 데이터 구조를 빠르게 해제하고 재활용하지 않는 것.

