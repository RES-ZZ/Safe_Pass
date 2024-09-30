import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Content = () => {
  return (
    <div className="content p-4">
      <section id="quick-start">
        <h2>Quick Start</h2>
        <p>Here’s how to get started with our app...</p>
        <pre>python -m pip install -U your-package-name</pre>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <p>Follow these steps for installation...</p>
        {/* More details */}
      </section>

      <section id="Tech">
        <h2>Tech</h2>
        <p>Technology we used :</p>

<p>1. Efficiency: Layer 2 handles node-to-node communication, reducing latency and complexity compared to Layer 1.</p>

<p>2. Scalability: Layer 2 supports network segmentation and isolation, making it easier to manage large networks.</p>

<p>3. Security: Features like VLANs and QoS enhance security and prioritize critical data.</p>

<p>4. Error Detection: Layer 2 protocols provide robust error detection and correction, ensuring data integrity.</p>

<p>5. Flexibility: Layer 2 allows for advanced network management and customization, optimizing performance.</p>

<p>Why you should use our technology :</p>

<p>1. Limited Scope: OTPs only enhance authentication, not addressing broader network security needs.</p>

<p>2. Scalability Issues: Managing OTPs for many users can be cumbersome and inefficient.</p>

<p>3. External Dependencies: OTPs rely on external systems like SMS or email, which can be vulnerable.</p>

<p>4. No Real-Time Monitoring: OTPs lack real-time threat detection and response capabilities.</p>

<p>5. Inadequate for Complex Networks: OTPs don+t provide the granular control needed in complex environments.</p>
        {/* More details */}
      </section>

      <section id="faq">
        <h2>FAQ</h2>
        <div className="accordion" id="faqAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                1. What is the primary problem with traditional OTP and 2FA systems?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                <ul>
                  <li>Vulnerable to sophisticated security threats like phishing, man-in-the-middle attacks, and social engineering.</li>
                  <li>Rely on centralized systems, which can be a single point of failure.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                2. What are the benefits of using a Layer 2 blockchain solution like Polygon or Fantom?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                <ul>
                  <li>Improves scalability, speed, and cost efficiency.</li>
                  <li>Handles a large number of transactions off-chain while maintaining security and decentralization.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                3.How does the proposed blockchain-based authentication system enhance security?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                  <ol type="A">
                    <li>Uses blockchain-based public/private key cryptography.</li>
                  <li>Replaces OTPs and 2FA with digital signatures verified against public keys on the blockchain.</li>
                  <li>Provides a more robust and tamper-proof authentication method.</li>
                </ol>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                4.How does the registration process work in the proposed system?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
              <div className="accordion-body">
                  <ol type="A">
                    <li>Uses blockchain-based public/private key cryptography.</li>
                  <li>Replaces OTPs and 2FA with digital signatures verified against public keys on the blockchain.</li>
                  <li>Provides a more robust and tamper-proof authentication method.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Add more accordion items for other questions */}
          </div>
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>Steps for resolving issues...</p>
      </section>
    </div>
  );
};

export default Content;