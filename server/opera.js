const axios = require("axios");

const BaseUrl =
  "https://ocr2-demo-oc.hospitality-api.us-ashburn-1.ocs.oc-test.com";

let headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  "x-app-key": "abf0b0f6-0dad-46a3-b7ea-f467c53b09b9",
};

const OAuthResBody = {
  username: "OHIPSB_VALLIPRO",
  password: "re15G8X#7N7eX}w2ob303$xt",
  grant_type: "password",
};

let operaAxios = axios.create({
  baseURL: BaseUrl,
  headers: { ...headers },
});

const basicAuth = {
  username: "vallipro_Client",
  password: "8CYnVgdvMhyR4gMdar80-Q_K",
};

const getOAuth = async () => {
  const response = await operaAxios.post(
    `${BaseUrl}/oauth/v1/tokens`,
    new URLSearchParams(OAuthResBody),
    {
      auth: basicAuth,
    }
  );

  return await response.data.access_token;
};

module.exports = {
  getOAuth: getOAuth,
};
