import styles from '@/app/(public)/services/services.module.css';

export type FrontendServiceCard = {
  id: string;
  name: string;
  summary: string | null;
};

export default function ServicesComponent({ items }: { items: FrontendServiceCard[] }) {
  if (!items.length) {
    return (
      <div className={styles.apServicesGrid}>
        <article className={styles.apServiceCard}>
          <header className={styles.apServiceCardHeader}>
            <h3>No services configured yet</h3>
          </header>
          <div className={styles.apServiceCardBody}>
            <p>Please add and publish services from Admin &gt; Services.</p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className={styles.apServicesGrid}>
      {items.map((item) => (
        <article className={styles.apServiceCard} key={item.id}>
          <header className={styles.apServiceCardHeader}>
            <h3>{item.name}</h3>
          </header>
          <div className={styles.apServiceCardBody}>
            <p>{item.summary ?? ''}</p>
          </div>
        </article>
      ))}
    </div>
  );
}