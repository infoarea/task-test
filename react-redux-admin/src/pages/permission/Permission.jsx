import { useEffect, useState } from "react";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import DataTable from "datatables.net-dt";
import { useDispatch, useSelector } from "react-redux";
import {
  createPermission,
  deletePermission,
  updatePermissionStatus,
} from "../../features/user/userApiSlice";
import { getUserData, setMessageEmpty } from "../../features/user/userSlice";
import { createToast } from "../../utils/toast";
import swal from "sweetalert";
import { timeAgo } from "../../helper/timeAgo";

const Permission = () => {
  const dispatch = useDispatch();
  const { permission, error, message } = useSelector(getUserData);

  useEffect(() => {
    new DataTable(".datatable");
  });

  const [input, setInput] = useState({
    name: "",
  });

  //Handle input change
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createPermission(input));
    setInput({
      name: "",
    });
  };

  useEffect(() => {
    if (error && permission) {
      createToast(error);
      dispatch(setMessageEmpty());
    }
    if (message) {
      createToast(message, "success");
      dispatch(setMessageEmpty());
    }
  }, [error, message, dispatch, permission]);

  //delete permission handler
  const handleDeletePermission = (id) => {
    swal({
      title: "Permission Delete",
      text: "Are you sure? Would you like to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePermission(id));
        swal("Poof! Your permission has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //Status change handler
  const handleStatusChange = (id, status) => {
    dispatch(updatePermissionStatus({ id, status: !status }));
  };

  return (
    <>
      <PageHeader title="Permission" />

      <ModalPopup target="permissionModalPopup" title="Add New Permission">
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
            data-target="#permissionModalPopup"
            data-toggle="modal"
            className="btn btn-primary">
            Add New
          </button>
          <br />
          <br />

          <div className="card card-table">
            <div className="card-header">
              <h4 className="card-title">Mermission List</h4>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                {permission && (
                  <table className="datatable table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created at</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...permission].reverse().map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.slug}</td>
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
                                    handleStatusChange(item._id, item.status)
                                  }
                                  htmlFor="status_1"
                                  className="checktoggle">
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() =>
                                  handleDeletePermission(item._id)
                                }>
                                <i className="fa fa-trash"></i>
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

export default Permission;
