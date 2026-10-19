import { useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  ClipboardList,
  MapPin,
  ScanLine,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDemo } from "../context";
import { areaName, areas, formatDate } from "../domain/demo";
import {
  Notice,
  PageTitle,
  SectionHeading,
  Stat,
  Status,
} from "../components/ui";
import { TerritoryMap } from "../components/TerritoryMap";
export function Dashboard() {
  const { state } = useDemo();
  const [selected, setSelected] = useState("all");
  const consolidated = state.visits.filter(
    (v) =>
      v.status === "synced" && (selected === "all" || v.areaId === selected),
  );
  return (
    <>
      <PageTitle
        eyebrow="PRIORIZAÇÃO E ACOMPANHAMENTO · US13–US14"
        title="Um território. Uma visão mais clara."
        description="Explore o mapa e a lista ilustrativa de prioridades a partir dos registros da demonstração."
        action={
          <Link className="button secondary" to="/historico">
            Ver histórico
            <ArrowRight size={17} />
          </Link>
        }
      />
      <div className="stats-grid">
        <Stat
          label="Visitas consolidadas"
          value={consolidated.length}
          icon={<ClipboardList size={19} />}
          detail="Somente status sincronizado · demo"
        />
        <Stat
          label="Focos no mapa"
          value={consolidated.reduce((s, v) => s + v.foci, 0)}
          icon={<ScanLine size={19} />}
          detail="Pontos e quantidades fictícios"
        />
        <Stat
          label="Microáreas em exibição"
          value={selected === "all" ? 3 : 1}
          icon={<MapPin size={19} />}
          detail="Campina Grande, Paraíba"
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel map-panel">
          <SectionHeading
            title="Visão do território"
            text="Centros ilustrativos de microáreas · não são imóveis reais"
            action={
              <select
                aria-label="Microárea no mapa"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="all">Todas as microáreas</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            }
          />
          <div className="map-wrapper">
            <TerritoryMap selected={selected} visits={state.visits} />
            <div className="map-demo-badge">
              <span />
              DADOS FICTÍCIOS
            </div>
          </div>
          <div className="map-legend">
            <span>
              <i className="legend-dot high" />
              Alta
            </span>
            <span>
              <i className="legend-dot medium" />
              Média
            </span>
            <span>
              <i className="legend-dot low" />
              Baixa
            </span>
            <small>Prioridade ilustrativa</small>
          </div>
        </section>
        <section className="panel priorities-panel">
          <SectionHeading
            title="Onde olhar primeiro"
            text="Lista de prioridades demonstrativa"
            action={<ArrowDownWideNarrow size={20} />}
          />
          <div className="priority-list">
            {areas.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a.id)}
                className={`priority-card ${selected === a.id ? "active" : ""}`}
              >
                <span className="priority-number">0{a.rank}</span>
                <div>
                  <strong>{a.name}</strong>
                  <small>
                    {a.code} ·{" "}
                    {
                      state.visits.filter(
                        (v) => v.areaId === a.id && v.status === "synced",
                      ).length
                    }{" "}
                    visitas consolidadas
                  </small>
                  <span
                    className={`risk ${a.rank === 1 ? "high" : a.rank === 2 ? "medium" : "low"}`}
                  >
                    <i />
                    {a.priority} prioridade · exemplo
                  </span>
                </div>
                <ArrowRight size={17} />
              </button>
            ))}
          </div>
          <div className="priority-footnote">
            <strong>Uma referência para a interface</strong>
            <p>
              Ordem e categorias fixas para demonstrar a tela. O critério de
              risco será definido e validado com a equipe parceira.
            </p>
          </div>
        </section>
      </div>
      <Notice>
        Não há classificação epidemiológica real. Os números vêm dos registros
        fictícios com status sincronizado; a fila pendente aparece após a
        simulação de envio. O mapa base usa OpenStreetMap e requer internet.
      </Notice>
    </>
  );
}
export function HistoryPage() {
  const { state } = useDemo();
  const [area, setArea] = useState("all");
  const [from, setFrom] = useState("2026-10-01");
  const [to, setTo] = useState("2026-10-19");
  const invalid = !!(from && to && from > to);
  const visits = invalid
    ? []
    : state.visits.filter(
        (v) =>
          (area === "all" || v.areaId === area) &&
          (!from || v.date >= from) &&
          (!to || v.date <= to),
      );
  return (
    <>
      <PageTitle
        eyebrow="HISTÓRICO DO TERRITÓRIO · US15"
        title="Cada registro constrói uma história."
        description="Consulte as visitas fictícias por microárea e período."
      />
      <section className="panel">
        <div className="filters">
          <div>
            <label htmlFor="history-area">Microárea</label>
            <select
              id="history-area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            >
              <option value="all">Todas as microáreas</option>
              {areas.map((a) => (
                <option value={a.id} key={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date-from">Data inicial</label>
            <input
              id="date-from"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date-to">Data final</label>
            <input
              id="date-to"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <button
            className="button secondary"
            onClick={() => {
              setArea("all");
              setFrom("");
              setTo("");
            }}
          >
            Limpar filtros
          </button>
        </div>
        {invalid && (
          <Notice tone="error">
            A data inicial deve ser anterior ou igual à data final.
          </Notice>
        )}
        <SectionHeading
          title="Registros encontrados"
          text={`${visits.length} visitas na demonstração`}
          action={<span className="subtle-badge">Dados fictícios</span>}
        />
        <div className="history-table">
          <div className="table-head">
            <span>IMÓVEL / MICROÁREA</span>
            <span>DATA</span>
            <span>FOCOS</span>
            <span>STATUS</span>
          </div>
          {visits.map((v) => (
            <div className="visit-row" key={v.id}>
              <div className="property-cell">
                <span className="table-icon">
                  <ClipboardList size={18} />
                </span>
                <span>
                  <strong>{v.address}</strong>
                  <small>
                    {areaName(v.areaId)} · {v.block}
                  </small>
                </span>
              </div>
              <span>{formatDate(v.date)}</span>
              <span className={`foci-count ${v.foci ? "has-foci" : ""}`}>
                {v.foci} focos
              </span>
              <Status pending={v.status === "pending"} />
            </div>
          ))}
          {!visits.length && (
            <div className="empty-state">
              <Search size={32} />
              <h3>Nenhum registro neste filtro</h3>
              <p>
                Ajuste a microárea ou o período para explorar os dados
                fictícios.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
