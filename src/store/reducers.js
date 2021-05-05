import { combineReducers } from 'redux';

// Front
import Layout from './layout/reducer';
// import Socket from "./socket/reducer";

// Settings
import Banks from './settings/banks/reducer';
import Forex from './settings/forex/reducer';
import BankAccounts from './settings/bankAccounts/reducer';
import Clients from './settings/clients/reducer';
import Status from './settings/status/reducer';
import Schedule from './settings/schedule/reducer';
import Data from './settings/data/reducer';

// Activity
import Binnacle from './activity/binnacle/reducer';
import Counters from './activity/counters/reducer';

// Transactions
import CurrencyExchange from './transactions/currencyExchange/reducer';
import Withdrawals from './transactions/withdrawals/reducer';
import CashAdvance from './transactions/cashAdvance/reducer';
import Charts from './charts/reducer';

// Authentication
import Login from './auth/login/reducer';
import AdminUsers from './auth/admin/reducer';

// Coupons
import Coupons from './coupons/reducer';

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  // private
  Data,
  AdminUsers,
  Banks,
  // transactions
  CurrencyExchange,
  CashAdvance,
  Withdrawals,
  // settings
  Binnacle,
  Forex,
  BankAccounts,
  Clients,
  Status,
  Counters,
  Schedule,
  Charts,
  // coupons
  Coupons,
});

export default rootReducer;
