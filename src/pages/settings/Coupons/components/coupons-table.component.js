import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "reactstrap";
import moment from "moment";
import { couponsColumns } from "../../../../helpers/tables/columns";

import { Table } from "../../../../components/UI/tables/table.component";

const CouponsList = ({ coupons, isLoading, onForm, onDisable }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (coupons.length > 0) {
      setData(
        coupons.map((coupon) => ({
          id: coupon.Id,
          couponName: coupon.name,
          discount: coupon.discount,
          uses: coupon.qtyUses,
          affiliates: coupon.affiliates,
          profileType: coupon.profileType,
          active: coupon.active,
          minAmount: coupon.minAmountBuy ? coupon.minAmountBuy : 0,
          endDate: moment(coupon.endDate).format("DD/MM/YYYY"),
        }))
      );
    }
  }, [coupons]);

  return (
    <>
      <Button className="btn-primary my-3" onClick={() => onForm()}>
        Agregar cupón
      </Button>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table title="Cupones de descuento" columns={couponsColumns({ onDisable, onForm })} data={data} isLoading={isLoading} />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(CouponsList);
