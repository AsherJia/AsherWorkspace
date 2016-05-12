/*import $ from "jquery";

import a2 from "./a2.js";
import "./styles.scss";
*/

/*$("body").html("Hello");
console.log("sssssss");
console.log("s2");
a2();*/

/*import Button from "./Components/Button";

const button = new Button("www.baidu.com");
button.render("a"); */
import "./styles.scss";
// If we have an anchor, render the Button component on it
if (document.querySelectorAll("a").length) {
    require.ensure([], () => {
        const Button = require("./Components/Button").default;
        const button = new Button("google.11111111");

        button.render("a");
    });
}

// If we have a title, render the Header component on it
if (document.querySelectorAll("h1").length) {
    require.ensure([], () => {
        const Header = require("./Components/Header").default;

        new Header().render("h1");
    });
}
/*
import "./styles.scss";
import Button from "./Components/Button";

const button = new Button("www.baidu.com");
button.render("a");*/