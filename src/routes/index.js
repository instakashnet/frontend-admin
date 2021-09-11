import React from "react";
import { lazily } from "react-lazily";
import { Redirect } from "react-router-dom";

// Authentication related pages
import { LoginScreen, ScheduleScreen, CouponsScreen, BanksScreen, ClientsScreen, ClientsAccountsScreen, StatusScreen } from "../pages";

// LAZY IMPORTS
const { DashboardScreen } = lazily(() => import("../pages/Dashboard/dashboard.screen"));
const { BankAccountsScreen } = lazily(() => import("../pages/BankAccounts/bank-accounts.screen"));
const { ForexScreen } = lazily(() => import("../pages/Forex/forex.screen"));
const { ExchangesScreen } = lazily(() => import("../pages/orders/containers/exchanges.screen"));
const { ExchangeDetailsScreen } = lazily(() => import("../pages/orders/containers/exchange-details.screen"));
const { WithdrawalsScreen } = lazily(() => import("../pages/orders/containers/withdrawals.screen"));
const { WithdrawalDetailsScreen } = lazily(() => import("../pages/orders/containers/withdrawal-details.screen"));
const { BankOrdersScreen } = lazily(() => import("../pages/orders/containers/bank-orders.screen"));
const { BankOrderDetailsScreen } = lazily(() => import("../pages/orders/containers/bank-order-details.screen"));
const { ClientDetailsScreen } = lazily(() => import("../pages/settings/Users/containers/client-details.screen"));

const adminRoutes = [
  { path: "/dashboard", component: DashboardScreen },
  { path: "/bank-accounts", component: BankAccountsScreen },
  { path: "/forex", component: ForexScreen },
  { path: "/bank-orders", component: BankOrdersScreen },
  { path: "/bank-order-details/:id", component: BankOrderDetailsScreen },
  { path: "/exchanges/all", component: ExchangesScreen },
  { path: "/exchange-details/:id", component: ExchangeDetailsScreen },
  { path: "/withdrawals/all", component: WithdrawalsScreen },
  { path: "/withdrawal-details/:id", component: WithdrawalDetailsScreen },

  // Settings
  { path: "/schedule", component: ScheduleScreen },
  { path: "/coupons", component: CouponsScreen },
  { path: "/banks", component: BanksScreen },
  { path: "/users-list", component: ClientsScreen },
  { path: "/users-accounts", component: ClientsAccountsScreen },
  { path: "/user-details/:id", component: ClientDetailsScreen },
  { path: "/status", component: StatusScreen },

  // // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const officersRoutes = [
  { path: "/dashboard", component: DashboardScreen },
  { path: "/bank-accounts", component: BankAccountsScreen },
  { path: "/forex", component: ForexScreen },
  { path: "/bank-orders", component: BankOrdersScreen },
  { path: "/bank-order-details/:id", component: BankOrderDetailsScreen },
  { path: "/exchanges/all", component: ExchangesScreen },
  { path: "/exchange-details/:id", component: ExchangeDetailsScreen },
  { path: "/withdrawals/all", component: WithdrawalsScreen },
  { path: "/withdrawal-details/:id", component: WithdrawalDetailsScreen },

  // // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const ordersRoutes = [
  { path: "/exchanges/all", component: ExchangesScreen },
  { path: "/exchange-details/:id", component: ExchangeDetailsScreen },
  { path: "/withdrawals/all", component: WithdrawalsScreen },
  { path: "/withdrawal-details/:id", component: WithdrawalDetailsScreen },

  // // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/exchanges/all" /> },
];

const managerRoutes = [
  { path: "/dashboard", component: DashboardScreen },
  { path: "/bank-accounts", component: BankAccountsScreen },
  { path: "/forex", component: ForexScreen },
  { path: "/exchanges/all", component: ExchangesScreen },
  { path: "/exchange-details/:id", component: ExchangeDetailsScreen },
  { path: "/withdrawals/all", component: WithdrawalsScreen },
  { path: "/withdrawal-details/:id", component: WithdrawalDetailsScreen },

  // Settings
  { path: "/users-list", component: ClientsScreen },
  { path: "/users-accounts", component: ClientsAccountsScreen },
  { path: "/user-details/:id", component: ClientDetailsScreen },

  // // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/login", component: LoginScreen },
  /* 
  { path: "/pages-404", component: Pages404 }, */
];

export { adminRoutes as admin, officersRoutes as officers, ordersRoutes as orders, managerRoutes as manager, publicRoutes as public };
