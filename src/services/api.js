const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const getCoffees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/coffees`);
    if (!response.ok) throw new Error('Gagal mengambil data katalog kopi');
    return await response.json();
  } catch (error) {
    console.error('Error getCoffees:', error);
    throw error;
  }
};

export const verifyCoffeeQr = async (qrHash) => {
  try {
    const response = await fetch(`${API_BASE_URL}/coffees/verify/${qrHash}`);
    if (!response.ok) throw new Error('Kode QR tidak terdaftar atau produk tidak valid.');
    return await response.json();
  } catch (error) {
    console.error('Error verifyCoffeeQr:', error);
    throw error;
  }
};