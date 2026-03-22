import { use, useEffect } from "react"

// err props expect an []
const Error = ({ errors }) => {
  return (
    <>
      <ul className="errorWrapper">
        {errors.map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </ul>
    </>
  )
}

export default Error