import { Link } from "react-router-dom"
import { useAlert } from "./AlertContext"

const Dropdown = ({ links }) => {
  if (!links || links.length === 0) {
    return null
  }
  const { setAlert } = useAlert()

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      e.currentTarget.click()
    }
  }

  const handleActionClick = async (action) => {
    try {
      const res = await action()

      const message =
        typeof res === "string"
          ? res
          : res?.message || "Action completed successfully"

      setAlert(message, "success")
    } catch (error) {
      console.error("Action failed:", error)
      setAlert(
        error?.message || "An error occurred while performing the action",
        "error"
      )
    }
  }

  return (
    <div className="openMoreOptions">
      {links && links.map((link) => {
        const commonProps = {
          tabIndex: 0,
          onKeyDown: handleKeyDown,
          className: `dropdown-link ${link.className || ''}`.trim(),
        }

        if (link.action) {
          return (
            <div
              {...commonProps}
              onClick={() => handleActionClick(link.action)}
              role="button"
              key={link.title}
              aria-label={link.title}
            >
              {link.title}
            </div>
          )
        }

        return (
          <Link
            {...commonProps}
            to={link.href}
            role="menuitem"
            key={link.title + ' '}
          >
            {link.title}
          </Link>
        )
      })}
    </div>
  )
}

export default Dropdown