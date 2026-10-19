import type { ReactNode } from "react";
import { ArrowUpRight, LocateFixed, Info } from "lucide-react";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <div className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark">
        <LocateFixed size={25} />
      </span>
      <span>
        Ponto de Foco<small>TECNOLOGIA A SERVIÇO DO TERRITÓRIO</small>
      </span>
    </div>
  );
}
export function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function Notice({
  children,
  tone = "info",
}: {
  children: ReactNode;
  tone?: "info" | "success" | "warning" | "error";
}) {
  return (
    <div
      className={`notice ${tone}`}
      role={tone === "error" ? "alert" : "status"}
    >
      <Info size={18} />
      <div>{children}</div>
    </div>
  );
}
export function Status({ pending }: { pending: boolean }) {
  return (
    <span className={`status ${pending ? "pending" : "synced"}`}>
      <i />
      {pending ? "Pendente" : "Sincronizado · demo"}
    </span>
  );
}
export function Stat({
  label,
  value,
  icon,
  detail,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  detail: string;
}) {
  return (
    <div className="stat">
      <div className="stat-top">
        {label}
        <span>{icon}</span>
      </div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}
export function SectionHeading({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {action ?? <ArrowUpRight size={18} aria-hidden="true" />}
    </div>
  );
}
