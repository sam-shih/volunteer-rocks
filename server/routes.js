const router = require('express').Router();
const userCtrl = require('./controllers/userController.js');
const oppCtrl = require('./controllers/oppController.js')


router.route('/api/logout')
  .get()

router.route('/api/login')
  .put(userCtrl.login)



router.route('/api/users')
  .post(userCtrl.signUp)
  .put(userCtrl.enroll)
  .get(userCtrl.fetchOpps)

router.route('/api/opportunities')
  .post(oppCtrl.addNew)
  .put(oppCtrl.fetchByZip)
  .get(oppCtrl.fetchAll)

module.exports = router;