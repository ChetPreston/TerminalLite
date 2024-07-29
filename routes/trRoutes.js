const { Router } = require('express')
const trController = require('../controllers/trController')
// const { requireAuth, checkUser, checkConnection } = require('../middleware/authMW')

const router = Router()

// FVC Routes
router.get('/api/tr/geex/fvc/:fvc/:start', trController.get_geex_fvc)
router.get('/api/tr/geex/das/:das', trController.get_geex_das)
router.get('/api/tr/xeex/fvc/:fvc/:start', trController.get_xeex_fvc)
router.get('/api/tr/xeex/das/:das', trController.get_xeex_das)


module.exports = router;