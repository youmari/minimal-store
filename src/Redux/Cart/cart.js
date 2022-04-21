import cache from '../..';

const initialState = {
  cart: [],
};

const ADD_TO_CART = 'MINIMAL_STORE/CART/ADD_TO_CART';
const REMOVE_FROM_CART = 'MINIMAL_STORE/CART/REMOVE_FROM_CART';

export const addProductToCart = (id, attributes = []) => ({
  type: ADD_TO_CART,
  id,
  attributes,
});

export const removeProductFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  id,
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const productsObject = cache?.data?.data;
      const productData = productsObject[`Product:${action.id}`];
      const isProductInCart = state.cart.find(
        (item) => item.id === productData.id,
      );
      return {
        ...state,
        cart: !state.cart.length
          ? [
            ...state.cart,
            { ...productData, quantity: 1, attributes: action.attributes },
          ]
          : isProductInCart
            ? [
              ...state.cart.map((product) => {
                if (product.id !== productData.id) {
                  return product;
                }
                return {
                  ...product,
                  quantity: product.quantity + 1,
                  attributes: action.attributes,
                };
              }),
            ]
            : [
              ...state.cart,
              { ...productData, quantity: 1, attributes: action.attributes },
            ],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
