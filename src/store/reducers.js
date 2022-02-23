import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import Alert from "./alert/reducer";

// Settings
import Banks from "./settings/banks/reducer";
import Clients from "./settings/clients/reducer";
import Status from "./settings/status/reducer";
import Schedule from "./settings/schedule/reducer";
import Data from "./settings/data/reducer";
import Coupons from "./settings/coupons/reducer";

import BankAccounts from "./bankAccounts/reducer";
import Forex from "./forex/reducer";

// Dashboard
import Counters from "./activity/counters/reducer";
import { revenueReducer } from "./activity/revenue/reducer";

// Transactions
import CurrencyExchange from "./transactions/currencyExchange/reducer";
import Withdrawals from "./transactions/withdrawals/reducer";
import { bankOrdersReducer } from "./transactions/bankOrders/reducer";
import Charts from "./charts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import AdminUsers from "./auth/admin/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Alert,
  // private
  Data,
  AdminUsers,
  Banks,
  // transactions
  CurrencyExchange,
  Withdrawals,
  bankOrdersReducer,
  // settings
  Forex,
  BankAccounts,
  Clients,
  Status,
  Schedule,

  // Activity
  Counters,
  Charts,
  revenueReducer,
  // coupons
  Coupons,
});

export default rootReducer;
