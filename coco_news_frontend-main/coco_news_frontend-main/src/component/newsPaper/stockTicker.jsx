import React, { useEffect, useState } from "react";
import axios from "axios";

const StockTicker = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState("");

  const rapidApiKey = process.env.REACT_APP_RAPIDAPI_KEY; // Load API Key from .env

  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        const response = await axios.get(
          "https://indianstockexchange.p.rapidapi.com/index.php",
          {
            params: { id: "NIFTY_50" }, // Fetch NIFTY 50 data
            headers: {
              "X-RapidAPI-Key": rapidApiKey,
              "X-RapidAPI-Host": "indianstockexchange.p.rapidapi.com",
            },
          }
        );

        console.log("API Response:", response.data); // Debug API response

        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Unexpected API response format");
        }

        // Randomly select 3 stocks
        const randomStocks = response.data
          .sort(() => 0.5 - Math.random()) // Shuffle array
          .slice(0, 3) // Pick first 3 elements
          .map((stock) => ({
            symbol: stock.symbol,
            price: parseFloat(stock.price).toFixed(2),
            change: stock.change.startsWith("-") ? stock.change : `+${stock.change}`,
          }));

        setStocks(randomStocks);
      } catch (err) {
        setError("Error fetching stock data: " + err.message);
      }
    };

    fetchTopStocks();
    const interval = setInterval(fetchTopStocks, 30000  ); // Refresh every 30s

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="stock-ticker">
      <div className="ticker-content">
        {error && <div className="error-message">{error}</div>}
        {stocks.length > 0 ? (
          stocks.map((stock, index) => (
            <span key={index}>
              {stock.symbol}: ₹{stock.price} ({stock.change}) &nbsp;&nbsp;&nbsp;
            </span>
          ))
        ) : (
          <span>Loading stock data...</span>
        )}
      </div>
    </div>
  );
};

export default StockTicker;
