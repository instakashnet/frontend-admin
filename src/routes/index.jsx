import { Redirect } from "react-router-dom";

// Authentication related pages
import {
  AllExchangesScreen,
  BankAccountsScreen,
  BankOrderDetailsScreen,
  BankOrdersScreen,
  BanksScreen,
  ClientDetailsScreen,
  ClientsAccountsScreen,
  ClientsScreen,
  CouponsScreen,
  DashboardScreen,
  ExchangeDetailsScreen,
  ForexScreen,
  OperatorsScreen,
  RecentExchangesScreen,
  ScheduleScreen,
  StatusScreen,
  WithdrawalDetailsScreen,
  WithdrawalsScreen,
} from "../pages";

export const routes = [
  { path: "/dashboard", component: DashboardScreen, roles: ["admin", "officers", "manager", "marketing", "accountant"] },
  { path: "/bank-accounts", component: BankAccountsScreen, roles: ["admin", "officers", "manager", "accountant"] },
  { path: "/forex", component: ForexScreen, roles: ["admin", "officers", "manager", "accountant"] },
  { path: "/bank-orders", component: BankOrdersScreen, roles: ["admin", "officers", "manager", "accountant"] },
  { path: "/bank-order-details/:id", component: BankOrderDetailsScreen, roles: ["admin", "officers", "accountant"] },
  { path: "/exchanges/recent", component: RecentExchangesScreen, roles: ["admin", "officers", "orders", "manager", "signatory", "accountant"] },
  { path: "/exchanges/all", component: AllExchangesScreen, roles: ["admin", "officers", "orders", "manager", "signatory", "marketing", "accountant"] },
  { path: "/exchange-details/:id", component: ExchangeDetailsScreen, roles: ["admin", "officers", "orders", "manager", "signatory", "marketing", "accountant"] },
  { path: "/withdrawals/all", component: WithdrawalsScreen, roles: ["admin", "officers", "orders", "manager", "signatory", "accountant"] },
  { path: "/withdrawal-details/:id", component: WithdrawalDetailsScreen, roles: ["admin", "officers", "orders", "signatory", "manager", "accountant"] },

  // Settings
  { path: "/schedule", component: ScheduleScreen, roles: ["admin"] },
  { path: "/coupons", component: CouponsScreen, roles: ["admin", "manager", "marketing"] },
  { path: "/banks", component: BanksScreen, roles: ["admin", "officers", "accountant"] },
  { path: "/users-list", component: ClientsScreen, roles: ["admin", "manager", "marketing"] },
  { path: "/users-accounts", component: ClientsAccountsScreen, roles: ["admin", "manager"] },
  { path: "/user-details/:id", component: ClientDetailsScreen, roles: ["admin", "manager", "marketing"] },
  { path: "/operators", component: OperatorsScreen, roles: ["admin", "manager", "signatory"] },
  { path: "/status", component: StatusScreen, roles: ["admin"] },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];
