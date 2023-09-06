// 메인페이지 지적경계표시
export function FindByPolygon(method, url, dto) {
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  };
  return fetch(url, options)
    .then((response) => {
      console.log(response.status)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// 이메일 인증
export function SendEmailFN(method, url, dto) {
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  };
  return fetch(url, options)
    .then(
      (response) => {
      if (!response.ok) {
        alert("이미 가입된 이메일이거나 올바르지 않은 이메일입니다.")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      alert("이메일이 발송되었습니다. 인증번호를 입력해주세요 (발송시간이 최대 5분 소요됩니다.")
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

// 회원가입
export function SignUpFn(method, url, dto) {
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  };
  return fetch(url, options)
    .then(
      (response) => {
      if (!response.ok) {
        alert("이미 가입계정입니다.")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      alert("가입완료")
      window.location.href = "/"
    })
    .catch((error) => {
      console.error(error);
    });
}

// 로그인
export function LoginFn(method, url, dto) {
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  };
  return fetch(url, options)
    .then(
      (response) => {
      if (!response.ok) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.")
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("userId", data.userId);
      window.location.href = "/"
    })
    .catch((error) => {
      console.error(error);
    });
}