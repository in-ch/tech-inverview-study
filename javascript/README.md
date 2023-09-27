# 화살표 함수에 this 객체가 없으므로써 예상 가능한 오류에 대해서 설명해주세요.

- DOM 이벤트 핸들러로 사용 시

DOM 요소의 이벤트 핸들러로 화살표 함수를 사용하면 ‘this’가 예상과 다른 값을 가질 수 있다.

일반적인 함수로 정의한 경우 this는 이벤트가 발생한 DOM 요소를 가리킨다. 하지만 화살표 함수를 사용하면 주변 스코프의 this를 가져오므로 예상과 다른 결과가 나타날 수 있다. (window를 가리킨다고 알고 있음. 화살표 함수는 자체적으로 this를 바인딩하지 않기 때문에, 부모 함수나 객체의 this 값을 그대로 사용하게 됨.)


```jsx
const button = document.getElementById("myButton");
button.addEventListener("click", () => {
  console.log(this); // window 객체를 가리킴, 예상과 다름
});
```

- 생성자 함수로 사용시

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

참고로 리액트컴포넌트 만들 때 함수 선언식으로 만드는 것과 화살표 함수로 만드는 것에 큰 차이점은 없고 프로젝트의 명세를 따른다. 

주요 차이점은 *호이스팅*에서 차이가 발생한다. 

- 함수 선언식은 함수 전체를 호이스팅한다. 따라서 정의된 범위의 맨 위로 호이스팅되어서 함수 선언 전에 함수를 사용할 수 있다.
- 화살표 함수는 Lexical this하게 언제나 상위 스코프의 this를 가르킨다. 따라서 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다.
- 함수 표현식은 별도의 변수에 할당하게 되는데, 변수는 선언부와 할당부를 나누어 호이스팅하게 된다. 따라서 선언부만 호이스팅하게 된다.

```jsx
function sum() {} // 함수 선언식
const sum = () => {} // 화살표 함수
const sum = function(a, b){} // 함수 표현식 
```

## 화살표 함수와 일반 함수의 주요 차이점

- 일반 함수는 생성자 함수로 사용할 수 없고, 화살표 함수는 생성자로 함수를 사용할 수 없다. 따라서 prototype 프로퍼티를 가지고 있지 않다.
- 일반 함수에서는 함수가 실행될 때 암묵적으로 arguments 변수가 전달되어 사용할 수 있다.
- 화살표 함수에서는 argument 변수가 전달되지 않는다.

```jsx
function fun() {
  console.log(arguments); // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
```

```jsx
const arrFun = () => {
  console.log(arguments); // Uncaught ReferenceError: arguments is not defined
};

fun(1, 2, 3); // error !!! 
```

일반함수는 arguments변수가 전달되어 [1,2,3]이 찍히지만

화살표함수는 arguments를 정의할 수 없다고 뜬다.

# 얕은 복사 vs 깊은 복사에 대해서 설명해주세요.

- 얕은 복사 (Shallow Copy):
(배열이나 함수도 얕은 복사, 깊은 복사 가능 -> 그냥 참조가 복사된다고 이해하면 될듯)
얕은 복사는 객체를 복사할 때, 원본 객체의 프로퍼티들을 새로운 객체로 복사하지만, 프로퍼티 값이 객체인 경우에는 참조를 공유합니다.
얕은 복사를 통해 복사된 객체와 원본 객체는 부분적으로 공유된다고 생각할 수 있습니다.
주로 Object.assign(), 전개 연산자 (...)를 사용하여 얕은 복사를 수행합니다.
예시:

```jsx
const originalObj = { a: 1, b: { c: 2 } };
const shallowCopy = Object.assign({}, originalObj);

originalObj.b.c = 3;

console.log(shallowCopy.b.c); // 출력: 3 (객체 내용이 공유됨)
```

- 깊은 복사 (Deep Copy):

깊은 복사는 객체를 완전히 복제하여, 원본 객체와 완전히 분리된 복사본을 만듭니다. 복사된 객체 및 해당 하위 객체는 모두 독립적으로 존재합니다.
주로 재귀 함수나 외부 라이브러리(예: lodash의 <code>_.cloneDeep()</code>)를 사용하여 깊은 복사를 수행합니다.
예시:
```jsx
const originalObj = { a: 1, b: { c: 2 } };
const deepCopy = JSON.parse(JSON.stringify(originalObj));

originalObj.b.c = 3;

console.log(deepCopy.b.c); // 출력: 2 (객체가 완전히 복사됨)
```

