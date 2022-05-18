import camelize from "camelize";
import { getAxiosInstance } from "../axios";

export const getAllOrders = async (page, search) => {
  let URL = `/order?page=${page}&qty=50`;
  if (search) URL = `${URL}&search=${search.toLowerCase()}`;

  try {
    const response = await getAxiosInstance("exchange", "v2").get(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data.orders);
  } catch (error) {
    throw error;
  }
};

export const getAllWithdrawals = async (page, search) => {
  let URL = `/withdrawals?page=${page}&qty=50`;
  if (search) URL = `${URL}&search=${search.toLowerCase()}`;

  try {
    const response = await getAxiosInstance("exchange", "v1").get(URL);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getCountersSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("/order/data/today");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getRevenueSvc = async (rate) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get(`/order/revenue?priceMarket=${rate}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getCurrencyBarChartSvc = async (chartType) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get(`/order/data/orders?type=${chartType}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdvanceBarChartSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("Estadisticas/GraficosAE");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUsersChartSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("/order/data/users");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForexSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("/forex");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getAllRatesSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("/rates/all");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForexRatesSvc = async (forexId) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get(`/rates/forex/${forexId}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClientExchangesSvc = async (userId) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get(`/order/user/${userId}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCouponsSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("/coupons");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getScheduleSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("/schedules");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getStatusSvc = async () => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get("/status");
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getWithdrawalDetailsSvc = async (id) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get(`/withdrawals/${id}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const getExchangeDetailsSvc = async (id) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").get(`/order/${id}`);
    if (response.status >= 400) throw new Error(response.errors[0]);

    return camelize(response.data);
  } catch (error) {
    throw error;
  }
};

export const addCurrencyPriceSvc = async (ratesValues) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").post("/rates", ratesValues);
    if (response.status >= 400) throw new Error(response.errors[0]);

  } catch (error) {
    throw error;
  }
};

export const addCouponSvc = async (couponValues) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").post("/coupons", couponValues);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const uploadVoucherSvc = async (orderId, formData) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").post(`/bills/order/attach-voucher/${orderId}`, formData);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const createInvoiceSvc = async (orderId) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").post(`/bills/order/${orderId}`);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const attachVoucherSvc = async (id, formData) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").post(`/withdrawals/order/attach-voucher/${id}`, formData);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editCouponSvc = async (id, couponValues) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/coupons/edit/${id}`, couponValues);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const disableCouponSvc = async (id, active) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/coupons/${id}`, { active });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editScheduleSvc = async (id, values) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/schedules/${id}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editStatusSvc = async (id, values) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/status/${id}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const editExchangeSvc = async (id, values) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/order/${id}`, values);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const changeOrderStatusSvc = async (id, status) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/order/update-status/${id}`, { status });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const validateExchangeSvc = async (orderId) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/order/status/${orderId}`, { status: 4 });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const declineExchangeSvc = async (orderId) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/order/status/${orderId}`, { status: 5 });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const approveExchangeSvc = async (orderId, transactionCode) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/order/status/${orderId}`, { status: 6, transactionCodeFinalized: transactionCode, finalizedAt: new Date() });

    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const reassignOrderSvc = async (orderId, reassignValues) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/order/assigned/${orderId}`, reassignValues);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const setRevisionSvc = async (orderId, noteValues) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put(`/order/notes/${orderId}`, noteValues);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const changeWithdrawalStatusSvc = async (id, statusId) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").put("/withdrawals/status", { id, status: statusId });
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};

export const deleteCouponSvc = async (id) => {
  try {
    const response = await getAxiosInstance("exchange", "v1").delete(`/coupons/${id}`);
    if (response.status >= 400) throw new Error(response.errors[0]);
  } catch (error) {
    throw error;
  }
};