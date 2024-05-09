import PHDatePicker from "@/components/Forms/PHDatePicker";
import PHForms from "@/components/Forms/PHForms";
import PHTimePicker from "@/components/Forms/PHTimePicker";

import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateScheduleMutation} from "@/redux/api/scheduleApi";
import { DateFormatter } from "@/utils/DateTimeFormatter/DateFormatter";
import { TimeFormatter } from "@/utils/DateTimeFormatter/TimeFormatter";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
const ScheduleModal = ({open, setOpen}:TProps) => {

    const [ createSchedule]=useCreateScheduleMutation();
    

  

    const handelFormSubmit=async(values:FieldValues)=>{
         

         values.startDate= DateFormatter(values?.startDate);
         values.endDate=DateFormatter(values.endDate);
         values.startTime=TimeFormatter(values.startTime);
         values.endTime=TimeFormatter(values.endTime);

         try{
            const res=await  createSchedule(values).unwrap();
           
            if(res?.length){
                toast.success('Schedule Successfully Created');
                setOpen(false);
            }
         }
         catch(error:any){

            console.log(error?.message);

         }


    }
    return (
        <PHModal open={open} setOpen={setOpen} title="Create Schedule">
           
           <PHForms onSubmit={handelFormSubmit}>

              <Grid container spacing={2}>
                 
                 <Grid item md={12}>
                     <PHDatePicker name="startDate" label="startDate"/>
                 </Grid>
                 <Grid item md={12}>
                     <PHDatePicker name="endDate" label="endDate"/>
                 </Grid>

                 <Grid item md={12}>
                   <PHTimePicker name="startTime" label="startTime"/>
                 </Grid>

                 <Grid item md={12}>
                   <PHTimePicker name="endTime" label="endTime"/>
                 </Grid>

              </Grid>
             
             <Button type="submit" sx={{mt:1}}>Create</Button>
           </PHForms>
        </PHModal>
    );
};

export default ScheduleModal;