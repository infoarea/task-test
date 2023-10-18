import { useEffect } from "react";
import specialImg from "../../assets/img/specialities/specialities-01.png";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";

const Dashboard = () => {
  useEffect(() => {
    new DataTable(".datatable");
  });
  return (
    <>
      <PageHeader title="Dashboard" />

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <h2>Instruction for Application User</h2>
              <p>
                Lorem Ipsum has been the industry{`'`}s standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
