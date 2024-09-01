import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation.jsx';
import { fetchCampers } from '../../redux/campers/operations.js';
import {
  selectCampers,
  selectError,
  selectLoading,
} from '../../redux/campers/selectors.js';
import Loader from '../../components/Loader/Loader.jsx';
import Error from '../../components/Error/Error.jsx';
import CampersList from '../../components/CampersList/CampersList.jsx';
import FilterForm from '../../components/FilterForm/FilterForm.jsx';
import { selectFilteredCampers } from '../../redux/filters/selectors.js';
import css from './CatalogPage.module.css';

export default function CatalogPage() {
  const dispatch = useDispatch();
  const filteredCampers = useSelector(selectFilteredCampers);
  const campers = useSelector(selectCampers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [camperCount, setCamperCount] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const handleClickBtn = () => {
    setCamperCount(prev => prev + 4);
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <>
      <Navigation />
      <div className={css.catalogPageWrapper}>
        {campers.length > 0 && <FilterForm />}
        {filteredCampers.length > 0 && (
          <CampersList
            filteredCampers={filteredCampers.slice(0, camperCount)}
          />
        )}
      </div>
      <div className={css.btnWrapper}>
        {filteredCampers.length > camperCount && (
          <button onClick={handleClickBtn} className={css.loadMoreBtn}>
            Load More
          </button>
        )}
      </div>
    </>
  );
}
