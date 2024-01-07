import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId:
    "1083364867067-j38ftqvcm40kf9op7flvs5qa0drd59kf.apps.googleusercontent.com",
  apiKey: "AIzaSyBfrVpxc4RruKYt7IxnGSNXcw2ac4_m4HM",
  scope: "https://www.googleapis.com/auth/calendar",
  secret: "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",

  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

export const apiCalendar = new ApiCalendar(config);
