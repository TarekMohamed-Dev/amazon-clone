export const getCheckoutProductContainerClass = (designVariant) => {
  if (designVariant === 'payment') {
return 'flex flex-col items-center my-10 border border-b-yellow-500 shadow-lg py-5'; // Add other classes as needed
  } else if (designVariant === 'checkout') {
    return 'grid grid-cols-5 '; // Add other classes as needed
  } else {
    return 'grid grid-cols-5'; // Default class or empty string
  }

};

export const getCheckoutProductButtonClass = (designVariant) => {
  if (designVariant === 'payment') {
    return 'button hidden'; // Add other classes as needed
  } else if (designVariant === 'checkout') {
    return 'button'; // Add other classes as needed
  } else if (designVariant === 'order') {
    return 'button hidden'; // Add other classes as needed
  } else {
    return 'button'; // Default class or any other default class
  }
};
export const getCheckoutProductImgClass = (designVariant) => {
  if (designVariant === 'payment') {
    return 'mb-3'; // Add other classes as needed
  } else if (designVariant === 'checkout') {
    return 'm-0'; // Add other classes as needed
  } else {
    return 'm-0'; // Default class or any other default class
    
  }
};