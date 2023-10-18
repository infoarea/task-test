import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { timeAgo } from "../../helper/timeAgo";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import UseFormField from "../../hooks/UseFormField";
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "../../features/product/productApiSlice";
import swal from "sweetalert";
import { createToast } from "../../utils/toast";
import { setMessageEmpty } from "../../features/product/productSlice";
import { Link } from "react-router-dom";

const Tasks = () => {
  const cols = [
    {
      name: "Task Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category?.name,
    },

    {
      name: "Priority Lavel",
      selector: (row) => row.tag?.name,
    },
    {
      name: "Created At",
      selector: (row) => timeAgo(row.createdAt),
    },
    {
      name: "Status",
      selector: (row) => (
        <>
          <div className="status-toggle">
            <input
              type="checkbox"
              id="status_1"
              className="check"
              checked={row.status}
            />
            <label
              htmlFor="status_1"
              className="checktoggle"
              onClick={() => handleTaskStatusChange(row._id, row.status)}>
              checkbox
            </label>
          </div>
        </>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link
            to={`/tasks/${row._id}`}
            className="btn btn-sm bg-success-light"
            data-toggle="modal"
            data-target="#editTaskModal">
            <i className="fe fe-eye"></i>
          </Link>
          &nbsp;
          <button
            className="btn btn-sm bg-warning-light"
            data-toggle="modal"
            data-target="#editTaskModal"
            onClick={() => handleEditTask(row._id)}>
            <i className="fe fe-pencil"></i> Edit
          </button>
          <button
            className="btn btn-sm bg-danger-light"
            onClick={() => handleTaskDelete(row?._id)}>
            <i className="fe fe-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();
  const { error, message, task, loader, category, tag } = useSelector(
    (state) => state.product
  );

  const { input, handleInputChange, resetForm, setInput } = UseFormField({
    name: "",
    description: "",
    category: "",
    tag: "",
  });
  const [taskEdit, setTaskEdit] = useState({});

  //Task Edit handler
  const handleEditTask = (id) => {
    const odlData = task.find((data) => data._id === id);
    setTaskEdit(odlData);
  };
  //Edit input change handler
  const handleEditInputChange = (e) => {
    setTaskEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(taskEdit);
  };
  //Handle edit Category changel
  const handleEditCategoryChange = (e) => {
    setTaskEdit((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };
  //Handle edit Tag changel
  const handleEditTagChange = (e) => {
    setTaskEdit((prevState) => ({
      ...prevState,
      tag: e.target.value,
    }));
  };
  //Task edit form submit
  const handleEditTaskSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateTask({
        id: taskEdit._id,
        name: taskEdit.name,
        description: taskEdit?.description,
        category: taskEdit?.category,
        tag: taskEdit?.tag,
      })
    );
  };

  //Brand status change handler
  const handleTaskStatusChange = (id, status) => {
    dispatch(updateTaskStatus({ id, status: !status }));
  };

  //Create Category change handler
  const handleCategoryChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      category: e.target.value,
    }));
  };
  //Tag Change handler
  const handleTagsChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      tag: e.target.value,
    }));
  };

  // //Create Task form submit
  const handleCreateTaskSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(input));
    resetForm();
  };

  //Delete Task handler
  const handleTaskDelete = (id) => {
    swal({
      title: "User Delete",
      text: "Are you sure? Would you like to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteTask(id));
        swal("Poof! Your user has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const [search, setSearch] = useState("");
  //search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //Data search Function
  const tasks = task?.filter((item) => {
    return search.toLowerCase() === ""
      ? item
      : item.name.toLowerCase().includes(search) || search.toUpperCase() === ""
      ? item
      : item.name.toUpperCase().includes(search);
  });
  let completed_task = [];
  tasks?.map((item) => {
    if (item.status) {
      completed_task.push(item);
    }
  });
  //Data search Function for incompleted task data
  // const incompletetasks = task?.filter((item) => {
  //   return search.toLowerCase() === ""
  //     ? item
  //     : item.name.toLowerCase().includes(search) || search.toUpperCase() === ""
  //     ? item
  //     : item.name.toUpperCase().includes(search);
  // });
  let incomplete_task = [];
  task?.map((item) => {
    if (!item.status) {
      incomplete_task.push(item);
    }
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
  return (
    <>
      <PageHeader title="Tasks" />

      {/* Create Tag modal */}
      <ModalPopup target="taskModalPopup" title={"Add New Priority"}>
        <form onSubmit={handleCreateTaskSubmit}>
          <div className="my-3">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Description</label>
            <textarea
              className="form-control"
              cols="30"
              rows="10"
              name="description"
              value={input.description}
              onChange={handleInputChange}></textarea>
          </div>

          <div className="my-3">
            <label htmlFor="">Category</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={handleCategoryChange}>
              <option>--Select--</option>
              {category?.map((item, index) => {
                return (
                  <option name="category" value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="">Priority</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={handleTagsChange}>
              <option>--Select--</option>
              {tag?.map((item, index) => {
                return (
                  <option name="category" value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary btn-block">
              {loader ? "Creating..." : "Add New Task"}
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* Edit Task modal */}
      <ModalPopup target="editTaskModal" title={"Edit Task"}>
        <form onSubmit={handleEditTaskSubmit}>
          <div className="my-3">
            <label htmlFor="">Title</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={taskEdit.name}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <label htmlFor="">Description</label>
            <textarea
              className="form-control"
              cols="30"
              rows="10"
              name="description"
              value={taskEdit.description}
              onChange={handleEditInputChange}></textarea>
          </div>

          <div className="my-3">
            <label htmlFor="">Category</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={handleEditCategoryChange}>
              <option>--Select--</option>
              {category?.map((item, index) => {
                if (taskEdit?.category?.name === item?.name) {
                  return (
                    <option
                      name="category"
                      selected
                      value={item._id}
                      key={index}>
                      {item.name}
                    </option>
                  );
                } else {
                  return (
                    <option name="category" value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="my-3">
            <label htmlFor="">Priority</label>
            <select
              name=""
              id=""
              className="form-control"
              onChange={handleEditTagChange}>
              <option>--Select--</option>
              {tag?.map((item, index) => {
                if (taskEdit?.tag?.name === item?.name) {
                  return (
                    <option name="tag" selected value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                } else {
                  return (
                    <option name="tag" value={item._id} key={index}>
                      {item.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary btn-block">
              {loader ? "Updating..." : "Update Task"}
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#taskModalPopup"
            data-toggle="modal"
            className="btn btn-primary">
            Add New Task
          </button>
          <br />
          <br />

          <DataTable
            title="Incomplete Tasks"
            className="shadow-sm rounded brand-table"
            data={task ? incomplete_task : []}
            columns={cols}
            selectableRows
            pointerOnHover
            highlightOnHover
            pagination
            filtarable
            striped
            fixedHeader
            subHeader
            // subHeaderComponent={
            //   <input
            //     type="text"
            //     placeholder="Search..."
            //     className="form-control"
            //     style={{ width: "200px" }}
            //     onChange={(e) => handleSearch(e)}
            //   />
            // }
          />
          <br />
          <DataTable
            title="Completed Tasks"
            className="shadow-sm rounded brand-table"
            data={task ? completed_task : []}
            columns={cols}
            selectableRows
            pointerOnHover
            highlightOnHover
            pagination
            filtarable
            striped
            fixedHeader
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                style={{ width: "200px" }}
                onChange={(e) => handleSearch(e)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default Tasks;
