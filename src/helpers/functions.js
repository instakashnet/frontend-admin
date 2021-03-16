import React from 'react';

export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

export const checkInterplaza = (bank, accNumber) => {
  const firstAccNumber = accNumber.substring(0, 1);

  return bank.toLowerCase() === 'interbank' &&
    (firstAccNumber.substring(0, 1) === '3' ||
      firstAccNumber.substring(0, 1) === '4' ||
      firstAccNumber.substring(0, 1) === '6' ||
      firstAccNumber.substring(0, 1) === '5' ||
      firstAccNumber.substring(0, 1) === '7') ? (
    <p className='text-danger'>* La cuenta parece ser de provincia. Contactar al usuario.</p>
  ) : null;
};

export const formatAmount = (amount) => Number(amount).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
