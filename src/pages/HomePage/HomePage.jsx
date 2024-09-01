import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation/Navigation.jsx';
import css from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/catalog');
  };

  return (
    <>
      <Navigation />
      <section className={css.homePageSection}>
        <div className={css.textWrapper}>
          <h1 className={css.homePageTitle}>Campers of your dreams</h1>
          <p className={css.homePageParagraph}>
            You can find everything you want in our catalog
          </p>
          <button className={css.homePageBtn} onClick={handleButtonClick}>
            View Now
          </button>
        </div>
      </section>
    </>
  );
}
