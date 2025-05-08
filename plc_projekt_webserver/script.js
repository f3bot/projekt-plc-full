function createEditForm(userIndex){
    // Remove any existing overlay
    const existingOverlay = document.querySelector('.overlay');
    if (existingOverlay) existingOverlay.remove();

    const container = document.createElement('div');
    container.classList.add('overlay', 'visible');

    container.innerHTML = `
        <form id="edit-user-form-${userIndex}" class = 'user-form' method="post">
        <div id ='form-in'>
            <label for='"HMI".User_Struct_${userIndex}.login'>Login</label>
            <input type="number" name='"HMI".User_Struct_${userIndex}.login'>
        </div>
        <div id ='form-in'>
            <label for='"HMI".User_Struct_${userIndex}.password'>Password</label>
            <input type="number" name='"HMI".User_Struct_${userIndex}.password'>
        </div>
        <div id='form-in'>
            <label for='"HMI".User_Struct_${userIndex}.fuel_amount'>Fuel Amount</label>
            <input type="number" name='"HMI".User_Struct_${userIndex}.fuel_amount'>
        </div>

        <div class = 'btn-container'>
            <button class = "generate-btn-${userIndex}">Generate</button>
            <input type="submit" value="Save" class ='submit'>
        </div>
            <button type="button" class = "close-btn" onclick="this.closest('.overlay').remove()">Cancel</button>
        </form>
    `;

    document.body.appendChild(container);
    
    document.querySelector(`.generate-btn-${userIndex}`).addEventListener('click', (e) =>{
        e.preventDefault();
        const form = container.querySelector(`#edit-user-form-${userIndex}`);
        const getPositiveInt16 = () => Math.floor(Math.random() * 32768); // 0 to 32767
        form.querySelector(`[name='"HMI".User_Struct_${userIndex}.login']`).value = getPositiveInt16();
        form.querySelector(`[name='"HMI".User_Struct_${userIndex}.password']`).value = getPositiveInt16();
    })

    document.querySelector('.close-btn').addEventListener('click', () =>{
        document.body.classList.remove('dimmed')
    })

    document.body.classList.add('dimmed'); // or remove it when hiding the overlay
};

// Add event listeners to all edit buttons
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const userIndex = e.target.getAttribute('data-value');
        createEditForm(userIndex);
    });
});

document.querySelectorAll('.clear-btn').forEach(button =>{
    button.addEventListener('click', (e) =>{
        const userIndex = e.target.getAttribute('data-value');
        createClear(userIndex)
    })
})
function createClear(userIndex){
    const formA = document.createElement('form');
    formA.method = 'post';
    formA.action = ""
    formA.innerHTML = `
        <input type="submit" value = "Clear"> 
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.login' value="2">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.password' value="2">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.fuel_amount' value="0">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.start_time' value="DTL#1970-01-01-00:00:00">
        <input type="hidden" name='"HMI".User_Struct_${userIndex}.end_time' value="DTL#1970-01-01-00:00:00">
    `

    document.body.appendChild(formA);
    formA.submit()
}

const todaySpan = document.querySelector('.today-btn')
const yesterdaySpan = document.querySelector('.yesterday-btn')
const todayElem = document.querySelector('.today-elements');
const yesterdayElem = document.querySelector('.yesterday-elements');
const actionsSpan = document.querySelector('.actions')
const editBtn = document.querySelector('.edit-btn');
const clearBtn = document.querySelector('.clear-btn')

//Classlists -> invisible-m, visible-m
todaySpan.addEventListener('click', () => {
  // Show today's content
  todayElem.classList.remove('invisible-m');
  todayElem.classList.add('visible-m');

  todaySpan.classList.add('bright')
  yesterdaySpan.classList.remove('bright')

  // Hide yesterday's content
  yesterdayElem.classList.remove('visible-m');
  yesterdayElem.classList.add('invisible-m');

  actionsSpan.classList.remove('invisible-m');
  actionsSpan.classList.add('visible-m');
  
  editBtn.classList.remove('invisible-m');
  editBtn.classList.add('visible-m');
  
  clearBtn.classList.remove('invisible-m');
  clearBtn.classList.add('visible-m');
});

yesterdaySpan.addEventListener('click', () => {

    yesterdaySpan.classList.add('bright');
    todaySpan.classList.remove('bright')
  // Show yesterday's content
  yesterdayElem.classList.remove('invisible-m');
  yesterdayElem.classList.add('visible-m');

  // Hide today's content
  todayElem.classList.remove('visible-m');
  todayElem.classList.add('invisible-m');

  actionsSpan.classList.add('invisible-m');
  actionsSpan.classList.remove('visible-m');
  
  editBtn.classList.add('invisible-m');
  editBtn.classList.remove('visible-m');
  
  clearBtn.classList.add('invisible-m');
  clearBtn.classList.remove('visible-m');
});

document.querySelectorAll('.today-element span, .yesterday-element span').forEach(span => {
    // Replace 'DTL#' at the beginning using regex
    span.textContent = span.textContent.replace(/^DTL#/, '');

    // Optional: match time strings if needed
    const time = span.textContent.match(/(\d{2}):(\d{2}):(\d{2})/);
    if (time) {
        span.textContent = time[0];
    }
});

document.querySelectorAll('#login-span, #password-span').forEach(span =>{
    if(span.textContent == "2"){
        span.textContent = "0"
    }
})