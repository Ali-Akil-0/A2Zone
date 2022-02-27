export const initialState = {
  basket: [],
};
//selector
export const getBasketTotal = (basket) => {
  // the reduce function
  return basket?.reduce((amount, item) => item.price + amount, 0);
};
// state of the application
// action add or remove from the datalayer
export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        // ...state.basket => whateever the basket was before
        // action.itle => the new itme
        // the new table will containt the old + the new
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      // we get the index of what we want to delete
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("Cannot remove product");
      }
      return {
        ...state,
        // ...state.basket => whateever the basket was before
        // action.itle => the new itme
        // the new table will containt the old + the new
        basket: newBasket,
      };

    default:
      return state;
  }
};
export default reducer;
