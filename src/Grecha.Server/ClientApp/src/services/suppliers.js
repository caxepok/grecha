import { API_URL } from "../consts";

export const fetchSuppliers = async () => {
  try {
    const res = await fetch(`${API_URL}/supplier`);
    if (res.status === 200) {
      return await res.json();
    }
    return null;
  } catch {
    return null;
  }
};

export const fetchSupplier = async (id) => {
  try {
    const res = await fetch(`${API_URL}/supplier/${id}/carts`);
    if (res.status === 200) {
      return await res.json();
    }
    return null;
  } catch {
    return null;
  }
};
