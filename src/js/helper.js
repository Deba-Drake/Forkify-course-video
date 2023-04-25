import { async } from "regenerator-runtime";
import { timeout_second } from "./configuration.js";
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//to get JSON
export const transform_json = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(timeout_second)]);
    const data = await response.json();
    //To throw a error if the response id faulty
    if (!response.ok) {
      if (data.message.includes("Invalid _id")) {
        throw new Error(
          `PLEASE CHECK THE ID. The ID recieved was ${data.message.substr(13)}`
        );
      } else {
        throw new Error(`${data.message} Error Status: (${response.status})`);
      }
    }
    return data;
  } catch (error) {
    throw error;
    // to transform the error from fulfilled to rejected
    // to transfer the error to the model.js file to handle
  }
};

//to post JSON
export const post_json = async function (url, upload_data) {
  try {
    const request = await Promise.race([
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(upload_data),
      }),
      timeout(timeout_second),
    ]);
    const data = await request.json();
    //To throw a error if the response id faulty
    if (!request.ok) {
      if (data.message.includes("Invalid _id")) {
        throw new Error(
          `PLEASE CHECK THE ID. The ID recieved was ${data.message.substr(13)}`
        );
      } else {
        throw new Error(`${data.message} Error Status: (${request.status})`);
      }
    }
    return data;
  } catch (error) {
    console.error("postjson", error);
  }
};
