const authCodes = [
  {
    code: 2000,
    message: "El ",
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
