import { connection } from '../index'
import { getJsonResult, underlineToCamel } from '../utils/utils'

export class LocalController {
  async getData(reqBody: any) {
    const { id } = reqBody
    const sql = `SELECT * FROM tb_local WHERE belong_station_id = ${id};`
    const parentLocalList: any = await new Promise(resolve => {
      connection.query(sql, (error, result) => {
        if (error) {
          throw error
        }
        resolve(result)
      })
    })
    let newParentLocalList = JSON.parse(JSON.stringify(parentLocalList))
    await new Promise(resolve =>{
      parentLocalList.forEach(async (item: any, index: number) => {
        let sql = `SELECT * FROM tb_local WHERE parent_id = ${item.id}`
        let childLocal: any = await new Promise(resolve => {
          connection.query(sql, (error, result) => {
            if (error) {
              throw error
            }
            resolve(result)
          })
        })
  
        let newChildLocal = JSON.parse(JSON.stringify(childLocal))
        await new Promise(resolve => {
          childLocal.forEach(async (item: any, index: number) => {
            let sql = `SELECT * FROM tb_equipment WHERE local_id = ${item.id} AND type = '逆变器'`
            let equipmentList = await new Promise(resolve => {
              connection.query(sql, (error, result) => {
                if (error) {
                  throw error
                }
                resolve(result)
              })
            })
            newChildLocal[index].equipmentList = equipmentList
            if (index === childLocal.length - 1) {
              resolve()
            }
          })
        })
        newParentLocalList[index].child = newChildLocal
        if (index === parentLocalList.length - 1) {
          resolve()
        }
      })
    })
    return getJsonResult(newParentLocalList, 200, 'success')
  }

  async getTreeSelectData(reqBody: any) {
    let ans: any = await this.getData(reqBody)
    ans = JSON.parse(ans).data
    // 遍历树状数据，选择其中想要的几项数据查看
    let result: any = []
    ans.forEach((item: any) => {
      let parent: any = {
        title: item.name,
        value: item.id,
        selectable: false
      }
      if (item.child) {
        let children: any = []
        item.child.forEach((item: any) => {
          let newEquipmentList = item.equipmentList.map((item: any) => {
            return {
              title: item.name,
              value: 'id-' + item.id
            }
          }) 
          children.push({
            title: item.name,
            value: item.id,
            selectable: false,
            children: newEquipmentList
          })
        })
        parent.children = children
      }
      result.push(parent)
    })
    return getJsonResult(result, 200, 'success')
  }

  async getInverterLocalTree(reqBody: any) {
    const { id } = reqBody 
    const sql = `SELECT * FROM tb_local WHERE belong_station_id = ${id}`
    let parents: any = await new Promise(resolve => {
      connection.query(sql, (error, parrents) => {
        if (error) throw error
        resolve(parrents)
      })
    })
    let data = JSON.parse(JSON.stringify(parents))
    data = data.map((item: any) => {
      return {
        value: item.id,
        title: item.name,
        selectable: false
      }
    })
    
    await new Promise(resolve => {
      parents.forEach(async (item: any, index: number) => {
        const sql = `SELECT * FROM tb_local WHERE parent_id = '${item.id}'`
        let child: any = await new Promise(resolve => {
          connection.query(sql, (error, child) => {
            if (error) throw error
            resolve(child)
          })
        })
        child = child.map((item: any) => {
          return {
            title: item.name,
            value: item.id,
            selectable: false,
            children: null
          }
        })
        data[index].children = child
        if (data.length - 1 === index) {
          resolve()
        }
      })
    })
    return getJsonResult(data, 200, 'success')
  }

  async getStatisticalLocal(reqBody: any) { // 统计分析页面的树状菜单查询
    const { id } = reqBody 
    const sql = `SELECT * FROM tb_local WHERE belong_station_id = ${id}`
    let parents: any = await new Promise(resolve => {
      connection.query(sql, (error, parrents) => {
        if (error) throw error
        resolve(parrents)
      })
    })
    let data = JSON.parse(JSON.stringify(parents))
    data = data.map((item: any) => {
      return {
        value: item.id,
        title: item.name,
        selectable: true,
        key: item.id
      }
    })
    
    await new Promise(resolve => {
      parents.forEach(async (item: any, index: number) => {
        const sql = `SELECT * FROM tb_local WHERE parent_id = '${item.id}'`
        let child: any = await new Promise(resolve => {
          connection.query(sql, (error, child) => {
            if (error) throw error
            resolve(child)
          })
        })
        child = child.map((item: any) => {
          return {
            title: item.name,
            value: item.id,
            selectable: true,
            children: null,
            isLeaf: true,
            key: item.id
          }
        })
        data[index].children = child
        if (data.length - 1 === index) {
          resolve()
        }
      })
    })
    return getJsonResult(data, 200, 'success')
  }
}