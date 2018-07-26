//////////////////////////////////////////////////////////////////
////////////{ 7/19/2018 - Ali Aati -  Midterm Project }//////////
/////////////////////////////////////////////////////////////////
/************************************************************* */
//////////////////////////////////////////////////////////////////
//////////////////////{  Dog JS file }///////////////////////////
/////////////////////////////////////////////////////////////////


$(document).ready(function () {
    $.ajax({
        'type': 'GET',
        'Content-Type': "application/json",
        'url': 'Dogs.json',
        'success': function (dogs) {
            $.getJSON("Dogs.json", function (result) {
                Table(result);
            });
        }
    });
});

/***************************** build Table ****************************** */
function Table(dogs) {
    let tableArea = `<div class="table-responsive filters">
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
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Size' id='myInput'>
                </th>
                <th>
                    <input type='text' class='form-control' onkeyup='myFunction()' placeholder='Licensed' id='myInput'>
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
                <th id="Size" data-field='Size'>Size</th>
                <th id="Licensed" data-field='Licensed'>Licensed</th>
                <th id="Owner" data-field='Owner'>Owner</th>
                <th id="Note" data-field='Note'>Note</th>
            </tr>
        </thead>
        <tbody>`;

    for (let dog of dogs) {
        tableArea += `<tr>
            <td>${dog.Name}</td>
            <td>${dog.Breed}</td>
            <td>${SexWords(dog.Sex)}</td>
            <td>${dog.Shot}</td>
            <td>${dog.Age}</td>
            <td>${SizeWords(dog.Size)}</td>
            <td>${dog.Licensed}</td>
            <td>
            <button class="btn btn-dark" id="<li class='list-group-item'>Name: ${dog.Owner.Name}</li>
            <br>
            <li class='list-group-item'>Phone: ${dog.Owner.Phone}</li>
            <br>
            <li class='list-group-item'>Email: ${dog.Owner.Email}</li>" data-toggle="modal" data-target="#show-modal">${dog.Owner.Name}</button>
            </td>

            <td>
            <button class="btn btn-dark" id="<li class='list-group-item'>${dog.Notes.Note1}</li>
                <br>
                <li class='list-group-item'>${dog.Notes.Note2}</li>
                <br>
                <li class='list-group-item'>${dog.Notes.Note3}</li>" data-toggle="modal" data-target="#show-modal">More Info</button>
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
    setHeaderSort(dogs);
    setIndividualsort(dogs);
}


function SizeWords(Size) {
    switch (true) {
        case Size >= 60:
            return 'Large';
        case Size >= 40:
            return 'Medium';
        case Size >= 20:
            return 'Small';
        default:
            return 'Error';
    }
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

function compareDogObjectsByKey(sortKey) {
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
        case "Size":
            if (colAscOrDesc[5] === "true") {
                colAscOrDesc[5] = "false";
                onceClick = "true";
            }
            else {
                colAscOrDesc[5] === "true";
                onceClick = "false";
            }
            break;
        case "Licensed":
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
function sort(dogs, sortKey) {
    //sort key = Nname, Breed, etc...
    dogs.sort(compareDogObjectsByKey(sortKey));
    setAscOrDEsc(sortKey); //my funct
    if (onceClick === "true") {
        Table(dogs);
    }
    //changes arrow direction 
    if (onceClick === "false") {
        dogs.sort(compareDogObjectsByKey(sortKey)).reverse();
        Table(dogs);
    }
}

function setHeaderSort(dogs, sortKey) {
    $(`#${sortKey}`).click(function () {
            sort(dogs, sortKey);
            if (onceClick === "true") {
                $(`#${sortKey}`).append("▾");
            }
            if (onceClick === "false") {
                $(`#${sortKey}`).append("▴");
            }
    });
}

function setIndividualsort(dogs) {
    setHeaderSort(dogs, 'Name');
    setHeaderSort(dogs, 'Breed');
    setHeaderSort(dogs, 'Sex');
    setHeaderSort(dogs, 'Shot');
    setHeaderSort(dogs, 'Age');
    setHeaderSort(dogs, 'Size');
    setHeaderSort(dogs, 'Licensed');
    setHeaderSort(dogs, 'Owner');
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
  
 
 /*
 
  if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function (str) {
                return this.substring(0, str.length) === str;
            }
        };

        
        const str ='Ali';
        let result =str.startsWith('A');

        console.log(result);

 
 */