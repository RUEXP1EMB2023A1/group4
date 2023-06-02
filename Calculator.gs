function sleepTimeCalculator(getUpTime,goBedTime) //起きた時間、寝た時間
{
  sleepTime = (getUpTime - goBedTime) / 1000; // 差分をミリ秒から秒に変換

  //睡眠時間を時、分、秒に分割
  var sleepTimeHour = Math.floor(sleepTime/3600);
  var sleepTimeMinute = Math.floor((sleepTime-(sleepTimeHour*3600))/60);
  var sleepTimeSecound = sleepTime-(sleepTimeHour*3600)-(sleepTimeMinute*60);

  return sleepTimeHour+ ":" + sleepTimeMinute + ":" + sleepTimeSecound; 
}

function test()
{
  var sleepTime = sleepTimeCalculator(new Date('2023-06-01T00:59:25').getTime(), new Date('2023-06-01T01:59:29').getTime());
  console.log(sleepTime);
}
