import moment from "moment";
import { useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { Table } from "../../../../../components/UI/tables/table.component";
import { userAffiliatesColumns } from "../../../../../helpers/tables/columns";


const PAGE_SIZE = 10;

const UserAffiliates = ({ affiliates, isLoading }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (affiliates.length > 0) {
      setData(
        affiliates.map((affiliate) => ({
          full_name: `${affiliate.firstName} ${affiliate.lastName}`,
          email: affiliate.email,
          status: affiliate.orderSuccess === 1 ? "Completado" : "Registrado",
          date: moment(affiliate.createdAt).format("DD-MM-YYYY hh:mm a"),
        }))
      )
    }
  }, [affiliates]);

  return (
    <Col lg="12">
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Afiliados" data={data} columns={userAffiliatesColumns} isLoading={isLoading} pagination={{ pageSize: PAGE_SIZE, async: false }} borderless />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default UserAffiliates;