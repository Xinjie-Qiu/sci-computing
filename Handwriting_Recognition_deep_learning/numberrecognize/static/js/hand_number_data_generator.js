
var counter=0;
var mark_label=0;//mark值
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var canvas2 = document.getElementById('myCanvas2');
var ctx2 = canvas2.getContext('2d');
var resultcsv = [];
var user_name;
var zero=0,one=0,two=0,three=0,four=0,five=0,six=0,seven=0,eight=0,nine=0;
function mouseDown(e){
    this.draw=true;
    this.ctx = this.getContext("2d");
    this.ctx.strokeStyle='#010101';
    this.ctx.lineWidth=5;

    var o=this;
    this.offsetX=this.offsetLeft;
    this.offsetY=this.offsetTop;

    while(o.offsetParent){
    	o=o.offsetParent;
    	this.offsetX+=o.offsetLeft;
    	this.offsetY+=o.offsetTop;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX-this.offsetX,e.pageY-this.offsetY);

}

function mouseMove(e){
    if (this.draw){
        this.ctx.lineTo(e.pageX-this.offsetX,e.pageY-this.offsetY);
        this.ctx.stroke();
    }
}

function mouseUp(e){
     ctx.save();
    this.draw=false;


  }



function clearPad(){
    var canvas=document.querySelector('#myCanvas');
    var ctx=canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx2.clearRect(0,0,canvas.width,canvas.height);


}

function gray_level_piex_acces(){

  //rescale and redraw to save cavas state
  ctx2.drawImage(canvas, 0, 0, canvas.width,canvas.height,0,0,canvas2.height,canvas2.height);
  var imageData2 = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
  var data2 = imageData2.data;
  var image_array= new Array();

  image_array.push(mark_label);
  for (var i = 0; i < data2.length; i += 4) {
    if(data2[i]!=0){
    data2[i] =255;
    }
    image_array.push(data2[i]);//save this number
  }

resultcsv.push(image_array);//save number matrix to csv buffer
image_array=[];
clearPad();
label_hint=document.getElementById('label_hint');

var x=counter %10;
  counter = counter +1;


if (x==0) {
  mark_label=1;
  zero = zero +1;
  label_hint.textContent="請寫數字1";
}

if (x==1) {
  mark_label=2;
  one = one +1;
  label_hint.textContent="請寫數字2";
}
if (x==2) {
  mark_label=3;
  two = two +1;
  label_hint.textContent="請寫數字3";
}
if (x==3) {
  mark_label=4;
  three =three+1;
  label_hint.textContent="請寫數字4";
}
if (x==4) {
  mark_label=5;
  four =four+1;
  label_hint.textContent="請寫數字5";
}
if (x==5) {
  mark_label=6;
  five =five+1;
  label_hint.textContent="請寫數字6";
}
if (x==6) {
  mark_label=7;
  six =six+1;
  label_hint.textContent="請寫數字7";
}
if (x==7) {
  mark_label=8;
  seven =seven+1;
  label_hint.textContent="請寫數字8";
}
if (x==8) {
  mark_label=9;
  eight =eight+1;
  label_hint.textContent="請寫數字9";
}
if (x==9) {
  mark_label=0;
  nine =nine +1;
  label_hint.textContent="請寫數字0";
}
if(counter==100){
  label_hint.textContent="請按下dowload鍵下載csv檔案";
}



item_counter=document.getElementById('item_counter');
item_counter.textContent="zero:"+zero+"\n"+"one:"+one+"\n"+"two:"+two+"\n"+"three:"+three+"\n"+"four:"+four+"\n"
+"five:"+five+"\n"+"six:"+six+"\n"+"seven:"+seven+"\n"+"eight:"+eight+"\n"+"nine:"+nine;
}



function download_csv() {

  user_name=document.getElementById('user_name_input').value;
    //var csv = 'Target,image\n';
    var csv = '';
    resultcsv.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";

    });
    //use get can't pass a lot of data
    //$.get("/upload_csv_data/?csv_data="+csv);
    $.post("/upload_csv_data_post/",
    {
         csv_data: csv,
         user_name:user_name

     });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = user_name+'_'+"zero:"+zero+'_'+"one:"+one+'_'+"two:"+two+'_'+"three:"+three+'_'+"four:"+four+'_'+"five:"+five
    +'_'+"six:"+six+'_'+"seven:"+seven+'_'+"eight:"+eight+'_'+"nine:"+nine+'_'+'number_dataset.csv';
    hiddenElement.click();

    counter=0;
    mark_label=0;
    label_hint.textContent="請寫數字0";
    zero=0;one=0;two=0;three=0;four=0;five=0;six=0;seven=0;eight=0;nine=0;
    resultcsv = [];
    item_counter.textContent="zero:"+zero+"\n"+"one:"+one+"\n"+"two:"+two+"\n"+"three:"+three+"\n"+"four:"+four+"\n"
    +"five:"+five+"\n"+"six:"+six+"\n"+"seven:"+seven+"\n"+"eight:"+eight+"\n"+"nine:"+nine;
}

window.addEventListener('load',function(){
    var canvas=document.querySelector('#myCanvas');

    canvas.addEventListener('mousedown',mouseDown);
    canvas.addEventListener('mousemove',mouseMove);
    canvas.addEventListener('mouseup',mouseUp);


});
// author YU_NIAN_OU 2017_03_04
