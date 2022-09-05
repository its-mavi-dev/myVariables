const variableElement = document.getElementById("input-key"),
    valueElement = document.getElementById("input-value"),
    submitElement = document.getElementById("input-submit"),
    tableElement = document.getElementById("table"),
    updateElement = document.getElementById("Update"),
    deleteElement = document.getElementById("Delete");

let variables = {
    data: []
},
    flag = null;

variableElement.focus();

submitElement.addEventListener("click", () => {
    addNewVars();
});

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        if (variableElement.value !== "" && variableElement.value !== null)
            valueElement.focus();

        addNewVars();
    }
});

renderVariables();

function addNewVars() {
    if (localStorage.getItem("Variables"))
        variables = JSON.parse(localStorage.getItem("Variables"));

    if (variableElement.value !== "" &&
        valueElement.value !== "" &&
        variableElement.value !== null &&
        valueElement.value !== null) {
        variables.data.push({
            "key": variableElement.value,
            "value": valueElement.value
        });

        localStorage.setItem("Variables", JSON.stringify(variables));
        variableElement.value = null;
        valueElement.value = null;
        localStorage.setItem("currVariable", "");
        localStorage.setItem("currValue", "");
        variableElement.focus();
        renderVariables();
    }
}

function renderVariables() {
    if (localStorage.getItem("Variables"))
        variables = JSON.parse(localStorage.getItem("Variables"));
    tableElement.innerHTML = null;
    for (let i = variables.data.length - 1; i >= 0; i--) {
        let Vars = variables.data[i];
        tableElement.innerHTML += `<tr class="${i}">
            <td>${Vars.key}</td>
            <td>${Vars.value}</td>
            </tr>`
    }
    document.querySelectorAll("table tr").forEach((e, i) => {
        e.addEventListener(
            "contextmenu",
            function (event) {
                event.preventDefault();
                var ctxMenu = document.getElementById("ctxMenu");
                ctxMenu.style.display = "block";
                ctxMenu.style.left = (Math.abs(event.pageX - document.body.clientWidth) > ctxMenu.clientWidth) ? event.pageX + "px" : parseFloat(event.pageX - ctxMenu.clientWidth) + "px";
                ctxMenu.style.top = (Math.abs(event.pageY - document.body.clientHeight) > ctxMenu.clientHeight) ? event.pageY + "px" : parseFloat(event.pageY - ctxMenu.clientHeight) + "px";
                flag = e;
            },
            false
        );
    })
}

updateElement.addEventListener(
    "click",
    function () {
        variables = JSON.parse(localStorage.getItem("Variables"));
        variables.data.splice(parseInt(flag.classList[0]), 1);
        variableElement.value = flag.children[0].innerHTML;
        valueElement.value = flag.children[1].innerHTML;
        localStorage.setItem("Variables", JSON.stringify(variables));
        localStorage.setItem("currVariable", variableElement.value);
        localStorage.setItem("currValue", valueElement.value);
        valueElement.focus();
        valueElement.select();
        
        renderVariables();
    });

deleteElement.addEventListener(
    "click",
    function () {
        variables = JSON.parse(localStorage.getItem("Variables"));
        variables.data.splice(parseInt(flag.classList[0]), 1);
        localStorage.setItem("Variables", JSON.stringify(variables));
        renderVariables();
    });

document.addEventListener(
    "click",
    function () {
        var ctxMenu = document.getElementById("ctxMenu");
        ctxMenu.style.display = "none";
        ctxMenu.style.left = "";
        ctxMenu.style.top = "";
    },
    false
);

variableElement.addEventListener("change", function (event) {
    localStorage.setItem("currVariable", event.target.value);
});

valueElement.addEventListener("change", function (event) {
    localStorage.setItem("currValue", event.target.value);
});

variableElement.value = localStorage.getItem("currVariable");
valueElement.value = localStorage.getItem("currValue");