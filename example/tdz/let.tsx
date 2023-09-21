let age = 30;
function showAge() {
  console.log(age);
  //   let age = 20; // 재 선언 시 age가 호이스팅(선언) 되면서 해당 스코프 내에서 스코프 안에 있는 age를 참조하게 되므로써 TDZ가 형성되므로 참조 오류가 납니다.
}

showAge();