깊은 복사를 사용하면 원본 객체와 복사본 간에 어떤 프로퍼티도 공유되지 않으므로 변경 사항이 서로에게 영향을 주지 않습니다. 그러나 깊은 복사는 중첩된 객체나 배열이 많은 경우에는 성능 면에서 부담이 될 수 있으며, JSON 문자열로 변환 후 다시 파싱하는 방법은 함수나 순환 참조 등을 처리하지 못할 수 있습니다. 따라서 복사 방법을 선택할 때 상황을 고려해야 합니다.

# 동등 연산자(==)와 일치 연산자의 차이점(===)을 설명해주세요.

동등 연산자(==)는 두 값을 비교할때 형변환을 수행한다. 즉, 두 값의 데이터 타입이 달라도 자동으로 형변환 수행 후 비교한다.
일치 연산자(===)는 두 값이 데이터 타입과 값이 모두 같은지 비교하기 때문에 형변환은 일어나지 않는다.
따라서, 동등 연산자를 사용할때는 형변환까지 고려하고 사용해야 나중에 예기치 못할 오류를 예방할 수 있다.

# 왜 호이스팅이 일어나고 호이스팅이 일어남으로써 발생 가능한 오류 및 수정 방법?

호이스팅(Hoisting)은 JavaScript의 동작 방식 중 하나로, 변수 및 함수 선언이 코드의 상단으로 "끌어 올려"지는 현상을 가리킵니다. 이것은 코드 실행 전에 JavaScript 엔진에 의해 처리됩니다. 호이스팅은 코드 작성자에게 예상치 못한 동작을 유발할 수 있으므로 주의가 필요합니다.

호이스팅이 발생하는 이유는 JavaScript의 컴파일 단계에서 변수 및 함수 선언을 처리하는 방식과 관련이 있습니다. JavaScript 엔진은 코드를 실행하기 전에 변수와 함수 선언을 메모리에 등록하고 초기화합니다. 따라서 코드 실행 중에 변수와 함수를 참조할 수 있습니다.

예를 들어 호이스팅이 발생하는 경우를 살펴보겠습니다. 다음은 호이스팅 예제입니다:

```jsx
console.log(x); // undefined
var x = 5;
console.log(x); // 5
```

이 코드에서 **`console.log(x)`**를 첫 번째로 호출할 때 **`x`**는 선언되지 않았지만 오류가 발생하지 않고 **`undefined`**가 출력됩니다. 이는 호이스팅으로 인해 변수 **`x`**가 선언되었지만 아직 값이 할당되지 않았기 때문입니다. 따라서 코드 실행 전에 변수 **`x`**가 끌어올려져 선언된 것처럼 동작합니다.

호이스팅은 함수 선언에 대해서도 적용됩니다. 다음은 함수 호이스팅의 예입니다:

```jsx
foo(); // "Hello, World!"

function foo() {
  console.log("Hello, World!");
}

```

이 코드에서 **`foo`** 함수를 호출하기 전에 함수를 선언했습니다. 이것은 호이스팅으로 인해 함수 선언이 코드 상단으로 끌어올려져 함수를 호출하기 전에도 함수를 참조할 수 있게 됩니다.

호이스팅에 주의해야 하는 이유는 예상치 못한 결과를 초래할 수 있기 때문입니다. 예를 들어, 변수를 선언하기 전에 사용하면 **`undefined`**가 될 수 있으며, 이로 인해 오류가 발생할 수 있습니다. 따라서 변수 및 함수 선언을 코드의 상단에 명시적으로 작성하고, 호이스팅을 이해하여 코드를 더 예측 가능하게 작성하는 것이 좋습니다.



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

코드가 실행될 때 생성되는 환경을 나타내는 개념입니다. 실행 컨텍스트는 변수, 함수 선언, 스코프, this 등과 

 같은 정보를 관리하며 코드의 실행을 지원합니다. 실행 컨텍스트는 크게 세 가지 종류로 나눌 수 있다. 

### 실행 컨텍스트의 종류 3가지

1. 전역 실행 컨텍스트 
    1. 코드가 실행되면 가장 먼저 전역 실행 컨텍스트가 생성.
    2. 전역 실행 컨텍스트는 어플리케이션 전체를 범위로 하며, 전역 스코프(Global Scope)를 가지고 있다. 
    3. 전역 실행 컨텍스트에는 전역 변수와 전역 함수가 포함.
