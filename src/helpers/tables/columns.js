import { AccountBalanceWallet, Block, Check, Clear, Close, Edit, PowerSettingsNewOutlined } from "@material-ui/icons";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
// COMPONENTS
import { ConnectedStatus } from "../../components/CommonForBoth/connected.component";
// CLASSES
import userAccountsClasses from "../../pages/settings/Users/components/modules/details/user-accounts-table.module.scss";
import userDetailsClasses from "../../pages/settings/Users/components/modules/details/user-details.module.scss";
// FUNCTIONS
import { convertHexToRGBA, shadeColor } from "../functions";


export const companyAccountsColumns = (showForm) => [
  {
    Header: "Banco",
    accessor: "bankName",
    Cell: ({ cell }) => <img src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} alt={cell.value} className="mr-2" width={70} />,
  },
  {
    Header: "Nro. de cuenta",
    accessor: "accNumber",
  },
  {
    Header: "Cuenta Interbancaria",
    accessor: "cci",
  },
  {
    Header: "Saldo",
    accessor: "balance",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    Header: "Acciones",
    Cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <button className="mx-2" onClick={() => showForm("edit", row.original)}>
          <Edit htmlColor="#f1b44c" />
        </button>
        <button className="mx-2" onClick={() => showForm("balance", row.original)}>
          <AccountBalanceWallet htmlColor="#f1b44c" />
        </button>
      </div>
    ),
  },
];

export const usersAccountsColumns = [
  {
    accessor: "accountNumber",
    Header: "Nro. de cuenta",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    accessor: "accountType",
    Header: "Tipo de cuenta",
  },
  {
    accessor: "bankName",
    Header: "Banco",
    Cell: ({ cell }) => <img src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} width={70} alt={cell.value} />,
  },
  {
    accessor: "userName",
    Header: "Nombre del usuario",
  },
  {
    accessor: "userEmail",
    Header: "Correo",
  },
  {
    accessor: "createdAt",
    Header: "Fecha de creación",
  },
];

// COLUMNS SEEN IN CLIENT DETAILS SCREEN
export const userAccountsColumns = [
  {
    accessor: "account_number",
    Header: "Número de cuenta",
    Cell: ({ cell, row }) => (
      <p className={`m-0 ${userDetailsClasses.whiteCellText}`}>
        {cell.value} <span className={userDetailsClasses.grayCellText}>-</span> {row.original.currency}
        <span className={`d-block ${userDetailsClasses.textMuted}`}>{row.original.balance || "Sin fondos"}</span>
      </p>
    ),
  },
  {
    accessor: "bank",
    Header: "Banco",
    Cell: ({ cell }) => <img src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} width={85} alt={cell.value.toLowerCase()} className={`mx-auto ${userAccountsClasses.bankImage}`} />,
  },
];

export const userAffiliatesColumns = [
  {
    accessor: "full_name",
    Header: "Nombre",
    Cell: ({ cell, row }) => (
      <p className={`m-0 ${userDetailsClasses.whiteCellText}`}>
        {cell.value}
        <span className={`d-block ${userDetailsClasses.textMuted}`}>{row.original.email}</span>
      </p>),
  },
  {
    accessor: "status",
    Header: "Estado",
    Cell: ({ cell }) => <span className="d-block text-center text-white">{cell.value}</span>,
  },
  {
    accessor: "date",
    Header: "Fecha de registro",
    Cell: ({ cell }) => <span className="d-block text-center text-white">{cell.value}</span>,
  },
];

export const pricesColumns = [
  {
    Header: "Par",
    accessor: "forex",
  },
  {
    Header: "Compra",
    accessor: "buy",
  },
  {
    Header: "Venta",
    accessor: "sell",
  },
  {
    Header: "Fecha",
    accessor: "date",
  },
  {
    Header: "Activa",
    accessor: "active",
    Cell: ({ cell }) => (cell.value ? <Check htmlColor="#69bea0" fontSize="large" /> : <Close color="error" fontSize="large" />),
  },
];

export const statusColumns = ({ onEdit }) => [
  {
    accessor: "id",
    Header: "ID",
  },
  {
    accessor: "name",
    Header: "Nombre",
  },
  {
    accessor: "color",
    Header: "Color",
    Cell: ({ cell }) => <span className="status-color" style={{ backgroundColor: cell.value }} />,
  },
  {
    Header: "Acciones",
    Cell: ({ row }) => (
      <button className="mx-2" onClick={() => onEdit(row.original)}>
        <Edit htmlColor="#f1b44c" className="cursor-pointer" />
      </button>
    ),
  },
];

