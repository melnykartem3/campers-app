import { createSelector } from '@reduxjs/toolkit';
import { selectCampers } from '../campers/selectors.js';

export const selectLocationFilter = state => state.filters.location;
export const selectFormFilter = state => state.filters.form;
export const selectFeaturesFilter = state => state.filters.features;
export const selectFilters = state => state.filters;

export const selectFilteredCampers = createSelector(
  [selectCampers, selectLocationFilter, selectFormFilter, selectFeaturesFilter],
  (campers, locationFilter, formFilter, featuresFilter) => {
    return campers.filter(camper => {
      const filteredLocation = camper.location
        .toLowerCase()
        .includes(locationFilter.toLowerCase());
      const filteredForm = formFilter ? camper.form === formFilter : true;
      const filteredFeatures = featuresFilter.every(feature => {
        if (feature === 'automatic') {
          return camper['transmission'] === 'automatic';
        }
        return camper[feature] === true;
      });
      return filteredLocation && filteredForm && filteredFeatures;
    });
  },
);
