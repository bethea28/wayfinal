const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') {
    setUserInput(filtered[activeSuggestion])
    setFiltered([])
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (activeSuggestion === 0) {
      return
    }
    setActiveSuggestion(activeSuggestion - 1)
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    // console.log(`Active ${activeSuggestion} Length: ${filtered.length}`)
    if (activeSuggestion + 1 === filtered.length) {
      return
    }
    setActiveSuggestion(activeSuggestion + 1)
  }
}
