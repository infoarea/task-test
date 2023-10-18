import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import UseFormField from "../../hooks/UseFormField";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { createToast } from "../../utils/toast";
import { timeAgo } from "../../helper/timeAgo";
import swal from "sweetalert";
import { setMessageEmpty } from "../../features/product/productSlice";
import {
  createProductTag,
  deleteProductTag,
  updateProductTag,
  updateTagStatus,
} from "../../features/product/productApiSlice";

const Tag = () => {
  const cols = [
    {
      name: "Priority Level",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
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
              onClick={() => handleTagStatusUpdate(row._id, row.status)}
              htmlFor="status_1"
              className="checktoggle">
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
          <button
            className="btn btn-sm bg-success-light"
            data-toggle="modal"
            data-target="#editTagModal"
            onClick={() => handleTagEdit(row._id)}>
            <i className="fe fe-pencil"></i> Edit
          </button>
          <button
            className="btn btn-sm bg-danger-light"
            onClick={() => handleTagDelete(row._id)}>
            <i className="fe fe-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  const { error, message, tag, loader } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [editTag, setEditTag] = useState({});

  //Handle edit tag
  const handleTagEdit = (id) => {
    let agerData = tag.find((data) => data._id === id);
    setEditTag(agerData);
  };

  //handle input change
  const handleEditInputChange = (e) => {
    setEditTag((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const [search, setSearch] = useState("");
  //search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  //Data search Function
  const tags = tag?.filter((item) => {
    return search.toLowerCase() === ""
      ? item
      : item.name.toLowerCase().includes(search) || search.toUpperCase() === ""
      ? item
      : item.name.toUpperCase().includes(search);
  });

  //Handle edit tag form submit
  const handleEditTagSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductTag({ id: editTag._id, data: editTag }));
  };

  const { input, handleInputChange, resetForm } = UseFormField({
    name: "",
  });

  //Create Tag form submit
  const handleCreateTagFormSubmit = (e) => {
    e.preventDefault();
    dispatch(createProductTag(input));
  };

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

  //Delete Tag
  const handleTagDelete = (id) => {
    swal({
      title: "Permission Delete",
      text: "Are you sure? Would you like to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProductTag(id));
        swal("Poof! Your permission has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //Tag status update
  const handleTagStatusUpdate = (id, status) => {
    dispatch(updateTagStatus({ id, status: !status }));
  };

  return (
    <>
      <PageHeader title="Priority" />

      {/* Create Tag modal */}
      <ModalPopup target="tagModalPopup" title={"Add New Priority"}>
        <form onSubmit={handleCreateTagFormSubmit}>
          <div className="my-3">
            <label htmlFor="">Priority Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary btn-block">
              {loader ? "Creating..." : "Add New Priority"}
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* Edit Tag modal */}
      <ModalPopup target="editTagModal" title={"Edit Priority"}>
        <form onSubmit={handleEditTagSubmit}>
          <div className="my-3">
            <label htmlFor="">Priority Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={editTag.name}
              onChange={handleEditInputChange}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary btn-block">
              Update Priority
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#tagModalPopup"
            data-toggle="modal"
            className="btn btn-primary">
            Add New Priority
          </button>
          <br />
          <br />

          <DataTable
            title="All Priority"
            className="shadow-sm rounded brand-table"
            data={tag ? tags : []}
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

export default Tag;
