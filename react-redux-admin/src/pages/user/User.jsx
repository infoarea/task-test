import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import DataTable from "datatables.net-dt";
import { generateRandomPassword } from "../../helper/HealperFunction";
import UseFormField from "../../hooks/UseFormField";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateUserStatus,
  deleteUser,
  updateUser,
  userCreate,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../helper/timeAgo";
import { createToast } from "../../utils/toast";
import { getUserData, setMessageEmpty } from "../../features/user/userSlice";
import swal from "sweetalert";
import UseAuthUser from "../../hooks/UseAuthUser";

const User = () => {
  const dispatch = useDispatch();
  const { user: authUser } = UseAuthUser();
  const { user, error, role, message } = useSelector(getUserData);
  const { input, handleInputChange, resetForm, setInput } = UseFormField({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [userEdit, setUserEdit] = useState({});

  //Toaster message
  useEffect(() => {
    if (error) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch]);
  //Data table
  useEffect(() => {
    new DataTable(".datatable");
  });

  const handleRandomPassword = () => {
    const rPassword = generateRandomPassword();
    setInput((prevState) => ({
      ...prevState,
      password: rPassword,
    }));
  };
  const handleRoleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  //Create user form submi
  const handleUserCreateSubmit = (e) => {
    e.preventDefault();
    dispatch(userCreate(input));
    resetForm();
  };

  //Delete user handler
  const handleUserDelete = (id) => {
    swal({
      title: "User Delete",
      text: "Are you sure? Would you like to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id));
        swal("Poof! Your user has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //handle user edit
  const handleUserEdit = (id) => {
    const editData = user.find((data) => data._id === id);
    setUserEdit(editData);
  };
  const handleEditInputChange = (e) => {
    setUserEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //User edit form submit
  const handleEditUserSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: userEdit._id,
        name: userEdit.name,
        email: userEdit.email,
        mobile: userEdit?.mobile,
        address: userEdit?.address,
        birth: userEdit?.birth,
        role: userEdit.role,
      })
    );
  };
  //Handle edit role changel
  const handleEditRoleChange = (e) => {
    setUserEdit((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };

  //User status change handler
  const handleUserStatusChange = (id, status) => {
    dispatch(UpdateUserStatus({ id, status: !status }));
  };
  return (
    <>
      <PageHeader title="Users" />

      <ModalPopup target="createUserModal" title="Create New User">
        <form onSubmit={handleUserCreateSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Password</label>
            <input
              type="text"
              className="form-control"
              name="password"
              value={input.password}
              onChange={handleInputChange}
            />
            <a
              onClick={handleRandomPassword}
              className="badge text-light bg-primary border-0">
              Generate Password
            </a>
          </div>
          <div className="my-3">
            <label htmlFor="">Role</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={handleRoleChange}>
              <option>--Select--</option>
              {role?.map((item, index) => {
                return (
                  <option name="role" value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="my-3">
            <button className="btn btn-primary">Add New User</button>
          </div>
        </form>
      </ModalPopup>

      <ModalPopup target="editUserModal" title="Edit User">
        <form onSubmit={handleEditUserSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userEdit.name}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={userEdit.email}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Phone Number</label>
            <input
              type="text"
              className="form-control"
              name="mobile"
              value={userEdit?.mobile}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={userEdit?.address}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Date Of Birth</label>
            <input
              type="text"
              className="form-control"
              name="birth"
              value={userEdit?.birth}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <label htmlFor="">Role</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={handleEditRoleChange}>
              <option>--Select--</option>
              {role?.map((item, index) => {
                if (userEdit?.role?.name === item?.name) {
                  return (
                    <option name="role" selected value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                } else {
                  return (
                    <option name="role" value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <div className="my-3">
            <button className="btn btn-primary">Update User</button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#createUserModal"
            data-toggle="modal"
            className="btn btn-primary">
            Add New
          </button>
          <br />
          <br />
          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Appointment List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                {user && (
                  <table className="table datatable table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role?.name}</td>
                            <td>{timeAgo(item.createdAt)}</td>
                            <td>
                              <div className="status-toggle">
                                <input
                                  type="checkbox"
                                  id="status_1"
                                  className="check"
                                  checked={item.status}
                                />
                                <label
                                  onClick={() =>
                                    handleUserStatusChange(
                                      item._id,
                                      item.status
                                    )
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle">
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td className="text-right">
                              <button
                                className="btn btn-sm bg-success-light"
                                data-toggle="modal"
                                data-target="#editUserModal"
                                onClick={() => handleUserEdit(item._id)}>
                                <i className="fe fe-pencil"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm bg-danger-light"
                                onClick={() => handleUserDelete(item._id)}>
                                <i className="fe fe-trash"></i> Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