2. 함수 실행 컨텍스트 
    1. 함수가 호출될 때마다 해당 함수의 실행 컨텍스트가 생성
    2. 각 함수 실행 컨텍스트는 함수 내부의 로컬 변수, 매개변수, 내부 함수 선언 등을 저장
    3. 함수 실행 컨텍스트는 자신의 변수 환경과 상위 스코프에 대한 참조를 유지
3. eval 실행 컨텍스트
    1. eval() 함수로 실행되는 코드 블록에 대한 실행 컨텍스트.

# 이벤트 버블링에 대해서 설명해주시고 방지하는 방법에 대해서 알려주세요. 

이벤트 버블링이란 한 요소에 이벤트가 발생하면 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작하고 최상단의 부모 요소를 만날 때까지 반복되면서 핸들러가 동작하는 현상을 말한다.

![스크린샷 2023-09-05 오후 11.53.52.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420d753a-9867-44d9-aa83-d7160d6e1f89/20d2ff73-d03e-4382-9a16-5d42a5737911/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-09-05_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.53.52.png)

- 예제 코드

```jsx
<body>
    <div class="DIV1">
      DIV1
      <div class="DIV2">
        DIV2
        <div class="DIV3">DIV3</div>
      </div>
    </div>
  </body>

const divs = document.querySelectorAll("div");

const clickEvent = (e) => {
  console.log(e.currentTarget.className);
};

divs.forEach((div) => {
  div.addEventListener("click", clickEvent);
});
```

- 이 코드에서 div를 클릭하면 해당 클래스의 이름이 콘솔로 출력되는 코드인데, 자바스크립트는 기본적으로 버블링이 발생하기 때문에 `<div class="DIV3">DIV3</div>`를 클릭한다면 콘솔에는 DIV3, DIV2, DIV1이 순서대로 출력이 될 것이다.

이벤트 버블링을 중단시키려면 일반적으로 JavaScript에서 **`event.stopPropagation()`** 메서드를 사용하거나 이벤트 핸들러에서 **`return false`**를 반환하면 됩니다. 이렇게 하면 이벤트가 더 이상 상위로 전파되지 않는다.

### 이벤트 버블링이 존재하는 이유

이벤트 전파 및 위임: DOM 트리의 요소들은 중첩된 구조를 가질 수 있습니다. 이때 이벤트 버블링은 이벤트가 하위 요소에서 상위 요소로 전파되는 메커니즘을 제공하여, 중복된 이벤트 핸들러를 등록하지 않고도 상위 요소에서 이벤트를 처리할 수 있도록 도와줍니다. 이것을 이벤트 위임(Event Delegation)이라고 하며, 효율적인 이벤트 관리와 메모리 사용을 돕습니다.

- 캡처링은?

반대로 최상위 태그에서 해당 태그를 찾아 내려간다. 

![스크린샷 2023-09-06 오전 12.01.28.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420d753a-9867-44d9-aa83-d7160d6e1f89/6560315d-4a7b-42de-8166-4a04c47ea00d/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-09-06_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.01.28.png)

예제 

```jsx
const divs = document.querySelectorAll("div");

const clickEvent = (e) => {
  console.log(e.currentTarget.className);
};

divs.forEach((div) => {
  div.addEventListener("click", clickEvent, { capture: true });
});
```

`<div class="DIV3">DIV3</div>`를 클릭한다면 위에서부터 찾아 내려오기 때문에 콘솔에는 DIV1, DIV2, DIV3이 순서대로 찍힐 것이다.

이벤트 버블링은 일반적으로 이벤트 처리를 더 효율적으로 만들어줍니다. 여러 개의 하위 요소가 같은 이벤트를 처리해야 할 때, 이벤트 버블링을 통해 각 하위 요소에 개별적으로 이벤트 리스너를 추가하지 않아도 됩니다. 대신 이벤트를 상위 요소에 하나의 이벤트 리스너를 추가하면 해당 이벤트가 하위 요소에서 발생하면 상위 요소에서 처리됩니다.

메모리 관점에서도 이점이 있습니다. 이벤트 리스너가 많은 요소에 모두 개별적으로 리스너를 추가하는 것은 불필요한 메모리 사용을 초래할 수 있습니다. 이벤트 버블링을 활용하면 이벤트 처리를 최상위 요소에서 한 번만 추가하므로 메모리 사용을 절약할 수 있습니다.

# this와 연관지어서 bind에 대해서 설명해주세요.

<code>`this`</code>는 현재 실행 중인 함수나 메서드가 어떤 <code>`객체`</code>에 바인딩되어 있는지를 가리키는 특별한 <code>`키워드`</code>

