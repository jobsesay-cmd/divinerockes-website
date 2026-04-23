import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faFileAlt, faScrewdriverWrench, faDiagramProject, faNewspaper, faEnvelope, faMagnifyingGlassChart, faGear, faUsers, faFileExport } from '@fortawesome/free-solid-svg-icons';

const links = [
  ['/admin', 'Dashboard', faChartLine],
  ['/admin/cms', 'CMS', faFileAlt],
  ['/admin/services', 'Services', faScrewdriverWrench],
  ['/admin/projects', 'Projects', faDiagramProject],
  ['/admin/news', 'News', faNewspaper],
  ['/admin/inquiries', 'Inquiries', faEnvelope],
  ['/admin/seo', 'SEO', faMagnifyingGlassChart],
  ['/admin/settings', 'Settings', faGear],
  ['/admin/users', 'Users', faUsers],
  ['/admin/reports', 'Reports', faFileExport],
] as const;

export function AdminSidebar() {
  return (
    <aside className="w-72 border-r border-slate-200 bg-white p-4">
      <h2 className="mb-6 text-lg font-bold text-brand-700">Divinerock Admin</h2>
      <nav aria-label="Admin navigation">
        <ul className="space-y-1">
          {links.map(([href, label, icon]) => (
            <li key={href}>
              <Link href={href} className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                <FontAwesomeIcon icon={icon} className="h-4 w-4" /> {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
