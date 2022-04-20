const express = require('express');
const router = express.Router();

router.get('/valida', (req, res) =>{
   res.send('Ruta para Valida');
});

export default router;
// module.exports = router;