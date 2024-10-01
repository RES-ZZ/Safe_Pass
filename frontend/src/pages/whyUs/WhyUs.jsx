import React from "react";

const Tech = () => {
  return (
    <div className="documentation-page container">
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="text-center mb-5">Why you should use our technology:</h1>
          <ol className="list-group list-group-flush">
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-x-circle-fill text-danger me-3"></i>
              <span>
                Limited Scope: OTPs only enhance authentication, not addressing broader network security needs.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-x-circle-fill text-danger me-3"></i>
              <span>
                Scalability Issues: Managing OTPs for many users can be cumbersome and inefficient.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-x-circle-fill text-danger me-3"></i>
              <span>
                External Dependencies: OTPs rely on external systems like SMS or email, which can be vulnerable.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-x-circle-fill text-danger me-3"></i>
              <span>
                No Real-Time Monitoring: OTPs lack real-time threat detection and response capabilities.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-x-circle-fill text-danger me-3"></i>
              <span>
                Inadequate for Complex Networks: OTPs don't provide the granular control needed in complex environments.
              </span>
            </li>
          </ol>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="text-center mb-5">Bulk SMS Pricing</h1>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>SMS Type</th>
                  <th>Volume</th>
                  <th>Charges (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Inside Country</td>
                  <td>1,000 - 10,000</td>
                  <td>0.15</td>
                </tr>
                <tr>
                  <td>Inside Country</td>
                  <td>10,000 - 100,000</td>
                  <td>0.12</td>
                </tr>
                <tr>
                  <td>Outside Country</td>
                  <td>1,000 - 10,000</td>
                  <td>0.20</td>
                </tr>
                <tr>
                  <td>Outside Country</td>
                  <td>10,000 - 100,000</td>
                  <td>0.18</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h1 className="mb-5">VS</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>SMS Type</th>
                  <th>Volume</th>
                  <th>Charges (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Inside Country</td>
                  <td>1,000 - 10,000</td>
                  <td>0.10</td>
                </tr>
                <tr>
                  <td>Inside Country</td>
                  <td>10,000 - 100,000</td>
                  <td>0.08</td>
                </tr>
                <tr>
                  <td>Outside Country</td>
                  <td>1,000 - 10,000</td>
                  <td>0.15</td>
                </tr>
                <tr>
                  <td>Outside Country</td>
                  <td>10,000 - 100,000</td>
                  <td>0.13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tech;