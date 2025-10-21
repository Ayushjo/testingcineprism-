import ReactGA from "react-ga4";

const MEASUREMENT_ID = "G-NRVR3CZYCT"; // Replace with your actual ID

let initialized = false;

export const initGA = () => {
  if (!initialized && MEASUREMENT_ID) {
    ReactGA.initialize(MEASUREMENT_ID, {
      gaOptions: {
        siteSpeedSampleRate: 100,
      },
    });
    initialized = true;
    console.log("Google Analytics initialized");
  }
};

export const logPageView = (path) => {
  if (initialized) {
    ReactGA.send({
      hitType: "pageview",
      page: path || window.location.pathname + window.location.search,
    });
  }
};

export const logEvent = (category, action, label = "", value = 0) => {
  if (initialized) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

export const logException = (description = "", fatal = false) => {
  if (initialized) {
    ReactGA.event({
      category: "Exception",
      action: description,
      label: fatal ? "Fatal" : "Non-fatal",
    });
  }
};
