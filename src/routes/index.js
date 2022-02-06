import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import {
  ScheduleScreen,
  CouponsScreen,
  BanksScreen,
  ClientsScreen,
  ClientsAccountsScreen,
  StatusScreen,
  DashboardScreen,
  BankAccountsScreen,
  ForexScreen,
  RecentExchangesScreen,
  AllExchangesScreen,
  ExchangeDetailsScreen,
  WithdrawalsScreen,
  WithdrawalDetailsScreen,
  // BankOrdersScreen,
  BankOrderDetailsScreen,
  ClientDetailsScreen,
} from "../pages";

export const routes = [
  { path: "/dashboard", component: DashboardScreen, roles: ["admin", "officers", "manager"] },
  { path: "/bank-accounts", component: BankAccountsScreen, roles: ["admin", "officers", "manager"] },
  { path: "/forex", component: ForexScreen, roles: ["admin", "officers", "manager"] },
  // { path: "/bank-orders", component: BankOrdersScreen, roles: ["admin", "officers"] },
  { path: "/bank-order-details/:id", component: BankOrderDetailsScreen, roles: ["admin", "officers"] },
  { path: "/exchanges/recent", component: RecentExchangesScreen, roles: ["admin", "officers", "orders", "manager"] },
  { path: "/exchanges/all", component: AllExchangesScreen, roles: ["admin", "officers", "orders", "manager"] },
  { path: "/exchange-details/:id", component: ExchangeDetailsScreen, roles: ["admin", "officers", "orders", "manager"] },
  { path: "/withdrawals/all", component: WithdrawalsScreen, roles: ["admin", "officers", "orders", "manager"] },
  { path: "/withdrawal-details/:id", component: WithdrawalDetailsScreen, roles: ["admin", "officers", "orders", "manager"] },

  // Settings
  { path: "/schedule", component: ScheduleScreen, roles: ["admin"] },
  { path: "/coupons", component: CouponsScreen, roles: ["admin", "manager"] },
  { path: "/banks", component: BanksScreen, roles: ["admin", "officers"] },
  { path: "/users-list", component: ClientsScreen, roles: ["admin", "manager"] },
  { path: "/users-accounts", component: ClientsAccountsScreen, roles: ["admin", "manager"] },
  { path: "/user-details/:id", component: ClientDetailsScreen, roles: ["admin", "manager"] },
  { path: "/status", component: StatusScreen, roles: ["admin"] },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];
