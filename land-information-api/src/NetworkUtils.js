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

// 메인페이지 최근 조회한 토지
export function recentViewFn(method, url, dto) {
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  };
  return fetch(url, options)
    .then((response) => {
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

// common Function
export function _Fetch(method, url, dto) {
  url = "http://localhost:8000/" + url
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(dto)  // GET이 아닌 경우에만 body 추가
  };

  return fetch(url, options)
    .then((response) => {
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


// 첨부파일 공통
export function FileUploadFetch(method, url, formData) {
  url = "http://localhost:8000/" + url

  let options = {
    method: method,
    body: formData
  };
  return fetch(url, options)
    .then((response) => {
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

export function _DownLoadFile(method, url, dto) {
  url = "http://localhost:8000/" + url;
  let options = {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(dto);  // GET이 아닌 경우에만 body 추가
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // `Content-Disposition` 헤더에서 파일 이름 추출
      const contentDisposition = response.headers.get('Content-Disposition');
      console.log(contentDisposition)

      let fileName = 'downloaded_file';  // 기본 파일 이름

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = decodeURIComponent(fileNameMatch[1]); // URL 디코딩
        }
      }

      // 파일을 Blob으로 읽기
      return response.blob().then((blob) => ({
        blob,
        fileName
      }));
    })
    .then(({ blob, fileName }) => {
      // 파일 다운로드 트리거
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // 디코딩된 파일 이름 사용
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error(error);
    });
}
