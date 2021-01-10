const loginPage = require("./js/loginPage.js");

window.controller = {

    //stop displaying all other pages
    changePage: function(page){
        document.getElementById("loginPage").style.display = "flex";
        loginPage.display();
    },

    openSideBar: function(){

    },

    closeSideBar: function(){

    }
}