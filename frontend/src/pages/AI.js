import React from 'react';
import '../assets/styles/AI.css';
import DashboardNavbar from '../components/DashboardNavbar';

const AI = () => {
  return (
    <>
      <DashboardNavbar />
      <div style={{ display: 'flex', height: '100vh', marginTop: '3rem' }}>
      <div className="title-list">
            <a href="#intro">1. Introduction to Blockchain and Layer 2 Solutions</a>
            <a href="#base-chain">2. What is a Base Chain?</a>
            <a href="#l2-solutions">3. Layer 2 Solutions Explained</a>
            <a href="#base-chain-l2">4. How a Base Chain Functions as an L2</a>
            <a href="#benefits">5. Benefits and Use Cases of L2 Base Chains</a>
          </div>
        <div className="left-content">
          <div className="section" id="intro">
            <h2>1. Introduction to Blockchain and Layer 2 Solutions</h2>
            <h3>What is Blockchain?</h3>
            <p>
              Blockchain is like a digital notebook that records transactions. Every transaction is a "block," and these blocks link together to form a "chain." Once a block is added, it can't be changed, making it secure and transparent.
            </p>
            <h3>Why Layer 2 Solutions?</h3>
            <p>
              Layer 2 solutions help blockchains handle more transactions quickly and cheaply. As more people use blockchain, it can get slow and expensive. Layer 2 (L2) solutions process transactions off the main chain (Layer 1) to improve speed and reduce costs.
            </p>
          </div>

          <div className="section" id="base-chain">
            <h2>2. What is a Base Chain?</h2>
            <h3>Definition</h3>
            <p>
              A base chain is the main blockchain network (Layer 1). It handles the core tasks like validating transactions and maintaining the network's security. Examples of base chains include Bitcoin and Ethereum.
            </p>
            <h3>Key Characteristics</h3>
            <ul>
              <li>Security: Keeps transactions safe.</li>
              <li>Decentralization: Run by many different computers (nodes) around the world.</li>
              <li>Consensus Mechanism: Methods like Proof of Work (PoW) or Proof of Stake (PoS) to agree on transactions.</li>
            </ul>
          </div>

          <div className="section" id="l2-solutions">
            <h2>3. Layer 2 Solutions Explained</h2>
            <h3>Definition</h3>
            <p>
              Layer 2 solutions are built on top of the base chain to make it faster and cheaper. They handle transactions off the main chain and then report back to it.
            </p>
            <h3>Types of Layer 2 Solutions</h3>
            <ul>
              <li>State Channels: Like a private chat between users that only reports the final balance to the main chain.</li>
              <li>Sidechains: Separate chains that work alongside the main chain and occasionally connect with it.</li>
              <li>Rollups: Bundle many transactions into one and then send it to the main chain.</li>
              <li>Optimistic Rollups: Assume transactions are correct and only check if there's a dispute.</li>
              <li>ZK-Rollups: Use math proofs to ensure transactions are correct before sending them to the main chain.</li>
            </ul>
          </div>

          <div className="section" id="base-chain-l2">
            <h2>4. How a Base Chain Functions as an L2</h2>
            <h3>Example: Ethereum and Polygon</h3>
            <p>
              Ethereum (Layer 1): The main chain where transactions are validated.
              Polygon (Layer 2): Works with Ethereum to process transactions off the main chain. It makes transactions faster and cheaper, and occasionally sends the results back to Ethereum.
            </p>
            <p>
              Imagine Ethereum is a busy main road, and Polygon is a parallel side road. Cars (transactions) can travel on Polygon to avoid traffic and only merge onto Ethereum when necessary.
            </p>
          </div>

          <div className="section" id="benefits">
            <h2>5. Benefits and Use Cases of L2 Base Chains</h2>
            <h3>Benefits</h3>
            <ul>
              <li>Scalability: Can handle more transactions at once.</li>
              <li>Lower Costs: Reduces transaction fees.</li>
              <li>Better User Experience: Makes transactions faster and cheaper.</li>
            </ul>
            <h3>Simple Use Cases</h3>
            <ul>
              <li>
                DeFi (Decentralized Finance): Imagine a digital bank where you can trade and lend money quickly and cheaply using L2 solutions.
              </li>
              <li>
                Gaming: Think of a video game where you can buy and sell items instantly without high fees.
              </li>
              <li>
                Supply Chain: Picture tracking a product from factory to store, ensuring it moves quickly and efficiently using blockchain.
              </li>
            </ul>
          </div>
        </div>
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/ibApmgDomCQUQQuaI3cA0"
          className="right-content"
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
};

export default AI;
