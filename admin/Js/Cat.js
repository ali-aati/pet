//////////////////////////////////////////////////////////////////
////////////{ 7/19/2018 - Ali Aati -  Midterm Project }//////////
/////////////////////////////////////////////////////////////////
/************************************************************* */
//////////////////////////////////////////////////////////////////
//////////////////////{  cat JS file }///////////////////////////
/////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $.ajax({
        'type': 'GET',
        'Content-Type': "application/json",
        'url': 'Cat.json',
        'success': function (Cats) {
            $.getJSON("Cat.json", function (result) {
                Table(result);
            });
        }
    });
});



/***************************** build Table ****************************** */
function Table(cats) {
    let tableArea = `<div class="table-responsive ">
    <table class="table table-hover table-striped" id="myTable">
        <thead>
            <tr class='thead-light'>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Name' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Breed' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Sex' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Shot' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Age' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Declawed' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Neutered' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Owner' id='myInput'>
                </th>
                <th></th>
            </tr>
            <tr class='thead-dark'>
                <th id="Name" data-field='Name'>Name</th>
                <th id="Breed" data-field='Breed'>Breed</th>
                <th id="Sex" data-field='Sex'>Sex</th>
                <th id="Shot" data-field='Shot'>Shot</th>
                <th id="Age" data-field='Age'>Age</th>
                <th id="Declawed" data-field='Declawed'>Declawed</th>
                <th id="Neutered" data-field='Neutered'>Neutered</th>
                <th id="Owner" data-field='Owner'>Owner</th>
                <th id="Note" data-field='Note'>Note</th>
            </tr>
        </thead>
        <tbody>`;

    for (let cat of cats) {
        tableArea += `<tr>
            <td>${cat.Name}</td>
            <td>${cat.Breed}</td>
            <td>${SexWords(cat.Sex)}</td>
            <td>${cat.Shot}</td>
            <td>${cat.Age}</td>
            <td>${cat.Declawed}</td>
            <td>${cat.Neutered}</td>
            <td>
            <button class="btn btn-dark" id="<li class='list-group-item'>Name: ${cat.Owner.Name}</li>
            <br>
            <li class='list-group-item'>Phone: ${cat.Owner.Phone}</li>
            <br>
            <li class='list-group-item'>Email: ${cat.Owner.Email}</li>" data-toggle="modal" data-target="#show-modal">${cat.Owner.Name}</button>
            </td>

            <td>
            <button class="btn btn-dark" id="<li class='list-group-item'>${cat.Notes.Note1}</li>
                <br>
                <li class='list-group-item'>${cat.Notes.Note2}</li>" data-toggle="modal" data-target="#show-modal">More Info</button>
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
    setHeaderSort(cats);
    setIndividualsort(cats);
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
let colAscOrDesc = ["true", "true", "true", "true", "true", "true", "true"];
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

function comparecatObjectsByKey(sortKey) {
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
        case "Breed":
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
        case "Shot":
            if (colAscOrDesc[3] === "true") {
                colAscOrDesc[3] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[3] = "true";
                onceClick = "false";
            }
            break;
        case "Age":
            if (colAscOrDesc[4] === "true") {
                colAscOrDesc[4] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[4] = "true";
                onceClick = "false";
            }
            break;
        case "Declawed":
            if (colAscOrDesc[5] === "true") {
                colAscOrDesc[5] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[5] === "true";
                onceClick = "false";
            }
            break;
        case "Neutered":
            if (colAscOrDesc[6] === "true") {
                colAscOrDesc[6] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[6] = "true";
                onceClick = "false";
            }
            break;
        case "Owner":
            if (colAscOrDesc[7] === "true") {
                colAscOrDesc[7] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[7] = "true";
                onceClick = "false";
            }
            break;
        default:
    }
}

//sort desc or aces according the number of clicks
function sort(cats, sortKey) {
    //sort key = Nname, Breed, etc...
    cats.sort(comparecatObjectsByKey(sortKey));
    setAscOrDEsc(sortKey); //my funct
    if (onceClick === "true") {
        Table(cats);
    }
    //changes arrow direction 
    if (onceClick === "false") {
        cats.sort(comparecatObjectsByKey(sortKey)).reverse();
        Table(cats);
    }
}

function setHeaderSort(cats, sortKey) {
    $(`#${sortKey}`).click(function () {
            sort(cats, sortKey);
            if (onceClick === "true") {
                $(`#${sortKey}`).append("▾");
            }
            if (onceClick === "false") {
                $(`#${sortKey}`).append("▴");
            }
    });
}

function setIndividualsort(cats) {
    setHeaderSort(cats, 'Name');
    setHeaderSort(cats, 'Breed');
    setHeaderSort(cats, 'Sex');
    setHeaderSort(cats, 'Shot');
    setHeaderSort(cats, 'Age');
    setHeaderSort(cats, 'Declawed');
    setHeaderSort(cats, 'Neutered');
    setHeaderSort(cats, 'Owner');
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
  
 