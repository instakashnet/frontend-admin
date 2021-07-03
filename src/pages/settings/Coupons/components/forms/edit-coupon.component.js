import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Button, Spinner } from "reactstrap";
import { useFormik } from "formik";
import moment from "moment";
import { addCouponInit, getCouponsDetailsInit, editCouponInit } from "../../../../../store/actions";
import { couponValidations } from "../../../../../helpers/forms/validation";

import Input from "../../../../../components/UI/FormItems/Input";
import Checkbox from "../../../../../components/UI/FormItems/Checkbox";
import AsyncSelect from "../../../../../components/UI/FormItems/AsyncSelect";
import Select from "../../../../../components/UI/FormItems/Select";

const EditCoupon = ({ couponId, isProcessing, onShowForm, clients }) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.Coupons.couponDetails);

  const formik = useFormik({
    initialValues: {
      name: details.name || "",
      discount: details.discount || "",
      qty_uses: details.qty_uses || "",
      affiliates: details.affiliates || false,
      indefinite: details.endDate <= 0 || false,
      users: details.users && details.users.length > 0 ? details.users : [],
      endDate: details.endDate ? moment(details.endDate).format("YYYY-MM-DD") : "",
      minAmountBuy: details.minAmountBuy || "",
      profileType: details.profileType || "all",
    },
    enableReinitialize: true,
    validationSchema: couponValidations,
    onSubmit: (values) => (couponId ? dispatch(editCouponInit(couponId, values, details.active, onShowForm)) : dispatch(addCouponInit(values, onShowForm))),
  });

  useEffect(() => {
    dispatch(getCouponsDetailsInit(couponId));
  }, [dispatch, couponId]);

  const profilesOptions = [
    { value: "all", label: "Todos" },
    { value: "natural", label: "Cliente" },
    { value: "juridica", label: "empresa" },
  ];

  const onClientChange = (options) => {
    if (!options) return;

    const clients = options.map((option) => option.value);
    formik.setFieldValue("users", clients);
  };

  return (
    <Card>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <Input
            name="name"
            type="text"
            label="Nombre del cupón"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.name}
            touched={formik.touched.name}
          />
          <Input
            name="discount"
            type="number"
            label="Descuento"
            value={formik.values.discount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.discount}
            touched={formik.touched.discount}
          />
          <Input
            name="qty_uses"
            type="number"
            label="Cantidad de usos"
            value={formik.values.qty_uses}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.qty_uses}
            touched={formik.touched.qty_uses}
          />
          <Checkbox name="affiliates" label="¿Solo para afiliados?" onChange={formik.handleChange} value={formik.values.affiliates} />
          <legend className="mt-2 text-base text-gray-500">Opcionales</legend>
          <hr />
          <Input
            name="minAmountBuy"
            type="number"
            label="Monto mínimo ($)"
            value={formik.values.minAmountBuy}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.minAmountBuy}
            touched={formik.touched.minAmountBuy}
          />
          <Checkbox name="indefinite" label="¿Uso indefinido?" onChange={formik.handleChange} value={formik.values.indefinite} />
          {!formik.values.indefinite && (
            <Input name="endDate" type="date" label="Fecha de expiración" value={formik.values.endDate} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          )}
          <AsyncSelect placeholder="selecciona usuarios" label="Asignación a usuarios" options={clients} onChange={onClientChange} value={formik.values.clients} isMulti />
          <Select name="profileType" label="Perfil de uso" value={formik.values.profileType} onChange={formik.handleChange} options={profilesOptions} />
          <div className="mt-2 flex justify-center">
            <Button type="submit" disabled={!formik.isValid || isProcessing} color="primary">
              {isProcessing ? <Spinner size="sm" /> : couponId ? "Editar cupón" : "Agregar cupón"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default React.memo(EditCoupon);
