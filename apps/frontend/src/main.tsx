import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import FileUpload from './file-upload'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <FileUpload />
  </StrictMode>,
)
