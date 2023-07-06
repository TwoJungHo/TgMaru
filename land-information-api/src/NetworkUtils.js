export function FindByPnu(method, url) {
  let options = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
    },
  };
  console.log(url);
  console.log(options);
  return fetch(url, options)
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // 요청에 대한 처리 코드 작성
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}
