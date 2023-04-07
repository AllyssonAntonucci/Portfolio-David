const videos = document.querySelectorAll('.video-container video');
const popup = document.querySelector('.popup-video');
const video_popup = document.querySelector('.popup-video video');
const closeBtn = document.querySelector('.popup-video span');

let isPaused = false; // variável para controlar se o vídeo está pausado ou não

videos.forEach(video => {
  video.onclick = () => {
    popup.style.display = 'block';
    video_popup.src = video.getAttribute('src');
    video_popup.muted = false;
    video_popup.load();
    video_popup.play();

    video_popup.onclick = () => {
      if (isPaused) { // se o vídeo estiver pausado, continue a reprodução
        video_popup.play();
        isPaused = false;
      } else { // se o vídeo estiver em reprodução, pause
        video_popup.pause();
        isPaused = true;
      }
    };
  };
});

closeBtn.onclick = () => {
  popup.style.display = 'none';
  video_popup.muted = true;
};


// Ajusta o tamanho máximo dos vídeos de acordo com o tamanho da janela do navegador
function ajustarTamanhoVideos() {
  var larguraJanela = window.innerWidth;
  var alturaJanela = window.innerHeight;

  // Define a largura e altura máximas dos vídeos como uma porcentagem da largura e altura da janela do navegador
  for (var i = 0; i < videos.length; i++) {
    videos[i].style.maxWidth = larguraJanela * 0.9 + 'px';
    videos[i].style.maxHeight = alturaJanela * 0.9 + 'px';
  }
}

// Chama a função de ajuste de tamanho quando a janela do navegador é redimensionada
window.addEventListener('resize', ajustarTamanhoVideos);

// Chama a função de ajuste de tamanho inicialmente
ajustarTamanhoVideos();