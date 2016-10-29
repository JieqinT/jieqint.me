function show_tab(tab)  {
    var tab_contents = document.getElementsByClassName("main_body");
    var tabs = document.getElementsByClassName("tab");
    for(var i = 0; i < tab_contents.length; i++){
      if(tab_contents[i].id != tab){
        tab_contents[i].style.display = "none";
        tabs[i].id = "";
      }
      else{
        tab_contents[i].style.display = "block";
        tabs[i].id = "selected";
      }
    }
}
