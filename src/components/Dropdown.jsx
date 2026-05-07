import { Link } from "react-router-dom"
import { useAlert } from "./AlertContext"
import DisplayAvatar from "./DisplayAvatar"

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
    <div className="openMoreOptions" onClick={(e) => {
      e.stopPropagation()
      e.preventDefault()
    }}>
      {links && links.map((link) => {
        const commonProps = {
          onKeyDown: handleKeyDown,
          className: `dropdown-link ${link.className || ''}`.trim(),
        }

        if (link.action) {
          return (
            <div
              {...commonProps}
              tabIndex={0}
              onClick={() => handleActionClick(link.action)}
              role="button"
              key={link.title}
              aria-label={link.title}
            >
              {link.title}
            </div>
          )
        }

        if (link.avatar) {
          return (
            <div
              {...commonProps}
              role="button"
              key={link.title}
              aria-label={link.title}
            >
              <div className="viewUsersInChat">
                <DisplayAvatar seed={link.avatar.seed} style={link.avatar.style} className='listedUserAvatar' />
                <span>{link.title}</span>
              </div>
            </div>
          )
        }

        return (
          <Link
            tabIndex={0}
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