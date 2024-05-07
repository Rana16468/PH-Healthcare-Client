export const modifyPayload = (name="patient",values: any) => {
    const obj = { ...values };
    const file=obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append(name, data);
    formData.append('file',file as Blob);
  
    return formData;
  };