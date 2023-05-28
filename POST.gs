function TV_On(){
   const REMO_ACCESS_TOKEN = "0N7itvZ70SyUGjWB1SXpcUwmn5qKHDuWCdxXdlZ2gdE.v6YInmlb5Au6ALDF-a-fa3I_SSLGA8vVV-mNpx93MQo"
    var url = "https://api.nature.global/1/signals/40774c63-6944-4eff-8cb0-293310837ee3/send"
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
    
  const options = {
    "method" : "post",
    "headers" : headers,
  };
    var reply = UrlFetchApp.fetch(url, options);
}

function Light_On(){
   const REMO_ACCESS_TOKEN = "0N7itvZ70SyUGjWB1SXpcUwmn5qKHDuWCdxXdlZ2gdE.v6YInmlb5Au6ALDF-a-fa3I_SSLGA8vVV-mNpx93MQo"
    var url = "https://api.nature.global/1/signals/e948fa90-85ac-4f2c-9694-03a123e4be15/send"
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
    
  const options = {
    "method" : "post",
    "headers" : headers,
  };
    var reply = UrlFetchApp.fetch(url, options);
}

function Volume_up(){
   const REMO_ACCESS_TOKEN = "0N7itvZ70SyUGjWB1SXpcUwmn5qKHDuWCdxXdlZ2gdE.v6YInmlb5Au6ALDF-a-fa3I_SSLGA8vVV-mNpx93MQo"
    var url = "https://api.nature.global/1/signals/11a079af-779c-4e44-9ea5-04e149eb1eeb/send"
  const headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
    
  const options = {
    "method" : "post",
    "headers" : headers,
  };
    var reply = UrlFetchApp.fetch(url, options);
}
  //シグナルIDはアプリからボタンに名前を付けて登録することでIDが初めて出てきます。

  function test2(){
    Light_On()
    TV_On()
    
  }
