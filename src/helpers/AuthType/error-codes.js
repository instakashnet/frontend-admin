const errorCodes = [
  {
    code: 2001,
    message: "El correo que intentas colocar ya está registrado en otro usuario.",
  },
  {
    code: 2003,
    message: "El teléfono que intentas colocar ya existe en otro usuario.",
  },
  {
    code: 2004,
    message: "Las credenciales no son correctas.",
  },
  {
    code: 2005,
    message: "El DNI que intentas ingresar ya existe en otro usuario.",
  },
  {
    code: 2007,
    message: "El RUC que intentas ingresar ya existe en otra empresa.",
  },
  {
    code: 2007,
    message: "El nro. de documento debe ser de al menos 8 caracteres.",
  },
  {
    code: 2008,
    message: "No tienes permiso para ingresar en la plataforma.",
  },
  {
    code: 2009,
    message: "Ese código de afiliado ya existe en otro usuario.",
  },
  {
    code: 2014,
    message: "El usuario que intentas editar no existe.",
  },
  {
    code: 2015,
    message: "El código de afiliado que intentas usar no existe en ningún usuario.",
  },
  { code: 4001, message: "No hay fondos suficientes en la cuenta para crear este pedido a caja." },
  { code: 4006, message: "No existe saldo suficiente para el monto que el cliente desea recibir." },
  { code: 4007, message: "El nro. de operación que intentas agregar ya ha sido usado el dia de hoy en otra opreración." },
  { code: 4014, message: "La nota no puede superar los 150 caracteres. Por favor valide los datos." },
  { code: 4015, message: "No hay operador disponible para poder asignar esta orden. Verifica que existe operador disponible para este banco y este monto." },
  { code: 4016, message: "La moneda de la cuenta que deseas reasignar es diferente a la monda que recibe el usuario." },
  { code: 4017, message: "El formato de archivo permitido es solamente PDF, JPG o PNG" },
];

export const getCodeMessage = (code) => {
  const selectedCode = errorCodes.find((c) => c.code === code);
  const message = selectedCode ? selectedCode.message : "Ha ocurrido un error inesperado, por favor intente de nuevo. Si el problema persiste contacte a soporte.";

  return message;
};
