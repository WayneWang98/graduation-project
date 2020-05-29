const range = [{
  s: {
    c: 0,
    r: 0
  },
  e: {
    c: 0,
    r: 1
  }
}, {
  s: {
    c: 1,
    r: 0
  }, 
  e: {
    c: 1,
    r: 1
  }
}, {
  s: {
    c: 2,
    r: 0
  }, 
  e: {
    c: 2,
    r: 1
  }
}, {
  s: {
    c: 3,
    r: 0
  },
  e: {
    c: 5,
    r: 0
  }
}, {
  s: {
    c: 6,
    r: 0
  },
  e: {
    c: 8,
    r: 0
  }
}, {
  s: {
    c: 9,
    r: 0
  },
  e: {
    c: 9,
    r: 1
  }
}, {
  s: {
    c: 10,
    r: 0
  },
  e: {
    c: 10,
    r: 1
  }
}, {
  s: {
    c: 11,
    r: 0
  },
  e: {
    c: 11,
    r: 1
  }
}, ]

const cols: any = []
for (let i = 0; i < 12; i ++) {
  if (i === 10 || i === 1) {
    cols.push({
      wch: 25
    })
  } else {
    cols.push({
      wch: 20
    })
  }
}

export const header = [
  ['最后更新时间', '日发电量（Wh）', '总发电量（Wh）', '三相电流', '', '', '三相电压', '', '', '总有功功率（W）', '模块1-机内散热器温度（℃）', '模块2-机内散热器温度（℃）'],
  ['', '', '', 
    'A相电流（A）', 'B相电流（A）', 'C相电流（A）', 
    'A相电压（V）', 'B相电压（V）', 'C相电流（V）',
    '', '', ''
  ]
]

export const options = {
  '!merges': range,
  '!cols': cols
}