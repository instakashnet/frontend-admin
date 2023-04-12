import moment from 'moment'
import { formatAmount } from './functions'
import camelize from 'camelize'

const ORDERS_BY_ROL = {
  analyst: (orders) => {
    const analystOrders = orders.filter((o) => o.statusId !== 5)
    const validatingOrders = analystOrders.filter((o) => o.statusId === 3).sort((o1, o2) => new Date(o1.date) - new Date(o2.date))
    const restOfOrders = analystOrders.filter((o) => o.statusId !== 3)

    return (ordersList = [...validatingOrders, ...restOfOrders])
  },
  operator: (orders) => orders.filter((o) => o.statusId === 4),
  signatory: (orders) => {
    const signatoryOrders = orders.filter((o) => o.statusId === 4 || o.statusId === 6)
    const processingOrders = signatoryOrders.filter((o) => o.statusId === 4).sort((o1, o2) => new Date(o1.date) - new Date(o2.date))
    const successOrders = signatoryOrders.filter((o) => o.statusId === 6)

    return (ordersList = [...processingOrders, ...successOrders])
  }
}

export function arrangeOrdersByRole(orders = [], role) {
  const arrangeOrders = ORDERS_BY_ROL[role]
  const ordersInRevision = orders.filter((ords) => ords.inReview)
  let ordersList = orders.filter((o) => !o.inReview)

  if (arrangeOrders) ordersList = arrangeOrders(ordersList)

  if (ordersInRevision.length > 0) ordersList = ordersInRevision.concat(ordersList)

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

// FIRST FILTER FUNCTION CALLED
export function filterOrders(data, orders = [], role) {
  let ordersList = []

  if (Boolean(Array.isArray(data) && data.length)) {
    const ordersArray = camelize(data)
    // FORMAT ORDERS ARRAY
    ordersList = formatOrders(ordersArray)
  }

  if (!Array.isArray(data)) {
    const singleOrder = camelize(data)
    // ADD OR REPLACE ORDER RECEIVED
    ordersList = setNewOrderList(singleOrder, orders)
  }

  // ARRANGE ORDERS BY ROL CONNECTED
  let ordersData = arrangeOrdersByRole(ordersList, role)

  return ordersData
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
