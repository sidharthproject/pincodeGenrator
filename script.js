
    const boxes1 = document.querySelectorAll('.box1');
    console.log(boxes1.length);
    
    const boxes2 = document.querySelectorAll('.box2');
    console.log(boxes2);
    const rightPinMessage = document.querySelector('.rightpin');
    const continueButton = document.querySelector('.continue');


   let image = document.querySelector('.image') 
    image.addEventListener('click',function(){
        const hiddentext = document.querySelector(".hiddentext");
        if (hiddentext) hiddentext.style.display = "block";
        const showtext = document.querySelector('.showtext');
        showtext.style.display="none"
        rightPinMessage.style.color = '';
        
   
        let line = document.querySelector(".line2")
                line.style.backgroundColor = "#f1e8e8"
                 let secondbar = document.querySelector(".barcount")
               secondbar.innerHTML = "1 of 2"

               boxes1.forEach((box) => {
                box.value = '';  
            });
               boxes2.forEach((box) => {
                box.value = '';  
            });
            checkInputsFilled()
            checkPinCodesMatch()
    })
    function checkInputsFilled() {
       
        const anyFilled1 = Array.from(boxes1).some(input => input.value.length > 0);
        console.log(anyFilled1);
        
        const anyFilled2 = Array.from(boxes2).some(input => input.value.length > 0);
           if (anyFilled1 || anyFilled2 && pin1.length === boxes1.length) {
            continueButton.innerText = 'Continue';
           
        } else {
            continueButton.innerText = '';  
           
            continueButton.style.padding= "20px";  
        }
        const allFilled1 = Array.from(boxes1).every(input => input.value.trim() !== '');
        const allFilled2 = Array.from(boxes2).every(input => input.value.trim() !== '');
         return allFilled1 && allFilled2
      
      
    }

    

   
    boxes1.forEach((box) => {
        box.addEventListener('input', () => {
            checkInputsFilled();  
        });
    });

    
    boxes2.forEach((box) => {
        box.addEventListener('input', () => {
            checkInputsFilled();  
        });
    });

   
    checkInputsFilled();

    
    function checkPinCodesMatch() {
        
    if (!checkInputsFilled()) {
        rightPinMessage.innerHTML = "Please fill both PIN codes";
        rightPinMessage.style.color = 'orange'; 
        return; // to stop the function
    }
        const pin1 = Array.from(boxes1).map(input => input.value).join('');
        console.log(pin1.length);
        
        const pin2 = Array.from(boxes2).map(input => input.value).join('');

        if (Number(pin1) === Number(pin2) && pin1.length === pin2.length) {
            rightPinMessage.innerHTML = "Your codes are same"
            rightPinMessage.style.color = 'green';  
        } else {
              rightPinMessage.innerHTML = "Your codes are misMatch"
            rightPinMessage.style.color = 'red';  
        }
   
    }


    boxes1.forEach((box, index) => {
        console.log(box);
        console.log(index);
        
        
        box.addEventListener('input', (event) => {
            console.log(event);
            
            event.target.value = event.target.value.slice(0, 1);
            if (event.target.value.length === 1 && index < boxes1.length - 1) {
                boxes1[index + 1].focus();
            }
            checkPinCodesMatch();  
        });

        box.addEventListener('keydown', (e) => {
            
            
            if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
                boxes1[index - 1].focus();
            }
            checkPinCodesMatch(); 
        });
    });

   
    boxes2.forEach((box, index) => {
        box.addEventListener('input', (event) => {
            if (event.target.value.length === 1 && index < boxes2.length - 1) {
                boxes2[index + 1].focus();
            }
            checkPinCodesMatch();  
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === "Backspace" && box.value.length === 0 && index > 0) {
                boxes2[index - 1].focus();
            }
            checkPinCodesMatch();  
        });
    });



    async function getPinCode(pincode) {
        try {
            const data = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const completeData = await data.json();
    
            const pindata = completeData[0]?.PostOffice?.[0].Pincode;
      console.log(pindata);

     
      
            if (Number(pindata) === Number(pincode)) {
               let secondbar = document.querySelector(".barcount")
               secondbar.innerHTML = "2 of 2"
                
                let line = document.querySelector(".line2")
                line.style.backgroundColor = "red"
           const hiddentext = document.querySelector(".hiddentext");
            if (hiddentext) hiddentext.style.display = "none";
            const showtext = document.querySelector('.showtext');
            if (showtext) showtext.style.display = "block";
             let success =document.querySelector(".success")
             success.innerHTML =`DeliveryStatus : ${completeData[0]?.PostOffice?.[0].DeliveryStatus}`
             let   getDeliveryStatus = completeData[0]?.PostOffice?.[0].DeliveryStatus;
             if(getDeliveryStatus  == "Delivery"){
                success.style.color = "green"
             }else{
                success.style.color = "red"
             }
             let area =document.querySelector(".area")
             area.innerHTML = `Area Name : ${completeData[0]?.PostOffice?.[0].
                Region}`
            } else {
               alert("please  enter a valid pin code")
            }
        } catch (error) {
            console.error("Failed to fetch PIN code data:", error);
        }
    }
    
    async function handleButton() {
        const pin1 = Array.from(document.querySelectorAll('.box1')).map(input => input.value).join('');
        const pin2 = Array.from(document.querySelectorAll('.box2')).map(input => input.value).join('');
    
        // Ensure both PIN codes match and are of valid length before fetching data
        if (pin1 === pin2 && pin1.length === 6) {
            await getPinCode(pin1);
        } else {
            alert("Please ensure both PIN codes match and are 6 digits.");
        }
    }
    
    let btn = document.querySelector('.continue');
    if (btn) {
        btn.addEventListener("click", handleButton);
    }
    