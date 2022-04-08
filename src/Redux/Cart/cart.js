import cache from '../..';

const initialState = {
  cart: [],
};
const productsObject = cache.data.data;

const ADD_TO_CART = 'MINIMAL_STORE/CART/ADD_TO_CART';
const REMOVE_FROM_CART = 'MINIMAL_STORE/CART/REMOVE_FROM_CART';

export const addProductToCart = (id) => ({
  type: ADD_TO_CART,
  id,
});

export const removeProductFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [
          ...state.cart.map((product) => {
            const productData = productsObject[`Product:${action.id}`];
            if (product.id === productData.id) {
              return { ...product, quantity: product.quantity++ };
            } else {
              return { ...productData, quantity: 1 };
            }
          }),
        ],
      };

    default:
      return state;
  }
};

export default cartReducer;
