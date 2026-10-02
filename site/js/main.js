/* ==========================================================================
   AX PACK — SITE · COMPORTAMENTO DE INTERFACE
   As páginas são legíveis e navegáveis sem este arquivo.
   Tudo aqui é aprimoramento progressivo.

   Base: js/main.js da LP + o menu mobile da v2 (js-v2/main.js).
   O submenu de Soluções no desktop é só CSS (:hover e :focus-within).
   ========================================================================== */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ----------------------------------------------------------------------
     1. CABEÇALHO — estado compacto ao rolar
     ---------------------------------------------------------------------- */

  var cabecalho = document.querySelector('[data-cabecalho]');

  if (cabecalho) {
    var LIMITE = 40;
    var pendente = false;

    var atualizarCabecalho = function () {
      cabecalho.classList.toggle('compacto', window.scrollY > LIMITE);
      pendente = false;
    };

    window.addEventListener('scroll', function () {
      if (!pendente) {
        pendente = true;
        window.requestAnimationFrame(atualizarCabecalho);
      }
    }, { passive: true });

    atualizarCabecalho();
  }


  /* ----------------------------------------------------------------------
     2. MENU MOBILE
     ---------------------------------------------------------------------- */

  var botaoMenu = document.querySelector('[data-menu-botao]');
  var painelMenu = document.querySelector('[data-menu-painel]');
  var overlay = document.querySelector('[data-menu-overlay]');

  if (botaoMenu && painelMenu) {

    var abrirMenu = function (abrir, devolverFoco) {
      botaoMenu.setAttribute('aria-expanded', String(abrir));
      botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
      painelMenu.setAttribute('data-aberto', String(abrir));
      document.body.classList.toggle('menu-aberto', abrir);
      if (overlay) overlay.setAttribute('data-ativo', String(abrir));
      if (!abrir && devolverFoco) botaoMenu.focus();
    };

    botaoMenu.addEventListener('click', function () {
      abrirMenu(botaoMenu.getAttribute('aria-expanded') !== 'true', true);
    });

    if (overlay) {
      overlay.addEventListener('click', function () { abrirMenu(false, true); });
    }

    // fecha ao seguir um link do painel (inclusive âncoras da própria página)
    painelMenu.addEventListener('click', function (evento) {
      if (evento.target.closest('a')) abrirMenu(false, false);
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && botaoMenu.getAttribute('aria-expanded') === 'true') {
        abrirMenu(false, true);
      }
    });

    // se a tela crescer para desktop, garante o painel fechado
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
      if (mq.matches) abrirMenu(false, false);
    });
  }


  /* ----------------------------------------------------------------------
     3. VÍDEO DA HERO — respeita prefers-reduced-motion
     ---------------------------------------------------------------------- */

  var heroVideo = document.querySelector('[data-hero-video]');

  if (heroVideo && reduzirMovimento) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause();
    heroVideo.currentTime = 0;
  }


  /* ----------------------------------------------------------------------
     4. REVEAL NO SCROLL
     ---------------------------------------------------------------------- */

  var alvos = document.querySelectorAll('.reveal');

  if (!alvos.length) {
    // nada a fazer
  } else if (reduzirMovimento || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(alvos, function (el) { el.classList.add('visivel'); });
  } else {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(alvos, function (el) { observador.observe(el); });
  }


  /* ----------------------------------------------------------------------
     5. ACORDEÃO — um item aberto por grupo
     ---------------------------------------------------------------------- */

  Array.prototype.forEach.call(document.querySelectorAll('[data-acordeao]'), function (grupo) {
    var itens = grupo.querySelectorAll('details');
    Array.prototype.forEach.call(itens, function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        Array.prototype.forEach.call(itens, function (outro) {
          if (outro !== item) outro.open = false;
        });
      });
    });
  });


  /* ----------------------------------------------------------------------
     6. FORMULÁRIO — protótipo, sem back-end
     ---------------------------------------------------------------------- */

  var formulario = document.querySelector('[data-form-orcamento]');

  if (formulario) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var botao = formulario.querySelector('[type="submit"]');
      if (!botao) return;
      var textoOriginal = botao.innerHTML;
      botao.disabled = true;
      botao.textContent = 'Protótipo — envio não configurado';
      window.setTimeout(function () {
        botao.disabled = false;
        botao.innerHTML = textoOriginal;
      }, 2600);
    });
  }

})();
