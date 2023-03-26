import moment from "moment";
import { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
// COMPONENTS
import { Table } from "../../../../../components/UI/tables/table.component";
// HELPERS
import { userAffiliatesColumns } from "../../../../../helpers/tables/columns";


const PAGE_SIZE = 5;

const UserAffiliates = ({ affiliates, isLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(
      affiliates.map((affiliate) => ({
        full_name: `${affiliate.firstName} ${affiliate.lastName}`,
        email: affiliate.email,
        status: affiliate.orderSuccess === 1 ? "Completado" : "Registrado",
        date: moment(affiliate.createdAt).format("DD/MM/YYYY hh:mm a"),
      }))
    )
  }, [affiliates]);

  return (
    <Col lg="6">
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Afiliados" data={data} columns={userAffiliatesColumns} isLoading={isLoading} pagination={{ pageSize: PAGE_SIZE, async: false }} backupText="No posee afiliados" borderless />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default UserAffiliates;