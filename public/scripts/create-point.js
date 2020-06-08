



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

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}


const collectedItems = document.querySelector('input[name=items]')
let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle('selected')
  const itemId = itemLi.dataset.id;

  // verificar se existem itens selecionado , se sim, pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId;
    return itemFound
  })

  // se ja estiver selecionado, tirar da selecao
  if (alreadySelected >= 0) {
    // tirar da selecao
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent;
    })
    selectedItems = filteredItems
  } else {
    // / se não estiver selecionado
    // adicionar a selecao
    selectedItems.push(itemId)
  }
  // atualizar campo escondido com os itens selecionados
  collectedItems.value = selectedItems;


}


