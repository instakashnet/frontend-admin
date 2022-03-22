import { authInstance } from "../../api/axios";

export const getClients = ({ search, pageCount, completed }) =>
  new Promise(async (resolve, reject) => {
    let URL = `/users?type=client&page=${pageCount}&qty=50&completed=${completed}`;
    if (search) URL = `${URL}&search=${search.toLowerCase()}`;
    let users = [];

    try {
      const res = await authInstance(URL);

      users = res.data.users.map((user) => ({
        id: user.id,
        userName: user.first_name + " " + user.last_name,
        email: user.email,
        document: user.document_type + " " + user.document_identification,
        phone: user.phone,
        date: user.createdAt,
        status: !!+user.active,
      }));

      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
