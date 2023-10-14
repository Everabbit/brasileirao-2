function qttTimes(){
    const times = labelQttInput.value;
    teams = times;
    const error = document.getElementById("error1");
    const div1 = document.getElementById("div-1").style.display;
    if(times<=1 || times>20 || Number(times)==NaN){
        error.innerHTML = "Digite um valor entre 1 e 20!";
    }else{
        error.innerHTML = "";
        if(div1 != 'none'){
            document.getElementById("div-1").style.display = 'none';
            document.getElementById("div-2").style.display = 'flex';
            const div2 = document.getElementById("div-2");
            var final = "<h4>Defina os nomes dos times:</h4>";
            final+="<div class='times'> <div class='times-escrito'>";
            for(var i=0;i<times;i++){
                final+="<div class='times-names'><p>Time "+(i+1)+":"+"</p><input type='text' id='name-"+i+"'></div>";
                if(i==3 || i==7 || i==11 || i==15
                    ){
                    final+="</div> <div class='times-escrito'>";
                }
            }
            final+=" </div> </div> <div class='botoes'><br><input type='button' id='submit-all' value='Gerar Partidas' OnClick='games()'><button id='back1' OnClick='back1()'>Voltar</button> <button id='sort' OnClick='sortTimes()'>Aleatorizar Times</button></div>";
            div2.innerHTML = final;
        }
    }
}

function games(){
    for(var i=0;i<teams;i++){
        var time = new Object();
        time.name = document.getElementById("name-"+i).value;
        time.id = i;
        time.points = 0;
        time.matches = 0;
        time.goalsm = 0;
        time.goalss = 0;
        time.win = 0;
        time.defeat = 0;
        time.draw = 0;
        times[i] = time;
    }
    //gerando as partidas
    var countm = 0;
    for(var i=0;i<=times.length-2;i++){
        for(var c=i+1;c<=times.length-1;c++){
            var match = new Object();
            match.team1= times[i];
            match.team2 = times[c];
            match.team1goals = 0;
            match.team2goals = 0;
            ArrMatch[countm] = match;
            countm++;
        }
    }
    
    const div2 = document.getElementById("div-2").style.display;
    if(div2 != 'none'){
        document.getElementById("div-2").style.display = 'none';
        document.getElementById("div-3").style.display = 'flex';
        
        //mostrando as partidas
        const div3 = document.getElementById("div-3");
        var final = "<p class='div-3_text'>As Partidas serão essas:</p>";
        final+= "<div class='matches'>"
        for(var i=0;i<ArrMatch.length;i++){
            final+="<div class='match'> <div class='time1'> <input type='number' id='match-"+i+"-team1' value='"+ArrMatch[i].team1goals+"'> <p>"+ArrMatch[i].team1.name+"</p> </div>"+" X "+"<div class='time2'> <input type='number' id='match-"+i+"-team2' value='"+ArrMatch[i].team1goals+"'> "+"<p>"+ArrMatch[i].team2.name+"</p>"+" </div>  <input type='checkbox' id='checkmatch-"+i+"'></div class='match'><br>";
        }
        final+=" </div><p id='error2'></p><div class='botoes3'><br><input type='button' id='submit-match' value='Chama a Tabelinha' OnClick='table()'><button id='back2' OnClick='back2()'>Voltar</button> </div>";
        div3.innerHTML = final;
    }
}

function sortTimes(){
    var tempTimes = sortTeams;
    for(var i=0;i<teams;i++){
        var random = Math.floor(Math.random()*sortTeams.length);
        document.getElementById("name-"+i).value = tempTimes[random];
        tempTimes.splice(random,1);
    }
}

