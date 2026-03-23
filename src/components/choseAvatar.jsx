import { useState, useMemo } from 'react'
import { createAvatar } from '@dicebear/core'
import { lorelei, adventurer, bottts, rings } from '@dicebear/collection'

const AVATAR_STYLES = { adventurer, lorelei, bottts, rings }

export default function AvatarPicker({ setOpenAvatarPicker, onAvatarPick }) {
  const [style, setStyle] = useState('adventurer')
  const [baseSeed, setBaseSeed] = useState(Math.random().toString(36).substring(2, 8))
  const [selectedSeed, setSelectedSeed] = useState(null)

  const avatarOptions = useMemo(() => {
    setSelectedSeed(null)
    const seeds = Array.from({ length: 12 }, (_, i) => `${baseSeed}-${i}`)
    return seeds.map((s) =>
      createAvatar(AVATAR_STYLES[style], { seed: s, size: 128 }).toDataUri()
    )
  }, [baseSeed, style])

  const handleSelect = (index) => {
    if (index == null) {
      setSelectedSeed(null)
      return
    }
    const chosenSeed = `${baseSeed}-${index}`
    setSelectedSeed(chosenSeed)
  }

  const randomizeSeed = () => {
    const random = Math.random().toString(36).substring(2, 8)
    setBaseSeed(random)
  }

  return (
    <div className='EditAvatarModal' tabIndex={-1} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setSelectedSeed(null)
      }
    }}>
      <div>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          {Object.keys(AVATAR_STYLES).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={randomizeSeed} style={{ marginLeft: 12 }}>Randomize</button>
      </div>

      <div className='avatarContainer'>
        {avatarOptions.map((url, index) => (
          <img
            className='choseAvatar'
            key={index}
            tabIndex={0}
            src={url}
            alt="avatar option"
            style={{
              outline: selectedSeed === `${baseSeed}-${index}` ? '3px solid #4f46e5' : '1px solid #ccc',
              transform: selectedSeed === `${baseSeed}-${index}` ? 'scale(1.025)' : ''
            }}
            onClick={() => handleSelect(index)}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                handleSelect(index)
              }
            }}
          />
        ))}
      </div>
      <div className='modalButtons'>
        <button onClick={() => setOpenAvatarPicker(false)}>Cancel</button>
        <button disabled={selectedSeed === null} onClick={() => {
          if (!selectedSeed) return
          onAvatarPick(selectedSeed, style)
          setOpenAvatarPicker(false)
        }}>Set Avatar</button>
      </div>
    </div>
  )
}