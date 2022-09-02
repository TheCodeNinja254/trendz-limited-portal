import moment from "moment";
import { Chip } from "@material-ui/core";
import React from "react";

const TimeSlotChips = (props) => {
  const { setPreferredTime, preferredTime, chipData, className, selectedDate } =
    props;

  const timeNow = new Date();
  const currentHour = Number(timeNow.getHours());

  const userSelectedDate = moment(selectedDate).format("YYYY-DD-MM");
  const formatedDateToday = moment().format("YYYY-DD-MM");

  if (userSelectedDate === formatedDateToday) {
    if (currentHour >= 17) {
      let i = 0;
      const n = 5;
      while (i < n) {
        delete chipData[i];
        // eslint-disable-next-line no-plusplus
        i++;
      }
    }

    if (currentHour >= 15) {
      let i = 0;
      const n = 4;
      while (i < n) {
        delete chipData[i];
        // eslint-disable-next-line no-plusplus
        i++;
      }
    }

    if (currentHour >= 13) {
      let i = 0;
      const n = 3;
      while (i < n) {
        delete chipData[i];
        // eslint-disable-next-line no-plusplus
        i++;
      }
    }

    if (currentHour >= 12) {
      let i = 0;
      const n = 2;
      while (i < n) {
        delete chipData[i];
        // eslint-disable-next-line no-plusplus
        i++;
      }
    }

    if (currentHour >= 10) {
      delete chipData[0];
    }
  }

  return chipData.map((data) => (
    <li key={data.key}>
      <Chip
        label={data.label}
        color={data.label === preferredTime ? "primary" : "default"}
        className={className}
        onClick={() => setPreferredTime(data.label)}
      />
    </li>
  ));
};

export default TimeSlotChips;
