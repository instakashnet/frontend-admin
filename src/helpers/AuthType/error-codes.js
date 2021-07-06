const authCodes = [
  {
    code: 2000,
    message: "No has enviado ni el email ni la contraseña.",
  },
  {
    code: 2004,
    message: "Las credenciales no son correctas.",
  },
];

export const getCodeMessage = (code, type) => {
  switch (type) {
    case "auth":
      return authCodes.find((c) => c.code === code).message;
    default:
      return "";
  }
};
