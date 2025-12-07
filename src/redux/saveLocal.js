const getStateSignature = (stateShape) => {
  const keys = Object.keys(stateShape).sort()
  return keys.join('|')
}

export const makeStorageKey = (stateShape) => {
  const signature = getStateSignature(stateShape)
  return `appState.${signature}`
}

export const loadState = (key) => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return undefined
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

export const saveState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state))
  } catch {
    console.log('Storage is full');
  }
}
