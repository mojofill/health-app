export const parsePort = (port: any) => {
    if (port === undefined) return 3000; 
    return isNaN(parseInt(port)) ? 3000 : parseInt(port); 
}; 