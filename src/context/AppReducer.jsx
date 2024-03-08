/* eslint-disable no-case-declarations */
/* eslint-disable react-refresh/only-export-components */

export const getBasketTotal = (basket) => {
    return basket.reduce((amount, item) => {
        return amount + item.price;
    }, 0);
};

export const initialState = {
    basket: [],
    user: null
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {

        case "SET_USER":
            return {
                ...state,
                user: action.user
            };

        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]
            };

        case "REMOVE_FROM_BASKET":
            const updatedBasket = [...state.basket];
            const index = updatedBasket.findIndex((basketItem) => basketItem.id === action.id);
            if (index >= 0) {
                updatedBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.id}) as it is not in the basket!`);
            }
            return {
                ...state,
                basket: updatedBasket
            };

        case "EMPTY_BASKET":
            return {
                ...state,
                basket:[]
        }
        
        default:
            return state;
    }
};

export default AppReducer;
