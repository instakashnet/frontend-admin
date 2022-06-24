import { Tab, Tabs } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
// COMPONENTS
import PersonalAccount from "./forms/personal-account.component";
import ThirdPartyAccount from "./forms/third-account.component";
// CLASSES
import classes from "./modules/add-bank-account.module.scss";

const AddBankAccount = ({ userId, closeModal }) => {
  // VARIABLES & HOOKS
  const [value, setValue] = useState(0),
    { banks } = useSelector((state) => state.Banks),
    { currencies } = useSelector((state) => state.Data);

  const bankOptions = banks.map((bank) => ({
    value: bank.id,
    label: bank.name.toUpperCase(),
    isDirect: !!bank.active,
  })),
    accountTypeOptions = [
      { value: "checking", label: "Corriente" },
      { value: "savings", label: "De ahorros" },
    ],
    currencyOptions = currencies.map(({ id, name, Symbol }) => ({
      label: `${name} ${Symbol}`,
      value: id,
    }));

  // HANDLERS
  const changeHandler = (_, newValue) => setValue(newValue);

  return (
    <>
      <Tabs variant="fullWidth" indicatorColor="primary" value={value} onChange={changeHandler} aria-label="Tabs de cuentas bancarias">
        <Tab label="Cuenta personal" classes={{ root: classes.addAccountTab }} />
        <Tab label="Cuenta de terceros" classes={{ root: classes.addAccountTab }} />
      </Tabs>
      <PersonalAccount userId={userId} banks={bankOptions} currencies={currencyOptions} accountTypes={accountTypeOptions} value={value} index={0} closeModal={closeModal} />
      <ThirdPartyAccount userId={userId} banks={bankOptions} currencies={currencyOptions} accountTypes={accountTypeOptions} value={value} index={1} closeModal={closeModal} />
    </>
  );
}

export default AddBankAccount;