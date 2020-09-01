import React from "react";
import { connect } from "react-redux";
import { filterCards } from "../store/cardActions";
import {getProductsCollection} from "../store/cardSelectors";
import Search from "./Search";

const SearchContainer = ({ items, filterCards}) => {

    return (
        <Search cards={items} filterCards={filterCards}/>
    );
}


const makeMapStateToProps = (state) => {
    const getCards = getProductsCollection(state);
    const mapStateToProps = (state) => (getCards(state));
    return mapStateToProps;
}

const mapStateToProps = state => ({
    cards: makeMapStateToProps(state.cards.items),
    loading: state.cards.loading,
    error: state.cards.error
});

const mapDispatchToProps = {
    filterCards
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);