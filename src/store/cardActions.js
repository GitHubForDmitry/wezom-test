export function fetchCards() {
    return dispatch => {
        dispatch(fetchCardsBegin());
        return fetch("https://randomuser.me/api/1.3?results=10")
            .then(handleErrors)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchCardsSuccess(data.results));
                return data.results
            })
            .catch(error => dispatch(fetchCardsFailure(error)));
    };
}


function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const FETCH_CARDS_BEGIN   = 'FETCH_CARDS_BEGIN';
export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS';
export const FETCH_CARDS_FAILURE = 'FETCH_CARDS_FAILURE';

export const fetchCardsBegin = () => ({
    type: FETCH_CARDS_BEGIN
});

export const fetchCardsSuccess = cards => ({
    type: FETCH_CARDS_SUCCESS,
    payload: { cards }
});


export const fetchCardsFailure = error => ({
    type: FETCH_CARDS_FAILURE,
    payload: { error }
});

export const FILTER_CARDS_BEGIN   = 'FILTER_CARDS_BEGIN';
export const FILTER_CARDS_SUCCESS = 'FILTER_CARDS_SUCCESS';
export const FILTER_CARDS_FAILURE = 'FILTER_CARDS_FAILURE';

export const filterCardsBegin = () => ({
    type: FETCH_CARDS_BEGIN
});

export const filterCardsSuccess = cards => ({
    type: FETCH_CARDS_SUCCESS,
    payload: { cards }
});

export const filterCardsFailure = error => ({
    type: FETCH_CARDS_FAILURE,
    payload: { error }
});

