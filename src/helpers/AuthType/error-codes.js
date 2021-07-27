const authCodes = [
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
];

const exchangeCodes = [
  { code: 4014, message: "La nota no puede superar los 150 caracteres. Por favor valide los datos." },
  { code: 4015, message: "Este operador no puede ser asignado para operación, verifica que el monto del pedido se encuentre en el rango para el operador." },
  { code: 4016, message: "La moneda de la cuenta que deseas reasignar es diferente a la monda que recibe el usuario." },
  { code: 4017, message: "El formato de archivo permitido es solamente PDF, JPG o PNG" },
];

export const getCodeMessage = (code, type) => {
  let selectedCode;
  let message;

  switch (type) {
    case "auth":
      selectedCode = authCodes.find((c) => c.code === code);
      message = selectedCode ? selectedCode.message : "Ha ocurrido un error inesperado, por favor intente de nuevo. Si el problema persiste contacte a soporte.";
      return message;
    case "exchange":
      selectedCode = exchangeCodes.find((c) => c.code === code);
      message = selectedCode ? selectedCode.message : "Ha ocurrido un error inesperado, por favor intente de nuevo. Si el problema persiste contacte a soporte.";
      return message;
    default:
      return "";
  }
};
