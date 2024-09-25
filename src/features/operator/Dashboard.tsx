import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h2>{t('operatorDashboard')}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}></div>
    </div>
  );
}
