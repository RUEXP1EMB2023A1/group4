var spreadsheetId = '1UE-jKZ9l0riR2bfNO94U1E5bzt8adB80mWMXoUFgLsg'//←スプレッドシートのIDを記入

function main(){
  remo(); //remoデータ取得

  var remoData = getLastData(); //スプレッドシートの最終行のデータ配列取得(date:日時,temp:温度,humi:湿度,ill:明るさ,hu:(on:1,off:0),huTime:人感センサーの反応した時間,row:スプレッドシートの何行目か)
  var nowDate = new Date(); //現在日時取得
  var nowHour = nowDate.getHours(); //現在時
  var nowMinute = nowDate.getMinutes(); //現在分
  var nowTime = nowHour*60+nowMinute;
  var huSensor = new Date(remoData.huTime); //remoが反応した日時
  var huSensorTime = huSensor.getTime(); //remoが反応した日時を1970年1月1日00:00:00UTCからの経過時間をミリ秒で表示
  var plannedDate = new Date(remoData.beforeDate); //直前にプログラムが稼働した時間

  var logDatas = SpreadsheetApp.openById(spreadsheetId).getSheetByName('SleepManager').getDataRange().getValues(); //睡眠記録のスプレッドシートの全セルを配列に入れる
  var plannedData = logDatas[1]; //ユーザに入力された時間がある行
  var logData = logDatas[logDatas.length-1]; //前回記録された行
  var writeDataRow = logDatas.length+1; //記録するスプレッドシートの書き込む行
  var getUpTime = plannedData[2]*60+plannedData[3];
  var sleepTime = plannedData[0]*60+plannedData[1];
  var betweenSleep = (getUpTime) - (sleepTime); //睡眠時間が起床時間より前か確かめる
  if(betweenSleep<0  && nowHour>12) //睡眠時間が前の時かつ現在午後の時、24時間を足す
  {
    plannedData[2]+=24;
  }

  /*起きるときの処理*/
  if(logData[0]!="" && logData[1]=="" && CheckTime(parseInt(nowDate.getDate()), parseInt(nowHour), parseInt(nowMinute), parseInt(plannedDate.getDate()), parseInt(plannedData[2]), parseInt(plannedData[3])) == true) //就寝時刻は書かれているが起床時刻が書かれていないかつ起床予定時間より後になったら
  {
    Light_On(); //ライトつく
    //TV_On(); //テレビつく
    if(nowTime - getUpTime > 5 && remoData.hu==0) //起きる時間から５分以上経過したかつ人感センサーの反応がないとき
    {
        Volume_up();
        NidoneTweet();
    }
    else if(remoData.hu==1)
    {
      SpreadsheetApp.openById(spreadsheetId).getSheetByName('SleepManager').getRange(writeDataRow-1, 2).setValue(new Date()); //現在日時記録
      GoodMorningTweet(); //おはようツイート
    }
  }

  /*寝るときの処理*/
  if(logData[0] == "睡眠時刻" || logData[0]!="" && logData[1]!="" && CheckTime(parseInt(nowDate.getDate()), parseInt(nowHour), parseInt(nowMinute), parseInt(new Date(logData[0]).getDate()), parseInt(plannedData[0]), parseInt(plannedData[1])) == true) //前回の起床時刻が書かれているかつ睡眠開始予定時間より後になったら
  {
    if(remoData.hu == 0 && nowDate.getTime()-huSensorTime > 780000) //人感センサーが反応したかつ反応してから13分経ったら
    {
      SpreadsheetApp.openById(spreadsheetId).getSheetByName('SleepManager').getRange(writeDataRow, 1).setValue(new Date()); //現在日時記録
      GoodNightTweet(); //おやすみツイート
    }
  }

  if(logData[0]!="" && logData[1]!="" && logData[2] == "")
  {
    var sleepingTime = sleepTimeCalculator(new Date(logData[1]).getTime(),new Date(logData[0]).getTime());
    SpreadsheetApp.openById(spreadsheetId).getSheetByName('SleepManager').getRange(writeDataRow-1, 3).setValue(sleepingTime); //睡眠時間記録
  }
}

function CheckTime(nowDate, nowHour, nowMinute, plannedDate, plannedHour, plannedMinute) //予定時刻を超えたか確認(現在日,現在時,現在分,前回プログラムが動いた日,予定時,予定分)
{
  if(nowHour>plannedHour) //予定時を超えた時
  {
    return true;
  }
  else if(nowHour<plannedHour) //予定時を超えていないとき
  {
    if(nowDate>plannedDate) //日付が直前に記録された睡眠日を超えているとき
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  else if(nowMinute>=plannedMinute) //予定分以上の時
  {
    return true;
  }
  else
  {
    return false;
  }
}
