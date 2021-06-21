import moment from "moment-timezone";
import { authInstance } from "../../helpers/AuthType/axios";

export const getClients = (query, setIsLoading, completed = true) =>
  new Promise(async (resolve) => {
    const search = query.search;
    let URL = `/admin/users?type=client&page=${query.page + 1}&qty=${query.pageSize}&completed=${completed}`;
    let users = [];
    let res;

    if (search) {
      if (search.length >= 5) {
        URL = `/admin/users?type=client&page=${query.page + 1}&qty=40000&completed=true&search=${query.search.toLowerCase()}`;
        res = await authInstance.get(URL, { timeout: 20000 });
      }
    } else res = await authInstance.get(URL);

    if (res && res.data) {
      users = res.data.users.map((user) => ({
        id: user.id,
        userName: user.profiles.first_name + " " + user.profiles.last_name,
        email: user.email,
        document: user.profiles.document_type + " " + user.profiles.document_identification,
        phone: user.phone,
        date: moment(user.createdAt).format("DD/MM/YY HH:mm a"),
        status: !!+user.active,
      }));
    }

    setIsLoading(false);
    resolve({
      data: users,
      page: query.page,
      totalCount: res && res.data ? res.data.count : 0,
    });
  });
