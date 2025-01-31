import FullCalendar, {
  CalendarOptions,
  EventClickArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Button, IconButton, Typography } from '@mui/material';
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from '@mui/material/styles';
import { ArrowLeft, ArrowRight, Event as EventIcon } from '@mui/icons-material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Event, eventColors } from '../types/event';

const StyledWrapper = styled('div')(
  ({ theme }) => `
  .fc-theme-standard .fc-scrollgrid {
    border-color: ${theme.palette.divider};
  }

  .fc th {
    border-right: none;
    border-left: none;
    padding: 10px 0;
  }

  .fc-theme-standard .fc-scrollgrid {
    border-right: none;
    border-left: none;
    border-bottom: none;
  }

  .fc-theme-standard td, .fc-theme-standard th {
    border-right: none;
  }

  .fc-theme-standard td, .fc-theme-standard th {
    border-color: ${theme.palette.divider};
  }

  .fc .fc-daygrid-day-number {
    color: ${theme.palette.text.secondary};
    font-size: 14px;
    font-weight: ${theme.typography.fontWeightBold};
    padding: 12px;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: ${alpha(theme.palette.primary.main, 0.1)};
  }
`
);

type CalendarProps = {
  events: Event[];
  onEventClick: (event?: Event) => void;
} & CalendarOptions;

const Calendar = ({
  events,
  onEventClick,
  ...calendarProps
}: CalendarProps) => {
  const theme = useTheme();
  const { i18n, t } = useTranslation();

  const [viewTitle, setViewTitle] = useState('');
  const [calendarRef, setCalendarRef] = useState<FullCalendar | null>(null);

  const onCalendarRefSet = useCallback((ref: any) => {
    if (ref !== null) {
      setCalendarRef(ref);
    }
  }, []);

  const handleEventClick = (arg: EventClickArg) => {
    if (onEventClick) {
      const event = events.find((e) => e.id === arg.event.id);
      onEventClick(event);
    }
  };

  const handleNext = () => {
    if (calendarRef) {
      calendarRef.getApi().next();
      setViewTitle(calendarRef.getApi().getCurrentData().viewTitle);
    }
  };

  const handlePrev = () => {
    if (calendarRef) {
      calendarRef.getApi().prev();
      setViewTitle(calendarRef.getApi().getCurrentData().viewTitle);
    }
  };

  const handleToday = () => {
    if (calendarRef) {
      calendarRef.getApi().today();
      setViewTitle(calendarRef.getApi().getCurrentData().viewTitle);
    }
  };

  useEffect(() => {
    if (calendarRef) {
      setViewTitle(calendarRef.getApi().getCurrentData().viewTitle);
    }
  }, [calendarRef, i18n.language]);

  const eventSource = useMemo(() => {
    return events.map((event: Event) => {
      if (event.color && eventColors.includes(event.color)) {
        return { ...event, color: theme.palette[event.color].main };
      }
      return event;
    });
  }, [events, theme]);

  return (
    <React.Fragment>
      {/* Start - Custom Header Bar */}
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2,
        }}
      >
        <Typography sx={{ display: 'inline-flex' }} variant="h5">
          <EventIcon sx={{ mr: 2 }} />
          {viewTitle}
        </Typography>{' '}
        <Box component={'div'}>
          <IconButton
            aria-label="previous"
            component="span"
            onClick={handlePrev}
          >
            <ArrowLeft />
          </IconButton>
          <Button onClick={handleToday}>{t('common.today')}</Button>
          <IconButton
            aria-label="next"
            component="span"
            edge="end"
            onClick={handleNext}
          >
            <ArrowRight />
          </IconButton>
        </Box>
      </Box>
      {/* End - Custom Header Bar */}
      <StyledWrapper>
        <FullCalendar
          headerToolbar={false}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={i18n.language}
          ref={onCalendarRefSet}
          events={eventSource}
          eventClick={handleEventClick}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false,
          }}
          {...calendarProps}
        />
      </StyledWrapper>
    </React.Fragment>
  );
};

export default Calendar;
