<p align="center">
<img src="https://github.com/bazarnetwork/bazar-landing-page/blob/release/public/assets/Logo.png">
</p>

<!-- TOC -->

- [1. Introduction](#1-Introduction)
- [2. Instructions to run a Bazar validator Node](#2-Instructions-to-run-a-Bazar-validator-Node)

<!-- TOC -->

# 1. Introduction

This project was bootstrapped with [Lisk SDK](https://github.com/LiskHQ/lisk-sdk)

### Start the node

```
./bin/run start
```

# 2. Instructions to run a Bazar validator Node

## Create your account on the network.

You must have an account on the network to be registered in Bazar Testnet and identify the delegate transactions. There are some options to create an account. This guide will show you how to create a new one using the dashboard.

1. Go to  the Dashboard site at: [testnet-dashboard.bazar.network](https://testnet-dashboard.bazar.network)
2. Click on  **Generate new account** button. A dialog shows up with the credentials of the account. Copy each value and store them in a safe location. Keep in mind the Base32 address will be required for the nexts step. 
3. Go to the Faucet site at: [testnet-faucet.bazar.network](https://testnet-faucet.bazar.network/)
4. Put the address in the input field and click on **Receive 100 BZR**. Token sends to account given. 

## Setup a Bazar Blockchain Node

Prerequisites: You must have installed Git and NodeJS 16.x and npm 8.1.0 or above.

1. Go to [validator Node branch](https://github.com/bazarnetwork/bazar-core/tree/validatorNode).
2. Clone the repository or download the zip file. You must see the *bazar-core folder* in your directory.
3. Did you clone the repository?, then open a terminal and type the next command on the root of the project:
```
git checkout validatorNode
```
4. If you are using a Linux environmentm execute the command to grant permissions on the files
```
chmod -R 777 bazar-core
```
5. Run the command to install the dependencies:
```
npm install
```
6. Continue with the *Register a Delegate* section.

## Register a Delegate

You must request to seed node on Bazar Testnet that a new node wants to be a delegate, and it will be validating and forging new blocks.

1. Go to *<root>/config/default* forlder and check on *config.json* file that the *network.seedPeers* has "3.136.64.215" on IP field. 
2. Check that *forging.force* is **false** from *config.json* file at *<root>/config/default* folder.
3. Start the node using
```
./bin/run start 
```
4. Wait until the synced process can finished and the current height has the same value of the seed node. You can check it using the dashboard: [testnet-dashboard.bazar.network](https://testnet-dashboard.bazar.network)
5. Replace the *DELEGATE_NAME* with a custom name using lowercase; keep in mind the passphrase of the account you have created before. It will be requested to sign the transaction. Create the delegate transaction using the command:
```
./bin/run transaction:create 5 0 1100000000 --asset='{"username":"DELEGATE_NAME"}'
```
Make sure to have enough Bazar Tokens for the transaction. If it is needed, you can use the Faucet of Bazar again.
6. Copy the transaction generated and send it to the seed node of the Bazar network. Replace the *TRANSACTION* label with the current one.
```
./bin/run transaction:send TRANSACTION
```
If everything is okay, you will see the message: Transaction with id: '*TRANSACTION_ID*' received by node.

## Verify the account details of Delegate and add forging data to config

You can check the balance of the account and the value of dpos.delegate section for getting details of the Delegate activity on the seed node Remember that the forging.force field must set to **false**.

1. Replace *BINARY_ADDRESS* with the value of the account generated before. Execute the next command:
```
./bin/run account:get BINARY_ADDRESS --pretty
```
It returns information about the account. Take a look at the *depos.delegate* field, which contains data you will use in the next steps. The section looks like this:
```
  "dpos": {
    "delegate": {
      "username": "mango",
      "pomHeights": [],
      "consecutiveMissedBlocks": 0,
      "lastForgedHeight": 65597,
      "isBanned": false,
      "totalVotesReceived": "0"
    },
    "sentVotes": [],
    "unlocking": []
  },
```
2. Prepare data to enable the forging on your node. The next parameters are needed to set: *address*, *encryptedPassphrase* and *hashOnion*. It can be created using the next command:
```
./bin/run forging:config --count=4000 --output ./forging_config.json
```
The system will request the passpharse of the account created before and for a password to protect the passphrase. Save the password in a safe location. It will use in the next step. The *forging_config.json* file is generated in the *root* folder. Which contains the address, *encryptedPassphrase* and *hashOnion* values.

3. Go to *<root>/config/default* folder and check the *forging.delegates* section. Replace *ADDRESS_TO_SET*, *ENCRYPRED_PASSPHRASE_TO_SET* and *HASH_ONION_ARRAY_TO_SET* labels with the data from *forging_config.json*
```
 "delegates": [
        {
        "address":"ADDRESS_TO_SET",
        "encryptedPassphrase":"ENCRYPRED_PASSPHRASE_TO_SET",
        "hashOnion":{ HASH_ONION_ARRAY_TO_SET }
    ]
```
4. Stop the node.
5. Remove the data of the node using the next command:
```
rm -r ~/.lisk/bazar-core
```
6. Start the node using
```
./bin/run start 
```
7. Wait until the synced process can finished and the current height has the same value of the seed node. You can check it using the dashboard: [testnet-dashboard.bazar.network](https://testnet-dashboard.bazar.network) and using
```
./bin/run node:info
```
8. Replace *BINARY_ADDRESS* with the value of the account generated before. Execute the next command to start the forging:
```
./bin/run forging:enable BINARY_ADDRESS 0 0 0
```
The system  returns a message like:
```
Updated forging status:
{"address":"ADDRESS","forging":true}
```
At this point, the validator node must be forging new blocks.

Note: The parameters sent at end of the command are regarding *HEIGHT*, *MAXHEIGHTPREVIOUSLYFORGED* and *MAXHEIGHTPREVOTED*. The first time when forging the values are 0 0 0. You need to check the status of the node for getting the latest value to start the forging in another opportunity:
```
./bin/run forging:status
```

## Learn More

You can learn more in the [bazar.network](https://www.bazar.network/).
