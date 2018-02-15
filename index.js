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
var hlt = false;


boton.addEventListener("click", click);

function instruction() {
  for (var i = 0; i < memoria.length; i++) {
    if (memoria[i] != undefined) {
      cop = (memoria[i].substr(0, 3));
      var td = (memoria[i].substr(3, 1));
      var dir = (memoria[i].substr(4, 3));
      if (!hlt) {
        execute(cop, td, dir);
      }


    }
  }
}

function execute(cop, td, dir) {
  switch (cop) {
    case "LDA":
      switch (td) {
        case "I":
          ac.innerHTML = dir;
          pc.innerHTML = ++p;
          break;
        case "A":
          ac.innerHTML = memoria[dir];
          mar.innerHTML = dir;
          mdr.innerHTML = memoria[dir];
          pc.innerHTML = ++p;
          break;
        case 'D':
          ac.innerHTML = memoria[memoria[dir]];
          mar.innerHTML = dir;
          mdr.innerHTML = dir;
          mar.innerHTML = memoria[dir];
          pc.innerHTML = ++p;
          break;
        case "R":
          ac.innerHTML = memoria[dir + p];
          mar.innerHTML = dir + p;
          mdr.innerHTML = memoria[dir + p]
          pc.innerHTML = ++p;
          break;
        default:
          alert("No existe tipo de direccionamiento " + td + " en la linea " + p);
          break;
      }
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
          alert("No existe tipo de direccionamiento " + td + " en la linea " + p);
          break;
      }
      break;
    case "CLA":
      ac.innerHTML = 0;
      break;
    case "ADD":
      switch (td) {
        case "I":
          ac.innerHTML = ac.innerHTML + dir;
          pc.innerHTML = ++p;
          break;
        case "A":
          ac.innerHTML = ac.innerHTML + memoria[dir];
          mar.innerHTML = dir;
          mdr.innerHTML = memoria[dir];
          pc.innerHTML = ++p;
          break;
        case "D":
          ac.innerHTML = ac.innerHTML + memoria[memoria[dir]];
          mar.innerHTML = memoria[dir];
          mdr.innerHTML = memoria[memoria[dir]];
          pc.innerHTML = ++p;
          break;
        default:
          alert("No existe tipo de direccionamiento " + td + " en la linea " + p);
      }
      break;
    case "HLT":
      hlt = true;
      break;
    case "SUB":
      switch (td) {
        case "I":
          ac.innerHTML = ac.innerHTML - dir;
          pc.innerHTML = ++p;
          break;
        case "A":
          ac.innerHTML = ac.innerHTML - memoria[dir];
          mar.innerHTML = dir;
          mdr.innerHTML = memoria[dir];
          pc.innerHTML = ++p;
          break;
        case "D":
          ac.innerHTML = ac.innerHTML - memoria[memoria[dir]];
          mar.innerHTML = memoria[dir];
          mdr.innerHTML = memoria[memoria[dir]];
          pc.innerHTML = ++p;
          break;
        default:
          alert("No existe tipo de direccionamiento " + td + " en la linea " + p);
      }
      break;
    case "NEG":
      ac.innerHTML = -ac.innerHTML;
      pc.innerHTML = ++p;
      break;
    case "NOP":

    default:
    alert("La instrucción " + cop + " no es valida");

  }


}



function clearReg() {
  ac.innerHTML = 0;
  pc.innerHTML = 1;
  p = 1;
  mar.innerHTML = 0;
  mdr.innerHTML = 0;
  fr.innerHTML = 0;
  ir.innerHTML = 0;
}

function click() {
  clearReg();
  passMemory();
  showMemory(memoria);
  instruction();
  showMemory(memoria);
}

function passMemory() {
  var lines = $('textarea').val().split('\n');
  for (var i = 0; i < lines.length; i++) {
    memoria[i] = lines[i];
  }
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
    if (memoria[i] != undefined) {
      cel2.innerHTML = memoria[i];
    } else {
      memoria[i] = 0;
      cel2.innerHTML = memoria[i];
    }


  }

}
