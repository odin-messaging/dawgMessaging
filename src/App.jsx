import { useState, useEffect } from 'react'
import { getMainPage } from './fetches/get'

function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const fetch = await getMainPage()
      setData(fetch)
    }

    load()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </>
  )
}

export default App
