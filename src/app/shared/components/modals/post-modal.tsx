import React from "react";
import { Carousel } from "antd";
import "./post-modal.scss";
import PrimaryButton from "../buttons/PrimaryButton";

interface PostDetailsModalProps {
  isVisible: boolean;
  onClose: () => void;
  imageUrls: string[];
  description: string;
  price: string;
  livestockType: string;
  quantity: number;
  weight: string;
}

const PostDetailsModal: React.FC<PostDetailsModalProps> = ({
  isVisible,
  onClose,
  imageUrls,
  description,
  price,
  livestockType,
  quantity,
  weight,
}) => {
  if (!isVisible) return null;

  return (
    <div className="modal-content-overlay">
      <div className="content">
        <h2 className="modal-title">Post Details</h2>
        <p className="modal-subtitle">View Post Informations</p>

        <div className="modal-body">
          <Carousel autoplay className="modal-carousel">
            {imageUrls.map((url, index) => (
              <div key={index} className="carousel-image-container">
                <img
                  src={url}
                  alt={`Livestock ${index + 1}`}
                  className="carousel-image"
                />
              </div>
            ))}
          </Carousel>
          <div className="modal-details">
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Price:</strong> {price}
            </p>
            <p>
              <strong>Livestock Type:</strong> {livestockType}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Weight:</strong> {weight}
            </p>
          </div>
        </div>
        <div className="close-button-container">
          <PrimaryButton
            buttonText="CLOSE"
            onClick={onClose}
            className="close-button"
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetailsModal;
