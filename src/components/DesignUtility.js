export const getCheckoutProductContainerClass = (designVariant) => {
  if (designVariant === 'payment') {
return 'flex flex-col items-center my-10 border border-b-yellow-500 shadow-lg py-5';
  } else if (designVariant === 'checkout') {
    return 'grid grid-cols-5 ';
  } else {
    return 'grid grid-cols-5'; 
  }

};

export const getCheckoutProductButtonClass = (designVariant) => {
  if (designVariant === 'payment') {
    return 'button hidden';
  } else if (designVariant === 'checkout') {
    return 'button';
  } else if (designVariant === 'order') {
    return 'button hidden';
  } else {
    return 'button'; 
  }
};
export const getCheckoutProductImgClass = (designVariant) => {
  if (designVariant === 'payment') {
    return 'mb-3';
  } else if (designVariant === 'checkout') {
    return 'm-0'; 
  } else {
    return 'm-0'; 
    
  }
};