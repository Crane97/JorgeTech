import type { Chrome } from '../content/chrome'
import { TECH_STACK } from '../content/stack'
import { Reveal } from './Reveal'

export function TechStack({ chrome }: { chrome: Chrome }) {
  const groups = [
    { key: 'languages' as const, items: TECH_STACK.languages },
    { key: 'frontend' as const, items: TECH_STACK.frontend },
    { key: 'backend' as const, items: TECH_STACK.backend },
    { key: 'ai' as const, items: TECH_STACK.ai },
    { key: 'cloud' as const, items: TECH_STACK.cloud },
  ]

  return (
    <section id="stack" className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl">
          <h2 className="mb-4 text-3xl font-medium tracking-[-0.03em] text-ink sm:text-5xl">
            {chrome.stack.title}
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {chrome.stack.intro}
          </p>
        </Reveal>

        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.key} delay={i * 0.04}>
              <div className="border-t border-line pt-5">
                <h3 className="mb-4 font-mono text-[11px] tracking-[0.14em] text-muted uppercase">
                  {chrome.stack.groups[group.key]}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md px-2.5 py-1.5 font-mono text-xs text-ink/85 ring-1 ring-line"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
