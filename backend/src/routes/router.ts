import { Router } from 'express'
import { LoadController } from '../controller/load'
import { PreviewController } from '../controller/preview'
import { InverterController } from '../controller/inverter'
import { EquipmentController } from '../controller/equipment'
import { LocalController } from '../controller/local'
import { User } from '../controller/user'
const router = Router()
router.post('/load/chart',async (req, res) => {
  const reqBody = req.body
  const load = new LoadController()
  const result = await load.postChart(reqBody)
  res.send(result)
})

router.post('/load/analysis_chart',async (req, res) => {
  const reqBody = req.body
  const load = new LoadController()
  const result = await load.postAnalysisChart(reqBody)
  res.send(result)
})

router.post('/preview/list', async (req, res) => {
  const preview = new PreviewController()
  const result = await preview.getData()
  res.send(result)
})

router.post('/local/list', async (req, res) => {
  const local = new LocalController()
  const result = await local.getData(req.body)
  res.send(result)
})

router.post('/local/tree_select_data', async (req, res) => {
  const local = new LocalController()
  const result = await local.getTreeSelectData(req.body)
  res.send(result)
})

router.post('/local/inverter_tree_local', async (req, res) => {
  const local = new LocalController()
  const result = await local.getInverterLocalTree(req.body)
  res.send(result)
})

router.post('/local/statistical_tree_local', async (req, res) => {
  const local = new LocalController()
  const result = await local.getStatisticalLocal(req.body)
  res.send(result)
})
router.post('/inverter/list', async (req, res) => {
  const reqBody = req.body
  const inverter = new InverterController()
  const result = await inverter.postList(reqBody)
  res.send(result)
})

router.post('/inverter/preview', async (req, res) => {
  const reqBody = req.body
  const inverter = new InverterController()
  const result = await inverter.previewList(reqBody)
  res.send(result)
})
router.post('/inverter/download', async (req, res) => {
  const inverter = new InverterController()
  const buf = await inverter.download(req.body)
  res.set({
    "Content-Type":"application/octet-stream", // 告诉浏览器这是一个二进制文件
    "Content-Disposition":"attachment" // 告诉浏览器这是一个需要下载的文件
  })
  res.send(buf)
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

router.post('/equipment/change', async (req, res) => {
  const reqBody = req.body
  const equipment = new EquipmentController()
  const result = await equipment.changeEquipment(reqBody)
  res.send(result)
})

router.post('/user/login', async (req, res) => {
  const user = new User()
  const result = await user.login(req.body)
  res.send(result)
})


router.post('/user/get_verification_code', async (req, res) => {
  const user = new User()
  const result = await user.getVerificationCode()
  res.send(result)
})

router.post('/user/check_verification_code', async (req, res) => {
  const user = new User()
  const result = await user.checkVerificationCode(req.body)
  res.send(result)
})


export default router