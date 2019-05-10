import React, { useState } from 'react'

const rootObj = {
  metaData: {
    location: "/",
    creationTime: ""
  },
  data: []
}

export default dataSource => {
  const [data, setData] = useState(dataSource);
  const [currentLocation, setCurrentLocation] = useState('/') 
  const [currentObj, setCurrentObj] = useState(rootObj) 

  return {
    init: (data) => {setData(data)},
    pwd: () => {return currentLocation}, 
    cd: (location) => {setCurrentLocation(location)}
  };
};