export const operatorsColumns = ({ onSetOnline }) => [
  {
    accessor: "name",
    Header: "Usuario",
  },
  {
    accessor: "email",
    Header: "Correo de acceso",
  },
  {
    accessor: "createdAt",
    Header: "Fecha de registro",
  },
  {
    Header: "Banco",
    accessor: "bankName",
    Cell: ({ cell }) => (cell.value ? <img src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} width={70} alt={cell.value} /> : <p>No disponible</p>),
  },
  {
    accessor: "amountRange",
    Header: "Rango (USD)",
  },
  {
    Header: "Disponible",
    Cell: ({ row }) => <ConnectedStatus isOnline={!!row.original.online} setIsOnline={() => onSetOnline(row.original.id)} />,
  },
];

export const scheduleColumns = ({ onEdit }) => [
  {
    accessor: "weekday",
    Header: "Día de semana",
  },
  {
    accessor: "openTime",
    Header: "Hora de apertura",
  },
  {
    accessor: "closeTime",
    Header: "Hora de cierre",
  },
  {
    accessor: "isWorkday",
    Header: "¿Es laborable?",
    Cell: ({ cell }) => <span className={`fa-lg fas ${cell.value ? "fa-check-circle text-success" : "fa-times-circle text-danger"}`} />,
  },
  {
    Header: "Acciones",
    Cell: ({ row }) => (
      <div className="flex items-center">
        <button className="mx-2" onClick={() => onEdit(row.original)}>
          <Edit htmlColor="#f1b44c" className="cursor-pointer" />
        </button>
      </div>
    ),
  },
];

export const couponsColumns = ({ onDisable, onForm }) => [
  {
    accessor: "couponName",
    Header: "Nombre",
  },
  {
    accessor: "discount",
    Header: "Descuento",
  },
  {
    accessor: "uses",
    Header: "usos",
  },
  {
    accessor: "affiliates",
    Header: "¿Solo afiliados?",
    Cell: ({ cell }) => <span className={`fa-lg fas ${cell.value ? "fa-check-circle text-success" : "fa-times-circle text-danger"}`} />,
  },
  {
    accessor: "profileType",
    Header: "Perfiles",
    Cell: ({ cell }) => <p>{cell.value === "natural" ? "Cliente" : cell.value === "juridica" ? "Empresa" : "Todos"}</p>,
  },
  {
    accessor: "minAmount",
    Header: "Mínimo ($)",
  },
  {
    accessor: "endDate",
    Header: "Vence en",
  },
  {
    accessor: "active",
    Header: "Activo",
    Cell: ({ cell }) => (cell.value ? <Check htmlColor="#69bea0" fontSize="large" /> : <Clear color="error" fontSize="large" />),
  },
  {
    Header: "Acciones",
    Cell: ({ row }) => (
      <div className="flex flex-wrap items-center">
        {row.original.active ? (
          <button className="mx-2" onClick={() => onDisable(row.original.id, false)}>
            <Block color="error" />
          </button>
        ) : (
          <button className="mx-2" onClick={() => onDisable(row.original.id, true)}>
            <Check htmlColor="#69bea0" />
          </button>
        )}
        <button className="mx-2" onClick={() => onForm(row.original.id)}>
          <Edit htmlColor="#f1b44c" className="cursor-pointer" />
        </button>
      </div>
    ),
  },
];

export const banksColumns = ({ onForm, onToggle }) => [
  {
    Header: "Banco",
    accessor: "bankName",
    Cell: ({ cell }) => <img src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} width={70} alt="banco" />,
  },
  {
    Header: "Pais activo",
    accessor: "country",
  },
  {
    Header: "Monedas activas",
    accessor: "currencies",
  },
  {
    Header: "Directo",
    accessor: "isDirect",
    Cell: ({ cell }) => (cell.value ? "SI" : "NO"),
  },
  {
    Header: "Habilitado",
    accessor: "enabled",
    Cell: ({ cell }) => (cell.value ? <Check color="primary" fontSize="large" /> : <Clear color="error" fontSize="large" />),
  },
  {
    Header: "Acciones",
    Cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <button className="mx-2" onClick={() => onForm(row.original)}>
          <Edit htmlColor="#f1b44c" />
        </button>
        <button className="mx-2" onClick={() => onToggle(row.original.id, !row.original.enabled)}>
          {row.original.enabled ? <Block color="error" /> : <PowerSettingsNewOutlined htmlColor="#20a2a5" />}
        </button>
      </div>
    ),
  },
];

