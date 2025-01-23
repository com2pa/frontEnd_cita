import axios from "axios";
import { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import '../styles.css';


const localizer = dayjsLocalizer(dayjs);

export const Calendary = () => {
  const [appointments,setAppointments]=useState([])
  const [events, setEvents] = useState([]);
  
 
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/api/calendario")
        // console.log(response)
        setAppointments(response.data)
        

       const mappedEvents = response.data.map(appointment => {
        // // // Solo tomar la fecha (sin la hora)
        // const startDate =appointment.date.split('T')[0]; 
        
        // // Para endDate, se puede usar el mismo valor para mantener la consistencia
        // const endDate =  appointment.time;
        const appointmentDate = dayjs(appointment.date);
       
        return {
          title: appointment.user.name,
          start:appointmentDate.toDate(),
          end: appointmentDate.toDate(),
        };
      });
        console.log( mappedEvents)
        setEvents(mappedEvents);
      } catch (error) {
        console.log(error)
      }
    };
    fetchAppointments();
  }, []);
 
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Calendar
        localizer={localizer}
         events={events} 
        startAccessor="start"
        endAccessor="end"
        style={{ width: '100%', height: '100%' }}
        className="my-custom-calendar"
        messages={{
          
          previous: "Anterior",
          next: "Siguiente",
          month: "Mes", 
          agenda: "Agenda",
        }}
         views={['month', 'agenda']}
          
      />
    </div>
  );
};

export default Calendary;
