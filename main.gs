var access_token = 'wPU7zZ62L2IuXw59PNaZCIDN0aHwd7S_fkV8Kn0XVTs.orTj4lcvDRTYhStkicBnZ85Q-K5PF_qvqEAMBkIEFOg'
var spreadsheetID = '1UE-jKZ9l0riR2bfNO94U1E5bzt8adB80mWMXoUFgLsg'
var sheetName = 'SA'
const CLIENT_ID = 'NFUwdmdPaWdzZExFVUJfUnZyZWU6MTpjaQ'
const CLIENT_SECRET = 'YL2nR6v3hwk75iyuH9IZIqne9sfVW08aK1wdQnyzM3RA-G2cjP'


function main(){
if('21時を超えたら'){
  remo();
  if('人感センサーが１になってから１３分が経過したら')
  {
    //1になったセルを取得する
  }
}

while(1){
  if('起床時間になったら'){
  Light_On(); //ライトつく
  TV_On(); //テレビつく
  break;
  }
}
PreventSleep(sheetName, '起きた時間をあらわすcell','寝た時間をあらわすcell');
