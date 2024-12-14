import jwt from 'jsonwebtoken';

export const auth = (roles = []) => {
  return (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error('Unauthorized');
      }
      
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Please authenticate' });
    }
  };
};