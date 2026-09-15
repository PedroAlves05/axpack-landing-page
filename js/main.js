/* ==========================================================================
   AXPACK — COMPORTAMENTO DE INTERFACE
   A página é totalmente legível e navegável sem este arquivo.
   Tudo aqui é aprimoramento progressivo.
   ========================================================================== */

(function () {
  'use strict';

  // Sinaliza que o JS carregou — habilita as animações de reveal no CSS
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
     2. REVEAL NO SCROLL
     ---------------------------------------------------------------------- */

  var alvos = document.querySelectorAll('.reveal');

  if (!alvos.length) {
    // nada a fazer
  } else if (reduzirMovimento || !('IntersectionObserver' in window)) {
    // sem animação: mostra tudo imediatamente
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
     3. ACORDEÃO — mantém apenas um item aberto por grupo
     ---------------------------------------------------------------------- */

  var grupos = document.querySelectorAll('[data-acordeao]');

  Array.prototype.forEach.call(grupos, function (grupo) {
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
     4. FORMULÁRIO — protótipo
     Sem back-end. Impede o envio e confirma visualmente.
     Substituir por integração real (endpoint, CRM ou e-mail) na implementação.
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
