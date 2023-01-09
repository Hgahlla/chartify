const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (data.statusCode >= 400 && data.statusCode <= 499) {
    const { message, status } = data.body.error;
    const error = new Error(message);
    error.status = status;

    throw error;
  }

  return data;
};

export default fetcher;
