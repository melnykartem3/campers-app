import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import LocationInput from '../LocationInput/LocationInput.jsx';
import VehicleEquipment from '../VehicleEquipment/VehicleEquipment.jsx';
import VehicleType from '../VehicleType/VehicleType.jsx';
import { selectFilters } from '../../redux/filters/selectors.js';
import { changeFilter } from '../../redux/filters/slice.js';
import css from './FilterForm.module.css';

const filterSchema = Yup.object().shape({
  location: Yup.string(),
  form: Yup.string(),
  features: Yup.array(),
});

export default function FilterForm() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={{
          location: filters.location,
          form: filters.form,
          features: filters.features,
        }}
        validationSchema={filterSchema}
        onSubmit={values => {
          dispatch(changeFilter(values));
        }}
      >
        <Form className={css.filterForm}>
          <LocationInput />
          <VehicleEquipment />
          <VehicleType />
          <button type="submit" className={css.searchBtn}>
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
}
