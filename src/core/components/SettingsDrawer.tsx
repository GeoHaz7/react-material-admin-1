import {
  Box,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { drawerWidth } from '../config/layout';
import { useSettings } from '../contexts/SettingsProvider';

type SettingsDrawerProps = {
  onDrawerToggle: () => void;
  open: boolean;
};

const SettingsDrawer = ({ onDrawerToggle, open }: SettingsDrawerProps) => {
  const {
    changeCollapsed,
    changeDirection,
    changeMode,
    collapsed,
    direction,
    mode,
  } = useSettings();
  const { i18n, t } = useTranslation();

  const handleDirectionChange = (_: any, direction: 'ltr' | 'rtl') => {
    changeDirection(direction);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    i18n.changeLanguage((event.target as HTMLInputElement).value);
  };

  const handleModeChange = (_: any, mode: string) => {
    changeMode(mode);
  };

  const handleSidebarChange = (_: any, collapsed: boolean) => {
    changeCollapsed(collapsed);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onDrawerToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="temporary"
    >
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography variant="h5">{t('settings.drawer.title')}</Typography>
        <IconButton color="inherit" onClick={onDrawerToggle} edge="end">
          <Close />
        </IconButton>
      </Box>
      <Box component={'div'} sx={{ pl: 2, pr: 2 }}>
        <Typography
          gutterBottom
          id="settings-language"
          marginTop={3}
          variant="h6"
        >
          {t('settings.drawer.language.label')}
        </Typography>
        <FormControl>
          <RadioGroup
            aria-label="language"
            name="language-radio-group"
            onChange={handleLanguageChange}
            value={i18n.language}
          >
            <FormControlLabel
              value="en"
              control={<Radio />}
              label={t('settings.drawer.language.options.en')}
            />
            <FormControlLabel
              value="fr"
              control={<Radio />}
              label={t('settings.drawer.language.options.fr')}
            />
          </RadioGroup>
        </FormControl>
        <Typography gutterBottom id="settings-mode" marginTop={3} variant="h6">
          {t('settings.drawer.mode.label')}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={mode}
          exclusive
          fullWidth
          onChange={handleModeChange}
        >
          <ToggleButton value="light">
            {t('settings.drawer.mode.options.light')}
          </ToggleButton>
          <ToggleButton value="dark">
            {t('settings.drawer.mode.options.dark')}
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography gutterBottom id="settings-mode" marginTop={3} variant="h6">
          {t('settings.drawer.direction.label')}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={direction}
          exclusive
          fullWidth
          onChange={handleDirectionChange}
        >
          <ToggleButton value="ltr">
            {t('settings.drawer.direction.options.ltr')}
          </ToggleButton>
          <ToggleButton value="rtl">
            {t('settings.drawer.direction.options.rtl')}
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography
          gutterBottom
          id="settings-sidebar"
          marginTop={3}
          variant="h6"
        >
          {t('settings.drawer.sidebar.label')}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={collapsed}
          exclusive
          fullWidth
          onChange={handleSidebarChange}
        >
          <ToggleButton value={true}>
            {t('settings.drawer.sidebar.options.collapsed')}
          </ToggleButton>
          <ToggleButton value={false}>
            {t('settings.drawer.sidebar.options.full')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;
