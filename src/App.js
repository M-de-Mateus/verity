import RoutesApp from './routes/Routes';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';

function App() {
  return(
    <div>
      <BrowserRouter>
        <AuthProvider>
          <RoutesApp/>
        </AuthProvider>
      </BrowserRouter>   
    </div> 
  )
}

export default App;
