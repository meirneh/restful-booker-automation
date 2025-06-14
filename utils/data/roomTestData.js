export const ROOM_NUMBER = "104";

export const roomDetails1 = {
  number: ROOM_NUMBER,
  type: "Double",
  accessibility: "false",
  features: ["wifi", "refresh", "tv", "safe", "radio", "views"],
  price: "100",
};

export const roomDetails2 = {
  number: ROOM_NUMBER,
  type: "Single",
  accessibility: "true",
  features: ["refresh", "safe", "views"],
  price: "75",
};

export const roomExpectedDetails1 = {
  number: ROOM_NUMBER,
  type: "Double",
  accessibility: "false",
  features: "WiFi, TV, Radio, Refreshments, Safe, Views",
  price: "100",
};

export const roomExpectedDetails2 = {
  number: ROOM_NUMBER,
  type: "Single",
  accessibility: "true",
  features: "WiFi, TV, Radio",
  price: "75",
};