import { useState, useEffect } from "react"
import { formatDate } from "./useDateTimeFormat"

const isRelativeTimeFormatSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat

const DATE_UNITS = [
  ["month", 2592000],
  ["week", 604800],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getDateDiffs = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.trunc(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}
export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, 30000)

    return () => clearInterval(interval)
  }, [timestamp])
  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }
  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
  const { value, unit } = timeago

  return rtf.format(value, unit)
}
