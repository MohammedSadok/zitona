import { Calendar, LocaleConfig } from "react-native-calendars";
LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = "fr";

const CalendarView = () => {
  return (
    <Calendar
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
      }}
      className="mx-3 rounded-lg"
      initialDate={"2023-05-20"}
      markingType="period"
      markedDates={{
        "2023-05-21": { startingDay: true, color: "lightgreen" },
        "2023-05-22": {
          marked: true,
          dotColor: "trasparent",
          color: "lightgreen",
        },
        "2023-05-23": {
          marked: true,
          dotColor: "trasparent",
          color: "lightgreen",
        },
        "2023-05-24": {
          marked: true,
          dotColor: "trasparent",
          color: "lightgreen",
        },
        "2023-05-25": { endingDay: true, color: "lightgreen" },
      }}
    />
  );
};

export default CalendarView;
