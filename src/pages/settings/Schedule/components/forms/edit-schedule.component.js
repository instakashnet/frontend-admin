import React from "react";
import { Card, CardBody, Button, Spinner } from "reactstrap";
import { useFormik } from "formik";
import { scheduleValues } from "../../../../../helpers/forms/values";

import Input from "../../../../../components/UI/FormItems/Input";
import Checkbox from "../../../../../components/UI/FormItems/Checkbox";
import Breadcrumbs from "../../../../../components/Common/Breadcrumb";

const EditSchedule = ({ isProcessing, data, onEdit }) => {
  const formik = useFormik({ initialValues: scheduleValues(data), enableReinitialize: true, onSubmit: (values) => onEdit(values, data.id) });

  return (
    <>
      <Breadcrumbs title="Horarios" breadcrumbItem="Editar horario" />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input name="startTime" label="Fecha de apertura" type="text" value={formik.values.startTime} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <Input name="endTime" label="Fecha de cierre" value={formik.values.endTime} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <Checkbox name="isWorkingDay" label="¿Es día laboral?" value={formik.values.isWorkingDay} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            <Button disabled={!formik.isValid || isProcessing} className="btn-primary">
              {isProcessing ? <Spinner size="sm" /> : "Actualizar horario"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(EditSchedule);
