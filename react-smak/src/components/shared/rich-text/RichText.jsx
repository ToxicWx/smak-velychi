function sanitizeHtml(html = '') {
  if (typeof window === 'undefined') {
    return String(html || '')
  }

  const parser = new DOMParser()
  const document = parser.parseFromString(String(html || ''), 'text/html')

  document.querySelectorAll('script, style, iframe, object, embed').forEach((node) => {
    node.remove()
  })

  document.querySelectorAll('*').forEach((node) => {
    Array.from(node.attributes).forEach((attribute) => {
      const attributeName = attribute.name.toLowerCase()
      const attributeValue = attribute.value.trim().toLowerCase()

      if (attributeName.startsWith('on')) {
        node.removeAttribute(attribute.name)
        return
      }

      if (
        (attributeName === 'href' || attributeName === 'src') &&
        attributeValue.startsWith('javascript:')
      ) {
        node.removeAttribute(attribute.name)
      }
    })
  })

  return document.body.innerHTML
}

function RichText({ as: Component = 'div', className = '', html = '' }) {
  if (!html) {
    return null
  }

  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  )
}

export default RichText
