import {
  ArrowRight,
  CheckCircle2,
  CloudOff,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDemo } from "../context";
import { areaName } from "../domain/demo";
import { Notice, PageTitle, SectionHeading, Status } from "../components/ui";
export function Sync() {
  const { state, dispatch } = useDemo();
  const pending = state.visits.filter((v) => v.status === "pending");
  return (
    <>
      <PageTitle
        eyebrow="SINCRONIZAÇÃO E CONSOLIDAÇÃO · US09–US12"
        title="Do campo para uma visão maior."
        description="Confira a fila de registros e explore os estados de envio do User Flow."
      />
      <section className="sync-overview">
        <span className={`sync-large-icon ${pending.length ? "" : "complete"}`}>
          {pending.length ? <CloudOff size={32} /> : <CheckCircle2 size={32} />}
        </span>
        <div>
          <span className="eyebrow">FILA DEMONSTRATIVA</span>
          <h2>
            {pending.length
              ? `${pending.length} registros aguardando envio`
              : "Fila simulada concluída"}
          </h2>
          <p>
            {pending.length
              ? "A próxima etapa é simular uma conexão e o retorno do servidor."
              : "Os registros agora aparecem como sincronizados nesta aba."}
          </p>
        </div>
        <select
          aria-label="Conexão simulada"
          value={state.network}
          onChange={(e) =>
            dispatch({
              type: "NETWORK",
              network: e.target.value as "online" | "offline",
            })
          }
        >
          <option value="online">Com conexão · simulado</option>
          <option value="offline">Sem conexão · simulado</option>
        </select>
      </section>
      <div className="sync-grid">
        <section className="panel">
          <SectionHeading
            title="Registros na fila"
            text="Nenhuma informação é enviada para fora deste protótipo."
            action={
              <span className="subtle-badge">{pending.length} pendentes</span>
            }
          />
          {pending.length ? (
            pending.map((v) => (
              <div className="queue-row" key={v.id}>
                <span className="table-icon">
                  <RefreshCw size={18} />
                </span>
                <div>
                  <strong>{v.address}</strong>
                  <small>
                    {areaName(v.areaId)} · {v.block} · {v.time}
                  </small>
                </div>
                <Status pending />
              </div>
            ))
          ) : (
            <div className="empty-state">
              <CheckCircle2 size={35} />
              <h3>Nenhum registro pendente</h3>
              <p>Você concluiu a simulação de sincronização.</p>
              <Link className="inline-link" to="/painel">
                Consultar o painel
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>
        <aside className="panel sync-controls">
          <SectionHeading
            title="Teste o fluxo"
            text="Estados ilustrativos da conexão"
            action={
              state.network === "online" ? (
                <Wifi size={20} />
              ) : (
                <WifiOff size={20} />
              )
            }
          />
          <ol className="sync-steps">
            <li>
              <span>1</span>
              <div>
                <strong>Detectar conexão</strong>
                <small>
                  {state.network === "online"
                    ? "Rede disponível no cenário"
                    : "Cenário sem rede"}
                </small>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <strong>Enviar registros</strong>
                <small>Simulação local, sem API</small>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <strong>Consolidar no painel</strong>
                <small>Atualizar a visualização da aba</small>
              </div>
            </li>
          </ol>
          <button
            className="button primary full"
            disabled={!pending.length}
            onClick={() => dispatch({ type: "SYNC", accepted: true })}
          >
            <RefreshCw size={17} />
            Simular envio aceito
          </button>
          <button
            className="button secondary full"
            disabled={!pending.length}
            onClick={() => dispatch({ type: "SYNC", accepted: false })}
          >
            Simular rejeição do servidor
          </button>
          <small className="center-note">
            Para demonstrar ausência de rede, altere a conexão acima e tente
            enviar.
          </small>
        </aside>
      </div>
      {state.syncState === "offline" && (
        <Notice tone="warning">
          Cenário sem conexão: registros mantidos na fila da demonstração. Você
          pode continuar as visitas ou simular uma rede disponível.
        </Notice>
      )}
      {state.syncState === "failure" && (
        <Notice tone="error">
          Cenário de falha: sincronização rejeitada. A fila foi preservada nesta
          aba; tente novamente com “Simular envio aceito”.
        </Notice>
      )}
      {state.syncState === "success" && (
        <Notice tone="success">
          Retorno aceito na simulação. Os registros foram consolidados na
          visualização do painel. Nada foi enviado ou persistido.
        </Notice>
      )}
      <Notice>
        O app final deverá detectar a conexão e sincronizar automaticamente.
        Nesta primeira semana, os controles permitem apresentar cada decisão do
        User Flow.
      </Notice>
    </>
  );
}