1. <code>`call`</code> 메서드:`call` 메서드는 함수를 호출할 때 <code>`this`</code> 값을 설정합니다. 함수를 호출하는 동안 함수 내에서 <code>`this`</code>가 특정 객체를 가리키도록 지정할 수 있습니다. <code>`call`</code> 메서드는 첫 번째 매개변수로 설정하려는 <code>`this`</code> 값(객체)을 받고, 이어서 함수에 전달할 매개변수를 순서대로 받습니다.
    
    ```jsx
    function sayHello() {
      console.log(`Hello, ${this.name}!`);
    }
    
    const person = { name: 'John' };
    sayHello.call(person); // "Hello, John!"
    ```
    
2. <code>`apply`</code> 메서드:`apply` 메서드는 `call`과 비슷하지만 매개변수를 배열로 받습니다. 함수에 전달할 매개변수가 배열에 담겨 있을 때 유용합니다.
    
    ```jsx
    function sayHello(greeting) {
      console.log(`${greeting}, ${this.name}!`);
    }
    
    const person = { name: 'Alice' };
    sayHello.apply(person, ['Hi']); // "Hi, Alice!"
    ```
    
3. `bind` 메서드:`bind` 메서드는 함수의 `this` 값을 영구적으로 설정합니다. `bind`를 사용하여 새로운 함수를 생성하며, 이 새로운 함수의 `this` 값은 원본 함수의 `this` 값을 변경하지 않습니다. 대신 새로운 함수가 호출될 때 항상 설정한 `this` 값을 가집니다.
    
    ```jsx
    function sayHello() {
      console.log(`Hello, ${this.name}!`);
    }
    
    const person = { name: 'Sarah' };
    const greet = sayHello.bind(person);
    
    greet(); // "Hello, Sarah!"
    ```
    

이러한 메서드들을 사용하여 함수의 `this` 값을 조작할 수 있으므로, 함수가 다양한 객체와 함께 동작하도록 할 수 있습니다.

# 데이터 바인딩에 대해서 설명해주세요.

바인딩이란 화면상에 보여지는 데이터(View)와 브라우저 메모리에 있는 데이터(MOdel)을 묶어서(Binding) 서로 간의 데이터를 동기화하는 것이다. 예를 들어, HTML에서 서버 혹은 스크립트 상에서 받아온 데이터를 화면상에 그려주고 있다고 가정했을 때, 해당 값이 변경 될 경우 다시 HTML 상에서 데이터(값)를 변경된 값에 따라 맞춰주는 동작을 '데이터 바인딩'이라고 한다. 데이터 바인딩의 종류는 두가지가 있다.
첫번째는 Javascript(Model)에서 HTML(View)로 한 방향으로만 데이터를 동기화하는 단방향 바인딩이다. 이는 부모 컴포넌트에서 자식 컴포넌트로만 데이터가 전달되는 구조로, SPA Framework는 대표적으로 리액트가 그 예시이다.
두번째는 Javascript와 HTML 사이에 View Model이 존재하여 하나로 묶여 둘 중 하나만 변경되어도 함께 변경되는 양방향 바인딩이다. 또한 부모 컴포넌트에서 자식 컴포넌트로는 Props를 통해 데이터를 전달하고, 자식 컴포넌트에서 부모 컴포넌트로는 Emit Event를 통해서 데이터를 전달하는 구조이다. 대표적으로 Vue.js와 Angular가 있다.

# React hooks에 대한 장점을 설명해주세요.

1. 코드가 간결해진다. 
2. 원래 class 컴포넌트를 만들때 <code>‘바인딩되지 않는 this문제’</code>가 많이 발생했었다. 이때 bind 함수를 많이 사용했었다.
3. HOC hell에서 벗어날 수 있다.

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

# Promise와 Callback의 차이를 설명해주세요.

콜백함수는 비동기 로직의 결과값을 처리하기 위해 callback 안에서만 처리를 해야하고, 콜백 밖에서는 비동기에서 온 값을 알 수가 없다. 프로미스를 사용하면 비동기에서 온 값이 프로미스 객체에 저장되어서 코드 작성이 용이해진다. 즉, 콜백은 매번 비동기를 실행해야 그 값을 사용 가능해서 값을 저장하고 싶다면 프로미스를 사용하는 것이 낫다. 또한 프로젝트가 점점 복잡해지고 콜백함수가 중첩되면 가독성도 현저히 떨어지게 된다.(콜백 지옥)

# var, let, const의 차이를 설명해주세요.

