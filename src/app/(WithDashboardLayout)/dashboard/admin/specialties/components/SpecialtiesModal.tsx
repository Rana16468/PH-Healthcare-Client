


import PHFileUploder from "@/components/Forms/PHFileUploder";
import PHForms from "@/components/Forms/PHForms";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateSpecialtiesMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload/modifyPayload";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


type TProps={
    open:boolean;
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
}
const SpecialtiesModal = ({open,setOpen}:TProps) => {

   const [createSpecialties] =useCreateSpecialtiesMutation()

    const handelFromSubmit=async(values:FieldValues)=>{


        const data=modifyPayload("data",values);
      
        try{
           const res= await createSpecialties(data).unwrap();
           if(res?.id)
            {
                toast.success("Specialties Created Successfully");
                setOpen(false);
            }

        }
        catch(error:any)
        {
            console.log(error?.message)
        }
    }
    return (
        <PHModal open={open} setOpen={setOpen} title="Create A Speciality">
            <PHForms onSubmit={handelFromSubmit}>
               <Grid container spacing={2}>
                      <Grid item md={6}>
                          <PHInput name="title" label="Title"/>
                      </Grid>
                      <Grid item md={6}>
                          <PHFileUploder name="file" label="Uplode File"/>
                      </Grid>
               </Grid>
               <Button sx={{margin:2}}type="submit">Create</Button>
            </PHForms>
        </PHModal>
    );
};

export default SpecialtiesModal;