const TechPage = () => {
  return (
    <div className="documentation-page">
      <h1 className="text-center my-5 display-4 font-weight-bold text-primary heading-gradient heading-shadow heading-glow">TECH</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Problem Statement</h2>
                <p className="card-text">Traditional OTP and 2FA systems are no longer sufficient to protect users against sophisticated security threats. There is an urgent need for a more secure, efficient, and user-friendly authentication method that leverages decentralized technologies to overcome these challenges.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Proposed Solution</h2>
                <p className="card-text">To implement a blockchain-based authentication system using public-private key cryptography and decentralized ledger technology. By replacing OTPs and 2FA with digital signatures verified against public keys on the blockchain, it enhances security, improves user experience, and reduces dependency on centralized systems.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Technical Approach</h2>
                <p className="card-text">We use Layer 2 blockchain solutions like Polygon or Fantom to ensure scalability, speed, and cost efficiency.</p>
                <ol>
                  <li><strong>User Registration:</strong> Generate a public-private key pair.</li>
                  <li><strong>Public Key Registration:</strong> Register the public key on the blockchain and save the private key in Metamask.</li>
                  <li><strong>Digital Signature Creation:</strong> Users sign server-generated challenge messages with their private keys.</li>
                  <li><strong>Signature Verification:</strong> Use a smart contract to verify the public keys to authenticate the user (React.js, Solidity, Web3.js).</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Novelty</h2>
                <ol>
                  <li><strong>Decentralized Authentication via Blockchain:</strong> Eliminates single points of failure and enhances security.</li>
                  <li><strong>Replacing OTP and 2FA with Digital Signatures:</strong> Provides a more secure and user-friendly authentication method.</li>
                  <li><strong>User Empowerment and Control:</strong> Users have full control over their authentication process, enhancing security and privacy.</li>
                  <li><strong>Global Accessibility and Cross-Border Support:</strong> The decentralized nature of blockchain ensures global accessibility and cross-border support.</li>
                  <li><strong>Scalability and Cost Efficiency via Layer 2 Solutions:</strong> Layer 2 blockchain solutions like Polygon and Fantom improve scalability and reduce costs.</li>
                  <li><strong>Innovation in Authentication Paradigms:</strong> This system represents a significant shift from traditional authentication methods to a more secure and efficient paradigm.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">On-Chain and Off-Chain Validation</h2>
                <p className="card-text"><strong>On-Chain Validation:</strong> Best for critical transactions requiring high transparency and security. Transactions are verified directly on the blockchain.</p>
                <p className="card-text"><strong>Off-Chain Validation:</strong> Reduces costs and speeds up non-critical operations by handling them outside the main blockchain.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Multifactor Authentication</h2>
                <p className="card-text">Our system supports multifactor authentication, adding multiple layers of security to protect user accounts.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Transaction Auditing</h2>
                <p className="card-text">Blockchain is immutable and transparent nature ensures secure and auditable record-keeping of all transactions.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title text-primary">Optimization</h2>
                <p className="card-text">Smart transaction batching and data compression techniques help scale the system while keeping costs low.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechPage;