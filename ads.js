/* Configuração do Google AdSense compartilhada por todas as páginas.
   O client abaixo é o do site; os slots ficam vazios até a aprovação.
   Depois de aprovado, crie 2 blocos de anúncio no AdSense (formato "Display" responsivo)
   e cole os IDs em TOPO e BASE. Enquanto um slot estiver vazio, o bloco correspondente
   fica oculto (sem espaço em branco). */
window.SITE_CONFIG = {
  adsenseClient: 'ca-pub-7340154536584301',
  slots: {
    TOPO: '',  // ex.: '1234567890'
    BASE: ''   // ex.: '0987654321'
  }
};

(function () {
  'use strict';

  function hideContainer(slot) {
    var container = slot.closest('.ad-container');
    if (container) container.style.display = 'none';
  }

  function initAdSense() {
    var config = window.SITE_CONFIG || {};
    var blocks = document.querySelectorAll('ins.adsbygoogle');
    if (!blocks.length) return;

    if (!config.adsenseClient) {
      blocks.forEach(hideContainer);
      return;
    }

    var visible = 0;

    blocks.forEach(function (block) {
      var adSlot = (config.slots || {})[block.getAttribute('data-ad-key')];
      if (!adSlot) {
        hideContainer(block);
        return;
      }
      block.setAttribute('data-ad-client', config.adsenseClient);
      block.setAttribute('data-ad-slot', adSlot);
      visible++;
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
    });

    if (visible) document.body.classList.add('ads-on');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdSense);
  } else {
    initAdSense();
  }
})();
