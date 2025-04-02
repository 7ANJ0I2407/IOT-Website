import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SellerCars = ({ sellerId }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/car/seller/${sellerId}`, {
                    method: "GET",
                    credentials: "include",
                });
        
                const data = await response.json();
        
                if (!response.ok) {
                    throw new Error(data.message || "Failed to fetch cars");
                }
        
                if (Array.isArray(data) && data.length === 0) {
                    setError("No cars found for this seller");
                } else {
                    setCars(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        

        fetchCars();
    }, [sellerId]);

    const markAsSold = async (carId) => {
        setMessage(""); // Clear previous message
        try {
            const response = await fetch(`${API_BASE_URL}/car/admin/update/sold/${carId}`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isSoldOut: true }),
            });

            if (!response.ok) {
                throw new Error("Failed to update car status");
            }
            
            const result = await response.json();
            setMessage(result.message);

            setCars(prevCars => prevCars.map(car => 
                car._id === carId ? { ...car, isSoldOut: true } : car
            ));
        } catch (err) {
            setMessage("Failed to mark car as sold");
        }
    };

    if (loading) return <p className="text-green-600 font-semibold">Loading cars...</p>;
    if (error) return <p className="text-red-600 font-semibold">{error}</p>;
    if (cars.length === 0) return <p className="text-red-600 font-semibold">No cars listed by this seller.</p>;

    return (
        <div className="mt-4">
            <h3 className="text-xl font-extrabold text-gray-800">Listed Cars</h3>
            {message && <p className="text-green-600 font-semibold mt-2">{message}</p>}
            <ul className="mt-2 space-y-4">
                {cars.map((car) => (
                    <li key={car._id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                        <p className="text-lg font-semibold text-gray-700">Model: <span className="font-normal">{car.model}</span></p>
                        <p className="text-lg font-semibold text-gray-700">Year: <span className="font-normal">{car.year}</span></p>
                        <p className="text-lg font-semibold text-gray-700">Seller Price: <span className="font-normal">{car.startingBid}</span></p>
                        <p className="text-lg font-semibold text-gray-700">Highest Bid: <span className="font-normal">{car.highestBid}</span></p>
                        <p className={`text-lg font-semibold ${car.isSoldOut ? "text-green-600" : "text-yellow-500"}`}>
                            Sold: <span className="font-normal">{car.isSoldOut ? "Sold" : "Not Sold"}</span>
                        </p>
                        
                        <h4 className="mt-3 font-semibold text-gray-800">Buyers:</h4>
                        <ul className="mt-2 space-y-2">
                            {car.bidders.map((buyer, index) => (
                                <li key={index} className="p-2 border rounded-md bg-white shadow-sm">
                                    <p className="text-sm text-gray-700">Name: {buyer.name}</p>
                                    <p className="text-sm text-gray-700">Phone: {buyer.phone}</p>
                                    <p className="text-sm text-gray-700">Email: {buyer.email}</p>
                                    <p className="text-sm text-gray-700">Bid Price: {buyer.price}</p>
                                    {!car.isSoldOut && (
                                        <button
                                            className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md"
                                            onClick={() => markAsSold(car._id)}
                                        >
                                            Mark as Sold
                                        </button>
                                    )}
                                </li>
                            ))}
                            {car.isSoldOut && (
                                <p className="text-red-600 font-semibold">This car is already sold.</p>
                            )}
                            {car.bidders.length === 0 && (
                                <p className="text-gray-500">No buyers for this car yet.</p>
                            )} 
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SellerCars;
