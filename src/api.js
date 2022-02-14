import axios from 'axios'


export const getApiResource = async (url) => {
    try {
      const res = await fetch(url);
      
      if(!res.ok){
          console.log(res.status);
          return false
      }
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  };
  

  

