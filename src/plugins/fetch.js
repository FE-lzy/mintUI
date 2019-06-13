
// import store from '../store';
// import router from '../router';

//console.log(store.state.userid);
function commonFetch(url,options,method='get',success,error){    
    var initObj="",init;
      for(var key in options){    
        initObj=initObj+key+"="+options[key]+"&";
      }  
      initObj=initObj.substr(0,initObj.length-1);
    // console.log("请求参数："+initObj);  
      if(method=="POST"){     
        init={
          method:method, 
          mode:"cors",    
          // credentials: 'include', // 强制加入凭据头         
          headers:new Headers({
            'Content-Type': 'application/json' // 指定提交方式为表单提交          
          }),
            body:JSON.stringify(options)
          };
      }else{
        url=url+"?"+encodeURI(initObj);
        init={
          method:method,
          mode:"cors", 
          // credentials: 'include', // 强制加入凭据头 
          headers:new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'          
           }),          
          };
      }
     window.fetch(url,init).then(function(response) {
    //   console.log(response);
      return response.json();
  
    }).then(function(json) {
      console.log('parsed json', json);  
      success(json);
     
     
    }).catch(function(ex) {
      //console.log('parsing failed', ex);
    //   console.log(ex);
    })
  }
  
  /**
   * GET请求
   * @param url 请求地址
   * @param options 请求参数
   */
  function GET(url, options,success,err) {
      return commonFetch(url, options, 'GET',success,err)
    }
    
    /**
     * POST请求
     * @param url 请求地址
     * @param options 请求参数
     */
  function POST(url, options,success,err) {
      return commonFetch(url, options, 'POST',success,err)
    }
    window.GET=GET;
    window.POST=POST;
    
    export {GET,POST};