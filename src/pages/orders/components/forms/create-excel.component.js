import React from "react";
import { Button, Spinner } from "reactstrap";
import { useFormik } from "formik";
import { getExchangesRelationInit } from "../../../../store/actions";

import { DateInput } from "../../../../components/UI/FormItems/date-picker.component";
import Select from "../../../../components/UI/FormItems/Select";

export const CreateExcel = ({ isProcessing, dispatch }) => {
  const formik = useFormik({ initialValues: { start: "", statusId: "", end: "", bank: "" }, onSubmit: (values) => dispatch(getExchangesRelationInit(values)) });

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
        <Select label="Banco (opcional)" name="bank" options={bankOptions} onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <Select label="Estado (opcional)" name="statusId" options={statusOptions} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      </div>
      <div className="flex justify-center mt-1 mb-3">
        <Button type="submit" disabled={!formik.isValid || isProcessing} className="btn-primary">
          {isProcessing ? <Spinner size="sm" /> : "Descargar relación"}
        </Button>
      </div>
    </form>
  );
};
