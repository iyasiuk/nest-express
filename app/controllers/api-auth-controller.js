/** @format */
const axios = require("axios");
const spa = require("../../config/spa");

const getArtifact = async (req, res, next) => {
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    try {
        const body = {
            grant_type: "client_credentials",
            client_id: process.env.BO_API_CLIENT_ID,
            client_secret: process.env.BO_API_CLIENT_SECRET,
            scope: process.env.BO_API_SCOPE,
        };
        const resultToken = await axios.post(`${process.env.BO_API_URL}/oauth/token`, body, requestOptions);
        const accessToken = resultToken.data.access_token;
        const requestOptionsArtifact = {
            headers: {
                ...requestOptions.headers,
                'flowbird-app-version': process.env.BO_APP_VERSION,
                'flowbird-app-name': process.env.BO_APP_NAME,
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const resulArtifact = await axios.get(`${process.env.BO_API_URL}/api/artifacts/${req.params.id}`, requestOptionsArtifact);
        res.json(resulArtifact.data);
    } catch (err) {
        next(err);
    }
}

const checkManifest = async (req, res, next) => {
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };
    try {
        const body = {
            grant_type: "client_credentials",
            client_id: process.env.BO_API_CLIENT_ID,
            client_secret: process.env.BO_API_CLIENT_SECRET,
            scope: process.env.BO_API_SCOPE,
        };
        const resultToken = await axios.post(`${process.env.BO_API_URL}/oauth/token`, body, requestOptions);
        const accessToken = resultToken.data.access_token;
        const requestOptionsManifest = {
            headers: {
                ...requestOptions.headers,
                'flowbird-app-version': process.env.BO_APP_VERSION,
                'flowbird-app-name': process.env.BO_APP_NAME,
                Authorization: `Bearer ${accessToken}`,
            },
        };
        const resultManifests = await axios.post(`${process.env.BO_API_URL}/api/manifests`, req.body, requestOptionsManifest);
        res.json(resultManifests.data);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getArtifact,
    checkManifest
}