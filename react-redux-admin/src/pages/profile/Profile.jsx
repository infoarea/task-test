import PageHeader from "../../components/PageHeader/PageHeader";
import UseAuthUser from "../../hooks/UseAuthUser";
import ModalPopup from "../../components/ModalPopup/ModalPopup";
import { useEffect, useState } from "react";
import pimg from "../../assets/img/profile.jpg";
import {
  updateUser,
  updateUserPassword,
  updateUserProfilePicture,
} from "../../features/user/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, setMessageEmpty } from "../../features/user/userSlice";
import { createToast } from "../../utils/toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, error, role, message, loader } = useSelector(getUserData);
  const { user: authUser } = UseAuthUser();
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

  //handle user edit
  const handleUserEdit = () => {
    setUserEdit(authUser);
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
  //password Change
  const [passChange, setPassChange] = useState({
    password: "",
    newpassword: "",
    confirmpassword: "",
  });
  //User Password Change
  const handlePasswordChange = (e) => {
    setPassChange((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //Password Form submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateUserPassword({ id: authUser._id, passwordData: passChange })
    );
  };

  const [profilePhoto, setProfilePhoto] = useState(null);
  //Profile Picture change handler
  const handleChangeProfile = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  //Profile Photo Submit
  const handleProfilePhotoSubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("logo", profilePhoto);
    dispatch(updateUserProfilePicture({ id: authUser._id, data: form_data }));
  };

  //Handle edit role changel
  const handleEditRoleChange = (e) => {
    setUserEdit((prevState) => ({
      ...prevState,
      role: e.target.value,
    }));
  };
  return (
    <>
      <PageHeader title="Profile" />

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
          <div className="profile-header">
            <div className="row align-items-center">
              <div className="col-auto profile-image">
                <a href="#">
                  <img
                    className="rounded-circle"
                    alt="User Image"
                    src={
                      authUser.photo
                        ? authUser.photo
                        : `https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png`
                    }
                  />
                </a>
                <form onSubmit={handleProfilePhotoSubmit}>
                  <label className="profile_change">
                    <input
                      type="file"
                      onChange={(e) => handleChangeProfile(e)}
                    />
                    <img src={pimg} alt="" />
                    <button className="btn btn-primary btn-sm">
                      {loader ? "Updating..." : "Change"}
                    </button>
                  </label>
                </form>
              </div>
              <div className="col ml-md-n2 profile-user-info">
                <h4 className="user-name mb-0">{authUser.name}</h4>
                <h6 className="text-muted">{authUser.email}</h6>
                <div className="user-Location">
                  <i className="fa fa-map-marker"></i> {authUser?.address}
                </div>
                <div className="about-text"></div>
              </div>
            </div>
          </div>

          <div className="profile-menu">
            <ul className="nav nav-tabs nav-tabs-solid">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#per_details_tab">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#password_tab">
                  Password
                </a>
              </li>
            </ul>
          </div>

          <div className="tab-content profile-tab-cont">
            <div className="tab-pane fade show active" id="per_details_tab">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title d-flex justify-content-between">
                        <span>Personal Details</span>
                        <a
                          className="edit-link"
                          data-toggle="modal"
                          href="#editUserModal"
                          onClick={handleUserEdit}>
                          <i className="fa fa-edit mr-1"></i>Edit
                        </a>
                      </h5>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Name
                        </p>
                        <p className="col-sm-10">{authUser.name}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Date of Birth
                        </p>
                        <p className="col-sm-10">{authUser?.birth}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Email ID
                        </p>
                        <p className="col-sm-10">{authUser.email}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0 mb-sm-3">
                          Mobile
                        </p>
                        <p className="col-sm-10">{authUser?.mobile}</p>
                      </div>
                      <div className="row">
                        <p className="col-sm-2 text-muted text-sm-right mb-0">
                          Address
                        </p>
                        <p className="col-sm-10 mb-0">{authUser?.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="password_tab" className="tab-pane fade">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <div className="row">
                    <div className="col-md-10 col-lg-6">
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="form-group">
                          <label>Old Password</label>
                          <input
                            type="password"
                            name="password"
                            value={passChange.password}
                            onChange={handlePasswordChange}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>New Password</label>
                          <input
                            type="password"
                            name="newpassword"
                            value={passChange.newpassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <input
                            type="password"
                            name="confirmpassword"
                            value={passChange.confirmpassword}
                            onChange={handlePasswordChange}
                            className="form-control"
                          />
                        </div>
                        <button className="btn btn-primary" type="submit">
                          {loader ? "Updating..." : "Save Changes"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
