// url part 

const loadPhone = async(searchText) =>{
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
   const res = await fetch(url)
   const data = await res.json()
     displayPhone(data.data)
}



const displayPhone = phones =>{
    console.log(phones)
    const phoneSite = document.getElementById('phone-container')
    // empty
    phoneSite.textContent = '';
    // 20ta phone dakhabe 
    phones = phones.slice(0,20)
    // result na mille sms dibe
    const noPhone = document.getElementById('no-found')
    if(phones.length === 0){
      noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }
    

    for(const phone of phones){
        console.log(phone)
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="col">
                      <div class="card h-100">
                        <img src=" ${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title"> Phone Name: ${phone.phone_name}</h5>
                          <h5> Brand: ${phone.brand} </h5>
                          <button onclick="phoneDetals('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetaleModal">Go somewhere</button>
                        </div>
                      </div>
                    </div>
        
        
        `
        phoneSite.appendChild(phoneDiv)
    }
    // end loader 
    loader(false)
}

document.getElementById('search-btn').addEventListener('click',function(){
// start loader 
loader(true)
  const searchFild = document.getElementById('search-fild')
  const searchText = searchFild.value
  loadPhone(searchText)
})


// spning or loader 
const loader = isLoading =>{
  const loaderSection = document.getElementById('loader')
  if(isLoading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}


const phoneDetals = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetals(data.data)
}


const displayPhoneDetals = phone =>{
  console.log(phone)
  const modalTaile = document.getElementById('phoneDetaleModalLabel')
  modalTaile.innerText = phone.name
  const phoneBody = document.getElementById('phone-body')
  phoneBody.innerHTML = `
  <img src=" ${phone.image}" class="card-img-top" alt="...">
  <h5>Relise Date: ${phone.releaseDate} </h5>
  <h5>Radio: ${phone.others ? phone.others.Radio : 'Sorry no Radio found.'} </h5>
  
  
  `
}
// loadPhone(searchText)