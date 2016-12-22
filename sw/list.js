var trC = "</tr>";

function PrintMonster(name, element, aName, stars, bold, child){
    document.writeln(TRO(element, bold, child));
    if(!child && !bold)
        for(x = 0; x < 3; ++x)
            name = "&nbsp;"+name;
    if(child)
        for(x = 0; x < 6; ++x)
            name = "&nbsp;"+name;
    document.writeln(WrapTD(name));
    document.writeln(WrapTD(element));
    document.writeln(WrapTD(aName));
    var star = "";
    for(x = 0; x < stars; ++x)
        star+="&#x2605";
    document.writeln(WrapTD(star));
    document.writeln(trC);
}

function WrapTD(thing, child){
    return "<td>" + thing + "</td>";
}

function BoldOrNot(thing, bold){
    if(bold)
        return "<b>" + thing + "</b>";
    else
        return thing;
}
function TRO(element, bold, child){
    if(bold)
        bold = "font-weight: bold; font-size: 1.3em;";
    else if(!child)
        bold = "font-weight: bold;";
    else
        bold = "";
    switch(element){
        case "Water":
            return "<tr style='background:powderblue;"+bold+"'>";
        case "Fire":
            return "<tr style='background:lightcoral;"+bold+"'>";
        case "Wind":
            return "<tr style='background:GoldenRod;"+bold+"'>";
        case "Dark":
            return "<tr style='background:darkgrey;"+bold+"'>";
        default:
            return "<tr>";
    }
}

function OpenTable(){
    document.writeln("<table border=1>");
}

function CloseTable(){
    document.writeln("</table><br /></br >");
}

function Divide(){
    for(x = 0; x < 5; ++x)
        document.writeln(TRO(), trC);
}
