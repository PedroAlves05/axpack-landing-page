# AxPack — Landing Page (protótipo)

Protótipo de landing page para a AX PACK Indústria e Comércio LTDA,
desenvolvido pela CSELF.

**Esta é uma prévia interna para aprovação, não o site de produção.**
A página está marcada como `noindex` de propósito.

## Estado

- O formulário de orçamento não tem back-end: o envio é simulado.
- Os espaços tracejados são imagens ainda pendentes com o cliente.

## Como editar

Esta pasta é **gerada**, não editada à mão. A fonte fica em
`prototipo/` no projeto da CSELF; para atualizar:

```bash
cd prototipo
python build-deploy.py
cd ../deploy && git add -A && git commit -m "atualiza prévia" && git push
```
