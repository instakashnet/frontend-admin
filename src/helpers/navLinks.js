export const generalLinks = [
  {
    path: "/dashboard",
    icon: "bx bx-home-circle",
    label: "Actividad",
    roles: ["admin", "officers", "manager"],
  },
  {
    path: "/bank-accounts",
    icon: "bx bx-wallet",
    label: "Cuentas bancarias",
    roles: ["admin", "officers", "manager"],
  },
  {
    path: "/forex",
    icon: "bx bx-dollar-circle",
    label: "Precio del dolar",
    roles: ["admin", "officers"],
  },
];

export const ordersLinks = [
  {
    path: "/exchanges/all",
    icon: "bx bx-list-check",
    label: "Operaciones recibidas",
    roles: ["admin", "officers", "manager", "orders"],
  },
  {
    path: "/withdrawals/all",
    icon: "bx bx-list-ol",
    label: "Retiros KASH",
    roles: ["admin", "officers", "manager", "orders"],
  },
];

export const configLinks = [
  {
    path: "/schedule",
    icon: "bx bx-calendar",
    label: "Horarios",
    roles: ["admin"],
  },
  {
    path: "/coupons",
    icon: "bx bxs-discount",
    label: "Cupones de descuento",
    roles: ["admin"],
  },
  {
    path: "/banks",
    icon: "mdi mdi-bank-outline",
    label: "Bancos aceptados",
    roles: ["admin"],
  },
  {
    path: "/registered-users",
    icon: "bx bx-user-circle",
    label: "Usuarios registrados",
    roles: ["admin", "manager"],
  },
  {
    path: "/status",
    icon: "bx bx-sticker",
    label: "Estados de operaciones",
    roles: ["admin"],
  },
];
