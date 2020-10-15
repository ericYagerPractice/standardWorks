// ==UserScript==
// @name         Download CSV from A/I in SMS
// @namespace    mailto:eyager@amazon.com
// @version      2.0
// @description  Send GET request to SMS and parse JSON into downloaded CSV
// @author       Eric Yager (eyager@)
// @match        https://sms.air.a2z.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      maxis-service-prod-pdx.amazon.com
// @require      http://code.jquery.com/jquery-3.4.1.min.js
/* global $ */
// ==/UserScript==

$(document).ready(function() {
    //Required global variables
    var downloadArrays={"reports":[]}
    var buttonText="Download Report Data";
    var right = 100;
    var link = document.createElement("a");
    var filename = "download";
    var stillGood = true;
    var counter = 1;
    var apiURL="";
    var objectKeys=[];
    const wait=ms=>new Promise(resolve => setTimeout(resolve, ms)); //allows a forced wait to allow promises to fulfill
    var cookieElements = decodeURIComponent(document.cookie).split(';'); //pull user cookie
    for(var cookie in cookieElements){
        var cookieElement = cookieElements[cookie];
        if(cookieElement.split(".").length>3){
            if(cookieElement.split(".")[3].split('=')[0]=='idToken'){
                var token = cookieElement.split("=")[1]; //pull the required cookie for get request
            }
        }
    }

    while(counter<1000){ //cut off at 1000 if anything goes awry
        if(counter<10){
            apiURL="https://sms.air.a2z.com/reports/R-20-0000"+counter; //get the correct URL
        }else{
            apiURL="https://sms.air.a2z.com/reports/R-20-000"+counter;
        }
        counter+=1;
        GM_xmlhttpRequest ( {
            method:         'GET',
            url:            apiURL,
            responseType:   "json",
            headers: {
                "Authorization": "Bearer " + token
            },
            onload:   function(response){
                if(response.status<400){
                    var keyStage=[];
                    var reportNumber = response.response.reportId;
                    var testStageArray={"Report Number":reportNumber};
                    var responseData = JSON.parse(response.response.originalReport);
                    for(var dataElement in responseData){
                        var dataType = typeof responseData[dataElement];
                        var rawData = responseData[dataElement];
                        if(dataType==="object"){
                            for(var objectElement in rawData){
                                keyStage.push(objectElement);
                                var stageTitle = dataElement+"/"+objectElement;
                                var stageData = rawData[objectElement];
                                if(typeof stageData === "string"){
                                    testStageArray[stageTitle]='"'+stageData.replace(",",";").replace(/"/g, '""')+'"';
                                } else{
                                    testStageArray[stageTitle]=stageData;
                                }
                            }
                        }
                        else if(dataType==="string" ){
                            keyStage.push(dataElement);
                            testStageArray[dataElement]='"'+rawData.replace(",",";").replace(/"/g, '""')+'"';
                        }
                        else if(dataType==="boolean"){
                            keyStage.push(dataElement);
                            testStageArray[dataElement]='"'+rawData+'"';
                        }
                        else if (dataType==="array"){
                            keyStage.push(dataElement);
                            testStageArray[dataElement]='"'+rawData[0]+'"';
                        }
                        else{
                            keyStage.push(dataElement);
                            testStageArray[dataElement]='"'+""+'"';
                        }
                    }
                    objectKeys.push(keyStage);
                    downloadArrays.reports.push(testStageArray);
                }else{
                    stillGood = false;
                    counter = 1000;
                }
            }
        });
    }
    wait(4*1000).then(() => {
        const csvData=downloadArrays.reports;
        var longestObject = 0;
        var itemLength = 0;
        for(var item in objectKeys){
            if(objectKeys[item].length>itemLength){
                itemLength=objectKeys[item].length;
                longestObject=item;
            }
        }
        var csvContent = "data:text/csv;charset=utf-8,";

        const replacer = (key, value) => value === null ? '' : value

        wait(4*1000).then(() => {
            var CSVstring="";
            var header = Object.keys(csvData[longestObject]);
            CSVstring+=header.join(",");
            CSVstring+="\r\n";
            var csvStage=[];
            csvStage.push(header);
            for(var objectArray in csvData){
                var stageObjectArray=csvData[objectArray];
                var stageArrayForCSV=[];
                var objectKeys = Object.keys(stageObjectArray);
                for(var headerItem in header){
                    if(!objectKeys.includes(header[headerItem])){
                        stageArrayForCSV.push("");
                    }else{
                        stageArrayForCSV.push(stageObjectArray[header[headerItem]]);
                    }
                }
                csvStage.push(stageArrayForCSV);
                CSVstring+=stageArrayForCSV.join(",");
                CSVstring+="\r\n";
            }
            link.setAttribute("class", "submit-report-button css-v44avb");
            link.setAttribute("id","download");
            link.setAttribute(
                "style",
                "position: fixed; top: 20px; right: " + right + "px;"
            );
            link.innerHTML = buttonText;
            var blob = new Blob(["\ufeff", CSVstring]);
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename + ".csv");
            document.body.appendChild(link);
        });
    });
});