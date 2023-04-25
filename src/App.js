import RoutesApp from './routes';
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AuthProvider from './contexts/auth';


function App() {
  return(
    <div>
      <BrowserRouter>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            limit={5}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        <AuthProvider>
          <RoutesApp/>
        </AuthProvider>
      </BrowserRouter>   
    </div> 
  )
}

export default App;
