import * as Yup from "yup";

export const validateAdminUserValues = (editForm) =>
  Yup.object().shape({
    UserName: Yup.string().required("Debes colocar un nombre de usuario."),
    Email: Yup.string().required("Debes colocar un correo de acceso.").email("Debes colocar un correo válido."),
    Password: !editForm ? Yup.string().required("Debes colocar una contraseña.") : Yup.string().notRequired(),
    ConfirmPassword: Yup.string().oneOf([Yup.ref("Password"), null], "Las contraseñas no coinciden."),
    IdRol: Yup.number().required("Debes seleccionar un rol de usuario."),
  });

export const validateLandingSettings = Yup.object().shape({
  contUsers: Yup.number().when("showRealStadistic", {
    is: false,
    then: Yup.number().required("Debes colocar un número de usuarios."),
    otherwise: Yup.number().notRequired(),
  }),
  contOps: Yup.number().when("showRealStadistic", {
    is: false,
    then: Yup.number().required("Debes colocar un número de operaciones."),
    otherwise: Yup.number().notRequired(),
  }),
  contSolesTransfer: Yup.number().when("showRealStadistic", {
    is: false,
    then: Yup.number().required("Debes colocar una cantidad de soles transferídos."),
    otherwise: Yup.number().notRequired(),
  }),
});

export const validateTransactionSettings = Yup.object().shape({
  merchantComment: Yup.string().required("Debes colocar la descripción de compra para los avances."),
  minutesToCancelOp: Yup.number().required("Debes colocar en minutos el limite de tiempo por operación."),
  timeToResponse: Yup.string().required("Debes colocar el tiempo de respuesta por operación."),
});

export const editExchangeValidation = Yup.object().shape({
  preferentialRate: Yup.number().when("isPreferential", {
    is: true,
    then: Yup.number().required("Debes colocar un tasa preferencial."),
    otherwise: Yup.number().notRequired(),
  }),
  amountSell: Yup.number().when("isPreferential", {
    is: true,
    then: Yup.number().required("Debes colocar un monto a recibir."),
    otherwise: Yup.number().notRequired(),
  }),
  amountReceive: Yup.number().when("isPreferential", {
    is: true,
    then: Yup.number().required("Debes colocar un monto a enviar."),
    otherwise: Yup.number().notRequired(),
  }),
});

export const validateUpdateCurrencyPrice = Yup.object().shape({
  toBuy2: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
  toBuy3: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
  toBuy4: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
  toBuy5: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
  toSell2: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
  toSell3: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
  toSell4: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
  toSell5: Yup.number()
    .required("Debes agregar un número")
    .test("is Positive?", "Debe ser entre 0 a 9", (value) => value >= 0),
});

export const validateCbAccountValues = Yup.object().shape({
  account_number: Yup.string()
    .required("Debes colocar un número de cuenta.")
    .matches(/^[0-9]{13,14}$/, "Colocar un número de cuenta válido."),
  cci: Yup.string()
    .required("Debes colocar una cuenta interbancaria.")
    .matches(/^[0-9]{20}$/, "Colocar un número de cuenta válido."),
  bankId: Yup.number().required("Debes seleccionar un banco."),
  currencyId: Yup.number().required("Debes seleccionar una moneda."),
});

export const couponValidations = Yup.object().shape({
  name: Yup.string().required("Debes colocar un nombre de cupón."),
  discount: Yup.number().required("Debes colocar un número."),
  qty_uses: Yup.number().when("indefinite", {
    is: false,
    then: Yup.number().required("Debes colocar un número."),
    otherwise: Yup.number().notRequired(),
  }),
});
