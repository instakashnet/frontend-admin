import { useFormik } from "formik";
import { Button, Spinner } from "reactstrap";
import { getExchangesRelationInit } from "../../../../store/actions";

import Checkbox from "../../../../components/UI/FormItems/Checkbox";
import { DateInput } from "../../../../components/UI/FormItems/date-picker.component";
import Input from "../../../../components/UI/FormItems/Input";
import Select from "../../../../components/UI/FormItems/Select";

export const CreateExcel = ({ isProcessing, excelType, dispatch }) => {
  const formik = useFormik({
    initialValues: {
      start: "",
      statusId: "",
      end: "",
      bank: "",
      couponName: "",
      isDay: false,
      balanceFlag: false,
      initialAmountPENBCP: "",
      initialAmountUSDBCP: "",
      initialAmountPENIBK: "",
      initialAmountUSDIBK: "",
      rateInit: 0,
      rateEnd: 0,
    },
    onSubmit: (values) => dispatch(getExchangesRelationInit(values, excelType)),
  });

  const onChangeDateHandler = (name, date) => formik.setFieldValue(name, date);

  const bankOptions = [
    { value: "BCP", label: "BCP" },
    { value: "interbank", label: "Interbank" },
  ];

  const statusOptions = [
    { value: 3, label: "Validandose" },
    { value: 4, label: "Procesandose" },
    { value: 6, label: "Exitosas" },
    { value: 5, label: "Canceladas" },
  ];

  const date = new Date();

  return (
    <form onSubmit={formik.handleSubmit}>
      {excelType === "coupon" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="couponName" label="Nombre del cupón" value={formik.values.couponName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <Checkbox name="isDay" value={formik.values.isDay} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Descargar dia completo" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateInput
              value={formik.values.start}
              error={formik.errors.start}
              name="start"
              showTimeSelect
              maxDate={date}
              onChange={(date) => onChangeDateHandler("start", date)}
              label="Fecha desde"
              dateFormat="dd-MM-yyyy HH:mm"
            />
            <DateInput
              value={formik.values.end}
              error={formik.errors.end}
              name="end"
              showTimeSelect
              minDate={new Date(formik.values.start || date.setMonth(date.getMonth - 5))}
              onChange={(date) => onChangeDateHandler("end", date)}
              label="Fecha hasta"
              dateFormat="dd-MM-yyyy HH:mm"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Select label="Banco (opcional)" name="bank" options={bankOptions} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <Select label="Estado (opcional)" name="statusId" options={statusOptions} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          {formik.values.isDay && (
            <div className="flex items-center justify-center">
              <Checkbox name="balanceFlag" value={formik.values.balanceFlag} onChange={formik.handleChange} onBlur={formik.handleBlur} label="Agregar utilidad diaria" />
            </div>
          )}

          {formik.values.balanceFlag && formik.values.isDay && (
            <>
              <p>Saldos iniciales BCP</p>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="initialAmountPENBCP"
                  label="Soles S/."
                  value={formik.values.initialAmountPENBCP}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                />
                <Input
                  name="initialAmountUSDBCP"
                  label="Dólares $"
                  value={formik.values.initialAmountUSDBCP}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                />
              </div>
              <p>Saldos iniciales INTERBANK</p>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  name="initialAmountPENIBK"
                  label="Soles S/."
                  value={formik.values.initialAmountPENIBK}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                />
                <Input
                  name="initialAmountUSDIBK"
                  label="Dólares $"
                  value={formik.values.initialAmountUSDIBK}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input name="rateInit" label="Tasa apertura" value={formik.values.rateInit} onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" />
                <Input name="rateEnd" label="Tasa cierre" value={formik.values.rateEnd} onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" />
              </div>
            </>
          )}
        </>
      )}
      <div className="flex justify-center mt-1 mb-3">
        <Button type="submit" disabled={!formik.isValid || isProcessing} className="btn-primary">
          {isProcessing ? <Spinner size="sm" /> : "Descargar relación"}
        </Button>
      </div>
    </form>
  );
};
