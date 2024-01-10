import { useState } from "react";
import getCookie from "./getCookie";
import GettingStarted from "./GettingStarted";

const NameInput = () => {
  const [firstName, setFirstName] = useState();
  const [secondName, setSecondName] = useState();
  const [relation, setRelation] = useState();
  const [showModal, setShowModal] = useState(true);

  const getRelation = (string) => {
    switch (string[0]) {
      case "f":
        return "Friends - you are born to be great friends 🤝";
      case "l":
        return "Lovers - you are connected by souls 💖";
      case "a":
        return "Affectionate - you are feeling liking and caring 💌";
      case "m":
        return "Marriage - you are blessed to be together by spiritual 💍";
      case "e":
        return "Enemies - you are sworn to be enemies 😈";
      case "s":
        return "Siblings - you are always at each other 🧬";
    }
  };

  const calculateRelation = (e) => {
    e.preventDefault();
    let FName = firstName.toLowerCase();
    let SName = secondName.toLowerCase();
    for (let i = 0; i < FName.length; i++) {
      if (SName.includes(FName[i])) {
        SName = SName.replace(new RegExp(FName[i], "g"), " ");
        FName = FName.replace(new RegExp(FName[i], "g"), " ");
      }
    }
    let remaining = (FName + SName).replace(/\s/g, "").length;
    let count = 1;
    let k = "flames";
    let f = k;
    let rel = "No relation"
    if(remaining !== 0){
      
    while (f.length !== 1) {
      for (let i = 0; i < f.length; i++) {
        if (count === remaining) {
          k = k.replace(f[i], "");
          count = 1;
        } else {
          count += 1;
        }
      }
      f = k;
    }
    rel=getRelation(k)
    
  }
  setRelation(rel);
    setShowModal(true)
    handleSubmit(rel);
  };

  const handleSubmit= (rel) => {
    const names={'firstName':firstName,'secondName':secondName,'relation':rel}
    var csrftoken =getCookie('csrftoken')
    var url='https://karthikreddy567.pythonanywhere.com/flames/'
    fetch(url,{
        method: 'POST',
        headers: {"Content-Type": "application/json",
                'X-CSRFToken':csrftoken},
        body: JSON.stringify(names)
    }).then(() => {
      setFirstName("");
      setSecondName("");
        
    })
    

}
  return (
    <>
    <GettingStarted showModal={showModal} setShowModal={()=>setShowModal(false)} relation={relation}/>
      <form onSubmit={calculateRelation} className="content-center content-center pt-24 h-[90vh] bg-transparent ">
        <div className="space-y-12 bg-white p-7 bg-opacity-30 rounded-md shadow-2xl border border-solid border-black">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900 text-2xl font-extrabold">
              Check Relation <br/>🤝-💖-💌-💍-😈-🧬
            </h2>
            <p className="mt-1 text-sm leading-6 text-black pb-2.5 font-semibold">
              This information will be displayed only runtime.
            </p>

            <div className="col-span-full">
          <label for="street-address" className="block text-sm font-medium leading-6 text-gray-900 font-bold">First Name</label>
          <div className="mt-2">
          <input
                      type="text"
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
          </div>
        </div>

        <div className="col-span-full">
          <label for="street-address" className="block text-sm font-medium leading-6 text-gray-900 font-bold">Second Name</label>
          <div className="mt-2">
          <input
                      type="text"
                      id="firstName"
                      value={secondName}
                      onChange={(e) => setSecondName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
          </div>
        </div>




          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            className="text-sm font-semibold leading-6 text-gray-900" onClick={()=>{setFirstName(); setSecondName()}}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled = {(firstName && secondName) ? false : true}
          >
            Calculate
          </button>
        </div>
        {relation ? <div> <b>Relation</b> - {relation} </div>: null}
        </div>

        
        
      </form>

      
    </>
  );
};

export default NameInput;
