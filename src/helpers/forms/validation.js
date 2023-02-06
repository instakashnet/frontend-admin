import * as Yup from 'yup';

export const validateAdminUserValues = (editForm) =>
  Yup.object().shape({
    UserName: Yup.string().required('Debes colocar un nombre de usuario.'),
    Email: Yup.string().required('Debes colocar un correo de acceso.').email('Debes colocar un correo válido.'),
    Password: !editForm ? Yup.string().required('Debes colocar una contraseña.') : Yup.string().notRequired(),
    ConfirmPassword: Yup.string().oneOf([Yup.ref('Password'), null], 'Las contraseñas no coinciden.'),
    IdRol: Yup.number().required('Debes seleccionar un rol de usuario.'),
  });

export const validateLandingSettings = Yup.object().shape({
  contUsers: Yup.number().when('showRealStadistic', {
    is: false,
    then: Yup.number().required('Debes colocar un número de usuarios.'),
    otherwise: Yup.number().notRequired(),
  }),
  contOps: Yup.number().when('showRealStadistic', {
    is: false,
    then: Yup.number().required('Debes colocar un número de operaciones.'),
    otherwise: Yup.number().notRequired(),
  }),
  contSolesTransfer: Yup.number().when('showRealStadistic', {
    is: false,
    then: Yup.number().required('Debes colocar una cantidad de soles transferídos.'),
    otherwise: Yup.number().notRequired(),
  }),
});

export const validateTransactionSettings = Yup.object().shape({
  merchantComment: Yup.string().required('Debes colocar la descripción de compra para los avances.'),
  minutesToCancelOp: Yup.number().required('Debes colocar en minutos el limite de tiempo por operación.'),
  timeToResponse: Yup.string().required('Debes colocar el tiempo de respuesta por operación.'),
});

export const editExchangeValidation = Yup.object().shape({
  preferentialRate: Yup.number().when('isPreferential', {
    is: true,
    then: Yup.number().required('Debes colocar un tasa preferencial.'),
    otherwise: Yup.number().notRequired(),
  }),
  amountSell: Yup.number().when('isPreferential', {
    is: true,
    then: Yup.number().required('Debes colocar un monto a recibir.'),
    otherwise: Yup.number().notRequired(),
  }),
  amountReceive: Yup.number().when('isPreferential', {
    is: true,
    then: Yup.number().required('Debes colocar un monto a enviar.'),
    otherwise: Yup.number().notRequired(),
  }),
});

export const validateUpdateCurrencyPrice = Yup.object().shape({
  toBuy2: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
  toBuy3: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
  toBuy4: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
  toBuy5: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
  toSell2: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
  toSell3: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
  toSell4: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
  toSell5: Yup.number()
    .required('Debes agregar un número')
    .test('is Positive?', 'Debe ser entre 0 a 9', (value) => value >= 0),
});

export const validateCbAccountValues = Yup.object().shape({
  account_number: Yup.string()
    .required('Debes colocar un número de cuenta.')
    .matches(/^[0-9]{13,14}$/, 'Colocar un número de cuenta válido.'),
  cci: Yup.string()
    .required('Debes colocar una cuenta interbancaria.')
    .matches(/^[0-9]{20}$/, 'Colocar un número de cuenta válido.'),
  bankId: Yup.number().required('Debes seleccionar un banco.'),
  currencyId: Yup.number().required('Debes seleccionar una moneda.'),
});

export const couponValidations = Yup.object().shape({
  name: Yup.string().required('Debes colocar un nombre de cupón.'),
  qty_uses: Yup.number().when('indefinite', {
    is: false,
    then: Yup.number().required('Debes colocar un número.'),
    otherwise: Yup.number().notRequired(),
  }),
});

export const addPersonalAccountValidation = Yup.object().shape({
  account_number: Yup.string().when('isDirect', {
    is: true,
    then: Yup.string()
      .required('Debes ingresar el número de cuenta.')
      .matches(/^[0-9]{13,14}$/, 'Número de cuenta inválido. Solo números, de 13 a 14 caracteres.'),
    otherwise: Yup.string().notRequired(),
  }),
  cci: Yup.string().when('isDirect', {
    is: false,
    then: Yup.string()
      .required('Debes ingresar el número de cuenta interbancario.')
      .matches(/^[0-9]{20}$/, 'Número de CCI inválido. Solo números, 20 caracteres.'),
    otherwise: Yup.string().notRequired(),
  }),
  bankId: Yup.number().required('Debes seleccionar un banco.'),
  currencyId: Yup.string().required('Debes seleccionar una moneda.'),
  alias: Yup.string().required('Debes ingresar un alias.').min(5, 'Debe ser mínimo de 5 caracteres.').max(40, 'No deben ser más de 40 caracteres.'),
  accType: Yup.string().required('Debes seleccionar un tipo de cuenta.'),
  accept: Yup.boolean().oneOf([true], 'Debes declarar que esta cuenta es válida y pertenece al usuario.'),
  // Validaciones de cuenta mancomunada
  firstNameJoint: Yup.string().when('joint', {
    is: 'true',
    then: Yup.string().required('Debes colocar el nombre.'),
    otherwise: Yup.string().notRequired(),
  }),
  fatherSurname: Yup.string().when('joint', {
    is: 'true',
    then: Yup.string().required('Debes colocar el apellido paterno.'),
    otherwise: Yup.string().notRequired(),
  }),
  motherSurname: Yup.string().when('joint', {
    is: 'true',
    then: Yup.string().required('Debes colocar el apellido materno.'),
    otherwise: Yup.string().notRequired(),
  }),
  documentTypeJoint: Yup.string().when('joint', {
    is: 'true',
    then: Yup.string().required('Debes seleccionar un tipo de documento.'),
    otherwise: Yup.string().notRequired(),
  }),
  documentNumberJoint: Yup.string().when('joint', {
    is: 'true',
    then: Yup.string()
      .required('Debes colocar un nro. de documento.')
      .matches(/^[0-9]{8,13}$/, 'Número de documento ingresado inválido.'),
    otherwise: Yup.string().notRequired(),
  }),
});

