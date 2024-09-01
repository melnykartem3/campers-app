import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { BsMap } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa6';
import { IoStar } from 'react-icons/io5';
import { BsDiagram3 } from 'react-icons/bs';
import { BsFuelPump } from 'react-icons/bs';
import { BsCupHot } from 'react-icons/bs';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { FaWind } from 'react-icons/fa';
import { RiListRadio } from 'react-icons/ri';
import { FaTv } from 'react-icons/fa';
import { selectFavourites } from '../../redux/favourites/selectors.js';
import { toggleFavourite } from '../../redux/favourites/slice.js';
import css from './Camper.module.css';

export default function Camper({ camperData }) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);
  const isFavourite =
    Array.isArray(favourites) && favourites.includes(camperData.id);

  const handleToggleFavourite = () => {
    dispatch(toggleFavourite(camperData.id));
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <div className={css.camperWrapper}>
      {camperData.gallery[0].thumb && (
        <img
          src={camperData.gallery[0].thumb}
          alt={camperData.name}
          width={292}
          height={320}
          className={css.camperPhoto}
        />
      )}
      <div className={css.secondaryWrapper}>
        <div className={css.firstWrapper}>
          <h2 className={css.camperName}>{camperData.name}</h2>
          <div className={css.auxiliaryWrapper}>
            <p className={css.camperPrice}>{`€${camperData.price}.00`}</p>
            <FaRegHeart
              onClick={handleToggleFavourite}
              className={clsx(css.defaultIcon, {
                [css.favouriteIcon]: isFavourite,
              })}
            />
          </div>
        </div>
        <div className={css.secondWrapper}>
          <IoStar className={css.ratingIcon} />
          <p className={css.camperRating}>
            {camperData.rating} ({camperData.reviews.length} reviews)
          </p>
          <BsMap className={css.locationIcon} />
          <p className={css.camperLocation}>{camperData.location}</p>
        </div>
        <p className={css.camperDescription}>
          {truncateDescription(camperData.description, 100)}
        </p>
        <ul className={css.accessoriesList}>
          <li className={css.accessoriesListItem}>
            <BsDiagram3 className={css.accessoriesIcon} />
            {camperData.transmission}
          </li>
          <li className={css.accessoriesListItem}>
            <BsFuelPump className={css.accessoriesIcon} />
            {camperData.engine}
          </li>
          {camperData.kitchen && (
            <li className={css.accessoriesListItem}>
              <BsCupHot className={css.accessoriesIcon} />
              Kitchen
            </li>
          )}
          {camperData.bathroom && (
            <li className={css.accessoriesListItem}>
              <MdOutlineWaterDrop className={css.accessoriesIcon} />
              Bathroom
            </li>
          )}
          {camperData.AC && (
            <li className={css.accessoriesListItem}>
              <FaWind className={css.accessoriesIcon} />
              AC
            </li>
          )}
          {camperData.radio && (
            <li className={css.accessoriesListItem}>
              <RiListRadio className={css.accessoriesIcon} />
              Radio
            </li>
          )}
          {camperData.TV === true && (
            <li className={css.accessoriesListItem}>
              <FaTv className={css.accessoriesIcon} />
              TV
            </li>
          )}
        </ul>
        <Link to={`/catalog/${camperData.id}`}>
          <button type="button" className={css.showMoreBtn}>
            Show more
          </button>
        </Link>
      </div>
    </div>
  );
}
