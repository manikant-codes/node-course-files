import React from "react";
import AdminPageTitle from "../../../components/admin/common/AdminPageTitle";
import CommonList from "../../../components/common/CommonList";
import { deleteUser, getAllUsers } from "../../../services/apiServices";

function UsersList() {
  function renderSubtitle(user) {
    return user.role;
  }

  function renderImage(user) {
    return user.avatar;
  }

  return (
    <div>
      <AdminPageTitle text="Users" />
      <div>
        <CommonList
          getAllData={getAllUsers}
          deleteData={deleteUser}
          entity="users"
          fields={{ title: "email", subTitle: "" }}
          renderSubtitle={renderSubtitle}
          renderImage={renderImage}
        />
      </div>
    </div>
  );
}

export default UsersList;