export const addThirdPartyAccountSchema = Yup.object().shape({
  account_number: Yup.string().when('isDirect', {
    is: true,
    then: Yup.string()
      .required('Debes ingresar el número de cuenta.')
      .matches(/^[0-9]{13,14}$/, 'Número de cuenta inválido. Solo números, de 13 a 14 caracteres.'),
    otherwise: Yup.string().notRequired(),
  }),
  cci: Yup.string().when('isDirect', {
    is: false,
    then: Yup.string()
      .required('Debes ingresar el número de cuenta interbancario.')
      .matches(/^[0-9]{20}$/, 'Número de CCI inválido. Solo números, 20 caracteres.'),
    otherwise: Yup.string().notRequired(),
  }),
  bankId: Yup.number().required('Debes seleccionar un banco.'),
  currencyId: Yup.string().required('Debes seleccionar una moneda.'),
  alias: Yup.string().required('Debes ingresar un alias.').min(5, 'Debe ser mínimo de 5 caracteres.').max(40, 'No deben ser más de 40 caracteres.'),
  accType: Yup.string().required('Debes seleccionar un tipo de cuenta.'),
  accept: Yup.boolean().oneOf([true], 'Debes declarar que los datos son válidos.'),
  accept2: Yup.boolean().oneOf([true], 'Debes aceptar el consentimiento.'),
  email: Yup.string().required('Debes colocar un correo electrónico.').email('Coloca un correo válido.'),
  documentIdentity: Yup.string()
    .required('Debes colocar un nro. de documento.')
    .matches(/^[0-9]{8,13}$/, 'Número de documento ingresado inválido.'),
  documentType: Yup.string().required('Debes seleccionar un tipo de documento.'),
  razonSocial: Yup.string().when('thirdPartyAccType', {
    is: 'juridica',
    then: Yup.string().required('Debes colocar la razón social de la empresa.').min(3, 'La razón social de la empresa debe ser de al menos 3 caracteres.'),
    otherwise: Yup.string().notRequired(),
  }),
  name: Yup.string().when('thirdPartyAccType', {
    is: 'natural',
    then: Yup.string().required('Debes colocar un nombre completo.'),
    otherwise: Yup.string().notRequired(),
  }),
  job: Yup.string().when('thirdPartyAccType', {
    is: 'natural',
    then: Yup.string().required('Debes colocar una ocupación.'),
    otherwise: Yup.string().notRequired(),
  }),
});

export const editClientBankAccountSchema = Yup.object().shape({
  account_number: Yup.string().when('isDirect', {
    is: true,
    then: Yup.string()
      .required('Debes colocar un número de cuenta.')
      .matches(/^[0-9]{13,14}$/, 'Número de cuenta inválido. Solo números, de 13 a 14 caracteres.'),
    otherwise: Yup.string().notRequired(),
  }),
  cci: Yup.string().when('isDirect', {
    is: false,
    then: Yup.string()
      .required('Debes colocar un número de cuenta interbancario.')
      .matches(/^[0-9]{20}$/, 'Número de CCI inválido. Solo números, 20 caracteres.'),
    otherwise: Yup.string().notRequired(),
  }),
  alias: Yup.string().required('Debes ingresar un alias.').min(5, 'Debe ser mínimo de 5 caracteres.').max(40, 'No deben ser más de 40 caracteres.'),
});

export const sendNotificationValidations = Yup.object().shape({
  title: Yup.string().required('Es obligatorio el título de la notificación.').max(40, 'El título puede tener máximo 40 caracteres.'),
  body: Yup.string().required('Es obligatorio el mensaje de la notificación.').max(144, 'El mensaje puede tener máximo 144 caracteres.'),
});

export const editUserProfileSchema = Yup.object().shape({
  city: Yup.string().required('Debes ingresar la ciudad'),
  district: Yup.string().required('debes ingresar el distrito'),
  job: Yup.string().required('Debes ingresar la ocupación'),
  profession: Yup.string().required('Debes ingresar la profesión'),
  address: Yup.string().required('Debes ingresar la dirección'),
  date_birth: Yup.string().required('Debes sleeccionar la fecha de nacimiento'),
});
