**How to run the application**

**Clone the directory**
 
`git clone https://github.com/shreyanshs7/MaticBlockChain.git`

`cd MaticBlockChain`

**Start server without docker**

1.Run `npm install` to install all the project dependencies

2.Run `npm start` to start the server

3.If the server is successfully started you should see in your terminal `Server started on 0.0.0.0:4000`

4.To get the list of all transaction that has been done by the user then run the curl command in your terminal.
    Here `from` query param is the user address for which user you want the transactions.
    
    `curl -X GET 'http://0.0.0.0:4000/user/transactions?from=0x4d6Bb4ed029B33cF25D0810b029bd8B1A6bcAb7B' `
5.To get the list of all the transactions that has been done to the user the run the curl command in your
    Here `to` query param is the user address for which user you want the transactions. Example
    
    `curl -X GET 'http://0.0.0.0:4000/user/transactions?to=0x4B1Eb61EC66243f1A3F9D6aDa2c5B78E7A738D17'`

**Start server with docker**
1. Run `docker build -t matic-app .`

2. If the image is successfully built then you can check it by running `docker images` in your terminal and see for `matic-app`

3. To start the server run `docker run -p 49160:4000 -d matic-app`

4. If the server is successfully started you should see in your terminal `Server started on 0.0.0.0:4000`

5. To get the list of all transaction that has been done by the user then run the curl command in your terminal.
    Here `from` query param is the user address for which user you want the transactions. Example
    
    ` curl -X GET 'http://0.0.0.0:49160/user/transactions?from=0x4d6Bb4ed029B33cF25D0810b029bd8B1A6bcAb7B' `
6. To get the list of all the transactions that has been done to the user the run the curl command in your.

    Here `to` query param is the user address for which user you want the transactions. Example
    
    `curl -X GET 'http://0.0.0.0:49160/user/transactions?to=0x4B1Eb61EC66243f1A3F9D6aDa2c5B78E7A738D17'`