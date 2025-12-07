import HeaderNavigation from '../components/HeaderNavigation';
import Footer from '../components/Footer';
import SuccessfulOrderContent from '../components/SuccessfulOrder/SuccessfulOrderContent';

const SuccessfulOrderPage = () => {

  return (
    <div className="successful-order-wrapper">
      <header id="header" className="successful-order__header">
        <HeaderNavigation />
      </header>
      <main className="successful-order__main">
        <SuccessfulOrderContent />
        <div className="payment-page-wrapper"></div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default SuccessfulOrderPage;