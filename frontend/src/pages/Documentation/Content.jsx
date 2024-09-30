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

      <section id="usage">
        <h2>Usage</h2>
        <p>How to use this feature in your project...</p>
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

      <section id="contact">
        <h2>Contact</h2>
        <p>Contact us at support@example.com...</p>
      </section>
    </div>
  );
};

export default Content;
