let $next = $('#nextInfo');
$next.hide();

$('#Amor').on('click', function(e) {
  e.preventDefault();
  let $next = $('#nextInfo');
  $next.fadeIn(500);
})

function formClear() {
  $('#name').val('');
  $('#sex').val('');
  $('#dob').val('');
  $('#state').val('');
  $('#class').val('');
}

function addTable() {
  let $nam = $('#name').val();
  let $sex = $('#sex').val();
  let $dob = $('#dob').val();
  let $state = $('#state').val();
  let $class = $('#class').val();
  let $next = $('#nextInfo');
  let $add = $('#Add');

  $('table tbody').append(
    "<tr>" +
    "<td>" +
    "<button type='button' " + 'id="edbutt" + >' +
    "Edit" +
    "</button>" +
    "</td>" +
    '<td>' + $nam + '</td>' +
    '<td>' + $sex + '</td>' +
    '<td>' + $class + '</td>' +
    '<td>' + $dob + '</td>' +
    '<td>' + $state + '</td>' +
    "<td>" +
    "<button type='button' " + 'id="debutt" + >' +
    "Delete" +
    "</button>" +
    "</td>" +
    "</tr>");

  formClear();
  $next.fadeOut(500);
};

let Add = document.getElementById('Add');
Add.addEventListener('click', addTable);