# ERC-1155 Project
## Intro 

A sample application which allows user to deploy tokens and NFT using ERC 1155 on test networks.

## Requirements

- Metamask Wallet with some MATIC Tokens

- Nodejs version 16.13.1

- Npm version 8.1.2

## Installation
1. Clone the repo using the git cli
```
git clone https://github.com/MarwinSequeira/ERC-1155-example.git.
```
2. cd into the cloned directory and run
```
npm install
```

3. Create a .env file in the directory and set the following variables.

```
PORT = 8080
MODE=development
LOCAL_NODE=http://localhost:7545
```
## Usage

1. After cloning the repo, go inside the cloned directory and run the node server by using the command
```
node server/index.js 
```
2. Open another terminal and use the command 
```
npm run webpack
```
3. By default the server should start running on port 8080.

4. Access the project page by clicking on this url : http://localhost:8080/index.html.

5. The Create token section allows user to create fungible tokens. The user has to enter token iIDwhich is a number and the amount of token to generate.

6. The balance token section allows user to see the balance of specified token with specified token ID.

7. The Create NFT section allows user to create NFT by entering a token ID and writing any message in the message box.

8. The last section allows user to enter a token ID and see what message was stored with that token ID.

## Issues 
- Currently only deployed on MATIC test network
- Too many requests error while deploying the smart contract on ropsten network
- Ether issues while deploying on rinkeby test network