import { Router } from 'express'
import { LoadController } from '../controller/load'
import { PreviewController } from '../controller/preview'
import { InverterController } from '../controller/inverter'
import { EquipmentController } from '../controller/equipment'
import { User } from '../controller/user'
const router = Router()
router.post('/load/chart',async (req, res) => {
  const reqBody = req.body
  const load = new LoadController()
  const result = await load.postChart(reqBody)
  res.send(result)
})

router.post('/preview/list', async (req, res) => {
  const preview = new PreviewController()
  const result = await preview.getData()
  res.send(result)
})

router.post('/inverter/list', async (req, res) => {
  const reqBody = req.body
  const inverter = new InverterController()
  const result = await inverter.postList(reqBody)
  res.send(result)
})

router.post('/inverter/chart', async (req, res) => {
  const reqBody = req.body
  const inverter = new InverterController()
  const result = await inverter.postChart(reqBody)
  res.send(result)
})

router.post('/equipment/list', async (req, res) => {
  const equipment = new EquipmentController()
  const result = await equipment.postList()
  res.send(result)
})

router.post('/equipment/add', async (req, res) => {
  const reqBody = req.body
  const equipment = new EquipmentController()
  const result = await equipment.addEquipment(reqBody)
  res.send(result)
})

router.post('/equipment/delete', async (req, res) => {
  const reqBody = req.body
  const equipment = new EquipmentController()
  const result = await equipment.deleteEquipment(reqBody)
  res.send(result)
})

router.post('/user/login', async (req, res) => {
  const user = new User()
  const result = await user.login(req.body)
  res.send(result)
})
export default router