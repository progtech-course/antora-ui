'use strict'

module.exports = (authorsStr) => {
  if (!authorsStr) return []

  // Split the string by semicolon or comma
  const authors = authorsStr
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .split(/[;,]/)

  return authors.map((authorData) => {
    // Regex to extract the name and the bracketed contact info
    const match = authorData.trim().match(/^(.*?)(?:\s+<(.*?)>)?$/)
    if (!match) return { name: authorData.trim() }

    const name = match[1].trim()
    const contact = match[2]

    const authorObj = { name }

    if (contact) {
      // Basic check: if it contains an '@', treat it as an email. Otherwise, a URL.
      if (contact.includes('@')) {
        authorObj.email = contact
      } else {
        authorObj.url = contact
      }
    }

    return authorObj
  })
}
