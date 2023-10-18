import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import UseFormField from "../../hooks/UseFormField";
import { getUserData, setMessageEmpty } from "../../features/user/userSlice";
import DataTable from "datatables.net-dt";
import { useEffect, useState } from "react";
import { createToast } from "../../utils/toast";
import {
  createRole,
  deleteRole,
  updateRole,
  updateRoleStatus,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../helper/timeAgo";
import swal from "sweetalert";

const Role = () => {
  const dispatch = useDispatch();
  const { permission, role, error, message } = useSelector(getUserData);

  const [selected, setSelected] = useState([]);

  const [roleEdit, setRoleEdit] = useState({});

  const { input, handleInputChange, resetForm } = UseFormField({
    name: "",
  });

  //Data table
  useEffect(() => {
    new DataTable(".datatable");
  });

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

  const handleSelectCheck = (e) => {
    const val = e.target.value;
    const updateData = [...selected];

    if (updateData.includes(val)) {
      updateData.splice(updateData.indexOf(val), 1);
    } else {
      updateData.push(val);
    }

    setSelected(updateData);
  };

  //Role form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createRole({ name: input.name, permissions: [...selected] }));
    resetForm();
    setSelected([]);
  };

  //delete permission handler
  const handleDeleteRole = (id) => {
    swal({
      title: "Permission Delete",
      text: "Are you sure? Would you like to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteRole(id));
        swal("Poof! Your permission has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //Status change handler
  const handleRoleStatusChange = (id, status) => {
    dispatch(updateRoleStatus({ id, status: !status }));
  };

  //Role edit handler
  const handleRoleEdit = (id) => {
    const editData = role.find((data) => data._id === id);
    setRoleEdit(editData);
    setSelected(editData.permissions);
  };
  //Role name change edit handler
  const handleEditRoleChange = (e) => {
    setRoleEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //Role Edit form submit
  const handleRoleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateRole({
        id: roleEdit._id,
        name: roleEdit.name,
        permissions: selected,
      })
    );
  };
  return (
    <>
      <PageHeader title="Role" />
      {/* Create role modal */}
      <ModalPopup target="roleModalPopup" title={"Add New Role"}>
        <form onSubmit={handleFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
            <label>Permissions</label>
            {permission?.map((item, index) => {
              return (
                <label className="d-block" key={index}>
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={selected.includes(item.name)}
                    onChange={handleSelectCheck}
                  />
                  {item.name}
                </label>
              );
            })}
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              Add Now
            </button>
          </div>
        </form>
      </ModalPopup>
      {/* Edit role modal */}
      <ModalPopup target="roleEdit" title={"Edit Role"}>
        <form onSubmit={handleRoleEditSubmit}>
          <div className="my-3">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={roleEdit.name}
              onChange={handleEditRoleChange}
            />
            <label>Permissions</label>
            {permission?.map((item, index) => {
              return (
                <label className="d-block" key={index}>
                  <input
                    type="checkbox"
                    value={item.name}
                    checked={selected?.includes(item.name)}
                    onChange={handleSelectCheck}
                  />
                  {item.name}
                </label>
              );
            })}
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              Add Now
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#roleModalPopup"
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
                {role && (
                  <table className="table datatable table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Permissions</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {role?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
                            <td>
                              <ul>
                                {item.permissions.map((per, index) => {
                                  return <li key={index}> {per}</li>;
                                })}
                              </ul>
                            </td>
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
                                    handleRoleStatusChange(
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
                                data-target="#roleEdit"
                                onClick={() => handleRoleEdit(item._id)}>
                                <i className="fe fe-pencil"></i> Edit
                              </button>
                              <button
                                className="btn btn-sm bg-danger-light"
                                onClick={() => handleDeleteRole(item._id)}>
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

export default Role;
