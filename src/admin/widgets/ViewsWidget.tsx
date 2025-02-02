import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ChevronRight, Dashboard } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const data = [
  {
    name: 'Jan',
    fb: 2.5,
  },
  {
    name: 'Feb',
    fb: 1.4,
  },
  {
    name: 'Mar',
    fb: 6,
  },
  {
    name: 'Avr',
    fb: 4,
  },
];

const views = '6.967.431';

const ViewsWidget = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Typography
          align="center"
          component="div"
          marginBottom={2}
          variant="body2"
        >
          {t('admin.home.views.unit')}
        </Typography>
        <Typography align="center" component="div" variant="h2">
          {views}
        </Typography>
        <Box component={'div'} sx={{ height: 224 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis
                axisLine={false}
                dataKey="name"
                interval="preserveStartEnd"
                tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 16,
                  boxShadow: theme.shadows[3],
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.background.paper,
                }}
              />
              <Area
                type="monotone"
                dataKey="fb"
                fill={theme.palette.primary.main}
                fillOpacity={0.3}
                stroke={theme.palette.primary.main}
                strokeWidth={6}
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Card sx={{ bgcolor: 'background.default', mt: 5 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'background.paper', mr: 2 }}>
              <Dashboard />
            </Avatar>
            <Box component={'div'} sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h6">
                {t('admin.home.views.action')}
              </Typography>
            </Box>
            <IconButton
              aria-label="Go to dashboard"
              component={RouterLink}
              to={`/${process.env.PUBLIC_URL}/admin/dashboard`}
            >
              <ChevronRight />
            </IconButton>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ViewsWidget;
