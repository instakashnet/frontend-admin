import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";
import Socket from "./socket/reducer";

// Settings
import AdminUsers from "./settings/users/reducer";
import Banks from "./settings/banks/reducer";
import Forex from "./settings/forex/reducer";
import BankAccounts from "./settings/bankAccounts/reducer";
import Clients from "./settings/clients/reducer";
import Status from "./settings/status/reducer";
import Schedule from "./settings/schedule/reducer";
import Data from "./settings/data/reducer";

// Activity
import Binnacle from "./activity/binnacle/reducer";
import Counters from "./activity/counters/reducer";

// Transactions
import CurrencyExchange from "./transactions/currencyExchange/reducer";
import CashAdvance from "./transactions/cashAdvance/reducer";
import Charts from "./charts/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Socket,
  // private
  Data,
  Account,
  AdminUsers,
  Banks,
  CurrencyExchange,
  CashAdvance,
  Binnacle,
  Forex,
  BankAccounts,
  Clients,
  Status,
  Counters,
  Schedule,
  Charts,
});

export default rootReducer;
