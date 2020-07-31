const DISPLAY_TABLE = (function(){
    let configTableDiv = document.getElementById("configTable");

    const tableColumnNames = [{name: "label", value: "Key"}, {name: "value", value: "Value"}, {name: "description", value: "Description"}];

    const displayTable = (configData) => {
        configTableDiv.innerHTML = "";
        renderHeader();
        renderTable(configData);
    }

    const renderHeader = () => {
        let tableHeader = document.createElement("div");
        tableHeader.setAttribute("id", "tableHeader");
        tableHeader.classList.add("tableRow");
        let checkbox = document.createElement("input");
        checkbox.style.visibility = "none";

        tableHeader.appendChild(checkbox);
       
        tableColumnNames.forEach((columnName, index) => {
            let column = document.createElement("div");
            column.innerText = columnName.value;
            column.setAttribute("id", `header-${columnName}`);
            tableHeader.appendChild(column);
        });
        configTableDiv.appendChild(tableHeader);
    };

    const renderTable = (configData) => {
        configData.forEach((conf, index) => {
            let tableRow = document.createElement("div");
            tableRow.classList.add("tableRow");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = conf.selected;
            checkbox.addEventListener("change", (event) => {
                FETCH_CONFIG.selectRow(conf, event.target.checked);
            })  
            
            tableRow.appendChild(checkbox);

            tableColumnNames.forEach(tableColumn => {
                let rowColumn = document.createElement("div");

                if(tableColumn.name === "value") {
                    rowColumn = getFieldBasedonType(conf, rowColumn);
                } else {
                    rowColumn.innerHTML = conf[tableColumn.name];

                };
                
                tableRow.appendChild(rowColumn);
            });

            configTableDiv.appendChild(tableRow)
        })
    }

    const getFieldBasedonType = (config, parentNode) => {
        let fieldType = config.field.type;
        switch(fieldType) {
            case "text":
                let textFiled = document.createElement("input");
                textFiled.value = config.field.defaultValue;
                textFiled.addEventListener("change", (event) => {
                    let value = event.target.value;
                    FETCH_CONFIG.changeDefaultValue(config, value);
                });
                if(!config.selected) {
                    textFiled.classList.add("disabled");
                }
                parentNode.appendChild(textFiled);
                return parentNode;
            case "select":
                let select = document.createElement("select");

                let options = config.field.options;
                let value = options.findIndex(option => option === config.field.defaultValue);
                options.forEach((option, index) => {
                    let optionDiv = document.createElement("option");
                    optionDiv.value = option;
                    optionDiv.text = option;
                    optionDiv.innerText = option;
                    optionDiv.selected = value === index ? true: false 
                    optionDiv.addEventListener("change", () => {
                        FETCH_CONFIG.changeDefaultValue(config, option);
                    });
                    select.appendChild(optionDiv);
                });

                select.addEventListener("change", (event) => {
                    let value = event.target.value;
                    FETCH_CONFIG.changeDefaultValue(config, value);
                });
                if(!config.selected) {
                    select.classList.add("disabled");
                };
                parentNode.appendChild(select);
                return parentNode;
            default :
                break;
        }
    }

    return {
        displayTable: displayTable
    }

})();
