# CV — Software Developer (USA)

Archivos generados a partir del contenido del portfolio (`src/i18n.ts`, `src/content/stack.ts`, contacto y proyectos):

| Archivo | Descripción |
|---------|-------------|
| `Jorge_Ruiz_Software_Developer_Resume.pdf` | CV en inglés, formato USA / ATS, orientado a Software Developer |
| `resume.html` | Fuente HTML del CV (regenerable) |
| `generate_resume.py` | Script para regenerar el PDF con Chrome headless |
| `CHATGPT_PROMPT_CV.md` | Prompt completo por si quieres iterar el CV en ChatGPT |

## Regenerar el PDF

```bash
python3 cv/generate_resume.py
```

Requiere `google-chrome` o Chromium.
