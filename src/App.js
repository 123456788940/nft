import React, { useState, useEffect } from 'react';

import QuestionnaireNFT from './contracts/abi.json'; // Import the ABI of your contract

const contractAddress = '0x353af4d28736686750f9701E36f24f92316D5f9B'; // Replace with your contract address

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [message, setMessage] = useState('');
  const [awardValue, setAwardValue] = useState(''); // State for input value for awarding NFT
  const [withdrawValue, setWithdrawValue] = useState(''); // State for input value for withdrawing funds

  useEffect(() => {
    const loadContract = async () => {
      try {
        if (window.ethereum) {
          const provider = window.ethereum;
          const accounts = await provider.request({ method: 'eth_requestAccounts' });
          setAccount(accounts[0]);
          const instance = new provider.eth.Contract(QuestionnaireNFT.abi, contractAddress);
          setContract(instance);
        } else {
          console.error('MetaMask not detected');
        }
      } catch (error) {
        console.error('Error loading contract:', error);
      }
    };
    loadContract();
  }, []);

  const handleAwardNFT = async () => {
    try {
      const receipt = await contract.methods.awardNFTWithIPFSURI().send({
        from: account,
        value: window.web3.utils.toWei(awardValue, 'ether'), // Convert input value to wei
      });
      setMessage('NFT awarded successfully!');
    } catch (error) {
      console.error('Error awarding NFT:', error);
      setMessage('Error awarding NFT');
    }
  };

  const handleWithdraw = async () => {
    try {
      const receipt = await contract.methods.withdraw(window.web3.utils.toWei(withdrawValue, 'ether')).send({
        from: account,
      });
      setMessage('Withdrawal successful!');
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      setMessage('Error withdrawing funds');
    }
  };

  const handleClaimNFT = async () => {
    try {
      // Add logic for claiming NFT
    } catch (error) {
      console.error('Error claiming NFT:', error);
      setMessage('Error claiming NFT');
    }
  };

  return (
    <div style={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ color: 'white', textAlign: 'center' }}>
        <h1>Questionnaire NFT DApp</h1>
        <div className="section">
          <h2>Award NFT</h2>
          <input
            type="text"
            placeholder="Enter amount in Ether"
            value={awardValue}
            onChange={(e) => setAwardValue(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleAwardNFT}>Award NFT</button>
        </div>
        <div className="section">
          <h2>Withdraw Funds</h2>
          <input
            type="text"
            placeholder="Enter amount in Ether"
            value={withdrawValue}
            onChange={(e) => setWithdrawValue(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button onClick={handleWithdraw}>Withdraw Funds</button>
        </div>
        <div className="section" style={{ marginTop: '20px' }}>
          <button onClick={handleClaimNFT} style={{ backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none' }}>Claim NFT</button>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
