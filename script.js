    let image = document.querySelector('.image') 
    image.addEventListener('click',function(){
        const hiddentext = document.querySelector(".hiddentext");
        if (hiddentext) hiddentext.style.display = "block";
        const showtext = document.querySelector('.showtext');
        showtext.style.display="none"
        

        let line = document.querySelector(".line2")
                line.style.backgroundColor = "#f1e8e8"
    })
    const boxes1 = document.querySelectorAll('.box1');
    const boxes2 = document.querySelectorAll('.box2');
    const rightPinMessage = document.querySelector('.rightpin');
    const continueButton = document.querySelector('.continue');

    function checkInputsFilled() {
       
        const anyFilled1 = Array.from(boxes1).some(input => input.value.length > 0);
        const anyFilled2 = Array.from(boxes2).some(input => input.value.length > 0);
         
          
      
        if (anyFilled1 || anyFilled2) {
            continueButton.innerText = 'Continue';
           
        } else {
            continueButton.innerText = '';  
           
            continueButton.style.padding= "20px";  
        }
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
        const pin1 = Array.from(boxes1).map(input => input.value).join('');
        const pin2 = Array.from(boxes2).map(input => input.value).join('');

        if (pin1 === pin2 && pin1.length === boxes1.length) {
            rightPinMessage.style.color = 'green';  
        } else {
            rightPinMessage.style.color = '';  
        }
    }
    

    boxes1.forEach((box, index) => {
        box.addEventListener('input', (event) => {
            if (event.target.value.length === 1 && index < boxes1.length - 1) {
                boxes1[index + 1].focus();
            }
            checkPinCodesMatch();  
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === "Backspace" && box.value.length === 0 && index > 0) {
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
    
    function handleButton() {
        const pin1 = Array.from(document.querySelectorAll('.box1')).map(input => input.value).join('');

        if (pin1.length === 6) {
            getPinCode(pin1);
    
           
    
            
            
            
           
        } else {
            alert("Please enter a valid 6-digit PIN code.");
        }
    }
    
    let btn = document.querySelector('.continue');
    if (btn) {
        btn.addEventListener("click", handleButton);
    }
    