import Constants from 'expo-constants';

export const prodUrl = "https://lunatropolis.com";
//const expo_ip = os.networkInterfaces().HTCUSB[1].address
//console.log(expo_ip)
const ENV = {
  dev: {
    apiUrl: "http://blinky:8080/quiz"
  },
  staging: {
    apiUrl: prodUrl
  },
  prod: {
    apiUrl: prodUrl
  }
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("staging") !== -1) return ENV.staging;
  if (env.indexOf("prod") !== -1) return ENV.prod;
}

export default getEnvVars(Constants.manifest.releaseChannel);
