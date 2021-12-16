const defaultState = {
   addressList : [
      {
         'id':'0001',
         'user':'蒋彬',
         'phone':'135****4649' ,
         'address' : '四川省 成都市 武侯区 红牌楼街道' ,
         'addressCode' :'510107010' ,
         'default' : true 
      },
      {
         'id':'0002',
         'user':'jack',
         'phone':'135****4649' ,
         'address' : '四川省 成都市 武侯区 机投桥街道' ,
         'addressCode' :'510107012' ,
         'default' : false 
      },
      {
         'id':'0003',
         'user':'蒋 彬',
         'phone':'135****4649' ,
         'address' : '四川省 成都市 武侯区 金花桥街道' ,
         'addressCode' :'510107013' ,
         'default' : false 
      },
      {
         'id':'0004',
         'user':'jack',
         'phone':'135****4649' ,
         'address' : '四川省 成都市 武侯区 石羊场街道' ,
         'addressCode' :'510107063' ,
         'default' : false 
      }
   ]
}

const AddressReduce = (state = defaultState,action) => {
   return state
}

export default AddressReduce;