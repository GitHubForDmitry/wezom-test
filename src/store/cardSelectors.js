import { createSelector } from 'reselect';

const _getProductsCollection = (state) => state;

/*
|--------------------------------------------------------------------------
| Products Collection
|--------------------------------------------------------------------------
*/
export const getProductsCollection = createSelector(
    [_getProductsCollection],
    (collection) => collection
);

export const getProductsCollectionList = createSelector(
    [getProductsCollection],
    (collection) => collection
);
