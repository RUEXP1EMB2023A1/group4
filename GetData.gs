function GetDeviceId(){
   const REMO_ACCESS_TOKEN = "0N7itvZ70SyUGjWB1SXpcUwmn5qKHDuWCdxXdlZ2gdE.v6YInmlb5Au6ALDF-a-fa3I_SSLGA8vVV-mNpx93MQo"
//apiのURLを設定
    var url = "https://api.nature.global/1/" + "appliances" 
//optionで呼び出すheadersを設定
  const headers = {                       
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + REMO_ACCESS_TOKEN,
  };
//実行する命令の指定
  const options = { 
    "method" : "get",
    "headers" : headers,
  };
    var reply = UrlFetchApp.fetch(url, options);
//remoに登録されているすべての機器情報を表示
    Logger.log(reply)                          
}




