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
            match.check = false;
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
            final+="<div class='match'> <div class='time1'> <input type='number' class='placar' id='match-"+i+"-team1' value='"+ArrMatch[i].team1goals+"'> <p id='team-name1-"+i+"'>"+ArrMatch[i].team1.name+"</p> </div>"+"<div class='x'> X <input type='checkbox' id='checkmatch-"+i+"'> </div>"+"<div class='time2'> <input type='number' class='placar' id='match-"+i+"-team2' value='"+ArrMatch[i].team1goals+"'> "+"<p id='team-name2-"+i+"'>"+ArrMatch[i].team2.name+"</p>"+" </div> </div class='match'><br>";
        }
        final+=" </div><p id='error2'></p><div class='botoes3'><br><input type='button' id='submit-match' value='Chama a Tabelinha' OnClick='table()'><button id='save' OnClick='save()'>Salvar Jogos</button><button id='Load' OnClick='load()'>Carregar Jogos</button><button id='back2' OnClick='back2()'>Voltar</button> </div>";
        div3.innerHTML = final;
    }
}

function sortTimes(){
    var tempTimes = [];
    for(var i=0;i<sortTeams.length;i++){
        tempTimes[i]=sortTeams[i];
    }
    for(var i=0;i<teams;i++){
        var random = Math.floor(Math.random()*tempTimes.length);
        document.getElementById("name-"+i).value = tempTimes[random];
        tempTimes.splice(random,1);
    }
}

function save(){
    var error = document.getElementById("error2");
    var exit = false;
    var savearr = [];
    for(var i=0;i<ArrMatch.length;i++){
        savearr[i]=[];
        savearr[i][0] = ArrMatch[i].team1.name;
        savearr[i][2] = ArrMatch[i].team2.name;
        savearr[i][1] = Number(document.getElementById("match-"+i+"-team1").value);
        savearr[i][3] = Number(document.getElementById("match-"+i+"-team2").value);
        if(savearr[i][1]<0 || savearr[i][3]<0 || savearr[i][1]==NaN || savearr[i][3]==NaN){
            exit=true;
            break;
        }
    }
    if(exit==true){
        error.innerHTML = "Digite um valor válido nos campos!";
    }else{
        error.innerHTML = "As partidas foram salvas com sucesso!";
        for(var i=0;i<ArrMatch.length;i++){
            var checkmatch = document.getElementById("checkmatch-"+i);
            if(checkmatch.checked){
                savearr[i][4] = true;
            }else{
                savearr[i][4] = false;
            }
            localStorage.setItem("qtt", i+1);
        }
    }
    var savetimes = JSON.stringify(times);
    var savematchs = JSON.stringify(ArrMatch);
    var savefinal = JSON.stringify(savearr);
    localStorage.setItem("matchs", savefinal);
    localStorage.setItem("match", savematchs);
    localStorage.setItem("times", savetimes);
}

