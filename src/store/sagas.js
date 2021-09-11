import { all } from "redux-saga/effects";

import socketConnectSaga from "./transactions/websocket/saga";

//public
import AuthSaga from "./auth/login/saga";
import LayoutSaga from "./layout/saga";
import BanksSaga from "./settings/banks/saga";
import DataSaga from "./settings/data/saga";

// Transactions
import CurrencyExchangeSaga from "./transactions/currencyExchange/saga";
import WithdrawalsSaga from "./transactions/withdrawals/saga";
import BankAccountsSaga from "./bankAccounts/saga";
import { bankOrdersSaga } from "./transactions/bankOrders/saga";

// private
import AdminUsersSaga from "./auth/admin/saga";
import forexSaga from "./forex/saga";
import ClientsSaga from "./settings/clients/saga";
import StatusSaga from "./settings/status/saga";
import CountersSaga from "./activity/counters/saga";
import ScheduleSaga from "./settings/schedule/saga";
import CouponsSaga from "./settings/coupons/saga";
import ChartsSaga from "./charts/saga";

export default function* rootSaga() {
  yield all([
    socketConnectSaga(),

    //public
    LayoutSaga(),
    AuthSaga(),
    //private
    DataSaga(),
    AdminUsersSaga(),
    BanksSaga(),
    // transacions
    CurrencyExchangeSaga(),
    WithdrawalsSaga(),
    bankOrdersSaga(),

    CouponsSaga(),
    forexSaga(),
    BankAccountsSaga(),
    ClientsSaga(),
    StatusSaga(),
    CountersSaga(),
    ScheduleSaga(),
    ChartsSaga(),
  ]);
}
