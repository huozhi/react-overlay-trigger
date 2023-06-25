import './styles.css'

export default function layout({ children }) {
  return (
    <html>
      <head>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
  title: 'React Overlay Trigger',
}