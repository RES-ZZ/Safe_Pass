import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Troubleshoot = () => {
    return (
      <div className="documentation-page">
        <h1 className="text-center my-5 display-4 font-weight-bold text-primary heading-gradient heading-shadow heading-glow">TECH</h1>
        <p className="text-center mb-5">Technology we used:</p>
  
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h2 className="text-primary">Troubleshooting Flowchart</h2>
              <div className="flowchart">
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Start</h3>
                    <p className="card-text">Begin the troubleshooting process.</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Metamask Connection</h3>
                    <p className="card-text">- Is Metamask installed?</p>
                    <p className="card-text">- Is Metamask connected to the correct network?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Public Key Registration</h3>
                    <p className="card-text">- Is the public key registered on the blockchain?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Private Key Storage</h3>
                    <p className="card-text">- Is the private key stored in Metamask?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Digital Signature Creation</h3>
                    <p className="card-text">- Is the challenge message generated correctly?</p>
                    <p className="card-text">- Is the signature created correctly?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Signature Verification</h3>
                    <p className="card-text">- Is the smart contract deployed?</p>
                    <p className="card-text">- Is the signature verified against the public key?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Network Issues</h3>
                    <p className="card-text">- Is the network stable?</p>
                    <p className="card-text">- Are there any network delays?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Smart Contract Issues</h3>
                    <p className="card-text">- Is the smart contract code correct?</p>
                    <p className="card-text">- Are there any errors in the contract execution?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Frontend Issues</h3>
                    <p className="card-text">- Is the React.js application running correctly?</p>
                    <p className="card-text">- Are there any frontend errors?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Web3.js Issues</h3>
                    <p className="card-text">- Is Web3.js correctly integrated?</p>
                    <p className="card-text">- Are there any Web3.js errors?</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Check Logs and Error Messages</h3>
                    <p className="card-text">- Review server logs</p>
                    <p className="card-text">- Review browser console logs</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">Resolve Issues</h3>
                    <p className="card-text">- Fix identified issues</p>
                    <p className="card-text">- Restart services if necessary</p>
                  </div>
                </div>
                <div className="arrow text-center display-4">&#8595;</div>
                <div className="card mb-3">
                  <div className="card-body">
                    <h3 className="card-title">End</h3>
                    <p className="card-text">Complete the troubleshooting process.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2 className="text-primary">Technology Used</h2>
              <ul className="list-unstyled">
                <li className="mb-2"><span className="roman-number">I.</span> <strong>React.js:</strong> Frontend framework for building user interfaces.</li>
                <li className="mb-2"><span className="roman-number">II.</span> <strong>Solidity:</strong> Smart contract programming language for Ethereum-based blockchains.</li>
                <li className="mb-2"><span className="roman-number">III.</span> <strong>Web3.js:</strong> JavaScript library for interacting with Ethereum blockchain.</li>
                <li className="mb-2"><span className="roman-number">IV.</span> <strong>Metamask:</strong> Browser extension for managing Ethereum accounts and interacting with DApps.</li>
                <li className="mb-2"><span className="roman-number">V.</span> <strong>Polygon (Matic):</strong> Layer 2 scaling solution for Ethereum.</li>
                <li className="mb-2"><span className="roman-number">VI.</span> <strong>Fantom:</strong> High-performance blockchain platform.</li>
                <li className="mb-2"><span className="roman-number">VII.</span> <strong>Bootstrap:</strong> CSS framework for responsive and mobile-first web development.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Troubleshoot;