변수란 **하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름**을 말한다. 변수 선언에는 var, let, const가 있는데, let과 const가 나온 ES6 이전에는 var만 사용했는데 여기에는 세 가지 문제점이 존재한다.

- 변수 중복 선언 가능하여, 예기치 못한 값을 반환할 수 있다.
- 함수 레벨 스코프로 인해 함수 외부에서 선언한 변수는 모두 전역 변수로 된다.
- 변수 선언문 이전에 변수를 참조하면 언제나 undefined를 반환한다.

이에 해결책으로 제시된 let과 const의 특징은 다음과 같다.
let은 변수 중복 선언이 불가능하지만 재할당은 가능하다.
const는 let과 같이 재선언이 불가능하지만, 또 재할당도 불가능하다. 다만 원시 값만 불가능하고 객체는 가능하다. 또한 반드시 선언과 동시에 초기화를 진행해야한다.

```tsx
function testVarLetConst() {
  var a;
  let b;
  // const c; 
  // 오류가 나옴. 할당 이전에 실행 불가, SyntaxError: Missing initializer in const declaration 에러가 나옴
  
  console.log({
    a, b
  });
  // {a: undefined, b: undefined}
  a = 'a';
  b = 'b';
  console.log({
    a, b
  });
  // {a: 'a', b: 'b'}
}

testVarLetConst();
```

### var, let의 차이점 
- var로 선언된 변수는 함수 스코프(Function Scope)에서 호이스팅
- let으로 선언된 변수는 블록 스코프(Block Scope)에서 호이스팅, 블록 스코프란 중괄호 {} 내에서만 유효한 스코프


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

이렇게 감싸는 이유는, 리액트가 사용하는 Virtual DOM 방식에서는 컴포넌트 변화를 감지할 때 효율적으로 비교하고자 **컴포넌트 내부는 하나의 DOM 트리 구조로 이루어져야 한다는 규칙**이 있기 때문이다.

- JSX 내부의 자바스크립트 표현식 내에서 if문을 사용할 수 없어서, 조건 연산자(삼항 연산자)를 사용합니다.
- undefined를 렌더링하지 않아야 한다. 다만 JSX 내부에서의 렌더링은 에러가 나지 않는다.
- 스타일을 지정할 때 카멜 표기법으로 작성해야 한다. ex) className, backgroundColor

# Closure에 대해서 설명해주세요.
클로져란 어떤 함수가 다른 함수 내부에서 정의되고, 그 함수가 외부 함수의 변수에 접근할 수 있는 경우를 가리킨다.
이때, 외부 함수의 변수가 외부 함수의 스코프를 내부 함수에서 여전히 접근 가능하며, 이 내부 함수를 클로저라고 한다.
즉, 클로저는 주변 함수에 대한 참조와 함께 포함된 함수의 조합이다. -> 클로저는 내부 함수에서 외부 함수의 범위에 대한 접근을 제공한다. 

. 클로저는 함수와 함수가 선언된 어휘적 환경의 조합입니다. 이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다. 

### 클로저의 특징
1. Javascript에서 클로저는 함수 생성 시 함수가 생성될 떄마다 생성된다.
2. 함수 내부에서 함수 정의: 클로저가 되기 위해서는 어떤 함수 내에서 내부 함수를 정의해야 한다.
3. 외부 변수 접근: 내부 함수는 외부 함수의 변수에 접근할 수 있다.
4. 외부 함수 종료 후에도 접근 가능: 외부 함수가 실행을 마치고 종료되더라도 클로저 내부 함수는 여전히 외부 변수에 접근할 수 있다. 이는 클로저가 자유 변수라고도 불리는 외부 변수를 갖고 있기 때문이다. 

### 클로저의 사용
클로저는 주로 내부 함수 팩토리나 비동기 작업에서 상태를 유지하고 관리하는 데 사용된다. 

### 클로저를 생각해야 하는 이유
자바스크립트는 쉬운 함수 중첩과 패턴으로 인하여 너무나도 쉽게 클로저가 생성된다. -> 이는 메모리 누수를 일으키므로 조심해서 개발을 진행해야 한다.

### 추가 자료 
http://jibbering.com/faq/notes/closures/

# javascript 성능 최적화를 위해 노력한 것을 설명해주세요

