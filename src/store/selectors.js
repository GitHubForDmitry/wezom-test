import { createSelector } from 'reselect'

const visibilityFilter = state => state.visibilityFilter
const data = state => state.cards.items;

export const getVisibleCardsFilteredByKeyword = createSelector(
    [data, visibilityFilter],
    (data, visibilityFilter) =>
        data.filter(
            person => [person.name.first]
                .join('').toLowerCase().includes(visibilityFilter.toLowerCase())
))

