var access_token = '0N7itvZ70SyUGjWB1SXpcUwmn5qKHDuWCdxXdlZ2gdE.v6YInmlb5Au6ALDF-a-fa3I_SSLGA8vVV-mNpx93MQo'//←トークンを記入
var spreadsheetId = '1UE-jKZ9l0riR2bfNO94U1E5bzt8adB80mWMXoUFgLsg'//←スプレッドシートのIDを記入
function remo() {
  var data = getNatureRemoData();//APIを叩いてデータ取得
  var lastData = getLastData();//スプレッドシートの記載済最終行を取得
  //スプレッドシート末端に取得したデータを書き込む
  addToSpreadSheet(               
  {
    te:data[0].newest_events.te.val,   //温度
    hu:data[0].newest_events.hu.val,   //湿度
    il:data[0].newest_events.il.val,   //照度
    mo_last:data[0].newest_events.mo.created_at,//人感更新時刻
  },
  lastData.row + 1//記載済最終行+1行目にデータを書きこむ
  );
}

//RemoからGet（1/devices）でデータを取得するメソッド（Remoのapi使用）
function getNatureRemoData() {
  //アクセス先URL（1/devices）
  var url = "https://api.nature.global/1/devices";
  //ヘッダーに受取形式とトークン埋め込み
  var headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + access_token,
  };
  //オプションでGETメソッドであることと、ヘッダーを指定
  var options = {
    "method" : "get",
    "headers" : headers,
  };
  //UrlFetchAppを使ってGET(1/devices)を実行し、センサデータを取得
  var data = JSON.parse(UrlFetchApp.fetch(url, options));
  //取得したデータをログに記載
  Logger.log(data[0].newest_events)
  //取得したデータを出力
  return data;
}

//スプレッドシートの記載済最終行を取得するメソッド
function getLastData() {
  var datas = SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getDataRange().getValues()//logシートをゲットする
  var data = datas[datas.length - 1]
  return {
    date:data[0],
    temp:data[1],
    humi:data[2],
    ill:data[3],
    hu:data[4],
    huTime:data[5],
    row:datas.length,
    beforeDate:datas[datas.length - 2][0]
  }
}

//データをスプレッドシートに書き込む
function addToSpreadSheet(data, row) {
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row, 1).setValue(new Date())//A列：取得した日時
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row, 2).setValue(data.te)//B列：温度追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row, 3).setValue(data.hu)//C列：湿度追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row, 4).setValue(data.il)//D列：照度追加
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row, 6).setValue(data.mo_last)//I列：人感更新時刻追加
  //前行の人感更新時刻を取得
  var previous_mo_last = SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row - 1, 6).getValue()
  //人感更新時刻が前行と異なる（人感センサ更新ある）とき、E列に「1」を記載
  if(row >= 2 && previous_mo_last != data.mo_last){
    SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row, 5).setValue(1)
  }
  //人感更新時刻が前行と同じ（人感センサ更新ない）とき、E列に「0」を記載
  else {
    SpreadsheetApp.openById(spreadsheetId).getSheetByName('SA').getRange(row, 5).setValue(0)
  }
}
