import { all } from 'redux-saga/effects';

//public
import AuthSaga from './auth/login/saga';
import LayoutSaga from './layout/saga';
import BanksSaga from './settings/banks/saga';
import DataSaga from './settings/data/saga';

// settings
import CurrencyExchangeSaga from './transactions/currencyExchange/saga';
import CashAdvanceSaga from './transactions/cashAdvance/saga';
import WithdrawalsSaga from './transactions/withdrawals/saga';

// private
import AdminUsersSaga from './settings/users/saga';
import BinnacleSaga from './activity/binnacle/saga';
import forexSaga from './settings/forex/saga';
import BankAccountsSaga from './settings/bankAccounts/saga';
import ClientsSaga from './settings/clients/saga';
import StatusSaga from './settings/status/saga';
import CountersSaga from './activity/counters/saga';
import ScheduleSaga from './settings/schedule/saga';
import ChartsSaga from './charts/saga';
import CouponsSaga from './coupons/saga';

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
