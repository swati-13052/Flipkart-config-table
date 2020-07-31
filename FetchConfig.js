const FETCH_CONFIG = (function() {
    let configFetchUrl = `https://flipkart-configuration-table.now.sh/api`;

    let configData = [];
    
    const setConfigData = (fetchedConfigData) => {
        let toSetConfigData = [];
        fetchedConfigData.forEach((config, index) => {
            toSetConfigData.push({id: index, ...config});
        });

        configData = toSetConfigData;
        DISPLAY_TABLE.displayTable(configData);
    }

    const changeDefaultValue = (config, value) => {
        let configData = getConfigData();
        let changedConfigData = configData.findIndex(data => data.key === config.key);
        if(changedConfigData >= 0) {
            configData[changedConfigData].field.defaultValue = value; 
        }
        setConfigData(configData);
    } 

    const selectRow = (config, checked) => {
        let configData = getConfigData();
        let changedConfigData = configData.findIndex(data => data.key === config.key);
        if(changedConfigData >= 0) {
            configData[changedConfigData].selected = checked; 
        }
        setConfigData(configData);
    }

    const getConfigData = () => {
        return configData;
    }

    const fetchConfigTableData = () => {
        fetch(configFetchUrl)
        .then(response =>  response.json())
        .then(configData => {
            setConfigData(configData.config);
        })
    }

    fetchConfigTableData();

    return {
        changeDefaultValue:  changeDefaultValue,
        selectRow: selectRow,
        getConfigData: getConfigData,
        fetchConfigTableData: fetchConfigTableData,
    }
})();
