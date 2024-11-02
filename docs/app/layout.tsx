import './styles.css'

export default function layout({ children }: { children: React.ReactNode }) {
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
  description: 'Tiny and simple popover library for React',


}