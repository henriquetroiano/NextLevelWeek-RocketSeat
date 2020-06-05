



function populateUFs() {
  const ufSelect = document.querySelector('select[name=uf]')


  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(function (res) { return res.json() }).then(function (data) {
    for (dat of data) {
      ufSelect.innerHTML = ufSelect.innerHTML + `<option value=${dat.id}>${dat.nome}</option>`
    }
  })

}

populateUFs();


function getCities(event) {
  const citiySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')
  const indexSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexSelectedState].text

  const ufValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citiySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citiySelect.disabled = true;

  fetch(url).then(function (res) { return res.json() }).then(function (cities) {
    for (city of cities) {

      citiySelect.innerHTML = citiySelect.innerHTML + `<option value=${city.nome}>${city.nome}</option>`
    }
    citiySelect.disabled = false;
  })


}


document.querySelector('select[name=uf]').addEventListener("change", getCities);


const itemsToCollect = document.querySelectorAll('.items-grid li');
let selectedItems = [];
itemsToCollect.forEach((li) => {
  function funcao(event) {

    const itemLi = event.target;

    itemLi.classList.toggle('selected');

    const itemId = event.target.dataset.id;

    const alreadySelected = selectedItems.findIndex(item => {
      const itemFound = item == itemId
      return itemFound
    });
    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent
      })
      console.log(filteredItems)
    }
  }
  li.addEventListener('click', funcao)
})




