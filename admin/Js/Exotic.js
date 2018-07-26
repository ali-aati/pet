//////////////////////////////////////////////////////////////////
////////////{ 7/19/2018 - Ali Aati -  Midterm Project }//////////
/////////////////////////////////////////////////////////////////
/************************************************************* */
//////////////////////////////////////////////////////////////////
//////////////////////{  Exotic JS file }///////////////////////////
/////////////////////////////////////////////////////////////////


$(document).ready(function () {
    $.ajax({
        'type': 'GET',
        'Content-Type': "application/json",
        'url': 'exotics.json',
        'success': function (exotics) {
            $.getJSON("exotics.json", function (result) {
                Table(result);
            });
        }
    });
});


/***************************** build Table ****************************** */
function Table(exotics) {
    let tableArea = `<div class="table-responsive ">
    <table class="table table-hover table-striped" id="myTable">
        <thead>
            <tr class='thead-light'>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Name' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='species' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Sex' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Age' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Owner' id='myInput'>
                </th>
                <th></th>
            </tr>
            <tr class='thead-dark'>
                <th id="Name" data-field='Name'>Name</th>
                <th id="species" data-field='species'>species</th>
                <th id="Sex" data-field='Sex'>Sex</th>
                <th id="Age" data-field='Age'>Age</th>
                <th id="Owner" data-field='Owner'>Owner</th>
                <th id="Note" data-field='Note'>Note</th>
            </tr>
        </thead>
        <tbody>`;

    for (let exotic of exotics) {
        tableArea += `<tr>
            <td>${exotic.Name}</td>
            <td>${exotic.species}</td>
            <td>${SexWords(exotic.Sex)}</td>
            <td>${exotic.Age}</td>
            <td>
            <button class="btn btn-dark" id="<li class='list-group-item'>Name: ${exotic.Owner.Name}</li>
            <br>
            <li class='list-group-item'>Phone: ${exotic.Owner.Phone}</li>
            <br>
            <li class='list-group-item'>Email: ${exotic.Owner.Email}</li>" data-toggle="modal" data-target="#show-modal">${exotic.Owner.Name}</button>
            </td>

            <td>
            <button class="btn btn-dark" id="<li class='list-group-item'>${exotic.Notes.Note1}</li>" data-toggle="modal" data-target="#show-modal">More Info</button>
            </td>

            <div id="show-modal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">More Info</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <ul class="list-group">
                                <h6 class='show-content'></h6>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-dark" data-dismiss="modal">Close</button>                
                    </div>
                </div>
            </div>
        </div>

        <script>
        $('#show-modal').on('show.bs.modal', function (e) {
            var $modal = $(this),
                esseyId = e.relatedTarget.id;
            $modal.find('.show-content').html(esseyId);
        })
        </script>


        </tr>`;
    }
    tableArea += `</tbody></table></div></div>`;
    $("#test").html(tableArea);
    setHeaderSort(exotics);
    setIndividualsort(exotics);
}

function SexWords(Sex) {
    switch (Sex) {
        case true:
            return 'M';
        case false:
            return 'F';
        default:
            return 'Error';
    }
}


/****************************** Sort *********************************** */
//the value of true in the array means that the columns has only been clicked once.
//each index of colAscOrDesc array stores the data for a specific column
let colAscOrDesc = ["true", "true", "true", "true", "true"];
let onceClick = true;


function compareStrings(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) {
        return -1;
    }
    else if (a.toLowerCase() > b.toLowerCase()) {
        return 1;
    }
    else {
        return 0;
    }

}

function compareExoticObjectsByKey(sortKey) {
    //aka compare strings
    return function (a, b) {
        if (typeof (a[sortKey]) === "string") {
            return compareStrings(a[sortKey], b[sortKey]);
        }
        else if (typeof (a[sortKey] === "number")) {
            return a[sortKey] - b[sortKey];
        }
        else {
            return 0;
        }
    }
}
//determine how many times a row has been clicked
function setAscOrDEsc(sortKey) {
    switch (sortKey) {
        case "Name":
            if (colAscOrDesc[0] === "true") {
                colAscOrDesc[0] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[0] = "true";
                onceClick = "false";
            }
            break;
        case "species":
            if (colAscOrDesc[1] === "true") {
                colAscOrDesc[1] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[1] = "true";
                onceClick = "false";
            }
            break;
        case "Sex":
            if (colAscOrDesc[2] === "true") {
                colAscOrDesc[2] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[2] = "true";
                onceClick = "false";
            }
            break;
        case "Age":
            if (colAscOrDesc[3] === "true") {
                colAscOrDesc[3] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[3] = "true";
                onceClick = "false";
            }
            break;
        case "Owner":
            if (colAscOrDesc[4] === "true") {
                colAscOrDesc[4] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[4] = "true";
                onceClick = "false";
            }
            break;
        default:
    }
}

//sort desc or aces according the number of clicks
function sort(exotics, sortKey) {
    //sort key = Nname, etc...
    exotics.sort(compareExoticObjectsByKey(sortKey));
    setAscOrDEsc(sortKey); //my funct
    if (onceClick === "true") {
        Table(exotics);
    }
    //changes arrow direction 
    if (onceClick === "false") {
        exotics.sort(compareExoticObjectsByKey(sortKey)).reverse();
        Table(exotics);
    }
}


function setHeaderSort(exotics, sortKey) {
    $(`#${sortKey}`).click(function () {
            sort(exotics, sortKey);
            if (onceClick === "true") {
                $(`#${sortKey}`).append("▾");
            }
            if (onceClick === "false") {
                $(`#${sortKey}`).append("▴");
            }
    });
}

function setIndividualsort(exotics) {
    setHeaderSort(exotics, 'Name');
    setHeaderSort(exotics, 'species');
    setHeaderSort(exotics, 'Sex');
    setHeaderSort(exotics, 'Age');
    setHeaderSort(exotics, 'Owner');
}


/************************FIlter***************************** */
function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