1. 크롬 개발자 도구를 이용한 메모리 누수 찾기 
메모리 누수에는 크게 두 가지의 형태가 있다. 하나는 주기적으로 메모리 사용량이 증가하는 형태이고, 다른 하나는 단 한번만의 메모리 증가를 유발시키는 형태이다. 
일반적으로 전자를 탐지하는 것이 쉬운 편이다. 하지만 전자 유형의 누수는 메모리가 계속 늘어나면 브라우저가 느려지거나 스크립트 실행이 중지되어 성가신 일을 야기하기도 한다.
후자 유형인 주기적이지 않은 누수는 다른 메모리 할당에 비해 눈의 뛸 정도로 큰 경우 쉽게 발견할 수 있다. 하지만 흔치 않기 때문에, 잘 인지못하고 넘어가는 경우가 많다. 


<details>
  <summary>예제</summary>

```tsx
var x = [];

function createSomeNodes() {
    var div,
        i = 100,
        frag = document.createDocumentFragment();
    for (;i > 0; i--) {
        div = document.createElement("div");
        div.appendChild(document.createTextNode(i + " - "+ new Date().toTimeString()));
        frag.appendChild(div);
    }
    document.getElementById("nodes").appendChild(frag);
}
function grow() {
    x.push(new Array(1000000).join('x'));
    createSomeNodes();
    setTimeout(grow,1000);
}
```
<code>grow</code>가 호출되면 div 노드들을 만들고 DOM에 추가시킨다. 또한 큰 배열을 할당시키고 이를 글로벌 변수에 참조시킨다. 이 코드는 실행시 크롬 도구를 살펴보면 메모리가 꾸준히 증가하는 것을 확인해 볼 수 있다. 

Performace 메뉴에서 memory 체크박스에 체크한 후 record 버튼을 누룬다. 예제의 THE BUTTON 버튼을 눌러 메모리 누수를 시켜본다. 그 후 record를 정지시킨 후 결과를 살펴본다. 

이 사진에서 메모리 누수가 있다는 것을 보여주는 큰 징후가 두 개 있습니다. nodes(초록선) 와 JS heap(파란선) 그래프입니다. 노드들이 꾸준이 증가하며 감소되지 않습니다. 이것이 가장 큰 징후입니다.

JS heap 그래프도 역시 메모리 사용이 계속 증가되고 있음을 보여줍니다. 하지만 garbage collector의 영향으로 알아채기가 쉽지는 않습니다. 초기에 메모리가 증가하다가 한 번 크게 감소하고 더 증가하다가 또 감소하는 형태가 반복됨을 확인할 수 있습니다. 이 경우 핵심은, GC에 의해 메모리 사용량이 감소할 때마다 힙의 크기가 이전보다 더 크게 유지된다는 점입니다. 다시 말해서 GC가 많은 양의 메모리를 수집하는 데 성공하고 있지만, 그 중 일부가 주기적으로 누수되고 있다는 것입니다.

이제 메모리 누수가 있다는 것을 확신을 가질 수 있습니다. 이제 어디서 누수가 생기는지 찾아봅시다.

두 개의 스냅샷 찍기
어디서 메모리 누수가 생기는지 찾기 위해서 크롬 개발자 도구의 Memory 메뉴(구 Profiles)를 이용할 것입니다. 이번 단계를 수행하기 위해 위 단계에서 접속한 크롬 예제 페이지를 새로고침 합니다. 이제 Take Heap Snapshot 기능을 사용할 것 입니다.

페이지를 새로고침하고 페이지 로딩이 끝나면 heap 스냅샷을 생성합니다. 이 스냅샷을 기준으로 사용하겠습니다. 그런 다음 다시 The Button 을 누르고 몇 초간 기다린 후에 두번째 스냅샷을 생성합시다. 스냅샷을 생성했다면 코드에 중단점을 설정하여 더 이상 누수가 되지 않게 하는 것이 좋습니다.



두 스냅샷의 메모리 할당을 비교할 수 있는 두가지 방법이 있습니다. Summary 를 선택한 다음, 우측에 있는 All objects 를 Objects allocated between Snapshot1 and Snapshot 2 를 선택하거나 Summary 대신 Comparison 을 선택하면 됩니다. 두 방법 모두 두 스냅샷의 할당된 객체 목록이 표시됩니다.

이 예제에서 메모리 누수가 크기 때문에 매우 쉽게 발견됩니다. (string) Constructor의 Size Delta 표를 확인 해봅시다. 58개의 객체 생성으로 8MB를 차지하고 있습니다. 의심스로운 결과입니다. 새로운 객체들이 할당되었지만 해제되지 않아 8MB의 메모리가 소비되었습니다. (string) Constuctor 표를 열어보면 사이즈가 매우 큰 할당이 몇 개 있는 것을 확인하실 수 있습니다. 이 중 하나(xxxxxxxx… 로 표시된)를 선택하여 하단의 Retainers 표를 살펴보면 흥미로운 점을 찾을 수 있습니다.



