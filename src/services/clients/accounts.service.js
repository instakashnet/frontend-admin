import moment from "moment";
import { accountsInstance } from "../../helpers/AuthType/axios";

export const getClientsAccounts = ({ search, pageCount }) =>
  new Promise(async (resolve) => {
    let URL = `/accounts/type/users?page=${pageCount}&qty=50`;
    let accounts = [];

    if (search) URL = `${URL}&search=${search}`;

    try {
      const res = await accountsInstance(URL);

      accounts = res.data.accounts.map((acc) => ({
        accountNumber: acc.accountNUmber,
        accountType: `${acc.accountType === "checking" ? "Corriente" : "Ahorros"} - ${acc.currencySymbol}`,
        bankName: acc.bankName,
        createdAt: moment(acc.createdAt).format("DD-MM-YYYY HH:mm"),
        userName: acc.userName,
        userEmail: acc.userEmail,
      }));

      resolve(accounts);
    } catch (error) {
      throw error;
    }
  });
