import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import TicketsChoicePage from './pages/TicketsChoicePage';
import SeatsPage from './pages/SeatsPage';
import PassengersPage from './pages/PassengersPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import SuccessfulOrderPage from './pages/SuccessfulOrderPage';
import ScrollToTop from './components/SrollToTop';

function App() {
  return (
    <Router basename="/diploma">
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/tickets" element={<TicketsChoicePage />}/>
          <Route path="/seats/:id" element={<SeatsPage />} />
          <Route path="/passengers" element={<PassengersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<OrderConfirmationPage />} />
          <Route path="/success" element={<SuccessfulOrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
