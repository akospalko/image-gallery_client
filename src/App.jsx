import './App.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import ToggleModalContext from './components/contexts/ToggleModalContext'

function App() {
  return (
    <div className="App">
      <ToggleModalContext>
        {/* Header */}
        <Header />
        {/* Page content */}
        <PageContent />
        {/* Page footer */}
      </ToggleModalContext>
    </div>
  )
}

export default App