function table(){
    const error = document.getElementById("error2");
    var exit = false;
    for(var i=0;i<ArrMatch.length;i++){
        var goals1 = Number(document.getElementById("match-"+i+"-team1").value);
        var goals2 = Number(document.getElementById("match-"+i+"-team2").value);
        if(goals1<0 || goals2<0 || goals1==NaN || goals2==NaN){
            exit=true;
            break;
        }
    }
    if(exit==true){
        error.innerHTML = "Digite um valor válido nos campos!";
    }else{
        for(var i=0;i<ArrMatch.length;i++){
            var checkmatch = document.getElementById("checkmatch-"+i);
            if(checkmatch.checked){
                var goals1 = Number(document.getElementById("match-"+i+"-team1").value);
                var goals2 = Number(document.getElementById("match-"+i+"-team2").value);
                times[ArrMatch[i].team1.id].goalsm += goals1;
                times[ArrMatch[i].team1.id].goalss += goals2;
                times[ArrMatch[i].team2.id].goalsm += goals2;
                times[ArrMatch[i].team2.id].goalss += goals1;
                times[ArrMatch[i].team1.id].matches++;;
                times[ArrMatch[i].team2.id].matches++;
                if(goals1>goals2){
                    times[ArrMatch[i].team1.id].win++;
                    times[ArrMatch[i].team1.id].points+=3;
                    times[ArrMatch[i].team2.id].defeat++;
                }else if(goals2>goals1){
                    times[ArrMatch[i].team2.id].win++;
                    times[ArrMatch[i].team2.id].points+=3;
                    times[ArrMatch[i].team1.id].defeat++;
                }else{
                    times[ArrMatch[i].team1.id].draw++;
                    times[ArrMatch[i].team1.id].points+=1;
                    times[ArrMatch[i].team2.id].draw++;
                    times[ArrMatch[i].team2.id].points+=1;
                }
            }
        }
        times.sort(function(a,b){
            var r = b.points - a.points;
        if(b.points - a.points==0){
        r = (b.goalsm-b.goalss)-(a.goalsm-a.goalss);
        }
        return r;
        });
        const div3 = document.getElementById("div-3").style.display;
        if(div3 != 'none'){
            document.getElementById("div-3").style.display = 'none';
            document.getElementById("div-4").style.display = 'block';

            //sumir com a seleção de partida e mostrar a tabela
            const div4 = document.getElementById("div-4");
            var final = "<p>100% atualizada, é ruim de aturar:</p><br><table><tr><th>Clube:</th><th>Pontos:</th><th>PJ:</th><th>VIT:</th><th>E:</th><th>DER:</th><th>GM:</th><th>GC:</th><th>SG:</th></tr>";
            for(var i=0;i<times.length;i++){
                final+="<tr><td>"+times[i].name+"</td><td>"+times[i].points+"</td><td>"+times[i].matches+"</td><td>"+times[i].win+"</td><td>"+times[i].draw+"</td><td>"+times[i].defeat+"</td><td>"+times[i].goalsm+"</td><td>"+times[i].goalss+"</td><td>"+(times[i].goalsm-times[i].goalss)+"</td></tr>";
            }
            final+="<button id='back3' OnClick='back3()'>Voltar</button>";
            div4.innerHTML = final;
        }
    }
}
function back1(){
    const div1 = document.getElementById("div-2").style.display;
    if(div1 != 'none'){
        document.getElementById("div-2").style.display = 'none';
        document.getElementById("div-1").style.display = 'flex';
    }
}
function back2(){
    const div1 = document.getElementById("div-3").style.display;
    if(div1 != 'none'){
        document.getElementById("div-3").style.display = 'none';
        document.getElementById("div-2").style.display = 'flex';
        c=ArrMatch.length
        for(var i=0;i<c;i++){
            ArrMatch.pop();
            times.pop();
        }
    }
}
function back3(){
    const div1 = document.getElementById("div-4").style.display;
    if(div1 != 'none'){
        document.getElementById("div-4").style.display = 'none';
        document.getElementById("div-3").style.display = 'block';
    }
}
function xwither(){
    document.getElementById("wither1").style.display='none'
    document.getElementById("xwitherb").style.display = 'none';
}
function xdt(){
    document.getElementById("dt").style.display='none'
    document.getElementById("xdt").style.display = 'none';
}


var sortTeams = ["Grêmio","Botafofo","Botafogo","Flamengo","Palmeiras"];

var times = [];
var ArrMatch = [];
var teams = 0;
const labelQttInput = document.getElementById("qtt-times");
labelQttInput.addEventListener("keypress", function(event){
    if(event.keyCode == 13){
        qttTimes();
    }
});
