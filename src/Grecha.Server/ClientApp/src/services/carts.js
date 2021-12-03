import { API_URL } from "../consts";

export const fetchCarts = async () => {
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

export const fetchCart = async (id) => {
  try {
    const res = await fetch(`${API_URL}/cart/${id}`);
    if (res.status === 200) {
      return await res.json();
    }
    return null;
  } catch {
    return null;
  }
};
export const fetchPhoto = async (cartId, measureId) => {
  try {
    const res = await fetch(`${API_URL}/cart/${cartId}/${measureId}/up`);
    if (res.status === 200) {
      return await res.blob();
    }
    return null;
  } catch {
    return null;
  }
};
