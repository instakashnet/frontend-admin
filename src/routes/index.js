import React from 'react';
import { Redirect } from 'react-router-dom';

// Authentication related pages
import Login from '../pages/Authentication/Login';

// Dashboard
import Dashboard from '../pages/Dashboard/index';

import Pages404 from '../pages/Utility/404';

// LAZY IMPORTS

// Users
const AdminUsers = React.lazy(() => import('../pages/AdminUsers'));
const Clients = React.lazy(() => import('../pages/Clients'));
const ClientDetails = React.lazy(() => import('../pages/Clients/ClientDetails'));
// Transactions modules
const AllCurrencyExchanges = React.lazy(() => import('../pages/orders/CurrencyExchanges/AllOrders'));
const Withdrawals = React.lazy(() => import('../pages/orders/Withdrawals/AllOrders'));
const WithdrawalDetails = React.lazy(() => import('../pages/orders/Withdrawals/Details'));
const ExchangeDetails = React.lazy(() => import('../pages/orders/CurrencyExchanges/Details'));
// const CashAdvances = React.lazy(() => import('../pages/orders/CashAdvances'));
// System configuration
const Forex = React.lazy(() => import('../pages/Forex'));
const BankAccounts = React.lazy(() => import('../pages/banking/BankAccounts'));
const Status = React.lazy(() => import('../pages/settings/Status'));
const Coupons = React.lazy(() => import('../pages/Coupons'));
// Settings
const Banks = React.lazy(() => import('../pages/banking/Banks'));
const Countries = React.lazy(() => import('../pages/settings/Countries'));
const Schedule = React.lazy(() => import('../pages/settings/Schedule'));

const authProtectedRoutes = [
  { path: '/dashboard', component: Dashboard },

  // Users
  { path: '/admin-users', component: AdminUsers },
  { path: '/registered-users', component: Clients },
  { path: '/registered-users/:id', component: ClientDetails },
  // Transactions modules
  { path: '/currency-exchanges/orders', component: AllCurrencyExchanges },
  { path: '/exchange-details/:id', component: ExchangeDetails },
  { path: '/withdrawals/all-orders', component: Withdrawals },
  { path: '/withdrawal-details/:id', component: WithdrawalDetails },
  // { path: '/cash-advances', component: CashAdvances },

  // System configuration
  { path: '/forex', component: Forex },
  { path: '/bank-accounts', component: BankAccounts },
  { path: '/status', component: Status },
  { path: '/coupons', component: Coupons },
  // Settings
  { path: '/banks', component: Banks },
  { path: '/countries', component: Countries },
  { path: '/schedule', component: Schedule },

  // // this route should be at the end of all other routes
  { path: '/', exact: true, component: () => <Redirect to='/dashboard' /> },
];

const publicRoutes = [
  { path: '/login', component: Login },

  { path: '/pages-404', component: Pages404 },
];

export { authProtectedRoutes, publicRoutes };
