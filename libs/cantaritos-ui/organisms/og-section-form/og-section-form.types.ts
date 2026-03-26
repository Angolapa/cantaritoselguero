export interface SectionFormValues {
  nameEs: string;
  nameEn: string;
  slug: string;
  order: string;
}

export interface OgSectionFormProps {
  defaultValues?: Partial<SectionFormValues>;
  onSubmit: (values: SectionFormValues) => void;
  isLoading?: boolean;
  isEdit?: boolean;
}
