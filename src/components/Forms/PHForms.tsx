import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFromConfig={
    resolver?:any,
    defaultValues?:Record<string,any>
}
type TFromProps={

    children:React.ReactNode,
    onSubmit:SubmitHandler<FieldValues>

} & TFromConfig
// module 46
const PHForms = ({children,onSubmit, resolver,defaultValues}:TFromProps) => {
    //https://react-hook-form.com/docs/formprovider


    const fromConfig:TFromConfig={};
       if(resolver)
        {
              fromConfig["resolver"]=resolver
        }

           if(defaultValues)
            {
                fromConfig["defaultValues"]=defaultValues;

            }

    const methods = useForm(fromConfig);
    const submit:SubmitHandler<FieldValues> = (data) => {

        onSubmit(data);
        methods.reset();
    }


    return (
        <FormProvider {...methods}>
       
        <form onSubmit={methods.handleSubmit(submit)}>
          {children}
        </form>
      </FormProvider>
    );
};

export default PHForms;