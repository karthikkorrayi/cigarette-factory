function displayGreeting() {
    const name = document.getElementById('nameInput').value;
    const today = new Date();
    const currentHour = today.getHours();
    let greeting = '';

    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    const greetingMessage = document.getElementById('greetingMessage');
    greetingMessage.innerHTML = "${greeting}, ${name}!";
}


function para(){
document.getElementById('button').addEventListener('click',function(){
    const p = document.getElementById('hiddenPara');
    p.style.display=(p.style.display === 'none'|| p.style.display === '')? 'block' : 'none';
});
}