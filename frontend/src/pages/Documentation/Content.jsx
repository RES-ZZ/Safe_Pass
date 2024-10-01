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

<p>5. Inadequate for Complex Networks: OTPs dont provide the granular control needed in complex environments.</p>
        {/* More details */}
      </section>

      <section id="faq">
        <h2>FAQ</h2>
        <p>Common questions and answers...</p>
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>Steps for resolving issues...</p>
      </section>
    </div>
  );
};

export default Content;
