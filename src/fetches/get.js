

const getMainPage = async () => {
  return fetch('http://localhost:3000')
    .then((res) => res.json())
}

export {
  getMainPage
}