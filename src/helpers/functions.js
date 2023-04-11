export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},${opacity / 100})`
}

export const shadeColor = (color, percent) => {
  var R = parseInt(color.substring(1, 3), 16)
  var G = parseInt(color.substring(3, 5), 16)
  var B = parseInt(color.substring(5, 7), 16)

  R = parseInt((R * (100 + percent)) / 100)
  G = parseInt((G * (100 + percent)) / 100)
  B = parseInt((B * (100 + percent)) / 100)

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  var RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
  var GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
  var BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

export const convertRate = (amount) => Number(amount).toFixed(4)

export const checkInterplaza = (bank, accNumber) => {
  const firstAccNumber = accNumber.substring(0, 1)

  return bank.toLowerCase() === 'interbank' && +firstAccNumber >= 3 && +firstAccNumber <= 7
}

export const formatAmount = (amount) => Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const allowOnlyNumbers = (value) => {
  const re = /^[0-9\b]+$/
  return value === '' || re.test(value)
}

export const isDate = (date) => {
  return new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))
}
