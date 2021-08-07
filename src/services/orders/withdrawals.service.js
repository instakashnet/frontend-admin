import moment from "moment";
import camelize from "camelize";
import { exchangeInstance } from "../../helpers/AuthType/axios";

export const getAllWithdrawals = ({ search, pageCount }) => {
  return new Promise(async (resolve) => {
    let withdrawals = [];
    let URL = `/withdrawals`;

    try {
      const res = await exchangeInstance.get(URL);
      const withdrawalsData = camelize(res.data);

      withdrawals = withdrawalsData.map((withdrawal) => ({
        id: withdrawal.id,
        pedidoId: withdrawal.uuid,
        date: moment(withdrawal.createdAt).format("DD-MM-YYYY HH:mm"),
        user: withdrawal.firstName + " " + withdrawal.lastName,
        destinationBank: withdrawal.bankName.toLowerCase(),
        statusColor: withdrawal.statusColor,
        statusName: withdrawal.statusName,
        kashQty: withdrawal.kashQty + " KASH",
      }));

      resolve(withdrawals);
    } catch (error) {
      throw error;
    }
  });
};
