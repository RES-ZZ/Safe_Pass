import React from "react";
import "./Tech.css";

const Tech = () => {
  return (
    <div className="documentation-page container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <h1 className="text-left mb-5">Technology we used:</h1>
          <ol className="list-group list-group-flush">
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-check-circle-fill text-primary me-3"></i>
              <span>
                Efficiency: Layer 2 handles node-to-node communication, reducing latency and complexity compared to Layer 1.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-check-circle-fill text-primary me-3"></i>
              <span>
                Scalability: Layer 2 supports network segmentation and isolation, making it easier to manage large networks.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-check-circle-fill text-primary me-3"></i>
              <span>
                Security: Features like VLANs and QoS enhance security and prioritize critical data.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-check-circle-fill text-primary me-3"></i>
              <span>
                Error Detection: Layer 2 protocols provide robust error detection and correction, ensuring data integrity.
              </span>
            </li>
            <li className="list-group-item d-flex align-items-start">
              <i className="bi bi-check-circle-fill text-primary me-3"></i>
              <span>
                Flexibility: Layer 2 allows for advanced network management and customization, optimizing performance.
              </span>
            </li>
          </ol>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-12 col-md-8">
          <h1 className="text-right mb-5">Why you should use our technology:</h1>
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
    </div>
  );
};

export default Tech;