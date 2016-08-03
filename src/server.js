'use strict';

let express = require('express');
let ParseServer = require('parse-server').ParseServer;
let AzureStorageAdapter = require('parse-server-azure-storage').AzureStorageAdapter;
let requiredParameter = require('./RequiredParameter');

let app = express();

let config = {
    // Connection string for your MongoDB database
    databaseURI: requiredParameter(process.env.DATABASE_URI, 'You must provide DATABASE_URI'),
    appId: requiredParameter(process.env.APP_ID, 'You must provide APP_ID'),
    masterKey: requiredParameter(process.env.MASTER_KEY, 'You must provide MASTER_KEY'),
    serverURL: requiredParameter(process.env.SERVER_URL, 'You must provide SERVER_URL'),
    // Absolute path to your Cloud Code
    cloud: process.env.CLOUD_CODE_ABS_PATH,
    fileKey: process.env.FILE_KEY,
    verbose: true
}

let azureAccount = process.env.FILE_ADAPTER_AZURE_ACCOUNT;
if (azureAccount) {
    let azureContainer = process.env.FILE_ADAPTER_AZURE_CONTAINER;
    if (!azureContainer) {
        throw 'You must provide an FILE_ADAPTER_AZURE_CONTAINER';
    }

    let azureAccessKey = process.env.FILE_ADAPTER_AZURE_ACCESS_KEY;
    if (!azureAccessKey) {
        throw 'You must provide an FILE_ADAPTER_AZURE_ACCESS_KEY';
    }

    var account = azureAccount;
    var container = azureContainer;
    var options = {
        accessKey: azureAccessKey,
        // If set to true, files will be served by Azure Blob Storage directly
        directAccess: process.env.FILE_ADAPTER_AZURE_DIRECT_ACCESS || false
    }

    config.filesAdapter = new AzureStorageAdapter(account, container, options);
}

let oauthEnabled = process.env.OAUTH_ENABLED;
if (oauthEnabled) {
    var oauthConfig = {};

    let facebookEnabled = process.env.OAUTH_FACEBOOK_ENABLED;
    if (facebookEnabled) {
        let facebookId = process.env.OAUTH_FACEBOOK_ID;
        if (!facebookId) {
            throw 'You must provide OAUTH_FACEBOOK_ID';
        }

        let facebookAccessToken = process.env.OAUTH_FACEBOOK_ACCESS_TOKEN;
        if (!facebookAccessToken) {
            throw 'You must provide OAUTH_FACEBOOK_ACCESS_TOKEN';
        }

        let facebookConfig = {
            id: facebookId,
            access_token: facebookAccessToken
        }

        oauthConfig.facebook = facebookConfig;
    }

    config.oauth = oauthConfig;
}

let pushEnabled = process.env.PUSH_ENABLED;
if (pushEnabled) {
    let pushConfig = {};

    let androidEnabled = process.env.PUSH_ANDROID_ENABLED;
    if (androidEnabled) {
        let androidConfig = {
            senderId: requiredParameter(process.env.PUSH_ANDROID_SENDERID, 'You must provide PUSH_ANDROID_SENDERID'),
            apiKey: requiredParameter(process.env.PUSH_ANDROID_APIKEY, 'You must provide PUSH_ANDROID_APIKEY')
        };

        pushConfig.android = androidConfig;
    }

    let iosEnabled = process.env.PUSH_IOS_ENABLED;
    if (iosEnabled) {
        let iosConfig = {
            pfx: requiredParameter(process.env.PUSH_IOS_PFXPATH, 'You must provide PUSH_IOS_PFXPATH'),
            passphrase: process.env.PUSH_IOS_PASSPHRASE,
            bundleId: requiredParameter(process.env.PUSH_IOS_BUNDLEID, 'You must provide PUSH_IOS_BUNDLEID'),
            production: process.env.PUSH_IOS_PRODUCTION ? true : false
        };

        pushConfig.ios = iosConfig;
    }

    config.push = pushConfig;
}

let api = new ParseServer(config);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.get('/status', function(req, res) {
    res.send({
        timestamp: new Date(),
        version: "2.2.17"
    });
});

let port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log(`parse-server-docker running on port ${port}.`);
});