function load(){
    var qttmatch = Number(localStorage.getItem("qtt"));
    var loadstr = localStorage.getItem("matchs");
    var loadarr = JSON.parse(loadstr);
    loadstr = localStorage.getItem("times");
    times = JSON.parse(loadstr);
    loadstr = localStorage.getItem("match");
    ArrMatch = JSON.parse(loadstr);
    const div1 = document.getElementById("div-1").style.display;
    if(div1 != 'none'){
        document.getElementById("div-1").style.display = 'none';
        document.getElementById("div-3").style.display = 'flex';

        //selecionar times
        document.getElementById("div-2").style.display = 'none';
        const div2 = document.getElementById("div-2");
        var final = "<h4>Defina os nomes dos times:</h4>";
        final+="<div class='times'> <div class='times-escrito'>";
        for(var i=0;i<times.length;i++){
            final+="<div class='times-names'><p>Time "+(i+1)+":"+"</p><input type='text' value='"+times[i].name+"' id='name-"+i+"'></div>";
            if(i==3 || i==7 || i==11 || i==15
                ){
                final+="</div> <div class='times-escrito'>";
            }
        }
        final+=" </div> </div> <div class='botoes'><br><input type='button' id='submit-all' value='Gerar Partidas' OnClick='games()'><button id='back1' OnClick='back1()'>Voltar</button> <button id='sort' OnClick='sortTimes()'>Aleatorizar Times</button></div>";
        div2.innerHTML = final;
        
        //mostrando as partidas
        const div3 = document.getElementById("div-3");
        var final = "<p class='div-3_text'>As Partidas serão essas:</p>";
        final+= "<div class='matches'>"
        for(var i=0;i<qttmatch;i++){
            final+="<div class='match'> <div class='time1'> <input type='number' class='placar' id='match-"+i+"-team1' value=''> <p id='team-name1-"+i+"'></p> </div>"+"<div class='x'> X <input type='checkbox' id='checkmatch-"+i+"'> </div><div class='time2'> <input type='number' class='placar' id='match-"+i+"-team2' value=''> "+"<p id='team-name2-"+i+"'></p> </div> </div class='match'><br>";
        }
        final+=" </div><p id='error2'></p><div class='botoes3'><br><input type='button' id='submit-match' value='Chama a Tabelinha' OnClick='table()'><button id='save' OnClick='save()'>Salvar Jogos</button><button id='Load' OnClick='load()'>Carregar Jogos</button><button id='back2' OnClick='back2()'>Voltar</button> </div>";
        div3.innerHTML = final;
        var error = document.getElementById("error2");
        error.innerHTML = "As partidas foram carregadas com sucesso!";
    }

    for(var i=0;i<loadarr.length;i++){
        document.getElementById("team-name1-"+i).innerHTML = loadarr[i][0];
        document.getElementById("match-"+i+"-team1").value = loadarr[i][1];
        document.getElementById("team-name2-"+i).innerHTML = loadarr[i][2];
        document.getElementById("match-"+i+"-team2").value = loadarr[i][3];
        document.getElementById("checkmatch-"+i).checked = loadarr[i][4];
    }
}

function table(){
    var error = document.getElementById("error2");
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
        for(var i=0;i<times.length;i++){
            times[i].points = 0;
            times[i].matches = 0;
            times[i].goalsm = 0;
            times[i].goalss = 0;
            times[i].win = 0;
            times[i].defeat = 0;
            times[i].draw = 0;
            
        }
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
            document.getElementById("div-4").style.display = 'flex';

            //sumir com a seleção de partida e mostrar a tabela
            const div4 = document.getElementById("div-4");
            var final = "<p>100% atualizada, é ruim de aturar:</p><br><table><tr><th>Clube:</th><th>Pontos:</th><th>PJ:</th><th>VIT:</th><th>E:</th><th>DER:</th><th>GM:</th><th>GC:</th><th>SG:</th></tr>";
            for(var i=0;i<times.length;i++){
                final+="<tr><td>"+times[i].name+"</td><td>"+times[i].points+"</td><td>"+times[i].matches+"</td><td>"+times[i].win+"</td><td>"+times[i].draw+"</td><td>"+times[i].defeat+"</td><td>"+times[i].goalsm+"</td><td>"+times[i].goalss+"</td><td>"+(times[i].goalsm-times[i].goalss)+"</td></tr>";
            }
            final+="</table> <button id='back3' OnClick='back3()'>Voltar</button>";
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
    teams = times.length;
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
        document.getElementById("div-3").style.display = 'flex';
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


var sortTeams = ["Grêmio","Botafofo","Botafogo","Flamengo","Palmeiras", "América-MG", "Athletico", "Atlético-MG", "Bahia", "Bragantino", "Corinthians", "Coritiba", "Cruzeiro", "Cuiabá", "Fluminense", "Fortaleza", "Goiás",  "Internacional", "Santos", "São Paulo", "Vasco", "Matrix FC", "Críciuma", "Paysandu", "Real Madrid?"];

var times = [];
var ArrMatch = [];
var teams = 0;
const labelQttInput = document.getElementById("qtt-times");
labelQttInput.addEventListener("keypress", function(event){
    if(event.keyCode == 13){
        qttTimes();
    }
});
