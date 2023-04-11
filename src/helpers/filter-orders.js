import moment from 'moment'
import { formatAmount } from './functions'
import camelize from 'camelize'

const ORDERS_BY_ROL = {
  analyst: (orders) => orders.filter((o) => o.statusId !== 5),
  operator: (orders) => orders.filter((o) => o.statusId === 4),
  signatory: (orders) => orders.filter((o) => o.statusId === 4 || o.statusId === 6)
}

export function arrangeOrdersByRole(orders = [], role) {
  let ordersList = orders
  const arrangeOrders = ORDERS_BY_ROL[role]

  if (arrangeOrders) ordersList = arrangeOrders(orders)

  if (role === 'analyst') {
    let validatingOrders = ordersList.filter((o) => o.statusId === 3).sort((o1, o2) => new Date(o1.date) - new Date(o2.date))
    let restOfOrders = ordersList.filter((o) => o.statusId !== 3)

    ordersList = [...validatingOrders, ...restOfOrders]
  } else if (role === 'signatory') {
    let processingOrders = ordersList.filter((o) => o.statusId === 4).sort((o1, o2) => new Date(o1.date) - new Date(o2.date))
    let successOrders = ordersList.filter((o) => o.statusId === 6)

    ordersList = [...processingOrders, ...successOrders]
  }

  const revisedOrders = orders.filter((ords) => ords.inReview)

  if (revisedOrders.length) {
    revisedOrders.sort((o1, o2) => new Date(o2.date) - new Date(o1.date))
    const notRevisedOrders = orders.filter((o) => !o.inReview)
    ordersList = revisedOrders.concat(notRevisedOrders)
  }

  return ordersList
}

export function setNewOrderList(newOrder, orders = []) {
  let ordersList = [...orders]
  const formattedOrder = createOrderObject(newOrder)
  const foundIndex = ordersList.findIndex((order) => order.id === formattedOrder.id)

  if (foundIndex >= 0) {
    ordersList.splice(foundIndex, 1, formattedOrder)
  } else {
    ordersList.unshift(formattedOrder)
  }

  return ordersList
}

export const formatBankOrders = (orders) =>
  orders.map((order) => ({
    id: order.id,
    orderId: order.uuid,
    date: moment(order.created).format('DD/MM/YYYY hh:mm a'),
    amountToSend: `${order.currencySentSymbol} ${formatAmount(order.amountSent)}`,
    amountToReceive: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
    bankOrigin: order.accFromBankName,
    bankDestination: order.accToBankName,
    rate: order.rate,
    statusName: order.stateName,
    statusColor: order.stateColor
  }))

export function filterOrders(data, orders = [], role) {
  let ordersList = []
  let ordersArray = []

  if (Boolean(Array.isArray(data) && data.length)) {
    ordersArray = camelize(data)
    ordersArray = formatOrders(ordersArray)
  }

  if (!Array.isArray(data)) {
    const singleOrder = camelize(data)
    ordersArray = setNewOrderList(singleOrder, orders)
  }

  ordersArray.sort((o1, o2) => new Date(o2.date) - new Date(o1.date))
  ordersList = arrangeOrdersByRole(ordersArray, role)

  return ordersList
}

const createOrderObject = (order) => ({
  id: order.id,
  pedidoId: order.uuid,
  date: order.completedAt ? moment(order.completedAt).format('DD/MM/YY hh:mm a') : 'Sin completar',
  user: order.firstName + ' ' + order.lastName,
  revision: order.inReview,
  amountSent: order.amountSent > 0 ? `${order.currencySentSymbol} ${formatAmount(order.amountSent)}` : `${order.kashUsed} KASH`,
  amountReceived: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
  rate: order.rate || 0,
  originBank: order.amountSent > 0 ? order.bankFromName : 'kash',
  destinationBank: order.accToBankName,
  statusId: order.stateID,
  statusName: order.stateName,
  statusColor: order.stateColor,
  invoice: order.billAssigned,
  companyName: order.razonSocial || '',
  inReview: order.inReview,
  note: order.orderNotes
})

export function formatOrders(orders = []) {
  let ordersIlst = orders.map((order) => createOrderObject(order))

  return ordersIlst
}
