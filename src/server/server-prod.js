import path from 'path'
import Express from 'express'

const app = Express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html')
          
app.use(Express.static(DIST_DIR))

app.get('*', (req, res) => {
  res.send(HTML_FILE)
})
  
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening to http://localhost:${PORT}`)
  console.log('Press Ctrl+C to quit.')
})
