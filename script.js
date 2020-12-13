let v_details;
let v_details_arr = JSON.parse(localStorage.getItem("vehicle_details"));
(v_details_arr == null) ? v_details = [] : v_details = v_details_arr;

let inputs = ['name', 'v_no', 'v_des', 'pn_no', 'date', 'arv_time', 'lv_time'];

function onFirstLoad(arr1, arr2){
    let details_table = document.getElementById('v-details-table');
    for(let i=0; i<arr1.length; i++){
        let new_row = details_table.insertRow(i+1);
        for(let j=0; j<arr2.length; j++){
            let new_cell = new_row.insertCell(j);
            new_cell.innerHTML = arr1[i][`${arr2[j]}`];
        }
    }
}

function getData(){
    let curr_date_time = new Date();
    v_details.push(
        {
            name: document.getElementById('name-input').value,
            v_no: document.getElementById('vehicle-no-input').value,
            v_des: document.getElementById('vehicle-des-input').value,
            pn_no: document.getElementById('contact-no-input').value,
            date: `${curr_date_time.getDate()}-${curr_date_time.getMonth()}-${curr_date_time.getFullYear()}`,
            arv_time: `${curr_date_time.getHours()}:${curr_date_time.getMinutes()}:${curr_date_time.getSeconds()}`,
            lv_time: `<input type="button" value="LEAVE" class="lv-btn" id="${document.getElementById('vehicle-no-input').value}-${curr_date_time.getDate()}_${curr_date_time.getMonth()}_${curr_date_time.getFullYear()}-${curr_date_time.getHours()}_${curr_date_time.getMinutes()}_${curr_date_time.getSeconds()}" onclick="markLeave(this.id, v_details)"/>`
        }
    );
}

function loadData(arr1, arr2){
    let details_table = document.getElementById('v-details-table');
    for(let i=(arr1.length-1); i<arr1.length; i++){
        let new_row = details_table.insertRow(arr1.length);
        for(let j=0; j<arr2.length; j++){
            let new_cell = new_row.insertCell(j);
            new_cell.innerHTML = arr1[i][`${arr2[j]}`];
        }
    }
    
}

function markLeave(btn_id, arr){
    let curr_date_time = new Date();
    document.getElementById(btn_id).type = 'text';
    document.getElementById(btn_id).value = `${curr_date_time.getHours()}:${curr_date_time.getMinutes()}:${curr_date_time.getSeconds()}`;
    document.getElementById(btn_id).style.backgroundColor = "rgb(247, 247, 94)";
    document.getElementById(btn_id).style.color = "black";
    document.getElementById(btn_id).style.border = "0";
    document.getElementById(btn_id).style.textAlign = "center";
    document.getElementById(btn_id).style.width = "80px";
    document.getElementById(btn_id).style.fontWeight = "bold";
    document.getElementById(btn_id).style.fontFamily = "Arial, Helvetica, sans-serif";
    document.getElementById(btn_id).style.fontSize = "16px";
    document.getElementById(btn_id).disabled = true;
    for(let i=0; i<arr.length; i++){
        if(arr[i]['lv_time'] == `<input type="button" value="LEAVE" class="lv-btn" id="${btn_id}" onclick="markLeave(this.id, v_details)"/>`){
            arr[i]["lv_time"] = `${curr_date_time.getHours()}:${curr_date_time.getMinutes()}:${curr_date_time.getSeconds()}`;
        };
    }
    localStorage.setItem("vehicle_details", JSON.stringify(v_details));
}

function clearInputFields(){
    document.getElementById('name-input').value = "";
    document.getElementById('vehicle-no-input').value = "";
    document.getElementById('vehicle-des-input').value = "";
    document.getElementById('contact-no-input').value = "";
}

function onAddData(){
    getData();
    loadData(v_details, inputs);
    localStorage.setItem("vehicle_details", JSON.stringify(v_details));
    clearInputFields();
}