import React from 'react';
import { Media } from 'reactstrap';
import { convertRate } from '../../../helpers/functions';
import { ArrowDownIcon, ArrowUpIcon, Bars2Icon } from '@heroicons/react/24/outline';

let icons = {
  down: <ArrowDownIcon className='w-5 h-5 text-danger' />,
  up: <ArrowUpIcon className='w-5 h-5 text-success' />,
  equal: <Bars2Icon className='w-5 h-5 text-blue' />,
};

export const ActualPrice = ({ rates }) => {
  let buyIcon = null,
    sellIcon = null;

  rates.reduce((a, b) => {
    if (a.buy < b.buy) {
      buyIcon = icons.down;
    } else if (a.buy > b.buy) {
      buyIcon = icons.up;
    } else {
      buyIcon = icons.equal;
    }

    if (a.sell < b.sell) {
      sellIcon = icons.down;
    } else if (a.sell > b.sell) {
      sellIcon = icons.up;
    } else {
      sellIcon = icons.equal;
    }
  });

  return (
    <Media>
      <Media body className='d-flex'>
        <div className='mx-2'>
          <p className='text-muted mb-2'>Compra</p>
          <h5 className='mb-0 flex items-center'>
            {convertRate(rates[0].buy)} <span className='ml-2'>{buyIcon}</span>
          </h5>
        </div>
        <div className='mx-2'>
          <p className='text-muted mb-2'>Venta</p>
          <h5 className='mb-0 flex items-center'>
            {convertRate(rates[0].sell)} <span className='ml-2'>{sellIcon}</span>
          </h5>
        </div>
      </Media>
    </Media>
  );
};
