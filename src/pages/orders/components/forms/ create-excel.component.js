import React from "react";
import { Button, Spinner } from "reactstrap";
import { useFormik } from "formik";
import { getExchangesRelationInit } from "../../../../store/actions";

import { DateInput } from "../../../../components/UI/FormItems/date-picker.component";

export const CreateExcel = ({ isProcessing, dispatch }) => {
  const formik = useFormik({ initialValues: { start: "", end: "" }, onSubmit: (values) => dispatch(getExchangesRelationInit(values)) });

  const onChangeDateHandler = (name, date) => formik.setFieldValue(name, date);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateInput
          value={formik.values.start}
          error={formik.errors.start}
          name="start"
          showTimeSelect
          maxDate={new Date()}
          onChange={(date) => onChangeDateHandler("start", date)}
          label="Fecha desde"
          dateFormat="dd-MM-yyyy HH:mm"
        />
        <DateInput
          value={formik.values.end}
          error={formik.errors.end}
          name="end"
          showTimeSelect
          minDate={new Date()}
          onChange={(date) => onChangeDateHandler("end", date)}
          label="Fecha hasta"
          dateFormat="dd-MM-yyyy HH:mm"
        />
      </div>
      <div className="flex justify-center mt-3">
        <Button type="submit" disabled={!formik.isValid || isProcessing} className="btn-primary">
          {isProcessing ? <Spinner size="sm" /> : "Descargar relación"}
        </Button>
      </div>
    </form>
  );
};
