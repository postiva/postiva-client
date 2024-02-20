export const fetchHandler = async (url: string, options: any) => {
  const response = await fetch(url, options);
  return response.json();
};