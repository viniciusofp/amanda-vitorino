"use client";

export type TargetAudienceProps = {};

export default function TargetAudience(props: TargetAudienceProps) {
  return (
    <section className="bg-creme min-h-svh w-full p-8 py-16">
      <div className="mb-6 flex items-center gap-3">
        <div className="bg-rosa border-rosa-300 h-2 w-2 rounded-full border"></div>
        <h2 className="text-sm leading-none font-medium tracking-widest uppercase">
          Público-alvo
        </h2>
      </div>

      <p className="max-w-prose text-2xl leading-tight text-pretty lg:w-5/6 lg:text-[2.7svw]">
        Soluções para governança pública começam com a compreensão dos desafios
        e das oportunidades de cada instituição.
      </p>
      <div className="divide-petroleo/10 mt-8 grid divide-y">
        <div className="py-8">
          <h3 className="mb-2 text-lg leading-[1.2] font-bold text-balance">
            Prefeituras e Secretarias Municipais
          </h3>
          <p className="max-w-prose text-pretty">
            Soluções jurídicas e estratégicas para formular, implementar e
            aprimorar políticas públicas, com foco em capacidade institucional.
          </p>
        </div>
        <div className="py-8">
          <h3 className="mb-2 text-lg leading-[1.2] font-bold text-balance">
            Câmaras Municipais e Mandatos
          </h3>
          <p className="max-w-prose text-pretty">
            Apoio técnico para construir soluções legislativas alinhadas às
            demandas sociais e aos princípios da boa governança.
          </p>
        </div>
        <div className="py-8">
          <h3 className="mb-2 text-lg leading-[1.2] font-bold text-balance">
            Cultura e Fomento Público
          </h3>
          <p className="max-w-prose text-pretty">
            Estruturação de programas e instrumentos de fomento para promover
            segurança jurídica, eficiência e boa execução de recursos públicos.
          </p>
        </div>
      </div>
    </section>
  );
}
