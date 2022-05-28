import cache from '../..';

const initialState = {
  cart: [],
};
let num = 0;

const ADD_TO_CART = 'MINIMAL_STORE/CART/ADD_TO_CART';
const INCREMENT_AN_ITEM = 'MINIMAL_STORE/CART/INCREMENT_AN_ITEM';
const DECREMENT_AN_ITEM = 'MINIMAL_STORE/CART/DECREMENT_AN_ITEM';
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

export const incrementAnItem = (cartId) => ({
  type: INCREMENT_AN_ITEM,
  cartId,
});

export const decrementAnItem = (cartId) => ({
  type: DECREMENT_AN_ITEM,
  cartId,
});

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let cartId = null;
      let mt = 0;
      const attributeChecker = new Set();
      const productsObject = cache?.data?.data;
      const productData = productsObject[`Product:${action.id}`];
      const ProductInCart = state.cart.some(
        (item) => item.id === productData.id,
      );
      if (ProductInCart) {
        action.attributes.forEach((attribute) => {
          attributeChecker.add(attribute.value);
        });
        for (const cartItem of state.cart) {
          const { attributes } = cartItem;
          if (mt === attributeChecker.size) break;
          for (const attribute of attributes) {
            if (attributeChecker.has(attribute.value)) {
              cartId = cartItem.cartId;
              mt++;
            } else {
              mt = 0;
            }
          }
        }
        if (mt === attributeChecker.size) {
          return {
            ...state,
            cart: [
              ...state.cart.map((product) => {
                if (cartId !== product.cartId) {
                  return product;
                }
                return {
                  ...product,
                  quantity: product.quantity + 1,
                };
              }),
            ],
          };
        }
      }
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...productData,
            quantity: 1,
            attributes: action.attributes,
            cartId: num++,
          },
        ],
      };
    }
    case INCREMENT_AN_ITEM:
      return {
        ...state,
        cart: [
          ...state.cart.map((product) => {
            if (action.cartId !== product.cartId) {
              return product;
            }
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          }),
        ],
      };
    case DECREMENT_AN_ITEM:
      return {
        ...state,
        cart: [
          ...state.cart.map((product) => {
            if (action.cartId !== product.cartId) {
              return product;
            }
            if (product.quantity === 1) return product;
            return {
              ...product,
              quantity: product.quantity - 1,
            };
          }),
        ],
      };
    default:
      return state;
  }
};

export default cartReducer;
