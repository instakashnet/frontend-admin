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
    path: "/bank-orders",
    icon: "bx bx-dollar",
    label: "Pedidos a caja",
    roles: ["admin", "officers"],
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
    label: "Ordenes recibidas",
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
    path: "/!#",
    icon: "bx bx-user",
    label: "Usuarios",
    roles: ["admin", "manager"],
    subNavs: [
      {
        path: "/users-list",
        icon: "bx bx-id-card",
        label: "Lista de usuarios",
        roles: ["admin", "manager"],
      },
      {
        path: "/users-accounts",
        icon: "bx bx-list-ol",
        label: "Cuentas de usuarios",
        roles: ["admin", "manager"],
      },
    ],
  },
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
    path: "/status",
    icon: "bx bx-sticker",
    label: "Estados de operaciones",
    roles: ["admin"],
  },
];