선택한 할당이 배열의 일부임을 확인할 수 있습니다. 이 배열은 전역 window 객체의 x 변수로 참조되어 있다고 나옵니다. 이는 수집되지 않는 루트 (window) 객체에 큰 사이즈의 객체가 참조되어 있음을 우리에게 알려줍니다. 이제 잠재적인 메모리 누수와 그 위치를 발견했습니다.

꽤나 기쁜 발견이지만 우리의 예제는 매우 간단했습니다. 이 예제에서 볼 수 있는 것과 같이 큰 할당은 일반적인 경우는 아닙니다. 다행이도 우리의 예제는 작긴하지만 DOM 노드의 누수 문제도 포함하고 있었습니다. 위 스냅샷을 이용하여 이 노드들을 쉽게 찾을 수 있었지만, 규모가 큰 사이트에서는 더 복잡하여 찾기가 쉽지는 않을 것 입니다. 최신 버전의 크롬은 이런 작업에 적합한 추가적인 도구를 제공하는데, 바로 Record Heap Allocations 기능입니다.

https://itstory.tk/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98%EC%9D%98-4%EA%B0%80%EC%A7%80-%ED%98%95%ED%83%9C

</details>

</details>

# TDZ란?

Temporal Dead Zone, 스코프의 시작 지점부터 초기화 시작 지점까지의 구간.
변수는 선언, 초기화, 할당 세 단계에 걸쳐 생성되는데, var는 선언과 초기화를 동시에 진행해서 TDZ가 따로 존재하지 않지만 let은 선언과 초기화가 분리되어 TDZ가 존재한다. 그래서 아래 코드들 같이 선언만 된 상태에서 호출하고 그 뒤에 할당했을 때, let과 var는 다른 결과를 나타낸다.

```tsx
var name1;
console.log(name1);	// undefined
name1 = 'Mike';		// name1은 선언과 초기화가 동시에 되어 호이스팅 되고 ‘Mike’(할당)는 호이스팅 되지 않는다.

console.log(name2);	// ReferenceError
let name2 = 'Michael';	// name2의 선언만 호이스팅 되고 초기화는 되지 않은 채로 호출된다.
```

# 이벤트 핸들러 vs 이벤트 리스너 

- 이벤트 핸들러 (Event Handlers):

이벤트 핸들러는 HTML 요소에 직접 이벤트 처리 코드를 연결하는 방법입니다.
주로 HTML 요소의 속성으로 사용되며, 이벤트가 발생할 때 실행할 JavaScript 코드를 포함합니다.
예를 들어,
 
```javascript
<button onclick="myFunction()">Click me</button>
```

와 같이 HTML 요소에 직접 이벤트 핸들러를 추가할 수 있습니다.
이벤트 핸들러는 요소와 이벤트 간의 강력한 결합을 가지며, 여러 이벤트 핸들러를 동시에 연결하기 어려울 수 있습니다.

- 이벤트 리스너 (Event Listeners):

이벤트 리스너는 HTML 요소와 JavaScript 코드를 분리하는 방법입니다.
addEventListener 메서드를 사용하여 HTML 요소에 이벤트 리스너를 추가합니다.
이벤트 리스너는 이벤트가 발생했을 때 실행할 함수를 지정하는 방식으로 작동합니다.
이벤트 리스너를 사용하면 하나의 요소에 여러 이벤트 리스너를 연결하고, 이벤트 핸들링 로직을 모듈화할 수 있으며, 요소와 이벤트 간의 결합이 느슨합니다.
예를 들어:

```javascript
const button = document.querySelector('button');
button.addEventListener('click', myFunction);
```
# Javascript는 어떤 언어입니까?

JavaScript는 `싱글 스레드`이면서 `논 블록킹` 언어입니다. 자바스크립트는 비동기 처리를 통해 싱글 스레드이지만 블록킹 되지 않게 합니다. 하나의 요청이 완료될 때까지 기다리지 않고 동시에 다른 작업을 수행함으로써 문제를 해결합니다. 멀티 스레드가 아닌 이유는 동시성 문제(동시에 공유된 자원에 접근하는 경우)를 해결하기 까다롭기 때문입니다.

