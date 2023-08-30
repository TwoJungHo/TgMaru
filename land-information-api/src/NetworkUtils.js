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
