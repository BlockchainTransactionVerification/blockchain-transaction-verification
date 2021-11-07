import express from 'express';

const router = express.Router();

router
  .post('/login/:userId', (req, res, next) => {
    return res
      .status(200)
      .json({
        success: true,
        authorization: req.authToken,
      });
  });

export default router;