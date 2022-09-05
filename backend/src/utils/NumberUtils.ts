export const parsePort = (port: any) => {
  if (port === undefined) return 1000;
  return isNaN(parseInt(port)) ? 1000 : parseInt(port);
};
