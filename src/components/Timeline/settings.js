export const calendarConstants = {
  DAYS_IN_LEAP_YEAR: 366,
  MONTHS_IN_YEAR: 12,
  DAYS_IN_WEEK: 7
};

export const timelineViewTypeChoices = [
  {
    label: 'Week',
    value: 'week',
  },
  {
    label: 'Month',
    value: 'month',
  },
  {
    label: 'Year',
    value: 'year',
  }
];

// color property ranges for timeline visualization
export const COLOR_SPEC_RANGES = {
  hue: { max: 330, min: 70 },
  saturation: { max: 72, min: 35 },
  lightness: { max: 75, min: 45 }
};

export const SHADE_OFFSETS = {
  saturation: 10,
  lightness: -20
};
