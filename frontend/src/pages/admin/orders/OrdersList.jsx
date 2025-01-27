import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { getAllOrders } from "../../../services/apiServices";

function OrdersList() {
  return (
    <div>
      <AdminPageTitle title="Orders" />
      <div>
        <CommonList
          getData={getAllOrders}
          deleteData={() => {}}
          getFieldValues={(entity) => {
            return {
              image: entity.image,
              title: entity._id,
              desc: entity.orderStatus
            };
          }}
        />
      </div>
    </div>
  );
}

export default OrdersList;
