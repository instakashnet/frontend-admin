import React from "react";
import { Formik, Form } from "formik";
import { Card, CardBody, Button } from "reactstrap";
import { editClientValues } from "../../../helpers/forms/values";

import Breadcrumbs from "../../../components/Common/Breadcrumb";
import Input from "../../../components/UI/FormItems/Input";
import Select from "../../../components/UI/FormItems/Select";

const EditUser = (props) => {
  const { user, documentTypes } = props;
  const onSubmit = (values) => props.update(values, props.userId);

  return (
    <div className='container-fluid'>
      <Breadcrumbs title='Cliente' breadcrumbItem='Editar cliente' />
      <Card>
        <CardBody>
          <Formik initialValues={editClientValues(user)} onSubmit={onSubmit} enableReinitialize>
            {({ isValid, errors, touched }) => (
              <Form>
                <Input type='text' name='firstName' label='Primer Nombre' error={errors.firstName} touched={touched.firstName} />
                <Input type='text' name='lastName' label='Primer Apellido' error={errors.lastName} touched={touched.lastName} />
                <Input type='email' name='email' label='Correo electrónico' error={errors.email} touched={touched.email} />
                <Input type='tel' name='phoneNumber' label='Teléfono' error={errors.phone} touched={touched.phone} />
                <Select name='idDocumentType' label='Tipo de documento' error={errors.documentType} touched={touched.documentType}>
                  {documentTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.docTypeDes}
                    </option>
                  ))}
                </Select>
                <Input type='text' name='dniNumber' label='Nro. de documento' />
                <Input type='date' name='dateBirth' label='Fecha de nacimiento' />
                <Input type='text' name='address' label='Calle, Avenida, Distrito, Provincia' />
                <Input type='text' name='occupation' label='Ocupación' />
                <Input type='text' name='profession' label='Profesión' />
                <legend>Datos de empresa</legend>
                <Input type='text' name='RUCNumber' label='Nro. de documento' />
                <Input type='text' name='CompanyName' label='Razón social' />
                <Select name='isDisabled' label='Estado de cuenta'>
                  <option value={false}>Activa</option>
                  <option value={true}>Inactiva</option>
                </Select>

                <Button type='submit' color='primary' disabled={!isValid}>
                  Actualizar usuario
                </Button>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditUser;
