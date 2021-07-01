import { all } from "redux-saga/effects";

//public
import AuthSaga from "./auth/login/saga";
import LayoutSaga from "./layout/saga";
import BanksSaga from "./settings/banks/saga";
import DataSaga from "./settings/data/saga";

// settings
import CurrencyExchangeSaga from "./transactions/currencyExchange/saga";
import CashAdvanceSaga from "./transactions/cashAdvance/saga";
import WithdrawalsSaga from "./transactions/withdrawals/saga";

import BankAccountsSaga from "./bankAccounts/saga";

// private
import AdminUsersSaga from "./auth/admin/saga";
import BinnacleSaga from "./activity/binnacle/saga";
import forexSaga from "./forex/saga";
import ClientsSaga from "./settings/clients/saga";
import StatusSaga from "./settings/status/saga";
import CountersSaga from "./activity/counters/saga";
import ScheduleSaga from "./settings/schedule/saga";
import CouponsSaga from "./settings/coupons/saga";
import ChartsSaga from "./charts/saga";

export default function* rootSaga() {
  yield all([
    //public
    AuthSaga(),
    //private
    DataSaga(),
    AdminUsersSaga(),
    BanksSaga(),
    LayoutSaga(),
    // transacions
    CurrencyExchangeSaga(),
    CashAdvanceSaga(),
    WithdrawalsSaga(),

    CouponsSaga(),
    BinnacleSaga(),
    forexSaga(),
    BankAccountsSaga(),
    ClientsSaga(),
    StatusSaga(),
    CountersSaga(),
    ScheduleSaga(),
    ChartsSaga(),
  ]);
}
