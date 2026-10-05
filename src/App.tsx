import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased selection:bg-teal-500 selection:text-white">
        <Header />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
