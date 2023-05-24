function sleepTimeCalculator(sheetName, getUpTimeCell, goBedTimeCell) //スプレッドシートの名前, 起きた時間が書いてあるセルの位置, 寝た時間の書いてあるセルの位置
{
  const ss = SpreadsheetApp.getActiveSpreadsheet(); //アクティブ状態のスプレッドシートを取得
  const sheet = ss.getSheetByName(sheetName); //ssのsheetNameと同じ名前のシートがある場合はそのシートを取得

  if (sheet==null) { //例外処理
    console.log("sheetName is wrong");
    return -1;
  }

  var getUpData = sheet.getRange(getUpTimeCell).getValue(); //getUpTimeCellの場所の値を取得
  var goBedData = sheet.getRange(goBedTimeCell).getValue(); //goBedTimeCellの場所の値を取得

  var getUpDate = new Date(getUpData); //起きた日付(時刻)を返す
  var goBedDate = new Date(goBedData); //寝た日付(時刻)を返す

  if (isNaN(getUpDate) || isNaN(goBedDate)) { //例外処理
    console.log("Invalid date format");
    return -1;
  }

  var sleepTime = 0;

  var getUpTime = getUpDate.getTime(); //1970年1月1日00:00:00UTCから起きた時間までの経過時間をミリ秒で表した数値
  var goBedTime = goBedDate.getTime(); //1970年1月1日00:00:00UTCから寝た時間までの経過時間をミリ秒で表した数値

  sleepTime = Math.abs(getUpTime - goBedTime) / 1000; // 差分をミリ秒から秒に変換

  //睡眠時間を時、分、秒に分割
  var sleepTimeHour = Math.floor(sleepTime/3600);
  var sleepTimeMinute = Math.floor((sleepTime-(sleepTimeHour*3600))/60);
  var sleepTimeSecound = sleepTime-(sleepTimeHour*3600)-(sleepTimeMinute*60);

  //睡眠時間を二桁の数字にする
  sleepTimeHour = ("0" + sleepTimeHour.toString()).slice(-2);
  sleepTimeMinute = ("0" + sleepTimeMinute.toString()).slice(-2);
  sleepTimeSecound = ("0" + sleepTimeSecound.toString()).slice(-2);

  return sleepTimeHour+ "時間" + sleepTimeMinute + "分" + sleepTimeSecound + "秒"; 
}

function test()
{
  var sleepTime = sleepTimeCalculator('sheet1', 'A2', 'A1');
  console.log(sleepTime);
}
