import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCampersById } from '../../redux/campers/operations.js';
import {
  selectError,
  selectLoading,
  selectSelectedCamper,
} from '../../redux/campers/selectors.js';
import Loader from '../../components/Loader/Loader.jsx';
import Error from '../../components/Error/Error.jsx';
import { IoStar } from 'react-icons/io5';
import { BsMap } from 'react-icons/bs';
import css from './CamperPage.module.css';
import Navigation from '../../components/Navigation/Navigation.jsx';
import Features from '../../components/Features/Features.jsx';

export default function CamperPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedCamper = useSelector(selectSelectedCamper);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCampersById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!selectedCamper || !selectedCamper.id) {
    return <div>No camper data available.</div>;
  }

  return (
    <>
      <Navigation />
      <div className={css.camperDetailWrapper}>
        <h1 className={css.camperName}>{selectedCamper.name}</h1>
        <div className={css.secondWrapper}>
          <IoStar className={css.ratingIcon} />
          <p className={css.camperRating}>
            {selectedCamper.rating} ({selectedCamper.reviews.length} reviews)
          </p>
          <BsMap className={css.locationIcon} />
          <p className={css.camperLocation}>{selectedCamper.location}</p>
        </div>
        <p className={css.camperPrice}>{`€${selectedCamper.price}.00`}</p>
        <div className={css.galleryWrapper}>
          {selectedCamper.gallery.map((image, index) => (
            <img
              key={index}
              src={image.original}
              alt={`${selectedCamper.name} image ${index + 1}`}
              className={css.galleryImage}
            />
          ))}
        </div>
        <p className={css.camperDescription}>{selectedCamper.description}</p>
      </div>
      <Features />
    </>
  );
}