export const clientsCompletedColumns = [
  {
    accessor: "userName",
    Header: "Nombre",
  },
  {
    accessor: "email",
    Header: "Correo",
  },
  {
    accessor: "document",
    Header: "Documento",
  },
  {
    accessor: "phone",
    Header: "Teléfono",
  },
  {
    accessor: "date",
    Header: "Fecha registrado",
    Cell: ({ cell }) => moment(cell.value).format("DD/MM/YY HH:mm a"),
  },
  {
    accessor: "status",
    Header: "Estado",
    Cell: ({ cell }) => <span className={!cell.value ? "text-warning" : "text-success"}>{!cell.value ? "NO ACTIVO" : "ACTIVO"}</span>,
  },
  {
    accessor: "action",
    Header: "Acción",
    Cell: ({ row }) => {
      return (
        <Link to={`/user-details/${row.original.id}`} className="btn-rounded waves-effect waves-light btn btn-blue btn-sm px-3 font-size-13">
          Ver más
        </Link>
      );
    },
  },
];

export const clientsNotCompletedColumns = [
  {
    accessor: "email",
    Header: "Correo",
  },
  {
    accessor: "phone",
    Header: "Teléfono",
  },
  {
    accessor: "date",
    Header: "Fecha registrado",
    Cell: ({ cell }) => moment(cell.value).format("DD/MM/YY HH:mm a"),
  },
  {
    accessor: "status",
    Header: "Estado",
    Cell: ({ cell }) => <span className={!cell.value ? "text-warning" : "text-success"}>{!cell.value ? "NO ACTIVO" : "ACTIVO"}</span>,
  },
  {
    accessor: "action",
    Header: "Acción",
    Cell: ({ row }) => {
      return (
        <Link to={`/user-details/${row.original.id}`} className="btn-rounded waves-effect waves-light btn btn-blue btn-sm px-3 font-size-13">
          Ver más
        </Link>
      );
    },
  },
];

export const exchangesColumns = [
  {
    Header: "Nro. de orden",
    accessor: "pedidoId",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    Header: "Fecha",
    accessor: "date",
    Cell: ({ cell }) => <p className="text-white">{cell.value}</p>,
  },
  {
    Header: "Usuario",
    accessor: "user",
    style: { whiteSpace: "unset" },
    Cell: ({ cell, row }) => <p className="text-white capitalize">{row.original.companyName.toLowerCase() || cell.value.toLowerCase()}</p>,
  },
  {
    Header: "Envia",
    accessor: "amountSent",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    Header: "Recibe",
    accessor: "amountReceived",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    Header: "Origen",
    accessor: "originBank",
    Cell: ({ cell }) => <img width={cell.value === "kash" ? 40 : 70} src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} alt={cell.value} />,
  },
  {
    Header: "Destino",
    accessor: "destinationBank",
    Cell: ({ cell }) => <img width={70} src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} alt={cell.value} />,
  },
  {
    Header: "Estado",
    accessor: "status",
    Cell: ({ row }) => (
      <Badge
        className="font-size-13 capitalize py-2"
        style={{
          color: "#fff",
          backgroundColor: row.original.revision ? "#BA55D3" : row.original.statusColor,
        }}
        pill
      >
        {row.original.revision ? "En Revisión" : row.original.statusName.toLowerCase()}
      </Badge>
    ),
  },
  {
    Header: "F",
    accessor: "invoice",
    Cell: ({ cell }) => <span className={`${cell.value ? "text-success" : "text-warning"}`}>{cell.value ? "SI" : "NO"}</span>,
  },
  {
    Header: "Acción",
    accessor: "id",
    Cell: ({ cell }) => (
      <Link className="btn py-1 px-2 btn-action w-20" to={`/exchange-details/${cell.value}`}>
        Ver más
      </Link>
    ),
  },
];

