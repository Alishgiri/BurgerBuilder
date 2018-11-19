import Axios from "../../axios";
import * as actionTypes from "./actionTypes";

export const addIngredients = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredients = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const initIngredients = () => {
  return dispatch => {
    // Redux-thunk makes this dispatch available
    Axios.get("ingredients.json")
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
