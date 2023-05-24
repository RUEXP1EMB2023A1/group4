function PreventSleep(sheetName, getUpTimeCell,sensorTimeCell) //スプレッドシートのシート名、起きる時刻が書かれたセルの位置、人感センサーの反応が書かれた位置
{
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //アクティブ状態のスプレッドシートを取得
  const sheet = ss.getSheetByName(sheetName); //ssのsheetNameと同じ名前のシートがある場合はそのシートを取得

  if (sheet==null) { //例外処理
    console.log("sheetName is wrong");
    return -1;
  }

  var getUpData = sheet.getRange(getUpTimeCell).getValue(); //getUpTimeCellの場所の値を取得
  var sensorTime = sheet.getRange(sensorTimeCell).getValue(); //sensorTimeCellの場所の値を取得
  var getUpDate = new Date(getUpData); //起きる日付(時刻)を返す

  if (isNaN(getUpDate) || isNaN(sensorTime)) { //例外処理
    console.log("Invalid format");
    return -1;
  }

  var respondSensor = false; //人感センサーの反応
  if(sensorTime==1) //反応ある時
  {
    respondSensor = true;
  }

  var nowDate = new Date(); //現在時刻取得
  var getUpTime = getUpDate.getTime(); //1970年1月1日00:00:00UTCから起きた時間までの経過時間をミリ秒で表した数値
  var nowTime = nowDate.getTime(); //1970年1月1日00:00:00UTCからの経過時間をミリ秒で表した数値

  //console.log(nowTime-getUpTime);

  if(nowTime - getUpTime > 300000 && respondSensor == false) //起きる時間から５分以上経過したかつ人感センサーの反応がないとき
  {
      console.log("テレビの音量を上げる");
      console.log("二度寝をしているとツイート");
  }
}

function test()
{
  PreventSleep('sheet1', 'B1', 'B3');
}