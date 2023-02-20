<p align="center">
<img src="https://github.com/bazarnetwork/bazar-landing-page/blob/release/public/assets/Logo.png">
</p>

<!-- TOC -->

- [1. Getting Started](#1-Getting-Started)
- [2. Instructions to build the Core Node](#2-Instructions-to-build-the-Core-Node)
- [3. Instructions to run a Bazar validator Node](#3-Instructions-to-run-a-Bazar-validator-Node)

<!-- TOC -->

# 1. Getting Started

This project was bootstrapped with [Lisk SDK](https://github.com/LiskHQ/lisk-sdk), therefore, most of the transactions with the bazar blockchain can be applied using the [Dashboard Plugin](https://testnet-dashboard.bazar.network/).

## Custom transaction

**seller:order**: This method sends a transaction to insert a new order from a seller. It contains some details of the product that the seller wants to publish to be available for purchase. *files* field is optional, it can be empty using *"files:"[]*. You can upload files to IPFS, and get the hash value using one of the services of Rest endpoints [here](#Plugins). *OrderId* field uses a UUID unique identifier that is generated using random numbers. You can set random numbers to identify the orderId value or you can find an online UUID Generator. Keep in mind the oderId value will be requered for the nexts step.
```
{
   "orderId":"00cb5bf9-948d-5c36-fafc-563f224ffc6f",
   "productId":"28352",
   "productName":"Avocado",
   "productDescription":"Fruits | Lamb Hass",
   "minQuantityToSell":"1",
   "quantity":"100",
   "price":"2",
   "files":[
      {
         "filename":"blob",
         "fileType":"IMAGE",
         "fileCategory":"PRODUCT",
         "hash":"Qmf7XLnDYgcPEsYoRe5NEzZSDx5vLivgJCLSpKV8Uynzk5"
      }
   ]
```
**seller:order (empty files)**: 
```
{
   "orderId":"00cb5bf9-948d-5c36-fafc-563f224ffc6f",
   "productId":"28352",
   "productName":"Avocado",
   "productDescription":"Fruits | Lamb Hass",
   "minQuantityToSell":"1",
   "quantity":"100",
   "price":"2",
   "files":[]
}
```
**seller:getLatestOrder**: With this action, we can check the latest order transactions. It displays a list of transactions with the same value used as orderId.
**seller:getOrder**: With this action, you can check the details of a seller's order.
```
{"id": "00cb5bf9-948d-5c36-fafc-563f224ffc6f"}
```
**seller:files**: Additional files can add to the seller's order. This method sends a transaction to register a single file. *seller:getOrder* action uses to check the new file added to the seller's order.
```
{
   "orderId":"00cb5bf9-948d-5c36-fafc-563f224ffc6f",
   "filename":"blob",
   "fileType":"IMAGE",
   "fileCategory":"Certificated",
   "hash":"QmfJF5Dfi3h97S6jYncbf2r8BfYyLkTiqWVsxwcexV6ApT"
}
```
**seller:transportStatus**: This method sends a transaction to update the transportation status of the product. *seller:getOrder* action uses to check the update of location of product added to the seller's order.
```
{
   "orderId":"00cb5bf9-948d-5c36-fafc-563f224ffc6f",
   "origin":"Cartagena - Colombia",
   "destiny":"Valencia - España",
   "location":"Algeciras - España",
   "date":1664988693,
   "status":"In transit"
}
```
**buyer:order**: This method sends a transaction to register a purchase in the web platform. For the moment, the payment process uses BNB token on Binance Smarth Chain, and the receipt saves in bazar chain using this method. The *transactionPayment* field is the Binance Smarth Chain transaction,  you can check additional details on [BscScan](https://testnet.bscscan.com/tx/0x4d0bc2b196475c5dad1053c04ba476482bffa451258f649914b320d15819e654).
```
{
   "buyerOrderId":"7fee7c47-bc06-7288-087a-e87d4c7037ae",
   "sellerOrderId":"56a75c2b-1da6-6d40-f0d3-c0341ae99827",
   "status":"Accepted",
   "token":" BNB",
   "exchangeRate":"1 BNB : 287.00000000000006 USD",
   "valueXKg":"2",
   "quantity":"7",
   "serviceFee":"0.7000000000000001",
   "totalPayToken":"0.05121951219512195 BNB",
   "totalPayInUSD":"14.7 USD",
   "transacctionPayment":"0x4d0bc2b196475c5dad1053c04ba476482bffa451258f649914b320d15819e654",
   "accountSeller":"0x17507dcE75457ddA6235885D0b4Fa382A5f0Afee",
   "accountBuyer":"0xd8F6B47Cdf15e7708C9CBC3eFa6ACE31c5D85dbb",
   "productId":"63929"
}
```
**buyer:getLatestOrder**: With this action, we can check the latest purchase order transactions. It displays a list of transactions with the same value used as orderId.
**buyer:getOrder**: With this action, you can check the datils of a buyer's order.
```
{"id": "7fee7c47-bc06-7288-087a-e87d4c7037ae"}
```

## Modules
The project contains two modules: seller and buyer. The [seller module](https://github.com/bazarnetwork/bazar-core/blob/release/src/app/modules/seller/seller_module.ts) contains three assets:

1. [Order Asset](https://github.com/bazarnetwork/bazar-core/blob/release/src/app/modules/seller/assets/order_asset.ts)
2. [File Asset](https://github.com/bazarnetwork/bazar-core/blob/release/src/app/modules/seller/assets/files_asset.ts)
3. [Transport Status Asset](https://github.com/bazarnetwork/bazar-core/blob/release/src/app/modules/seller/assets/transport_status_asset.ts)

The [buyer module](https://github.com/bazarnetwork/bazar-core/blob/release/src/app/modules/buyer/buyer_module.ts) contains one asset:

1. [Order Asset](https://github.com/bazarnetwork/bazar-core/blob/release/src/app/modules/buyer/assets/order_asset.ts)

## Plugins
The system has a plugin to expose the [bazarrestapi](https://github.com/bazarnetwork/bazar-core/tree/release/src/app/plugins/bazarrestapi) API Rest for getting some details on-chain: forgers, connected peers, blocks and upload file to IPFS. 

1. Blocks
```
https://testnet-service.bazar.network/api/v1/blocks
```
2. Forgers
```
https://testnet-service.bazar.network/api/v1/forgers
```
3. Connected Peers
```
https://testnet-service.bazar.network/api/v1/peers/connected
```
4. Account details
```
https://testnet-service.bazar.network/api/v1/account/93fdd84a20fc1c3bf87f13171b808bce780c1006
```
5. Upload IPFS File
POST Http method https://testnet.bazar.network/api/v1/files/new

The Body must be form-data with:

1. key: file label
2. value: the image object.

You will see a response like this:
```
{
    "data": {
        "hash": "QmdAD23BuaZxcx3ykksZEYmnKuVABC9d3SXweEj7UmuZQb",
        "filename": "e6b2eda8b46531660d1d662067b2a2bf (1).jpg"
    },
    "errorMessage": null,
    "errorCode": null
}
```

## Other components of Bazar Network

1. [Bazar-web](https://github.com/bazarnetwork/bazar-web). It contains the web application in ReactJS.
2. [Bazar-offchain](https://github.com/bazarnetwork/bazar-offchain). This component contains some logic to complete the registration of a user to be approved by an admin in the system as a buyer/seller.
3. [Bazar-auth](https://github.com/bazarnetwork/bazar-auth). It contains the authentication and authorization component with Two Factor Authentication by SMS. It has some features for user management and uses a data model compatible with GDPR.
4. [Bazar-lambda-function](https://github.com/bazarnetwork/bazar-lambda-functions). Monorepo with the component for Email notifications. Subscribe for updates and contact us used by the landing page.
5. [Bazar-landing-page](https://github.com/bazarnetwork/bazar-landing-page). It contains the web site of [Bazar Network](https://www.bazar.network/).
6. [Bazar-smart-contract](https://github.com/bazarnetwork/bazar-smart-contracts). It has the Solidity code used for Binance Smart Chain contract.
7. [Bazar-faucet](https://github.com/bazarnetwork/bazar-faucet). Custom project to send BZR token to accounts for testing.


# 2. Instructions to build the Core Node

1. Go to [master branch](https://github.com/bazarnetwork/bazar-core).
2. Clone the repository or download the zip file. You must see the *bazar-core folder* in your directory.
3. If you are using a Linux environment execute the command to grant permissions on the files
```
chmod -R 777 bazar-core
```
4. Run the command to install the dependencies:
```
npm install
```
5. Start the node using
```
./bin/run start 
```

## Send BZR Tokens for testing

1. Go to [Bazar-faucet](https://github.com/bazarnetwork/bazar-faucet)
2. Clone the repository or download the zip file. You must see the *bazar-faucet folder* in your directory.
3. Edit the getClient.ts file to remove the SSL Websocket connection
```
wss://127.0.0.1:8080/ws   to   ws://127.0.0.1:8080/ws
```
4. Edit App.tsx file to add a valid passphrase for testing purposes. You can use one of them [accounts.json](https://github.com/bazarnetwork/bazar-core/blob/deploy/testnet/config/default/accounts.json).
5. Run the command to install the dependencies:
```
npm install
```
6.  Start the application using
```
npm start
```

# 3. Instructions to run a Bazar validator Node

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
4. If you are using a Linux environment execute the command to grant permissions on the files
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
