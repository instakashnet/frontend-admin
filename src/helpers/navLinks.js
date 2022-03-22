export const generalLinks = [
  { title: "Principal", roles: ["admin", "officers", "manager"] },

  {
    path: "/dashboard",
    icon: "bx bx-home-circle",
    label: "Actividad",
    roles: ["admin", "officers", "manager", "accountant", "marketing"],
  },
  {
    path: "/bank-accounts",
    icon: "bx bx-wallet",
    label: "Cuentas bancarias",
    roles: ["admin", "officers", "manager", "accountant"],
  },
  // {
  //   path: "/bank-orders",
  //   icon: "bx bx-dollar",
  //   label: "Pedidos a caja",
  //   roles: ["admin", "officers"],
  // },
  {
    path: "/forex",
    icon: "bx bx-dollar-circle",
    label: "Precio del dolar",
    roles: ["admin", "officers", "accountant"],
  },
];

export const ordersLinks = [
  { title: "Ordenes y retiros", roles: ["admin", "officers", "manager", "orders", "signatory", "accountant", "marketing"] },
  {
    path: "/!#",
    icon: "bx bx-money",
    label: "Ordenes",
    roles: ["admin", "officers", "manager", "orders", "signatory", "accountant", "marketing"],
    subNavs: [
      {
        path: "/exchanges/recent",
        icon: "bx bx-list-ol",
        label: "Ordenes recientes",
        roles: ["admin", "officers", "manager", "signatory", "orders", "accountant"],
      },
      {
        path: "/exchanges/all",
        icon: "bx bx-list-check",
        label: "Lista de ordenes",
        roles: ["admin", "officers", "manager", "signatory", "orders", "accountant", "marketing"],
      },
    ],
  },
  {
    path: "/withdrawals/all",
    icon: "bx bx-list-ol",
    label: "Retiros KASH",
    roles: ["admin", "officers", "manager", "signatory", "orders", "accountant"],
  },
];

export const configLinks = [
  { title: "Configuraciones generales", roles: ["admin", "manager", "signatory", "accountant", "marketing"] },
  {
    path: "/!#",
    icon: "bx bx-user",
    label: "Usuarios",
    roles: ["admin", "manager", "marketing"],
    subNavs: [
      {
        path: "/users-list",
        icon: "bx bx-id-card",
        label: "Lista de usuarios",
        roles: ["admin", "manager", "marketing"],
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
    path: "/operators",
    icon: "bx bx-user-circle",
    label: "Lista de operadores",
    roles: ["admin", "manager", "signatory"],
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
    roles: ["admin", "manager", "marketing"],
  },
  {
    path: "/banks",
    icon: "mdi mdi-bank-outline",
    label: "Bancos aceptados",
    roles: ["admin", "officers", "accountant"],
  },
  {
    path: "/status",
    icon: "bx bx-sticker",
    label: "Estados de operaciones",
    roles: ["admin"],
  },
];
