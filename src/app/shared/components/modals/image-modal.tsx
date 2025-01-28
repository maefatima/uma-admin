import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons"; // Import the Close icon from Ant Design
import "./image-modal.scss";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
}) => {
  const [iconColor, setIconColor] = useState<string>("white");

  // Function to calculate the brightness of an image
  const getImageBrightness = (src: string) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const pixels = imageData.data;
        let r = 0,
          g = 0,
          b = 0;

        for (let i = 0; i < pixels.length; i += 4) {
          r += pixels[i];
          g += pixels[i + 1];
          b += pixels[i + 2];
        }

        const totalPixels = pixels.length / 4;
        r = r / totalPixels;
        g = g / totalPixels;
        b = b / totalPixels;

        // Calculate brightness using the average of RGB values
        const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        setIconColor(brightness > 128 ? "black" : "white"); // Set color based on brightness
      }
    };
  };

  // Effect to calculate brightness when the image is loaded
  useEffect(() => {
    if (isOpen) {
      getImageBrightness(imageSrc);
    }
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt="Full Screen" className="full-screen-image" />
        <button
          className="close-image-button"
          onClick={onClose}
          style={{ color: iconColor }} // Dynamically set icon color
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
