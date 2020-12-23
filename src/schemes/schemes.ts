import { EPriority } from "../enums/enums";

export const Schemes = {
  tags: {
    [EPriority.VERY_HIGHT]: "bg-red-300 text-red-500",
    [EPriority.HIGHT]: "bg-red-100 text-red-500",
    [EPriority.MEDIUM]: "bg-blue-100 text-blue-500",
    [EPriority.LOW]: "bg-green-100 text-green-500"
  }
};