import * as actionType from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENTS_PRICES = {
  meat: 1.2,
  bacon: 0.9,
  salad: 0.3,
  cheese: 0.5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
      };
      case actionType.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      }
      case actionType.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true
      }
    default:
      return state;
  }
};

export default reducer;
