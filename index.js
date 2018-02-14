const boton = document.getElementById('execute');
const table = document.getElementById('table');
const ac = document.getElementById('ac');
const pc = document.getElementById('pc');
const mar = document.getElementById('mar');
const mdr = document.getElementById('mdr');
const fr = document.getElementById('fr');
const ir = document.getElementById('ir');

var memoria = [];
var p = 1; //contador del pc
var finish = false;

boton.addEventListener("click", click);

function instruction() {
  var lineas = $('textarea').val().split('\n');
  for (var i = 0; i < lineas.length; i++) {
    cop = (memoria[i].substr(0, 3));
    var td = (memoria[i].substr(3, 1));Ric

    var dir = (memoria[i].substr(4, 3));
    if(!finish){
        execute(cop, td, dir);
    }

  }

}

function execute(cop, td, dir) {
  switch (cop) {
    case "LDA":
      switch (td) {
      break;
    case "STA":
      switch (td) {
        case "A":
          memoria[dir] = ac.innerHTML;
          mar.innerHTML = dir;
          mdr.innerHTML = ac.innerHTML;
          pc.innerHTML = ++p;
          break;
        case 'D':
          memoria[memoria[dir]] = ac.innerHTML;
          mar.innerHTML = memoria[dir];
          pc.innerHTML = ++p;
          break;
        case "R":
          ac.innerHTML = memoria[dir + p];
          mar.innerHTML = dir + p;
          mdr.innerHTML = memoria[dir + p]
          break;
        default:
          alert("No existe direccionamiento " + dir + " en la linea " + p);
      }

    default:
  }


}


function clearReg() {
  ac.innerHTML = 0;
  pc.innerHTML = 1;
  mar.innerHTML = 0;
  mdr.innerHTML = 0;
  fr.innerHTML = 0;
  ir.innerHTML = 0;
}

function click() {
  clearReg();
  passMemory();
  instruction();

  /*
    var cop = (memoria[i].substr(0,3));
    var td =  (memoria[i].substr(3,1));
    var dir = (memoria[i].substr(4,3));
  alert(cop);
  */


}

function passMemory() {
  var lines = $('textarea').val().split('\n');
  for (var i = 0; i < lines.length; i++) {
    memoria[i] = lines[i];

  }
  showMemory(memoria);
}

function showMemory(memoria) {
  table.innerHTML = "<thead><tr><th>#</th><th>Valor</th></tr></thead><tbody id='tbody'></tbody>";
  for (var i = 0; i < memoria.length; i++) {
    /*
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');

    th1.setAttribute('scope', 'row');
    th1.innerHTML = i;

    th2.innerHTML = memoria[i];

    th1.appendChild(tr);
    th2.appendChild(tr);
    */

    var row = table.insertRow(i + 1);
    var cel1 = row.insertCell(0);
    cel1.setAttribute('scope', 'row');
    var cel2 = row.insertCell(1);

    cel1.innerHTML = i;
    cel2.innerHTML = memoria[i];

  }

}
