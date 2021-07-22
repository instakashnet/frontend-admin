import moment from "moment";
import { accountsInstance } from "../../helpers/AuthType/axios";
import { setAlert } from "../../store/actions";

export const getClientsAccounts = (query, setIsLoading, dispatch) =>
  new Promise(async (resolve) => {
    setIsLoading(true);
    const search = query.search;

    console.log(query);
    let URL = `/accounts/type/users?page=${query.page + 1}&qty=${query.pageSize}`;
    let accounts = [];
    let res;

    try {
      if (search) {
        if (search.length >= 5) res = await accountsInstance.get(URL + `&search=${query.search}`);
      } else res = await accountsInstance.get(URL);

      if (res && res.data) {
        accounts = res.data.accounts.map((acc) => ({
          accountNumber: acc.accountNUmber,
          accountType: `${acc.accountType === "checking" ? "Corriente" : "Ahorros"} - ${acc.currencySymbol}`,
          bankName: acc.bankName,
          createdAt: moment(acc.createdAt).format("DD-MM-YYYY HH:mm"),
          userName: acc.userName,
          userEmail: acc.userEmail,
        }));
      }

      setIsLoading(false);

      resolve({
        data: accounts,
        page: query.page,
        totalCount: 50,
      });
    } catch (error) {
      console.log(error);
      dispatch(setAlert("danger", "Ha ocurrido un error obteniendo las cuentas del os usuarios. Por favor intente más tarde."));
    }
  });
