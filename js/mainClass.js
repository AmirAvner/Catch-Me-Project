class SpiningDiv{
    constructor(){
     this.divEl = document.getElementById('catch-me');   
    }
    setXposition(xPos){
     this.divEl.style.left = xPos + 'px';   
    }
    setYposition(yPos){
        this.divEl.style.top = yPos + 'px';   
       }
    changePosition(){
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const newXposition =  Math.floor(Math.random() * (screenWidth + 1));
        const newYposition =  Math.floor(Math.random() * (screenHeight + 1));
        this.setXposition(newXposition);
        this.setYposition(newYposition);
    }   

}
const div = new SpiningDiv();

const divEl = document.getElementById('catch-me');
divEl.addEventListener('mouseover', div.changePosition.bind(div));

