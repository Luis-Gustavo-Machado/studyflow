import type { LucideIcon } from 'lucide-react'

type Props = { label: string; value: string | number; helper: string; icon: LucideIcon; tone: string }
export default function StatCard({ label, value, helper, icon: Icon, tone }: Props) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={20} /></div><p>{label}</p><strong>{value}</strong><small>{helper}</small></article>
}
