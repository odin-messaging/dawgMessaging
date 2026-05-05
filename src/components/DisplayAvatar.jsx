import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'

const DisplayAvatar = ({ seed, style, className }) => {
  const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }

  return (
    <img
      className={className ? className : ""}
      src={createAvatar(AVATAR_STYLES[style],
        { seed: seed, size: 128 }).toDataUri()}
      alt="Avatar icon"
    />
  )
}

export default DisplayAvatar