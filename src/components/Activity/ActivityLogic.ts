import { ActivityProps } from "../../interfaces/componentProps";

export const ActivityLogic = (props: ActivityProps) => {
  const { activity, loading = false } = props;
  const { isLongRange } = activity;

  const classes = {
    wrapper: `order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4 ${
      isLongRange ? "mt-24" : ""
    }`,
    titleWrapper: "mb-3 flex justify-between flex-wrap",
    title: "font-bold text-gray-800 text-lg truncate",
    textWrapper:
      "text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
  };

  return {
    activity,
    loading,
    classes
  };
};
