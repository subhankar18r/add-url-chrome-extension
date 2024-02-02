let myLeads = [];
// ------------SELECT ALL DOMS NEEDED--------------------- 
const inputEl = document.getElementById("inp-el"),
  ulEl = document.getElementById("ul"),
  sv = document.getElementById("inp-sv"),
  dl = document.getElementById("inp-dl")
tb = document.getElementById("inp-tb");

// -----------------TO ACCESS THE SAVE DATA IN LOCALSTORAGE---------------
const localarr = JSON.parse(localStorage.getItem("myLeads"))

// ---------------check if any data avilable in localStorage, set it to the array--------
if (localarr) {
  myLeads = localarr;
  rleads(myLeads);
}

// ------------TO SAVE THE CURRENT TAB URL WITH  CHROME API------------ 
tb.addEventListener("click",()=>{
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    rleads(myLeads);
  });
});

// ------------SAVE THE VALUE OF THE INPUT-------------------
sv.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  inputEl.value = "";
  rleads(myLeads);
});

// -----------------DELET ALL THE SAVE THINGS--------------
dl.addEventListener("click", () => {
  localStorage.clear();
  myLeads = [];
  rleads(myLeads);
})

// ------------ EVERY TIME RENDER THE SAVE VALUES--------------
function rleads(a) {
  let lItems = "";
  for (let i = 0; i < a.length; i++) {
    let e = a[i];
    lItems += `
          <li>
            <a href='${e}' target='_blank'>${e}</a>
          </li>
          `;
  }
  ulEl.innerHTML = lItems;
}