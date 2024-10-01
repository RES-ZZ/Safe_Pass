const Faq = () => {
  return (
    <div className="documentation-page">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/016/138/291/large_2x/faq-icon-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg" 
              className="figure-img img-fluid rounded tiny-img" 
              alt="FAQ" 
              style={{ width: "50px", height: "50px" }} // Make the image tiny
            />
          </div>
          <div className="col">
            <h1 className="text-primary"><u>Frequently Asked Questions:</u></h1>
          </div>
        </div>
      </div>
      <section id="faq" className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      1. What is the primary problem with traditional OTP and 2FA systems?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Vulnerable to sophisticated security threats like phishing, man-in-the-middle attacks, and social engineering.</li>
                        <li>Rely on centralized systems, which can be a single point of failure.</li>
                      </ol>
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
                      <ol type="I">
                        <li>Improves scalability, speed, and cost efficiency.</li>
                        <li>Handles a large number of transactions off-chain while maintaining security and decentralization.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      3. How does the proposed blockchain-based authentication system enhance security?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Uses blockchain-based public/private key cryptography.</li>
                        <li>Replaces OTPs and 2FA with digital signatures verified against public keys on the blockchain.</li>
                        <li>Provides a more robust and tamper-proof authentication method.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                      4. How does the registration process work in the proposed system?
                    </button>
                  </h2>
                  <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Generates a public/private key pair for the user.</li>
                        <li>Registers the public key on the blockchain.</li>
                        <li>Securely stores the private key in the users Metamask wallet.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                      5. What is digital signature creation, and how is it used for authentication?
                    </button>
                  </h2>
                  <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Users sign server-generated challenge messages with their private keys.</li>
                        <li>Digital signature is verified against the users public key on the blockchain.</li>
                        <li>Authenticates the user based on the verification.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSix">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                      6. How does the smart contract verify the public keys for authentication?
                    </button>
                  </h2>
                  <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Smart contract checks the digital signature against the registered public key.</li>
                        <li>Ensures the authenticity of the user.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                {/* Add more accordion items for other questions */}
              </div>
            </div>
            <div className="col-md-6">
              <div className="accordion" id="additionalFaqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingSeven">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                      7. What is the novelty of using digital signatures for authentication?
                    </button>
                  </h2>
                  <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#additionalFaqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Replaces traditional OTP and 2FA methods.</li>
                        <li>Provides more secure, user-friendly, and decentralized authentication.</li>
                        <li>Empowers users with control over their authentication process.</li>
                        <li>Enhances security.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingEight">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                      8. How does the proposed system improve user experience?
                    </button>
                  </h2>
                  <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#additionalFaqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Provides a more secure and seamless authentication process.</li>
                        <li>Users do not need to remember multiple passwords or OTPs.</li>
                        <li>Reduces dependency on centralized systems.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingNine">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                      9. What is on-chain and off-chain validation, and when are they used?
                    </button>
                  </h2>
                  <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#additionalFaqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>On-chain validation: Used for critical transactions requiring high transparency and security.</li>
                        <li>Verifies transactions on the blockchain.</li>
                        <li>Off-chain validation: Used for non-critical operations.</li>
                        <li>Reduces costs and speeds up transactions by handling them outside the main blockchain.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTen">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                      10. How does smart transaction batching and data compression optimize the system?
                    </button>
                  </h2>
                  <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#additionalFaqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Groups multiple transactions into a single batch.</li>
                        <li>Compresses data to reduce load on the blockchain.</li>
                        <li>Lowers costs while maintaining efficiency.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingEleven">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
                      11. What are the key differences between on-chain and off-chain authentication?
                    </button>
                  </h2>
                  <div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="headingEleven" data-bs-parent="#additionalFaqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>On-chain authentication involves verifying transactions directly on the blockchain, ensuring high transparency and security.</li>
                        <li>Off-chain authentication handles non-critical operations outside the main blockchain, reducing costs and speeding up transactions.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwelve">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
                      12. How does the proposed system ensure data privacy and security?
                    </button>
                  </h2>
                  <div id="collapseTwelve" className="accordion-collapse collapse" aria-labelledby="headingTwelve" data-bs-parent="#additionalFaqAccordion">
                    <div className="accordion-body">
                      <ol type="I">
                        <li>Uses blockchain-based public/private key cryptography to ensure secure data transmission.</li>
                        <li>Replaces traditional OTP and 2FA methods with digital signatures, enhancing security.</li>
                        <li>Ensures data privacy by securely storing private keys in the users Metamask wallet.</li>
                      </ol>
                    </div>
                  </div>
                </div>
                {/* Add more accordion items for other questions */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq;