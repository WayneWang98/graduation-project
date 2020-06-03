import { connection } from '../index'
import { underlineToCamel, getJsonResult } from '../utils/utils'

export class EquipmentController {
  async postList() {
    const sql = `SELECT id, name, type, state, factory_number, manufacture FROM tb_equipment;`
    const result = await new Promise(resolve => {
      connection.query(sql, function (error, results) {
        if (error) throw error
        results = results.map((item: any) => {
          return underlineToCamel(item)
        })
        results = getJsonResult(results, 200, 'success')
        resolve(results)
      })
    })
    return result
  }

  async addEquipment(reqBody: any) {
    const { type, name, factoryNumber, manufacture } = reqBody
    const state = '0' // 设备刚添加时默认是没有开启的
    const sql = `INSERT INTO tb_equipment (type, name, factory_number, manufacture, state) VALUES('${type}', '${name}', '${factoryNumber}', '${manufacture}', '${state}')`
    console.log(sql)
    const result = await new Promise(resolve => {
      connection.query(sql, (error, results) => {
        if (error) throw error
        resolve({
          data: 'success'
        })
      })
    })
    return getJsonResult(result, 200, 'success')
  }

  async deleteEquipment(reqBody: any) {
    const { id } = reqBody
    const sql = `DELETE FROM tb_equipment WHERE id = ${id}`
    const result = await new Promise(resolve => {
      connection.query(sql, (error, results) => {
        if (error) throw error
        resolve({
          data: 'success'
        })
      })
    })
    return getJsonResult(result, 200, 'success')
  }

  async changeEquipment(reqBody: any) {
    const { name, type, factoryNumber, manufacture, id } = reqBody
    const sql = `UPDATE tb_equipment 
      SET name = '${name}',
      type = '${type}',
      factory_number = '${factoryNumber}',
      manufacture = '${manufacture}'
      WHERE id = ${id}`
    const result = await new Promise(resolve => {
      connection.query(sql, (error, results) => {
        if (error) throw error
        resolve({
          data: 'success'
        })
      })
    })
    return getJsonResult(result, 200, 'success')
  }
}

