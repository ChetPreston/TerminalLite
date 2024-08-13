const { Router } = require('express')
const trController = require('../controllers/trController')
// const { requireAuth, checkUser, checkConnection } = require('../middleware/authMW')

const router = Router()

// FVC Routes
router.get('/api/tr/geex/fvc/:fvc/:start', trController.get_geex_fvc)
router.get('/api/tr/geex/das/:das', trController.get_geex_das)
router.get('/api/tr/xeex/fvc/:fvc/:start', trController.get_xeex_fvc)
router.get('/api/tr/xeex/das/:das', trController.get_xeex_das)
router.get('/api/tr/veex/das/:das', trController.get_veex_das)
router.get('/api/tr/veex/fvc/:fvc/:start', trController.get_veex_fvc)
router.post('/api/tr/veex/fvc', trController.set_veex_fvc)
router.post('/api/tr/veex/fvcdo', trController.set_veex_fvcdo)
router.post('/api/tr/veex/das', trController.set_veex_das)
router.post('/api/tr/geex/fvc', trController.set_geex_fvc)
router.post('/api/tr/geex/fvcdo', trController.set_geex_fvcdo)
router.post('/api/tr/geex/das', trController.set_geex_das)
router.post('/api/tr/veex/search', trController.search_veex)
router.post('/api/tr/geex/search', trController.search_geex)
router.post('/api/tr/xeex/search', trController.search_xeex)

module.exports = router;