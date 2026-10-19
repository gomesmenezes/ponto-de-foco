import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  CloudOff,
  Download,
  MapPin,
  Plus,
  Route,
  ScanLine,
} from "lucide-react";
import { Link } from "react-router-dom";
import { areas, areaName } from "../domain/demo";
import { useDemo } from "../context";
import {
  Notice,
  PageTitle,
  SectionHeading,
  Stat,
  Status,
} from "../components/ui";

export function Preparation() {
  const { state, dispatch } = useDemo();
  const area = areas.find((a) => a.id === state.areaId);
  return (
    <>
      <PageTitle
        eyebrow="ACESSO E PREPARAÇÃO · US02–US03"
        title="Vamos preparar o seu turno?"
        description="Escolha a microárea e confira a rota antes de iniciar as visitas."
      />
      <div className="preparation-grid">
        <section>
          <SectionHeading
            title="01. Escolha a microárea"
            text="Rotas ilustrativas de Campina Grande"
            action={<span className="subtle-badge">3 microáreas</span>}
          />
          <div className="area-list">
            {areas.map((a) => (
              <button
                key={a.id}
                className={`area-card ${state.areaId === a.id ? "selected" : ""}`}
                onClick={() => dispatch({ type: "SELECT_AREA", id: a.id })}
                aria-pressed={state.areaId === a.id}
              >
                <span className="area-icon">
                  <MapPin size={22} />
                </span>
                <span className="area-info">
                  <small>{a.code} · ROTA DEMONSTRATIVA</small>
                  <strong>{a.name}</strong>
                  <span>
                    {a.blocks} quarteirões <i /> {a.planned} imóveis previstos
                  </span>
                </span>
                <span className="selection-circle">
                  {state.areaId === a.id && <Check size={14} />}
                </span>
              </button>
            ))}
          </div>
          <div className="field-note">
            <CloudOff size={20} />
            <div>
              <strong>Pensado para quem está em campo.</strong>
              <p>
                O app final permitirá registrar visitas sem conexão. Nesta
                entrega, demonstramos as telas dessa jornada.
              </p>
            </div>
          </div>
        </section>
        <section className="route-card">
          <div className="route-card-art">
            <div className="route-art-ring ring-one" />
            <div className="route-art-ring ring-two" />
            <div className="route-art-line" />
            <span className="route-art-pin">
              <MapPin size={33} />
            </span>
            <span className="mini-label">
              <Route size={13} /> SUA ROTA DO DIA
            </span>
          </div>
          <div className="route-card-body">
            <div className="eyebrow">02. PREPARE A COLETA</div>
            <h2>
              {area
                ? `${area.name}, ${area.code}`
                : "Um bom turno começa com uma rota."}
            </h2>
            <p>
              {area
                ? `${area.blocks} quarteirões organizados para uma jornada de visitas.`
                : "Selecione uma microárea ao lado para conferir os dados da rota."}
            </p>
            <ul className="check-list">
              <li>
                <CheckCircle2 size={17} />
                Identificação da microárea
              </li>
              <li>
                <CheckCircle2 size={17} />
                Relação ilustrativa de quarteirões
              </li>
              <li>
                <CheckCircle2 size={17} />
                Formulário base de inspeção
              </li>
            </ul>
            {state.prepared ? (
              <>
                <Notice tone="success">
                  Preparação simulada concluída. Os dados estão apenas na
                  memória desta aba.
                </Notice>
                <Link className="button primary full" to="/visitas">
                  Começar visitas
                  <ArrowRight size={18} />
                </Link>
              </>
            ) : (
              <button
                className="button primary full"
                disabled={!area}
                onClick={() => dispatch({ type: "PREPARE" })}
              >
                <Download size={18} />
                Preparar rota · simulação
              </button>
            )}
            <small className="center-note">
              Nenhum dado é baixado ou salvo no dispositivo nesta etapa.
            </small>
          </div>
        </section>
      </div>
    </>
  );
}
export function Visits() {
  const { state } = useDemo();
  const visits = state.visits.filter((v) => v.areaId === state.areaId);
  return (
    <>
      <PageTitle
        eyebrow="COLETA EM CAMPO · US04–US09"
        title="Seu trabalho, visita a visita."
        description={`Rota demonstrativa de ${areaName(state.areaId!)}. Registre uma visita para percorrer as telas do MVP.`}
        action={
          <Link to="/visita/nova" className="button primary">
            <Plus size={18} />
            Nova visita
          </Link>
        }
      />
      <div className="stats-grid">
        <Stat
          label="Visitas na microárea"
          value={visits.length}
          icon={<ClipboardList size={19} />}
          detail="Registros fictícios nesta aba"
        />
        <Stat
          label="Focos registrados"
          value={visits.reduce((s, v) => s + v.foci, 0)}
          icon={<ScanLine size={19} />}
          detail="Dados exclusivamente ilustrativos"
        />
        <Stat
          label="Na fila de envio"
          value={visits.filter((v) => v.status === "pending").length}
          icon={<CloudOff size={19} />}
          detail="Sincronização simulada"
        />
      </div>
      <section className="panel">
        <SectionHeading
          title="Visitas da rota"
          text="Acompanhe os registros e o status de cada visita."
          action={
            <Link className="inline-link" to="/sincronizacao">
              Ver sincronização
              <ArrowRight size={15} />
            </Link>
          }
        />
        <div className="visit-table">
          <div className="table-head">
            <span>IMÓVEL / QUARTEIRÃO</span>
            <span>RESULTADO</span>
            <span>FOCOS</span>
            <span>STATUS</span>
          </div>
          {visits.map((v) => (
            <div className="visit-row" key={v.id}>
              <div className="property-cell">
                <span className="table-icon">
                  <MapPin size={18} />
                </span>
                <span>
                  <strong>{v.address}</strong>
                  <small>
                    {v.block} · {v.time} · {v.id.slice(0, 8)}
                  </small>
                </span>
              </div>
              <span className="result-label">
                {v.result === "inspecionado"
                  ? "Inspecionado"
                  : v.result === "fechado"
                    ? "Imóvel fechado"
                    : "Acesso recusado"}
              </span>
              <span className={`foci-count ${v.foci ? "has-foci" : ""}`}>
                {v.foci} {v.foci === 1 ? "foco" : "focos"}
              </span>
              <Status pending={v.status === "pending"} />
            </div>
          ))}
        </div>
      </section>
      <Notice>
        Adicionar uma visita modifica somente a demonstração em memória.
        Atualizar a página reinicia os dados.
      </Notice>
    </>
  );
}
export function Confirmation() {
  const { state } = useDemo();
  const visit = state.visits.find((v) => v.id === state.lastVisitId);
  return (
    <div className="confirmation">
      <span className="confirmation-icon">
        <Check size={36} />
      </span>
      <div className="eyebrow">REGISTRO DA VISITA · US08</div>
      <h1>
        Visita adicionada
        <br />à demonstração.
      </h1>
      <p>
        O registro está na fila simulada de sincronização.
        <br />
        Você já pode seguir para o próximo imóvel.
      </p>
      <div className="confirmation-detail">
        <span>
          <MapPin size={20} />
          {visit?.address}
        </span>
        <strong>
          {areaName(visit?.areaId ?? "")} · {visit?.block}
        </strong>
        <Status pending />
      </div>
      <Notice>
        Este registro existe apenas na memória da aba. O armazenamento off-line
        real será desenvolvido nas próximas etapas.
      </Notice>
      <div className="button-row">
        <Link className="button secondary" to="/sincronizacao">
          Ver fila de envio
        </Link>
        <Link className="button primary" to="/visitas">
          Voltar às visitas
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}
