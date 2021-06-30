import React from "react";
import { lazily } from "react-lazily";
import { Redirect } from "react-router-dom";

// Authentication related pages
import { LoginScreen, ScheduleScreen, CouponsScreen, BanksScreen, ClientsScreen, StatusScreen } from "../pages";

// LAZY IMPORTS
const { DashboardScreen } = lazily(() => import("../pages/Dashboard/dashboard.screen"));
const { BankAccountsScreen } = lazily(() => import("../pages/BankAccounts/bank-accounts.screen"));
const { ForexScreen } = lazily(() => import("../pages/Forex/forex.screen"));
const { ExchangesScreen } = lazily(() => import("../pages/orders/containers/exchanges.screen"));
const { ExchangeDetailsScreen } = lazily(() => import("../pages/orders/containers/exchange-details.screen"));
const { WithdrawalsScreen } = lazily(() => import("../pages/orders/containers/withdrawals.screen"));
const { WithdrawalDetailsScreen } = lazily(() => import("../pages/orders/containers/withdrawal-details.screen"));
const { ClientDetailsScreen } = lazily(() => import("../pages/settings/clients/containers/client-details.screen"));

// Users
/* const Clients = React.lazy(() => import("../pages/settings/clients/containers/clients.screen"));
const ClientDetails = React.lazy(() => import("../pages/settings/clients/ClientDetails"));
// Transactions modules

const Withdrawals = React.lazy(() => import("../pages/orders/containers/withdrawals.screen"));
const WithdrawalDetails = React.lazy(() => import("../pages/orders/containers/withdrawal-details.screen"));


// System configuration
const Forex = React.lazy(() => import("../pages/Forex"));
const BankAccounts = React.lazy(() => import("../pages/banking/BankAccounts"));
const Status = React.lazy(() => import("../pages/settings/Status"));
const Coupons = React.lazy(() => import("../pages/Coupons"));
// Settings
const Banks = React.lazy(() => import("../pages/banking/Banks"));
const Countries = React.lazy(() => import("../pages/settings/Countries"));
const Schedule = React.lazy(() => import("../pages/settings/Schedule")); */

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardScreen },
  { path: "/bank-accounts", component: BankAccountsScreen },
  { path: "/forex", component: ForexScreen },
  { path: "/exchanges/all", component: ExchangesScreen },
  { path: "/exchange-details/:id", component: ExchangeDetailsScreen },
  { path: "/withdrawals/all", component: WithdrawalsScreen },
  { path: "/withdrawal-details/:id", component: WithdrawalDetailsScreen },

  // Settings
  { path: "/schedule", component: ScheduleScreen },
  { path: "/coupons", component: CouponsScreen },
  { path: "/banks", component: BanksScreen },
  { path: "/registered-users", component: ClientsScreen },
  { path: "/registered-users/:id", component: ClientDetailsScreen },
  { path: "/status", component: StatusScreen },

  // // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: LoginScreen },
  /* 
  { path: "/pages-404", component: Pages404 }, */
];

export { authProtectedRoutes, publicRoutes };
