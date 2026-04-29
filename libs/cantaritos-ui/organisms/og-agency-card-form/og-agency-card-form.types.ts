export interface AgencyCardFormValues {
  title: string;
  location: string;
  lodgingType: string;
  distance: string;
  email: string;
  phone: string;
  socialHandle: string;
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  order: string;
}

export interface OgAgencyCardFormProps {
  defaultValues?: Partial<AgencyCardFormValues>;
  onSubmit: (values: AgencyCardFormValues) => void;
  isLoading?: boolean;
}
