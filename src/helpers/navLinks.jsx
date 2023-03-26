import Icon from '@heroicons/react/24/outline';

export const generalLinks = [
  { title: 'Principal', roles: ['admin', 'officers', 'manager'] },

  {
    path: '/dashboard',
    icon: <Icon.ChartBarSquareIcon className='w-5 h-5' />,
    label: 'Actividad',
    roles: ['admin', 'officers', 'manager', 'accountant', 'marketing'],
  },
  {
    path: '/bank-accounts',
    icon: <Icon.BanknotesIcon className='w-5 h-5' />,
    label: 'Cuentas bancarias',
    roles: ['admin', 'officers', 'manager', 'accountant'],
  },
  {
    path: '/bank-orders',
    icon: <Icon.BuildingOffice2Icon className='w-5 h-5' />,
    label: 'Pedidos a caja',
    roles: ['admin', 'officers', 'manager', 'accountant'],
  },
  {
    path: '/forex',
    icon: <Icon.CurrencyDollarIcon className='w-5 h-5' />,
    label: 'Precio del dolar',
    roles: ['admin', 'officers', 'accountant'],
  },
];

export const ordersLinks = [
  { title: 'Ordenes y retiros', roles: ['admin', 'officers', 'manager', 'orders', 'signatory', 'accountant', 'marketing'] },
  {
    path: '/!#',
    icon: <Icon.ArrowPathRoundedSquareIcon className='w-5 h-5' />,
    label: 'Ordenes',
    roles: ['admin', 'officers', 'manager', 'orders', 'signatory', 'accountant', 'marketing'],
    subNavs: [
      {
        path: '/exchanges/recent',
        label: 'Ordenes recientes',
        roles: ['admin', 'officers', 'manager', 'signatory', 'orders', 'accountant'],
      },
      {
        path: '/exchanges/all',
        label: 'Lista de ordenes',
        roles: ['admin', 'officers', 'manager', 'signatory', 'orders', 'accountant', 'marketing'],
      },
    ],
  },
  {
    path: '/withdrawals/all',
    icon: <Icon.CircleStackIcon className='w-5 h-5' />,
    label: 'Retiros KASH',
    roles: ['admin', 'officers', 'manager', 'signatory', 'orders', 'accountant'],
  },
];

export const configLinks = [
  { title: 'Configuraciones generales', roles: ['admin', 'manager', 'signatory', 'accountant', 'marketing'] },
  {
    path: '/!#',
    icon: <Icon.UsersIcon className='w-5 h-5' />,
    label: 'Usuarios',
    roles: ['admin', 'manager', 'marketing', 'accountant'],
    subNavs: [
      {
        path: '/users-list',
        label: 'Lista de usuarios',
        roles: ['admin', 'manager', 'marketing', 'accountant'],
      },
      {
        path: '/users-accounts',
        label: 'Cuentas de usuarios',
        roles: ['admin', 'manager', 'accountant'],
      },
    ],
  },
  {
    path: '/operators',
    icon: <Icon.UserCircleIcon className='w-5 h-5' />,
    label: 'Lista de operadores',
    roles: ['admin', 'manager', 'signatory'],
  },
  {
    path: '/schedule',
    icon: <Icon.ClockIcon className='w-5 h-5' />,
    label: 'Horarios',
    roles: ['admin'],
  },
  {
    path: '/coupons',
    icon: <Icon.ReceiptPercentIcon className='w-5 h-5' />,
    label: 'Cupones de descuento',
    roles: ['admin', 'manager', 'marketing'],
  },
  {
    path: '/banks',
    icon: <Icon.BuildingLibraryIcon className='w-5 h-5' />,
    label: 'Bancos aceptados',
    roles: ['admin', 'officers', 'accountant'],
  },
  {
    path: '/status',
    icon: <Icon.BellAlertIcon className='w-5 h-5' />,
    label: 'Estados de operaciones',
    roles: ['admin'],
  },
];