export const oldExchangesColumns = [
  {
    Header: "Fecha",
    accessor: "date",
  },
  {
    Header: "Enviado",
    accessor: "amountSent",
    Cell: ({ cell, row }) => (
      <div className="d-flex align-items-center">
        <span className="mr-2">{cell.value}</span>
        <img src={`${process.env.PUBLIC_URL}/images/banks/${row.original.bankReceive.toLowerCase()}.svg`} width={20} alt="banco" />
      </div>
    ),
  },
  {
    Header: "Recibido",
    accessor: "amountReceived",
    Cell: ({ cell, row }) => (
      <div className="d-flex align-items-center">
        <span className="mr-2">{cell.value}</span>
        <img src={`${process.env.PUBLIC_URL}/images/banks/${row.original.bankSent.toLowerCase()}.svg`} width={20} alt="banco" />
      </div>
    ),
  },
  {
    Header: "Estado",
    accessor: "status",
    Cell: ({ row }) => (
      <Badge
        className="font-size-13 capitalize py-2"
        style={{
          color: shadeColor(row.original.statusColor, 40),
          backgroundColor: convertHexToRGBA(row.original.statusColor, 24),
        }}
        pill
      >
        {row.original.statusName.toLowerCase()}
      </Badge>
    ),
  },
  {
    Header: "Acción",
    accessor: "id",
    Cell: ({ cell }) => (
      <Link className="btn py-1 px-2 btn-rounded btn-action" to={`/exchange-details/${cell.value}`}>
        Ver más
      </Link>
    ),
  },
];

export const bankOrdersColumns = [
  {
    Header: "Nro. de orden",
    accessor: "orderId",
  },
  {
    Header: "Fecha",
    accessor: "date",
  },
  {
    Header: "Monto a recibir",
    accessor: "amountToSend",
  },
  {
    Header: "Monto enviado",
    accessor: "amountToReceive",
  },
  {
    Header: "Origen",
    accessor: "bankOrigin",
    Cell: ({ cell }) => <img width={70} src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} alt={cell.value} />,
  },
  {
    Header: "Destino",
    accessor: "bankDestination",
    Cell: ({ cell }) => <img width={70} src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} alt={cell.value} />,
  },
  {
    Header: "Tasa",
    accessor: "rate",
  },
  {
    Header: "Estado",
    accessor: "status",
    Cell: ({ row }) => (
      <Badge
        className="font-size-13 capitalize py-2"
        style={{
          color: "#fff",
          backgroundColor: row.original.revision ? "#BA55D3" : row.original.statusColor,
        }}
        pill
      >
        {row.original.revision ? "En Revisión" : row.original.statusName.toLowerCase()}
      </Badge>
    ),
  },
  {
    Header: "Acción",
    accessor: "id",
    Cell: ({ cell }) => (
      <Link className="btn py-1 px-2 btn-action w-20" to={`/bank-order-details/${cell.value}`}>
        Ver más
      </Link>
    ),
  },
];

export const withdrawalsColumns = [
  {
    Header: "Operación",
    accessor: "pedidoId",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    Header: "Fecha",
    accessor: "date",
  },
  {
    Header: "Usuario",
    accessor: "user",
  },
  {
    Header: "Recibe",
    accessor: "destinationBank",
    Cell: ({ cell }) => <img width={70} src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} alt={cell.value} />,
  },
  {
    Header: "KASH solicitados",
    accessor: "kashQty",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    Header: "Estado",
    accessor: "status",
    Cell: ({ row }) => (
      <Badge
        className="font-size-13 capitalize py-2"
        style={{
          color: shadeColor(row.original.statusColor, 40),
          backgroundColor: convertHexToRGBA(row.original.statusColor, 24),
        }}
        pill
      >
        {row.original.statusName.toLowerCase()}
      </Badge>
    ),
  },
  {
    Header: "Acción",
    accessor: "id",
    Cell: ({ cell }) => (
      <Link className="btn py-1 px-2 max-w-sm btn-rounded btn-action" to={`/withdrawal-details/${cell.value}`}>
        Ver más
      </Link>
    ),
  },
];

export const userWithdrawalsColumns = [
  {
    Header: "Fecha",
    accessor: "date",
  },
  {
    Header: "Recibe",
    accessor: "destinationBank",
    Cell: ({ cell }) => <img width={45} src={`${process.env.PUBLIC_URL}/images/banks/${cell.value.toLowerCase()}.svg`} alt={cell.value} />,
  },
  {
    Header: "KASH solicitados",
    accessor: "kashQty",
    Cell: ({ cell }) => <p className="font-bold text-white">{cell.value}</p>,
  },
  {
    Header: "Estado",
    accessor: "status",
    Cell: ({ row }) => (
      <Badge
        className="font-size-13 capitalize py-2"
        style={{
          color: shadeColor(row.original.statusColor, 40),
          backgroundColor: convertHexToRGBA(row.original.statusColor, 24),
        }}
        pill
      >
        {row.original.statusName.toLowerCase()}
      </Badge>
    ),
  },
  {
    Header: "Acción",
    accessor: "id",
    Cell: ({ cell }) => (
      <Link className="btn py-1 px-2 max-w-sm btn-rounded btn-action" to={`/withdrawal-details/${cell.value}`}>
        Ver más
      </Link>
    ),
  },
];