import React, { useState } from "react";
import './index.css';

const ColorConverter: React.FC = () => {
  const [hexValue, setHexValue] = useState<string>("");
  const [rgbValue, setRgbValue] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValidHex = (hex: string): boolean => {
    const hexRegex = /^#([0-9A-Fa-f]{6})$/;
    return hexRegex.test(hex);
  };

  const hexToRgb = (hex: string): string | null => {
    if (!isValidHex(hex)) {
      return null;
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setHexValue(input);

    if (input.length === 7) {
      const rgb = hexToRgb(input);

      if (rgb) {
        setRgbValue(rgb);
        setErrorMessage(null);
        document.body.style.backgroundColor = input;
      } else {
        setRgbValue(null);
        setErrorMessage("Неверный формат HEX. Попробуйте снова.");
        document.body.style.backgroundColor = "red";
      }
    } else {
      setErrorMessage(null);
      setRgbValue(null);
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={hexValue}
        onChange={handleInputChange}
        maxLength={7}
        placeholder="#000000"
        className="input-box"
      />
      {rgbValue && (
        <div className="rgb-output">
          <h2>RGB: {rgbValue}</h2>
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          <h2>{errorMessage}</h2>
        </div>
      )}
    </div>
  );
};

export default ColorConverter;
