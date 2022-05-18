import camelize from "camelize";
import { getAxiosInstance } from "../axios";

export const getClients = async (page, search, completed) => {
  let URL = `/users?type=client&page=${page}&qty=50&completed=${completed}`;
  if (search) URL = `${URL}&search=${search.toLowerCase()}`;

  try {
    const response = await getAxiosInstance("auth", "v1").get(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.users);
  } catch (error) {
    throw error;
  }
};

export const loadUserSvc = async () => {
  try {
    const response = await getAxiosInstance("auth", "v1").get("/users/session");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getAdminsWorkerSvc = async () => {
  try {
    const response = await getAxiosInstance("auth", "v1").get("/users/admins");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.admins);
  } catch (error) {
    throw error;
  }
};

export const getOperatorsWorkerSvc = async (online) => {
  const beOnline = online ? "?online=true" : "";
  try {
    const response = await getAxiosInstance("auth", "v1").get(`/users/operators${beOnline}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.admins;
  } catch (error) {
    throw error;
  }
};

export const getClientDetailsSvc = async (userId) => {
  try {
    const response = await getAxiosInstance("auth", "v1").get(`/users/user/${userId}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.user);
  } catch (error) {
    throw error;
  }
};

export const downloadClientsSvc = async (URL) => {
  try {
    const response = await getAxiosInstance("auth", "v1").get(URL, { responseType: "arraybuffer" });
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExchangesRelationSvc = async (URL) => {
  try {
    const response = await getAxiosInstance("auth", "v1").get(URL, { responseType: "arraybuffer" });
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUserSvc = async (values) => {
  try {
    const response = await getAxiosInstance("auth", "v1").post("/auth/signin", values);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};

export const logoutUserSvc = async () => {
  try {
    const response = await getAxiosInstance("auth", "v1").post("/auth/logout");
    if (response.status >= 400) throw new Error(response.errors[0]);

  } catch (error) {
    throw error;
  }
};

export const refreshTokenSvc = async () => {
  try {
    const response = await getAxiosInstance("auth", "v1").post("/auth/refresh");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data.accessToken;
  } catch (error) {
    throw error;
  }
};

export const addClientProfileSvc = async (values) => {
  try {
    const response = await getAxiosInstance("auth", "v1").post("/users/profiles", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const uploadDocumentSvc = async (URL, formData, setPercentage) => {
  try {
    const response = await getAxiosInstance("auth", "v1").post(URL, formData, {
      timeout: 99999,
      onUploadProgress: ({ loaded, total }) => {
        const percentage = Math.floor((loaded * 100) / total);
        if (percentage < 100) setPercentage(percentage);
      },
    });

    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const setOnlineSvc = async () => {
  try {
    const response = await getAxiosInstance("auth", "v1").put("/auth/online");
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const setOperatorOnlineSvc = async (userId) => {
  try {
    const response = await getAxiosInstance("auth", "v1").put(`/auth/online/${userId}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

  } catch (error) {
    throw error;
  }
};

export const editClientInfoSvc = async (userId, profileValues) => {
  try {
    const response = await getAxiosInstance("auth", "v1").put(`/users/user/${userId}`, profileValues);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editClientProfileSvc = async (values) => {
  try {
    const response = await getAxiosInstance("auth", "v1").put("/users/profiles", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const disableClientSvc = async (values) => {
  try {
    const response = await getAxiosInstance("auth", "v1").put("/users/access", values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};