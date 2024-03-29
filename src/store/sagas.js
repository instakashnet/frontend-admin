import { all } from 'redux-saga/effects'

//public
import AuthSaga from './auth/saga'
import LayoutSaga from './layout/saga'
import BanksSaga from './settings/banks/saga'
import DataSaga from './settings/data/saga'

// Transactions
import CurrencyExchangeSaga from './transactions/currencyExchange/saga'
import WithdrawalsSaga from './transactions/withdrawals/saga'
import BankAccountsSaga from './bankAccounts/saga'
import { bankOrdersSaga } from './transactions/bankOrders/saga'

// private
import { adminsSaga } from './settings/admin/saga'
import forexSaga from './forex/saga'
import ClientsSaga from './settings/clients/saga'
import StatusSaga from './settings/status/saga'
import ScheduleSaga from './settings/schedule/saga'
import CouponsSaga from './settings/coupons/saga'
// Activity
import CountersSaga from './activity/counters/saga'
import ChartsSaga from './charts/saga'
import { revenueSaga } from './activity/revenue/saga'

export default function* rootSaga() {
  yield all([
    //public
    LayoutSaga(),
    AuthSaga(),

    //private
    DataSaga(),
    adminsSaga(),
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
    ScheduleSaga(),

    // Activity
    revenueSaga(),
    CountersSaga(),
    ChartsSaga()
  ])
}
