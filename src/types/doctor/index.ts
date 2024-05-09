export interface IDoctor {
    id: string;
    name: string;
    profilePhoto: string;
    contractNumber: string;
    address: string;
    registrationNumber: string;
    experience: number | undefined;
    gender: "MALE" | "FEMALE";
    appointmentFee: number | undefined;
    qualification: string;
    currentWorkingPlease: string;
    designation: string;
    specialties?: ISpecialties[];
  }
  
  export interface ISpecialties {
    specialtiesId: string;
    isDeleted?: null;
  }
  
  export interface IDoctorFormData {
    doctor: IDoctor;
    password: string;
  }