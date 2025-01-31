import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TrendingUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';

type SalesWidgetProps = {
  value: number;
};

const SalesWidget = ({ value }: SalesWidgetProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const data = [
    {
      name: 'Mon',
      uv: 4000,
    },
    {
      name: 'Tue',
      uv: 3000,
    },
    {
      name: 'Wed',
      uv: 2000,
    },
    {
      name: 'Thu',
      uv: 2780,
    },
    {
      name: 'Fri',
      uv: 1890,
    },
    {
      name: 'Sat',
      uv: 2390,
    },
  ];

  return (
    <Card>
      <CardHeader title={t('dashboard.salesHistory.title')} />
      <CardContent>
        <ResponsiveContainer width="99%" height={124}>
          <BarChart
            width={150}
            height={40}
            data={data}
            margin={{
              right: 0,
              left: 0,
            }}
          >
            <Bar
              dataKey="uv"
              fill={theme.palette.primary.main}
              radius={[50, 50, 50, 50]}
            />
          </BarChart>
        </ResponsiveContainer>
        <Box
          component={'div'}
          sx={{ display: 'flex', alignItems: 'center', mt: 3 }}
        >
          <Box component={'div'} sx={{ flexGrow: 1 }}>
            <Typography variant="h2" component="div" marginBottom={1}>
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="div">
              {t('dashboard.salesHistory.unit')}
            </Typography>
          </Box>
          <TrendingUp sx={{ color: 'text.secondary' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesWidget;
