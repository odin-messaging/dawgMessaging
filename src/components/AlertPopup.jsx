import { useAlert } from "./AlertContext"

const AlertPopup = () => {
  const { text, type } = useAlert()

  if (text && type) {
    return (
      <div className={`${type} alertPopup`}>
        {text}
      </div>
    )
  } else {
    return <></>
  }
}

export default AlertPopup