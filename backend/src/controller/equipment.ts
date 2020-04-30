import { connection } from '../index'
import { underlineToCamel, getJsonResult } from '../utils/utils'
import { response } from 'express'

export class EquipmentController {
  async postList() {
    const sql = `SELECT id, type, status, ip_address FROM tb_equipment;`
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
    const { type, ipAddress, name, status } = reqBody
    const sql = `INSERT INTO tb_equipment (type, ip_address, name, status) VALUES('${type}', '${ipAddress}', '${name}', ${status})`
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
}

