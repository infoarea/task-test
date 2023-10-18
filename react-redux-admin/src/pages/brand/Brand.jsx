import { useDispatch, useSelector } from "react-redux";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import PageHeader from "../../components/PageHeader/PageHeader";
import UseFormField from "../../hooks/UseFormField";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { createToast } from "../../utils/toast";
import { timeAgo } from "../../helper/timeAgo";
import swal from "sweetalert";
import {
  createBrand,
  deleteBrand,
  updateBrand,
  updateBrandStatus,
} from "../../features/product/productApiSlice";
import { setMessageEmpty } from "../../features/product/productSlice";

const Brand = () => {
  const cols = [
    {
      name: "Brand Logo",
      selector: (row) => (
        <img
          src={row.logo}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
          className="my-1"
          alt=""
        />
      ),
    },
    {
      name: "Brand Name",
      selector: (row) => row.name,
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
              onClick={() => handleBrandStatusChange(row._id, row.status)}
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
            data-target="#editBrandModal"
            onClick={() => handleBrandEdit(row._id)}>
            <i className="fe fe-pencil"></i> Edit
          </button>
          <button
            className="btn btn-sm bg-danger-light"
            onClick={() => handleBrandDelete(row._id)}>
            <i className="fe fe-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  const { error, message, brand, loader } = useSelector(
    (state) => state.product
  );

  const [search, setSearch] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [brandEdit, setBrandEdit] = useState({});
  const dispatch = useDispatch();

  const { input, handleInputChange, resetForm } = UseFormField({
    name: "",
  });

  //handle Edit brand
  const handleBrandEdit = (id) => {
    const oldData = brand.find((data) => data._id === id);
    setBrandEdit(oldData);
  };

  //Handle Edit input change
  const handleEditInputChange = (e) => {
    setBrandEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //Handle edit brand logo
  const handleEditBrandLogo = (e) => {
    setLogo(e.target.files[0]);
    setLogoPreview(URL.createObjectURL(e.target.files[0]));
  };

  //handle change logo & preview (create brand)
  const handleChangeLogo = (e) => {
    //preview logo
    setLogo(e.target.files[0]);
    setLogoPreview(URL.createObjectURL(e.target.files[0]));
  };

  //Brand Edit form submit
  const handleEditBrandSubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", brandEdit.name);
    form_data.append("logo", logo);

    dispatch(updateBrand({ id: brandEdit._id, data: form_data }));
  };

  //brand create form submit
  const handleBrandCreate = (e) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("name", input.name);
    form_data.append("logo", logo);

    dispatch(createBrand(form_data));
    resetForm();
    setLogoPreview(null);
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

  //Search handler
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  //Delete Brand
  const handleBrandDelete = (id) => {
    swal({
      title: "Permission Delete",
      text: "Are you sure? Would you like to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBrand(id));
        swal("Poof! Your permission has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  //Brand status change handler
  const handleBrandStatusChange = (id, status) => {
    dispatch(updateBrandStatus({ id, status: !status }));
  };

  return (
    <>
      <PageHeader title="Brand" />
      {/* Create brand modal */}
      <ModalPopup target="brandModalPopup" title={"Add New Brand"}>
        <form onSubmit={handleBrandCreate}>
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
            <img className="w-100" src={logoPreview} alt="" />
          </div>

          <div className="my-3">
            <label htmlFor="">Brand Logo</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => handleChangeLogo(e)}
            />
          </div>

          <div className="my-3">
            <button type="submit" className="btn btn-primary">
              {loader ? "Creating..." : "Add New Brand"}
            </button>
          </div>
        </form>
      </ModalPopup>

      {/* update brand modal */}
      <ModalPopup target="editBrandModal" title="Edit Brand">
        <form onSubmit={handleEditBrandSubmit}>
          <div className="my-3">
            <label htmlFor="">Brand Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={brandEdit.name}
              onChange={handleEditInputChange}
            />
          </div>
          <div className="my-3">
            <img
              className="w-100"
              src={logoPreview ? logoPreview : brandEdit.logo}
              alt=""
            />
          </div>

          <div className="my-3">
            <input type="file" onChange={handleEditBrandLogo} />
          </div>
          <div className="my-3">
            <button className="btn btn-primary">
              {loader ? "Updating..." : "Update Brand"}
            </button>
          </div>
        </form>
      </ModalPopup>

      <div className="row">
        <div className="col-md-12">
          <button
            data-target="#brandModalPopup"
            data-toggle="modal"
            className="btn btn-primary">
            Add New Brand
          </button>
          <br />
          <br />
          <DataTable
            title="All Brands Data"
            className="shadow-sm rounded brand-table"
            data={brand ? brand : []}
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
                value={search}
                onChange={(e) => handleSearch(e)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default Brand;
