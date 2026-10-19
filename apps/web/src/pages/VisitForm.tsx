import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardCheck,
  MapPin,
  Save,
  ScanLine,
  X,
} from "lucide-react";
import { useDemo } from "../context";
import { areaName, type Visit } from "../domain/demo";
import { Notice, PageTitle } from "../components/ui";

export function VisitForm() {
  const { state, dispatch } = useDemo();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [cancel, setCancel] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [draft, setDraft] = useState({
    address: "",
    block: "",
    result: "inspecionado" as Visit["result"],
    foci: "0",
    container: "",
    notes: "",
  });
  const change = (name: keyof typeof draft, value: string) =>
    setDraft((d) => ({ ...d, [name]: value }));
  useEffect(() => {
    if (cancel) dialog.current?.showModal();
    else dialog.current?.close();
  }, [cancel]);
  useEffect(() => {
    title.current?.focus();
  }, [step]);
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    const visit: Visit = {
      ...draft,
      id: `DEMO-${crypto.randomUUID()}`,
      areaId: state.areaId!,
      address: draft.address.trim(),
      block: draft.block.trim(),
      foci: draft.result === "inspecionado" ? Number(draft.foci) : 0,
      container:
        draft.result === "inspecionado" && Number(draft.foci) > 0
          ? draft.container
          : "",
      date: "2026-10-19",
      time: new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Fortaleza",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date()),
      status: "pending",
    };
    dispatch({ type: "SAVE_VISIT", visit });
    navigate("/visita/confirmacao");
  }
  const steps = [
    { label: "Identificação", icon: MapPin },
    { label: "Inspeção", icon: ClipboardCheck },
    { label: "Focos e revisão", icon: ScanLine },
  ];
  return (
    <>
      <PageTitle
        eyebrow="NOVA VISITA · US04–US08"
        title="Um registro, um novo ponto."
        description={`Microárea ${areaName(state.areaId!)} · Preencha com informações fictícias para testar a jornada.`}
        action={
          <button className="button ghost" onClick={() => setCancel(true)}>
            <X size={17} />
            Cancelar visita
          </button>
        }
      />
      <div className="form-layout">
        <section className="panel form-panel">
          <ol className="stepper">
            {steps.map((s, i) => (
              <li
                key={s.label}
                className={i === step ? "current" : i < step ? "done" : ""}
              >
                <span>{i < step ? <Check size={16} /> : i + 1}</span>
                <strong>{s.label}</strong>
              </li>
            ))}
          </ol>
          <form onSubmit={next}>
            <div className="form-content">
              <div className="eyebrow">ETAPA 0{step + 1} DE 03</div>
              <h2 ref={title} tabIndex={-1}>
                {
                  [
                    "Identifique o imóvel",
                    "Como foi a inspeção?",
                    "Focos e observações",
                  ][step]
                }
              </h2>
              <p className="form-description">
                {
                  [
                    "Informe o imóvel e o quarteirão da visita.",
                    "Registre se foi possível inspecionar o imóvel.",
                    "Complete os detalhes antes de adicionar a visita à demonstração.",
                  ][step]
                }
              </p>
              {step === 0 && (
                <>
                  <label htmlFor="block">
                    Quarteirão <span className="required">*</span>
                  </label>
                  <input
                    id="block"
                    autoComplete="off"
                    value={draft.block}
                    onChange={(e) => change("block", e.target.value)}
                    pattern=".*\S.*"
                    maxLength={30}
                    placeholder="Ex.: Q-03"
                    required
                  />
                  <label htmlFor="address">
                    Identificação do imóvel <span className="required">*</span>
                  </label>
                  <input
                    id="address"
                    autoComplete="off"
                    value={draft.address}
                    onChange={(e) => change("address", e.target.value)}
                    pattern=".*\S.*"
                    maxLength={120}
                    placeholder="Ex.: Imóvel fictício 09"
                    required
                  />
                  <div className="location-demo">
                    <MapPin size={20} />
                    <div>
                      <strong>Localização da microárea</strong>
                      <span>
                        {areaName(state.areaId!)} · Campina Grande, PB
                      </span>
                    </div>
                    <span className="subtle-badge">Ilustrativa</span>
                  </div>
                  <small className="helper">
                    Não utilize nomes de moradores, endereços reais ou dados
                    pessoais.
                  </small>
                </>
              )}
              {step === 1 && (
                <fieldset className="inspection-options">
                  <legend>
                    Resultado da visita <span className="required">*</span>
                  </legend>
                  {(
                    [
                      {
                        id: "inspecionado",
                        title: "Imóvel inspecionado",
                        text: "A inspeção foi realizada.",
                      },
                      {
                        id: "fechado",
                        title: "Imóvel fechado",
                        text: "Não foi possível acessar o imóvel.",
                      },
                      {
                        id: "recusado",
                        title: "Acesso recusado",
                        text: "A visita não pôde ser realizada.",
                      },
                    ] as const
                  ).map((o) => (
                    <label
                      className={`inspection-option ${draft.result === o.id ? "active" : ""}`}
                      key={o.id}
                    >
                      <input
                        type="radio"
                        name="result"
                        value={o.id}
                        checked={draft.result === o.id}
                        onChange={() => change("result", o.id)}
                      />
                      <span>
                        <strong>{o.title}</strong>
                        <small>{o.text}</small>
                      </span>
                    </label>
                  ))}
                </fieldset>
              )}
              {step === 2 && (
                <>
                  {draft.result === "inspecionado" ? (
                    <div className="form-two-cols">
                      <div>
                        <label htmlFor="foci">
                          Quantidade de focos{" "}
                          <span className="required">*</span>
                        </label>
                        <input
                          id="foci"
                          type="number"
                          min="0"
                          max="99"
                          step="1"
                          required
                          value={draft.foci}
                          onChange={(e) => change("foci", e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="container">
                          Tipo de recipiente{" "}
                          {Number(draft.foci) > 0 && (
                            <span className="required">*</span>
                          )}
                        </label>
                        <select
                          id="container"
                          value={draft.container}
                          disabled={!Number(draft.foci)}
                          required={Number(draft.foci) > 0}
                          onChange={(e) => change("container", e.target.value)}
                        >
                          <option value="">Selecione</option>
                          <option>Pneu</option>
                          <option>Caixa-d'água</option>
                          <option>Vaso / prato de planta</option>
                          <option>Recipiente descartável</option>
                          <option>Outro recipiente</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <Notice tone="warning">
                      Sem inspeção, a visita será demonstrada como{" "}
                      {draft.result === "fechado"
                        ? "imóvel fechado"
                        : "acesso recusado"}
                      , sem focos registrados.
                    </Notice>
                  )}
                  <label htmlFor="notes">
                    Observações <span className="optional">(opcional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    maxLength={500}
                    placeholder="Descreva apenas uma situação fictícia, sem informações pessoais."
                    value={draft.notes}
                    onChange={(e) => change("notes", e.target.value)}
                  />
                  <div className="review-summary">
                    <span>CONFIRA O REGISTRO</span>
                    <strong>
                      {draft.address} · {draft.block}
                    </strong>
                    <small>
                      {areaName(state.areaId!)} ·{" "}
                      {draft.result === "inspecionado"
                        ? "Inspecionado"
                        : draft.result === "fechado"
                          ? "Fechado"
                          : "Recusado"}
                    </small>
                  </div>
                  <Notice>
                    Ao continuar, a visita fica apenas na memória da aba. Ainda
                    não há gravação no dispositivo ou envio a um servidor.
                  </Notice>
                </>
              )}
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="button ghost"
                onClick={() => (step ? setStep(step - 1) : setCancel(true))}
              >
                <ArrowLeft size={17} />
                {step ? "Voltar" : "Sair do formulário"}
              </button>
              <button className="button primary" type="submit">
                {step === 2 ? (
                  <>
                    <Save size={17} />
                    Adicionar à demonstração
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
        <aside className="form-aside">
          <span className="aside-icon">
            <ClipboardCheck size={25} />
          </span>
          <h3>
            O essencial,
            <br />
            bem registrado.
          </h3>
          <p>
            Um formulário simples para acompanhar o agente durante a visita.
          </p>
          <div className="aside-divider" />
          <strong>Você está na rota</strong>
          <span>
            <MapPin size={15} />
            {areaName(state.areaId!)}
          </span>
          <small>
            Campos com * são obrigatórios no protótipo. A autenticação,
            persistência e sincronização reais ficam para as próximas etapas.
          </small>
        </aside>
      </div>
      <dialog
        ref={dialog}
        onCancel={() => setCancel(false)}
        onClose={() => setCancel(false)}
      >
        <div className="dialog-body">
          <span className="dialog-icon">
            <X size={24} />
          </span>
          <h2>Descartar esta visita?</h2>
          <p>
            As informações preenchidas serão descartadas. Nenhuma visita parcial
            será adicionada.
          </p>
          <div className="button-row">
            <button
              className="button secondary"
              autoFocus
              onClick={() => setCancel(false)}
            >
              Continuar preenchendo
            </button>
            <button
              className="button danger"
              onClick={() => {
                dispatch({ type: "CANCEL_VISIT" });
                navigate("/visitas");
              }}
            >
              Descartar rascunho
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
