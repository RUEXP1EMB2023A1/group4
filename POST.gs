function TV_On(){
   const REMO_ACCESS_TOKEN = "wPU7zZ62L2IuXw59PNaZCIDN0aHwd7S_fkV8Kn0XVTs.orTj4lcvDRTYhStkicBnZ85Q-K5PF_qvqEAMBkIEFOg"
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

function Light_On(){
   const REMO_ACCESS_TOKEN = アクセストークン
    var url = "https://api.nature.global/1/signals/[signal ID]/send"
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

