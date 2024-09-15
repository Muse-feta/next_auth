CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
  isVerified BOOLEAN NOT NULL DEFAULT FALSE,
  forgotPasswordToken VARCHAR(255),
  forgotPasswordTokenExpiry BIGINT,
  verifyToken VARCHAR(255),
  verifyTokenExpiry BIGINT
);