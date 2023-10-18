import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { timeAgo } from "../../helper/timeAgo";
import task_file from "../../assets/img/task_file.png";

const SingleTask = () => {
  const { id } = useParams();

  const { error, message, task, loader, category, tag } = useSelector(
    (state) => state.product
  );

  const single_task = task?.find((data) => data._id === id);

  console.log(single_task);
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="card p-5">
            <h2>{single_task?.name}</h2>
            <p>{single_task?.description}</p>
            <div className="meta_data">
              <p className="task_time">
                <i className="fe fe-clock"></i>
                {timeAgo(single_task?.createdAt)}
              </p>
              <p className="task_cat">
                <i className="fe fe-tag"></i>
                {single_task?.category?.name}
              </p>
              <p className="task_level">
                <i className="fe fe-bar-chart"></i>
                {single_task?.tag?.name}
              </p>
            </div>
          </div>
          <div className="card p-4">
            <form action="">
              <div className="my-3 task_file">
                <label htmlFor="">
                  <b>Upload Essential Files</b>
                  <input type="file" />
                  <img src={task_file} alt="" />
                </label>
              </div>
              <div className="my-3">
                <label>Write about task</label>
                <textarea
                  name=""
                  className="form-control"
                  id=""
                  cols="30"
                  rows="10"></textarea>
              </div>
              <div className="my-3">
                <button className="btn btn-warning form-control task_btn">
                  Submit Your Task
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-5">
            <h3>Other Tasks</h3>
            <hr />
            <ul>
              {task?.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTask;
