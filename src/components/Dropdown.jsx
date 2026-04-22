import { Link } from "react-router-dom";

const Dropdown = ({ links }) => {

  const clickOnEnterKey = (e) => {
    if (e.key == 'Enter') {
      e.target.click()
    }
  }

  return (
    <div className="openMoreOptions">
      {links.map(link =>
        link.action ? (
          <div
            key={link.title}
            className={`${link.className ? link.className : ''} dropdown-link`}
            onClick={link.action}
            tabIndex={0}
            onKeyDown={(e) => clickOnEnterKey(e)}
          >
            {link.title}
          </div>
        ) : (
          <Link
            onKeyDown={(e) => clickOnEnterKey(e)}
            tabIndex={0}
            key={link.title}
            to={link.href}
            className={`${link.className ? link.className : ""} dropdown-link`}
          >
            {link.title}
          </Link>
        )
      )}
    </div>
  )
}

export default Dropdown