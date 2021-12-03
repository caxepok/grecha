import { API_URL } from "../consts";

export const fetchData = async () => {
  try {
    const res = await fetch(`${API_URL}/cart`);
    if (res.status === 200) {
      return await res.json();
    }
    return null;
  } catch {
    return null;
  }
};
