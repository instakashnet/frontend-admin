import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useFormik } from "formik";
import { scheduleValues } from "../../helpers/forms/values";

import Input from "../../components/UI/FormItems/Input";
import Checkbox from "../../components/UI/FormItems/Checkbox";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const EditSchedule = (props) => {
  const formik = useFormik({ initialValues: scheduleValues(props.data), enableReinitialize: true, onSubmit: (values) => props.onEdit(values, props.data.id) });

  return (
    <>
      <Breadcrumbs title='Horarios' breadcrumbItem='Editar horario' />
      <Card>
        <CardBody>
          <form onSubmit={formik.handleSubmit}>
            <Input name='startTime' label='Fecha de apertura' type='text' value={formik.values.startTime} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <Input name='endTime' label='Fecha de cierre' value={formik.values.endTime} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            <Checkbox name='isWorkingDay' label='¿Es día laboral?' value={formik.values.isWorkingDay} onChange={formik.handleChange} onBlur={formik.handleBlur} />

            <Button disabled={!formik.isValid || props.isProcessing} className={`ld-ext-right ${props.isProcessing ? "running" : ""}`}>
              <div className='ld ld-ring ld-spin'></div>
              Actualizar horario
            </Button>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(EditSchedule);
