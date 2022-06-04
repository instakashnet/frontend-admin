import camelize from "camelize";
import moment from "moment";

export const convertHexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

export const shadeColor = (color, percent) => {
  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  var RR = R.toString(16).length === 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length === 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length === 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};

export const convertRate = (amount) => Number(amount).toFixed(4);

export const checkInterplaza = (bank, accNumber) => {
  const firstAccNumber = accNumber.substring(0, 1);

  return bank.toLowerCase() === "interbank" && +firstAccNumber >= 3 && +firstAccNumber <= 7;
};

export const formatAmount = (amount) => Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatOrders = (ordersData, type) => {
  let orders = [];
  const ordersInfo = camelize(ordersData);

  if (type === "bank-orders") {
    orders = ordersInfo.map((order) => ({
      id: order.id,
      orderId: order.uuid,
      date: moment(order.created).format("DD/MM/YYYY hh:mm a"),
      amountToSend: `${order.currencySentSymbol} ${formatAmount(order.amountSent)}`,
      amountToReceive: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
      bankOrigin: order.accFromBankName,
      bankDestination: order.accToBankName,
      rate: order.rate,
      statusName: order.stateName,
      statusColor: order.stateColor,
    }));
  } else {
    const revisedOrders = ordersInfo.filter((ords) => ords.orderNotes).sort((o1, o2) => new Date(o2.created) - new Date(o1.created)),
      notRevisedOrders = ordersInfo.filter((o) => !o.orderNotes),
      arrangedOrders = revisedOrders.concat(notRevisedOrders);

    orders = arrangedOrders.map((order) => ({
      id: order.id,
      pedidoId: order.uuid,
      date: order.completedAt ? moment(order.completedAt).format("DD/MM/YY hh:mm a") : "Sin completar",
      user: order.firstName + " " + order.lastName,
      revision: order.orderNotes,
      amountSent: order.amountSent > 0 ? `${order.currencySentSymbol} ${formatAmount(order.amountSent)}` : `${order.kashUsed} KASH`,
      amountReceived: `${order.currencyReceivedSymbol} ${formatAmount(order.amountReceived)}`,
      originBank: order.amountSent > 0 ? order.bankFromName : "kash",
      destinationBank: order.accToBankName,
      statusName: order.stateName,
      statusColor: order.stateColor,
      invoice: order.billAssigned,
      companyName: order.razonSocial || "",
    }));
  }

  return orders;
};
