export const getLineTargets = () => {
  const targetsString = process.env["LINE_TARGETS"];
  if (!targetsString) {
    return;
  }
  const targetsArray = targetsString.split(",");
  console.log(targetsArray);
  return targetsArray;
};
