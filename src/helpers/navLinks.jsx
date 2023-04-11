import Icon from '@heroicons/react/24/outline'

export const generalLinks = {
  title: 'Principal',
  links: [
    {
      path: '/dashboard',
      icon: <Icon.ChartBarSquareIcon className='w-5 h-5' />,
      label: 'Actividad',
      roles: ['admin', 'appraiser', 'manager', 'accountant', 'marketing']
    },
    {
      path: '/bank-accounts',
      icon: <Icon.BanknotesIcon className='w-5 h-5' />,
      label: 'Cuentas bancarias',
      roles: ['admin', 'appraiser', 'manager', 'accountant']
    },
    {
      path: '/bank-orders',
      icon: <Icon.BuildingOffice2Icon className='w-5 h-5' />,
      label: 'Pedidos a caja',
      roles: ['admin', 'appraiser', 'manager', 'accountant']
    },
    {
      path: '/forex',
      icon: <Icon.CurrencyDollarIcon className='w-5 h-5' />,
      label: 'Precio del dolar',
      roles: ['admin', 'appraiser', 'accountant']
    }
  ]
}

export const ordersLinks = {
  title: 'Ordenes y retiros',
  links: [
    {
      path: '/!#',
      icon: <Icon.ArrowPathRoundedSquareIcon className='w-5 h-5' />,
      label: 'Ordenes',
      subNavs: [
        {
          path: '/exchanges/recent',
          label: 'Ordenes recientes'
        },
        {
          path: '/exchanges/all',
          label: 'Lista de ordenes'
        }
      ]
    },
    {
      path: '/withdrawals/all',
      icon: <Icon.CircleStackIcon className='w-5 h-5' />,
      label: 'Retiros KASH'
    }
  ]
}

export const configLinks = {
  title: 'Configuraciones generales',
  links: [
    {
      path: '/!#',
      icon: <Icon.UsersIcon className='w-5 h-5' />,
      label: 'Usuarios',
      roles: ['admin', 'manager', 'marketing', 'accountant'],
      subNavs: [
        {
          path: '/users-list',
          label: 'Lista de usuarios',
          roles: ['admin', 'manager', 'marketing', 'accountant']
        },
        {
          path: '/users-accounts',
          label: 'Cuentas de usuarios',
          roles: ['admin', 'manager', 'accountant']
        }
      ]
    },
    {
      path: '/operators',
      icon: <Icon.UserCircleIcon className='w-5 h-5' />,
      label: 'Lista de operadores',
      roles: ['admin', 'manager', 'signatory']
    },
    {
      path: '/schedule',
      icon: <Icon.ClockIcon className='w-5 h-5' />,
      label: 'Horarios',
      roles: ['admin']
    },
    {
      path: '/coupons',
      icon: <Icon.ReceiptPercentIcon className='w-5 h-5' />,
      label: 'Cupones de descuento',
      roles: ['admin', 'manager', 'marketing']
    },
    {
      path: '/banks',
      icon: <Icon.BuildingLibraryIcon className='w-5 h-5' />,
      label: 'Bancos aceptados',
      roles: ['admin', 'appraiser', 'accountant']
    },
    {
      path: '/status',
      icon: <Icon.BellAlertIcon className='w-5 h-5' />,
      label: 'Estados de operaciones',
      roles: ['admin']
    }
  ]
}
