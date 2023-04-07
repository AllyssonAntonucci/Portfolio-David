/*--------------------PROGRAMAÇÃO DO MENU CATEGORIAS----------------------------*/

// Opacidade do texto das imagens iniciais (categorias)
const categoriaItem = document.querySelectorAll(".item-menu");

categoriaItem.forEach(item => {
  item.addEventListener("mouseover", () => {
    item.querySelector(".texto-sobreposto").style.opacity = ".8";
  });
  item.addEventListener("mouseout", () => {
    item.querySelector(".texto-sobreposto").style.opacity = "0";
  });
});

// quando for ver em celular todas as categorias aparecerem

window.addEventListener('resize', function() {
    var largura = window.innerWidth;
  
    if (largura < 768) {
        categoriaItem.forEach(item => {
            item.querySelector(".texto-sobreposto").style.opacity = ".8";
        });
    } else {
        categoriaItem.forEach(item => {
            item.querySelector(".texto-sobreposto").style.opacity = "0";
        });
    }
});



/*--------------------PROGRAMAÇÃO DA GALERIA-----------------------------*/
// query selectors
const lightboxEnabled = document.querySelectorAll('.lightbox-enabled');
const lightboxArray = Array.from(lightboxEnabled); // transforma a node list do lightbox-enabled em um array (Isso vai servir pras setas de navegação)
const lastImage = lightboxArray.length -1; // Como ele começa a contar do zero, se tiver algo como 10 imagens, a última tem index 9, por isso o -1
const lightboxContainer = document.querySelector('.lightbox-container');
const lightboxImage = document.querySelector('.lightbox-image');

/*--------------------BUTTONS-----------------------------*/
const lightboxBtns = document.querySelectorAll('.lightbox-btn');
const lightboxBtnRight = document.querySelector('#right');
const lightboxBtnLeft = document.querySelector('#left');
let activeImage;



// functions 
const showLightboxImage = () => {lightboxContainer.classList.add('active')}

const hideLightboxImage = () => {lightboxContainer.classList.remove('active')}

const setActiveImage = (image) => {
    lightboxImage.src = image.dataset.imagesrc;
    activeImage = lightboxArray.indexOf(image);
    console.log(activeImage); // Isso pra ver se ele identifica o número de cada imagem (index), (0, 1 , 2 , ...)

    removeBtnInactiveClass();
    switch (activeImage) { // Isso é pra alterar o comportamento das setas de navegação dependendo do index da imagem (activeimage)
        
        case 0:
            lightboxBtnLeft.classList.add('inactive');
            break;
        case lastImage:
            lightboxBtnRight.classList.add('inactive');
            break;  
        default:
            removeBtnInactiveClass();
    }

}

/*--------------------FUNÇÃO REMOVER CLASSE DE INATIVIDADE DO BUTTON-----------------------------*/
const removeBtnInactiveClass = () =>{
    lightboxBtns.forEach(btn => {
        btn.classList.remove('inactive');
    })  
}

/*--------------------FUNÇÃO REMOVER ANIMAÇÃO DO BUTTON APÓS CLICAR NELE-----------------------------*/
const removeBtnAnimation = () =>{
    lightboxBtns.forEach(btn => {
        setTimeout( function(){btn.blur() }, 200); // blur remove efeito focus
    })
}

/*--------------------SETAS DE NAVEGAÇÃO-----------------------------*/
const transitionSlideLeft = () => { 
    lightboxBtnLeft.focus();
    if(activeImage === 0){
        setActiveImage(lightboxArray[lastImage]);   
    } else{
        setActiveImage(lightboxArray[activeImage].previousElementSibling);
        removeBtnAnimation();
    }  
}

const transitionSlideRight = () => { 
    lightboxBtnRight.focus();
    if(activeImage === lastImage){
        setActiveImage(lightboxArray[0]);   
    } else{
        setActiveImage(lightboxArray[activeImage].nextElementSibling);
        removeBtnAnimation();
    }  
}

const transitionSlideHandler = (moveItem) => { 
    moveItem.includes('left') ? transitionSlideLeft() : transitionSlideRight();
}



// event listeners

lightboxEnabled.forEach(image => {
    image.addEventListener('click', (e) => {
       // console.log(e); Isso pra ver se ele reconhece o evento click
       // console.log(e.target.dataset.imagesrc);  Quando clica em cada imagem ele reconhece o atributo data-imagesrc (passei isso como uma função acima pra depois usá-la aqui)
       showLightboxImage()
       setActiveImage(image)
    });
});


lightboxContainer.addEventListener('click', () => {
    // console.log('container clicked') Isso pra verificar abaixo que quando clico nos btns ele identifica o container junto e não quero isso
    hideLightboxImage()})

/*--------------------BUTTONS-----------------------------*/

lightboxBtns.forEach(btn =>{
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Isso faz com que quando clica no btn ele não seleciona o container, então identifica somente o evento de clicar no btn que é o que eu quero
       // console.log('button clicked') Com isso da pra ver que quando clica nos btns primeiro ele entende que clicou no btn e depois tbém no container (quero somente o btn, pra isso uso o e.stoppropagation acima)
       
       transitionSlideHandler(e.currentTarget.id);
       // console.log(e.currentTarget.id)
    });
});


/*--------------------KEYBOARD BUTTONS-----------------------------*/

window.addEventListener('keydown', (e) => {
    if(!lightboxContainer.classList.contains('active')) return; // Esse "!" significa não
    if(e.key.includes('Left') || e.key.includes('Right')) { // Esse "||" significa "ou"
        e.preventDefault();
        transitionSlideHandler(e.key.toLowerCase());
    }

});