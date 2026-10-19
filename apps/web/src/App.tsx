import { useEffect, useReducer } from 'react';
import { NavLink, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays, ChevronRight, ClipboardList, FlaskConical, History, LayoutDashboard, LogOut, MapPin, Route as RouteIcon, RefreshCw } from 'lucide-react';
import { DemoContext, useDemo } from './context';
import { demoReducer, initialState, resolveRoute } from './domain/demo';
import { Brand } from './components/ui';
import { Login } from './pages/Login';
import { Preparation, Visits, Confirmation } from './pages/Field';
import { VisitForm } from './pages/VisitForm';
import { Sync } from './pages/Sync';
import { Dashboard, HistoryPage } from './pages/Coordination';

const navigation = [
  { to: '/preparacao', label: 'Meu turno', icon: RouteIcon },
  { to: '/visitas', label: 'Visitas', icon: ClipboardList },
  { to: '/sincronizacao', label: 'Sincronização', icon: RefreshCw },
  { to: '/painel', label: 'Mapa e prioridades', icon: LayoutDashboard },
  { to: '/historico', label: 'Histórico', icon: History },
];
function Shell() {
  const { state, dispatch } = useDemo(); const location = useLocation(); const navigate = useNavigate();
  const resolved = resolveRoute(location.pathname, state);
  useEffect(() => { window.scrollTo(0, 0); const heading = document.querySelector('main h1'); if (heading instanceof HTMLElement) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } }, [location.pathname]);
  if (resolved !== location.pathname) return <Navigate to={resolved} replace/>;
  const current = navigation.find(n => n.to === location.pathname)?.label ?? 'Registro de visita';
  return <div className="app-layout"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><aside className="sidebar"><Brand/><div className="workspace-label"><span className="workspace-dot"/>Campina Grande, PB</div><div className="nav-caption">TRABALHO DE CAMPO</div><nav aria-label="Navegação principal">{navigation.map((item, i) => <div key={item.to}>{i === 3 && <div className="nav-caption coordination-caption">COORDENAÇÃO</div>}<NavLink to={item.to}><item.icon size={19}/><span>{item.label}</span>{item.to === '/sincronizacao' && <b className="nav-count">{state.visits.filter(v => v.status === 'pending').length}</b>}</NavLink></div>)}</nav><div className="sidebar-bottom"><div className="pilot-note"><FlaskConical size={19}/><strong>Do papel ao território.</strong><p>Primeiras telas de uma coleta mais simples e conectada.</p><span>PROJETO INTEGRADOR · 2026</span></div><button className="logout" onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('/acesso'); }}><LogOut size={18}/>Sair da demonstração</button></div></aside><div className="main-column"><header className="topbar"><div className="breadcrumb">Ponto de Foco<ChevronRight size={14}/><strong>{current}</strong></div><div className="topbar-right"><span className="prototype-tag"><FlaskConical size={13}/>Protótipo · Semana 1</span><span className="avatar" title="Agente de demonstração">AD</span></div></header><div className="demo-ribbon"><span><FlaskConical size={14}/><strong>Ambiente de demonstração</strong><span className="ribbon-detail"> · Dados fictícios e ações simuladas. Ao atualizar a página, os dados reiniciam.</span></span></div><main id="conteudo"><div className="meta-row"><span><MapPin size={14}/>Vigilância de arboviroses</span><span><CalendarDays size={14}/>19 de outubro de 2026 · cenário demonstrativo</span></div><Outlet/></main><footer className="app-footer">Ponto de Foco <span>Projeto Integrador · Sistemas de Informação · Unifacisa</span><span>Semana 01 / 04</span></footer></div></div>;
}
export default function App() {
  const [state, dispatch] = useReducer(demoReducer, initialState);
  return <DemoContext.Provider value={{ state, dispatch }}><Routes><Route path="/acesso" element={state.signedIn ? <Navigate to="/preparacao" replace/> : <Login/>}/><Route element={<Shell/>}><Route path="/preparacao" element={<Preparation/>}/><Route path="/visitas" element={<Visits/>}/><Route path="/visita/nova" element={<VisitForm/>}/><Route path="/visita/confirmacao" element={<Confirmation/>}/><Route path="/sincronizacao" element={<Sync/>}/><Route path="/painel" element={<Dashboard/>}/><Route path="/historico" element={<HistoryPage/>}/></Route><Route path="*" element={<Navigate to={state.signedIn ? '/preparacao' : '/acesso'} replace/>}/></Routes></DemoContext.Provider>;
}
