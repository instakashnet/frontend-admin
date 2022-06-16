import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Button, Card, CardBody } from "reactstrap";
import { Table } from "../../../../../components/UI/tables/table.component";
import { userWithdrawalsColumns } from "../../../../../helpers/tables/columns";

const PAGE_SIZE = 5;

export const UserWithdrawals = ({ withdrawals, isLoading, details, getWithdrawals }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (withdrawals.length > 0) {
      const filteredWithdrawals = details ? withdrawals.filter((withdrawal) => withdrawal.id !== details.id) : withdrawals;

      setData(
        filteredWithdrawals.sort((a, b) => b.id - a.id).map((withdrawal) => ({
          id: withdrawal.id,
          date: moment(withdrawal.createdAt).format("DD-MM-YYYY HH:mm"),
          destinationBank: withdrawal.bankName.toLowerCase(),
          statusColor: withdrawal.statusColor,
          statusName: withdrawal.statusName,
          kashQty: withdrawal.kashQty + " KASH",
        }))
      );
    } else setData([]);
  }, [details, withdrawals]);

  return (
    <>
      <Button type="button" color="primary" onClick={getWithdrawals} className="my-3">
        Obtener retiros
      </Button>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Retiros realizados" columns={userWithdrawalsColumns} isLoading={isLoading} data={data} pagination={{ pageSize: PAGE_SIZE, async: false }} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};
