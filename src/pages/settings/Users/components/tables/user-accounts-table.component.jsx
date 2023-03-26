import { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
// COMPONENTS
import { Table } from "../../../../../components/UI/tables/table.component";
// HELPERS
import { userAccountsColumns } from "../../../../../helpers/tables/columns";
// REDUX ACTIONS
import { deleteClientBankAccInit } from "../../../../../store/actions";
// CLASSES
import sharedClasses from "../modules/details/user-details.module.scss";

const UserAccounts = ({ accounts, isLoading, userBankAccEdit, setUserBankAccEdit, openModal, closeModal, dispatch }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      accounts.map((account) => ({
        selected_account: userBankAccEdit.account_number || userBankAccEdit.cci,
        id: account.id,
        userId: account.userId,
        alias: account.alias,
        account_number: account.accountNumber,
        cci: account.cci,
        balance: account.balance,
        bank: account.bank.name,
        currency: account.currency.Symbol,
        thirdParty: !!account.thirdPartyId,
      }))
    );
  }, [accounts, userBankAccEdit]);

  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Cuentas bancarias" data={data} columns={userAccountsColumns(setUserBankAccEdit)} isLoading={isLoading} backupText="No posee cuentas bancarias" borderless />
          </div>
          <footer className="flex justify-evenly flex-wrap mt-2">
            <button type="button" className={`py-1.5 px-2.5 rounded mt-1.5 md:mt-0 ${sharedClasses.addBtn}`} onClick={() => openModal("addBankAccount")}>Agregar cuenta</button>
            {(userBankAccEdit.account_number || userBankAccEdit.cci) && (
              <>
                <button type="button" className={`d-flex items-center mt-1.5 md:mt-0 ${sharedClasses.editBtn}`} onClick={() => openModal("editBankAccount")}>
                  <i className="bx bxs-edit-alt"></i> <span className="underline ml-1">Editar</span>
                </button>
                <button type="button" className="d-flex items-center text-danger mt-1.5 md:mt-0" onClick={() => dispatch(deleteClientBankAccInit(userBankAccEdit, closeModal))}>
                  <i className="bx bxs-trash"></i> <span className="underline ml-1">Eliminar</span>
                </button>
              </>
            )}
          </footer>
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserAccounts;