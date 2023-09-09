# 화살표 함수랑 다른 일반 함수의 차이점은?

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

# 동등 연산자(==)와 연산자의 차이점(===)을 설명해주세요.

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

# 양방향 바인딩과 단방향 바인딩에 대해서 설명해주세요.

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


