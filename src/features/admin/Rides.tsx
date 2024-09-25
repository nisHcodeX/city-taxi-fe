import { useTranslation } from 'react-i18next';

export default function Rides() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h2>{t('rides')}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}></div>
    </div>
  );
}
