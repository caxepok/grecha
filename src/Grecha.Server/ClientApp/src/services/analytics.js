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

export const fetchAnalytics = async (period) => {
  const query =
    period === "month" ? "?from=2021-11-01&to=2021-12-03" : "?from=2021-12-03T12:00:00&to=2021-12-03T18:00:00";
  try {
    const res = await fetch(`${API_URL}/summary${query}`);
    if (res.status === 200) {
      return await res.json();
    }
    return null;
  } catch {
    return null;
  }
};
