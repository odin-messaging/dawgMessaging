const isWithinThreeMinutes = (timestamp) => {
  if (!timestamp) return false


  let date
  if (timestamp instanceof Date) {
    date = timestamp
  } else {
    const str = String(timestamp)
    date = str.endsWith("Z") ? new Date(str) : new Date(str + "Z")
  }

  const diff = Date.now() - date.getTime()

  return diff >= 0 && diff <= 3 * 60 * 1000 // three min
}

export default isWithinThreeMinutes