싱글 스레드 -스레드가 하나밖에 존재하지 않아 한번에 하나의 작업만 할 수 있습니다.
논 블록킹 - A함수가 B함수를 호출해도 제어권은 그대로 자신이 가지고 있는다.
비동기 처리 - 특정 로직의 실행이 끝날때까지 기다려주지 않고 나머지 코드를 먼저 실행

# esModule과 CommonJS (CJS)에 대해서 설명해주세요.

`esModule`과 `CommonJS (CJS)`는 JavaScript 모듈 시스템의 두 가지 주요 형식 중 하나입니다. 각각의 특징과 차이점은 다음과 같습니다:

1. 모듈 타입:
    - `ES Modules (ESM)`: ECMAScript 표준에 따라 구현된 자바스크립트 모듈 형식입니다. `import` 및 `export` 문을 사용하여 모듈을 가져오고 내보낼 수 있습니다. 브라우저와 Node.js 모두 ESM을 지원하며, `.mjs` 확장자 또는 `"type": "module"` 옵션을 사용하여 파일을 ESM으로 지정할 수 있습니다.
    - `CommonJS (CJS)`: Node.js에서 주로 사용되는 모듈 형식입니다. `require` 및 `module.exports`를 사용하여 모듈을 가져오고 내보냅니다.
2. 동기 vs. 비동기:
    - `ESM`: ESM은 기본적으로 비동기적으로 모듈을 가져오며, `import`문은 비동기 처리를 수행합니다. 이것은 브라우저에서도 동일하게 적용됩니다.
    - `CJS`: CJS는 동기적으로 모듈을 가져오는 경향이 있으며, `require` 문은 동기적으로 실행됩니다. Node.js에서는 기본적으로 동기식입니다.
3. 정적 vs. 동적:
    - `ESM`: ESM은 정적 모듈 시스템입니다. 즉, 모듈 가져오기 및 내보내기는 코드의 맨 위에 있어야 하며, 런타임 동안 조건부 또는 동적으로 수행할 수 없습니다.
    - `CJS`: CJS는 동적으로 모듈을 가져오고 내보내는 것이 가능합니다. 이는 런타임 조건에 따라 다른 모듈을 동적으로 로드해야 하는 경우에 유용합니다.
4. Named vs. Default Export:
    - `ESM`: ESM은 명시적으로 명명된 내보내기 (named exports)를 지원합니다. 여러 개의 내보내기를 가질 수 있으며, `import { name } from 'module'`과 같이 가져옵니다.
    - `CJS`: CJS는 주로 `module.exports`를 사용하여 모듈을 내보내므로 주로 하나의 기본 내보내기 (default export)만을 가집니다. 이는 `const module = require('module')`과 같이 가져옵니다.
5. 사용 사례:
    - `ESM`: 브라우저에서 모듈을 사용하거나 최신 Node.js 버전에서 모듈을 사용하는 경우에 적합합니다. 또한 정적인 모듈 시스템이 필요한 경우에 유용합니다.
    - `CJS`: 오래된 Node.js 버전과의 호환성이 필요한 경우, 또는 동적 모듈 로딩이 필요한 경우에 적합합니다. Node.js 환경에서 널리 사용됩니다.

이러한 차이점을 고려하여 프로젝트의 요구 사항에 따라 `ES Modules` 또는 `CommonJS` 중 하나를 선택할 수 있습니다. Node.js의 최신 버전에서는 두 가지 모듈 형식을 모두 지원하므로 적절한 모듈 시스템을 선택할 수 있습니다.

# 불변성을 유지하는 방법은?

불변성이란, 객체가 생성된 이후 그 상태를 변경할 수 없는 것. 객체 프로퍼티를 변경할 수 없는 상태.

- Spread Operator(ES6)를 사용해서 모든 property 복사
```jsx
const obj  = { a: 1, b: 2 };
const newObj = { ...obj, c: 3 };
console.log(newObj); // { a: 1, b: 2, c: 3 }
```

- Object.assign을 사용해서 모든 property 복사
```jsx
const obj = { a: 1, b: 2 };
const newObj = Object.assign({}, obj, { c: 3 }); 
console.log(newObj); // { a: 1, b: 2, c: 3 }
```

- immer의 produce()를 사용해서 모든 property 복사
```jsx
import produce from "immer";

const obj = { a: 1, b: 2 };
const newObj = produce(obj, (draft) => {
  draft.c = 3;
}); 
console.log(newObj); // { a: 1, b: 2, c: 3 }
```

추가로, depth가 깊어지면 Spread Operator와 Object.assign은 코드가 많아져 immer의 사용이 더 유리하다.
