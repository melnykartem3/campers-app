import Camper from '../Camper/Camper.jsx';
import css from './CampersList.module.css';

export default function CampersList({ filteredCampers }) {
  return filteredCampers.length === 0 ? (
    <p className={css.text}>Sorry, no campers were found!</p>
  ) : (
    <ul className={css.campersList}>
      {filteredCampers.map(camper => (
        <li key={camper.id} className={css.campersListItem}>
          <Camper camperData={camper} />
        </li>
      ))}
    </ul>
  );
}
