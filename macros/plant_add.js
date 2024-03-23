$('#plant-alceste').remove()
$('#plant-curus').remove()
$('#plant-dai').remove()
$('#plant-remo').remove()
$('#plant-ru').remove()
var style = "margin-left:10px;display:flex;justify-content:center;align-items:center;color:white;width:60px;border-style:solid;border-width:1px;border-color:white;text-align:center"
var alceste = '<div id="plant-alceste" style=' + style + '>Alceste</div>'
$('#action-bar').append(alceste);
var curus = '<div id="plant-alceste" style=' + style + '>Curus</div>'
$('#action-bar').append(curus);
var dai = '<div id="plant-alceste" style=' + style + '>Daiyana</div>'
$('#action-bar').append(dai);
var remo = '<div id="plant-alceste" style=' + style + '>Remo</div>'
$('#action-bar').append(remo);
var ru = '<div id="plant-alceste" style=' + style + '>Ru</div>'
$('#action-bar').append(ru);

$("#plant-alceste").click(function(){
    $("#plant-alceste").css("background-color", "yellow")
})