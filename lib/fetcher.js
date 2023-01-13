const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (data.statusCode >= 400 && data.statusCode <= 499) {
    const { message, status } = data.body.error;
    const error = new Error(message);
    error.status = status;

    throw error;
  }

  if (data.success === false) {
    const { success, data: message } = data;
    const error = new Error(message);
    error.success = false;

    throw error;
  }

  return data;
};

export default fetcher;
