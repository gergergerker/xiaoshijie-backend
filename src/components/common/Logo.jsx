import React, { useState } from 'react';

const Logo = ({ size = 40, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  // 使用图片替代SVG
  return (
    <img
      src={imageError ? "/images/logo.svg" : "/images/logo.jpg"} // 优先使用jpg，失败时使用svg
      alt="晓时节"
      width={size}
      height={size}
      style={{ 
        objectFit: 'cover', 
        borderRadius: '8px',
      }}
      className={className}
      onError={() => setImageError(true)} // 图片加载失败时触发
    />
  );
};

export default Logo; 